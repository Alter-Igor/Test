import * as ko from "knockout";


export function OdsPickerDesigner(element: HTMLElement, configuration: any, baseModel: any): OdsPickerDesignerClass {
    return new OdsPickerDesignerClass(element, configuration, baseModel);
}

export interface Configuration {
    showPreSharedo: boolean;
    showPostSharedo: boolean;
    narrowLabel: boolean;
    roleConfigModels: any[];

}

export interface thisModel extends Configuration {

}

export class OdsPickerDesignerClass {

    validation: any;
    validationErrorCount: ko.Computed<number> | undefined
    options: any;
    sharedoTypeSystemName: any;
    loaded: ko.Observable<boolean>;
    lovs: { roles: ko.ObservableArray<any>; };
    configuration: Configuration;
    hasValidationErrors: ko.PureComputed<any>;
    model: {
         showPreSharedo: ko.Observable<any>; 
         showPostSharedo: ko.Observable<any>; 
         narrowLabel: ko.Observable<any>; 
         roleConfigModels: ko.ObservableArray<any>; 
        };

    constructor(element: HTMLElement, configuration: Configuration, baseModel: any) {


        let defaults: Configuration = {
            showPreSharedo: false,
            showPostSharedo: false,
            narrowLabel: false,
            roleConfigModels: []
        };

        let optionDefaults = {
            aspectIsReadOnly: null,
            entitySystemName: null
        }

        this.configuration = $.extend(defaults, configuration);
        this.options = $.extend(optionDefaults, this.configuration);

        this.sharedoTypeSystemName = this.options.entitySystemName;
        this.loaded = ko.observable(false);

        this.lovs = {
            roles: ko.observableArray()
        };

        this.model = {
            showPreSharedo: ko.observable(this.options.showPreSharedo),
            showPostSharedo: ko.observable(this.options.showPostSharedo),
            narrowLabel: ko.observable(this.options.narrowLabel),
            roleConfigModels: ko.observableArray()
        };

        configuration.roleConfigModels.forEach((x) => {
            this.addRole(x);
        });

        this.hasValidationErrors = ko.pureComputed(() => {
            var roles = this.model.roleConfigModels();
            if (roles.length === 0)
                return true;

            return roles.some(function (x) {
                return x.validation.hasErrors();
            });
        });
    }

    loadAndBind() {

        $ui.stacks.lock();

        $ajax.get("/api/admin/sharedoTypes/" + this.sharedoTypeSystemName + "/participantRoles")
            .done((response: any) => {
                var ordered = _.sortBy(response, (x: any) => { return x.participantRoleType; });
                this.lovs.roles(ordered);
            })
            .always(() => {
                this.loaded(true);
                $ui.stacks.unlock();
            });
    };

    saveAndClose() {

        if (this.hasValidationErrors())
            return;

        var model = ko.toJS(this.model);
        model.roleConfigModels.forEach(function (x) {
            delete x.validation;
        });

        $ui.stacks.close(this, model);
    };

    discard() {
        $ui.stacks.cancel(this);
    };

    addRole(role: any) {

        role = role || {};

        let model:any = {
            roleSystemName: ko.observable(role.roleSystemName),
            label: ko.observable(role.label),
            required: ko.observable(role.required),
            showSearchOds: ko.observable(role.showSearchOds),
            defaultToCurrentUser: ko.observable(role.defaultToCurrentUser || false),
            displayName: ko.pureComputed(() => {
                let role: any = model.roleSystemName();
                if (!role)
                    return null;
                var match = this.lovs.roles().find(x => x.participantRoleType === role)
                if (!match)
                    return null;

                return match.participantRoleTypeName;
            })
            
        };

        model.validation= {
            roleSystemName : Validator.required(this, model.roleSystemName, "Role is required"),
            hasErrors: ko.pureComputed(() => {
                if (model.validation.roleSystemName()) return true;
                return false;
            })
        }

        this.model.roleConfigModels.push(model);
    };

    removeRole(role:any) {
        this.model.roleConfigModels.remove(role);
    };
}

