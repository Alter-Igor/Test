import * as ko from "knockout";
import { IODSPickerConfiguration } from "./IOdsPickerConfig"
import { IDefaultSettings, IWidgetJson } from "../BaseClasses/IWidgetJson";
import { Settings } from "./DefaultConfigurationJSON";
import { BaseIDEAspect } from "../BaseClasses/BaseIDEAspect";


interface OdsEntityModel {
    roleName: string;
    label: string;
    roleSystemName: ko.Observable<string>;
    participantType: ko.Observable<string>;
    odsId: ko.Observable<string>;
    odsName: ko.Observable<string>;
    status: ko.Observable<boolean>;
    icon: ko.Observable<string>;
    selected: ko.Observable<boolean>;
    showSearchOds: boolean;
    required: ko.Observable<boolean>;
    addMenuOptions: ko.ObservableArray<any>;
}


// export function OdsPicker(element: HTMLElement, configuration: Configuration, baseModel: any): OdsPickerClass {
//     return new OdsPickerClass(element, configuration, baseModel);
// }

export class OdsPicker extends BaseIDEAspect<IODSPickerConfiguration, any> {
    refresh(newConfig: any): void {
        // throw new Error("Method not implemented.");
    }
    reset(newConfig: any): void {
        // throw new Error("Method not implemented.");
    }
    setThisComponentName(): string {
        return "OdsPicker";
    }
    setWidgetJsonSettings(): IWidgetJson<IODSPickerConfiguration> {
        return Settings
    }
    setLocationOfDataToLoadAndSave(): string | undefined {
        return undefined;
    }
    odsEntities!: ko.ObservableArray<any>    ;
    showAspect: ko.PureComputed<boolean> | undefined;

    setDefaults(): IDefaultSettings<IODSPickerConfiguration> {
        return {
            roleConfigModels: [],
            showPreSharedo: true,
            showPostSharedo: true,
            noOdsEntityMessage: 'No participant selected',
            noOdsEntityRequiredMessage: 'Participant required',
            narrowLabel: false,
            debug: {
                enabled: false,
                logToConsole: false,
                showInAspect: false
            },
            eventsToReactTo: [],
            dataSettings: {
                getValueUsingParents: false,
                maxDepth: 0
            }

        };
    }


    // constructor(element: HTMLElement, configuration: IODSPickerConfiguration, baseModel: any) {

    //     super("OdsPicker", "aspectData.odsEntityPicker", element, configuration, baseModel )

    //     // Base properties
    //     this.odsEntities = ko.observableArray();
    //     this.setup();
    // } 


    // private initialise() {//! Note: UI framework looks for this method name and if found behaves differently and wont call loadAndBind

    setup() {
        this.odsEntities = ko.observableArray();

        // Map the roleConfigModels
        this.options.roleConfigModels().forEach(roleConfigModel => {
            this.odsEntities?.push(this.getOdsEntityModel(roleConfigModel));
        });

        this.showAspect = ko.pureComputed(() => {
            if (this.options.showPreSharedo()) {
                // We show the widget on save
                $ui.widgets.show(this);
                return true;
            }

            if (this.options.showPostSharedo() && this.sharedoId()) {
                // We show the widget on save
                $ui.widgets.show(this);
                return true;
            }

            // We hide the widget on load
            $ui.widgets.hide(this);
            return false;
        });
    }

    override loadAndBind(): void {

        this.log("Loading data (model) passed in", "green");
        super.loadAndBind();

        if (this.model.aspectData.odsEntityPicker) {
            _.each(this.odsEntities(),
                (odsEntity: any) => {
                    let data = _.find(this.model.aspectData.odsEntityPicker.odsEntities,
                        (item: any) => {
                            return item.roleSystemName === odsEntity.roleSystemName();
                        });
                    if (data && data.odsId) {
                        odsEntity.participantType(data.participantType);
                        odsEntity.odsId(data.odsId);
                        odsEntity.odsName(data.odsName);
                        odsEntity.status(data.isActive);
                        odsEntity.selected(true);

                        if (data.participantType === "person")
                            odsEntity.icon("fa-male");
                        if (data.participantType === "organisation")
                            odsEntity.icon("fa-university");
                    }
                });
        }
        this.loadAddOptions();
        this.updateValidations();
    };

    private loadAddOptions(): void {

        this.log("Loading add options", "green");
        let models = ko.unwrap(this.options.roleConfigModels());

        models.forEach((model: any) => {
            let selectedEntity = ko.observable();

            model.addMenuOptions = [];
            let c = Sharedo.Core.Case.Participants.AddParticipantService;
            let p = new c({
                sharedoId: this.sharedoId,
                sharedoTypeSystemName: this.sharedoTypeSystemName(), //! test it this.sharedoTypeSystemName() or this.sharedoTypeSystemName
                roleSystemNames: [ko.unwrap(model.roleSystemName)],
                selectedEntity: selectedEntity,
                defaultToSearch: model.showSearchOds
            });
            model.addService = new Sharedo.Core.Case.Participants.AddParticipantService({
                sharedoId: this.sharedoId,
                sharedoTypeSystemName: this.sharedoTypeSystemName(), //! test it this.sharedoTypeSystemName() or this.sharedoTypeSystemName
                roleSystemNames: [ko.unwrap(model.roleSystemName)],
                selectedEntity: selectedEntity,
                defaultToSearch: model.showSearchOds
            });

            selectedEntity.subscribe((entity) => {
                let match = this.odsEntities().find(x => {
                    return ko.unwrap(x.roleSystemName) === ko.unwrap(model.roleSystemName);
                });

                if (!match)
                    return;

                match.odsId(entity.id);
                $ui.events.broadcast("Sharedo.Core.Case.Aspects.Widgets.OdsEntityPicker.odsEntityChanged", match);
                $ui.events.broadcast("odsentitypicker.entity-changed",
                    {
                        entity: ko.toJS(match),
                        instanceId: this.model.instanceId
                    });
                this.loadEntityDetails(entity.id, match);
            });
        });

        let loaders = models
            .map((model: any) => {
                return model.addService.load();
            });

        $.when.apply($, loaders)
            .always(() => {
                models.forEach((model: any) => {
                    let menu = model.addService.getAddMenu();
                    model.addMenuOptions = menu;

                    let entity = _.find(this.odsEntities(), (x: any) => {
                        return ko.unwrap(x.roleSystemName) === ko.unwrap(model.roleSystemName);
                    });

                    if (entity)
                        entity.addMenuOptions(menu);
                });

                this.loaded(true);
            });
    };

    updateValidations() {


        let validationErrorCount = _.filter(this.odsEntities(),
            (entity: any) => {
                return (entity.required() === true) && (entity.selected() === false);
            });
        if (!validationErrorCount) this.validation(0);
        else this.validationErrorCount(validationErrorCount.length);
    };

    private getOdsEntityModel(model: any): OdsEntityModel {

        this.log("Getting OdsEntityModel", "green", model);

        let selected = false;
        if (model.odsId)
            selected = true;

        let returnModel = {
            roleName: model.displayName,
            label: model.label,
            roleSystemName: ko.observable(model.roleSystemName),
            participantType: ko.observable(model.participantType),
            odsId: ko.observable(model.odsId),
            odsName: ko.observable(model.odsName),
            status: ko.observable(model.isActive),
            icon: ko.observable(model.icon),
            selected: ko.observable(selected),
            showSearchOds: model.showSearchOds,
            required: ko.observable(model.required),
            addMenuOptions: ko.observableArray(model.addMenuOptions)
        };

        // Default to current user?
        this.applyDefaultUserPreference(returnModel, model);

        returnModel.selected.subscribe(this.updateValidations.bind(this));

        return returnModel;
    };

    private applyDefaultUserPreference(odsEntityModel: any, roleConfig: any): void {


        let isNew = !this.sharedoId();
        if (!isNew) return;

        let currentUserId = $ui.pageContext.user && ko.unwrap($ui.pageContext.user.userid);
        if (!currentUserId) return;

        if (roleConfig.defaultToCurrentUser && !roleConfig.selected) {
            odsEntityModel.selected(true);
            odsEntityModel.odsId(currentUserId);
            odsEntityModel.odsName($ui.pageContext.user.firstname() + " " + $ui.pageContext.user.lastname());
            odsEntityModel.participantType("person");
            odsEntityModel.icon("fa-male");    // TODO from participant type config
        }
    }

    public removeParticipant(removee: any): void {


        let data = _.find(this.odsEntities(),
            (item: any) => {
                return item.roleSystemName() === removee.roleSystemName();
            });

        if (data) {
            data.selected(false);
            data.odsId(null);
            data.odsName(null);
            data.status(null);
            data.icon(null);
            $ui.events.broadcast("Sharedo.Core.Case.Aspects.Widgets.OdsEntityPicker.odsEntityChanged", removee);
            $ui.events.broadcast("odsentitypicker.entity-changed",
                {
                    entity: ko.toJS(removee),
                    instanceId: this.model.instanceId
                });
        }
    }

    private loadEntityDetails(odsId: any, item: any): void {


        $ui.startWaitingFor('odsEntityDetails');

        $ajax.get("/api/ods/" + odsId + "/type",
            {},
            (odsData: any) => {
                if (odsData.type === 1) {
                    // Person
                    item.icon("fa-male");   // TODO get from config.participantTypes.iconClass
                    item.participantType("person");
                }
                if (odsData.type === 2) {
                    // Organisation
                    item.icon("fa-bank");   // TODO get from config.participantTypes.iconClass
                    item.participantType("organisation");
                }
                item.status(odsData.isActive);
                item.odsName(odsData.name);
                item.selected(true);

                $ui.stopWaitingFor('odsEntityDetails');

            });

    };

    override async onSave(model: any) {

        // this.log("Saving, model passed in we need to persist to", "green", this.data);
        let odsEntities = ko.toJS(this.odsEntities);
        if (!model.aspectData.odsEntityPicker)
            model.aspectData.odsEntityPicker = { odsEntities: [] };

        let entities = model.aspectData.odsEntityPicker.odsEntities;
        odsEntities.forEach((x) => {
            entities.push(x);
        });
    };
} 