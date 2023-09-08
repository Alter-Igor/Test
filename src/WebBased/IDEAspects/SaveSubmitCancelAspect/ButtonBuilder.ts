import { TShareDoBlade } from "../../../Typings/SharedoAspectModels/TShareDoBlade";
import { ASMaterialButton } from "alterspective-material-design-web-components"
import { ISaveSubmitCancel_ConfigurationFromModeller } from "./SaveSubmitCancelAspect";

export interface IButtonGroup {
    name: ko.Observable<string>;
    showTitle: ko.Observable<boolean>;
    enabled: ko.Observable<boolean>;
    order: number;
    buttons: IButton[];
}

export interface IButton {
    element?: ASMaterialButton; //added when button is created
    group?: IButtonGroup; // group buttons together
    id: string;
    order: number; // order of the button in the group
    text: ko.Observable<string>;
    icon: ko.Observable<string>;
    enabled: ko.Observable<boolean>;
    visible: ko.Observable<boolean>;
    onClick: any;
    tooltip: string;
    materialDesignButtonType: ko.Observable<any>; // primary, secondary, destructive, save added to class
    actionType: ButtonType | undefined; // save, cancel, primary, secondary, destructive
    color: ko.Observable<string | undefined> | undefined;  // color of the button for emphasis
    isOptimumPath: boolean; // is this button on the optimum path for css
    isSystemClosedPhase: boolean; // is this button on a closed phase for css
    isRemoved: boolean; // is this button on a removed phase for css
    isOpen: boolean; // is this button on an open phase for css
    isStart: boolean; // is this button on a start phase for css
    isReportable: boolean; // is this button on a reportable phase for css
    data:any | undefined;
}


export enum ButtonType {
    destrustive = "destructive",
    primary = "primary",
    secondary = "secondary",
    save = "save",
    cancel = "cancel"
}


/**
 * Creates the button group elements 
 * @param buttonGroups 
 * @param blade 
 * @returns 
 */
export function buildButtonGroupElement(buttonGroups: IButtonGroup[], blade: TShareDoBlade, configuration: ISaveSubmitCancel_ConfigurationFromModeller): HTMLElement {
    let buttonGroupElement = document.createElement("div");

    buttonGroupElement.classList.add("button-groups");
    //sort groups by order
    let sortedButtonGroups = buttonGroups.sort((a, b) => a.order - b.order);
    sortedButtonGroups.forEach(group => {
        const groupElement = document.createElement("div");
        let cssGroupName = group.name().replace(/[^a-zA-Z0-9]/g, "");

        groupElement.classList.add("button-group");
        groupElement.classList.add(cssGroupName);
        group.enabled.subscribe((enabled) => {
            groupElement.classList.toggle("disabled", !enabled);
        });
        let buttons = buildButtonsElement(group.buttons, blade,configuration);
        groupElement.appendChild(buttons);
        buttonGroupElement.appendChild(groupElement);
    });

    return buttonGroupElement;
}

export function buildButtonsElement(buttons: IButton[], blade: TShareDoBlade,  configuration: ISaveSubmitCancel_ConfigurationFromModeller): HTMLElement {

    const buttonsElement = document.createElement("div");
    buttonsElement.classList.add("buttons");
    if (!buttons || buttons.length === 0) {
        let noButtons = document.createElement("div");
        noButtons.innerText = "No Transitions Available";
        buttonsElement.appendChild(noButtons);
        return buttonsElement;
    }

    ensureButtonIds(buttons);

    let sortedButtons = buttons.sort((a, b) => a.order - b.order);

    sortedButtons.forEach(button => {
        
        if((button.actionType as any) === "neveravalue")
        {
            //this code tricks webpack into including the component
            //this code never runs
            let x = new ASMaterialButton();
        }
        
        const newButtonElement = document.createElement("as-material-button") as ASMaterialButton;
        
        button.element = newButtonElement;
        
        // if(configuration.debug?.enabled){
            (window as any).newButtonElement = newButtonElement; //for debug only
        // }
        addButtonCSSForPhaseToBooleanOptions(button, newButtonElement);
        addButtonStyle(newButtonElement, button);
        addButtonCssForButtonActionType(button, newButtonElement);
        generateToolTipElement(button, newButtonElement);
        addButtonTextWithSubscription(newButtonElement, button);
        setButtonVisabilityWithSubscription(newButtonElement, button);
        setButtonIconWithSubscription(addIcon, button, newButtonElement);
        setButtonEnabledStateWithSubscription(newButtonElement, button);
        
        newButtonElement.options.clicked = button.onClick;
        newButtonElement.options.disabled = !button.enabled();
        //Add additional params to the button which we can retrieve in the click event
        newButtonElement.options.additional_params = button.data;
        newButtonElement.id = button.id || "button_" + button.order;
        newButtonElement.addEventListener("click", button.onClick);
    
        buttonsElement.appendChild(newButtonElement);

    })
    return buttonsElement;

    function addIcon(button: IButton, newButtonElement: ASMaterialButton) {
        const div = document.createElement("div");
        div.classList.add("icon-container");
        newButtonElement.appendChild(div);

        const icon = document.createElement("span");
        icon.classList.add("icon");
        icon.classList.add("fa");
        icon.classList.add(button.icon());
        icon.classList.add("fa-xl");
        if(button.color && button.color()){
            icon.style.color = button.color() || "";
        }
        // newButtonElement.options.icon = button.icon();
        div.appendChild(icon);
       
    }

  
}

function setButtonIconWithSubscription(addIcon: (button: IButton, newButtonElement: ASMaterialButton) => void, button: IButton, newButtonElement: ASMaterialButton) {
    addIcon(button, newButtonElement);
    button.icon.subscribe((icon) => {
        addIcon(button, newButtonElement);
    });
}

function setButtonEnabledStateWithSubscription(newButtonElement: ASMaterialButton, button: IButton) {
    newButtonElement.options.disabled = !button.enabled();
    button.enabled.subscribe((enabled) => {
        console.log(`${button.text} enabled.subscribe enabled :`, enabled);
        newButtonElement.options.disabled = !enabled;

    });
}

function setButtonVisabilityWithSubscription(newButtonElement: ASMaterialButton, button: IButton) {
    newButtonElement.style.display = button.visible() ? "block" : "none";
    button.visible.subscribe((visible) => {
        newButtonElement.style.display = visible ? "block" : "none";
    });
}

function addButtonTextWithSubscription(newButtonElement: ASMaterialButton, button: IButton) {
    newButtonElement.options.label = button.text();
    button.text.subscribe((text) => {
        newButtonElement.options.label = button.text();
    });
}

function addButtonCssForButtonActionType(button: IButton, newButtonElement: ASMaterialButton) {
    if (button.actionType) {
        newButtonElement.classList.add(button.actionType);
        if (button.actionType === ButtonType.save) {
            newButtonElement.options.elevation = 3;
        }
    }
}

function addButtonStyle(newButtonElement: ASMaterialButton, button: IButton) {
    newButtonElement.options.style = button.materialDesignButtonType();
    button.materialDesignButtonType.subscribe((type) => {
        newButtonElement.options.style = type;
    });
    console.log(`${button.text()}.options.style :`, newButtonElement.options.style);
}
/**
 * Generate the tooltip area and add it to the button
 * Also add part areas so we can target the tooltip with css
 * @param button 
 * @param newButtonElement 
 */
function generateToolTipElement(button: IButton, newButtonElement: ASMaterialButton) {
    const tooltipElement = document.createElement("div");
    tooltipElement.classList.add("tooltip");
    tooltipElement.setAttribute("part", "tooltip");

    // const card = document.createElement("as-material-design-card") as ASMaterialDesignCard;

    // let options : ASMaterialDesignCardOptions ={
    //     title: `Information about ${button.text()}`,
    // sub_title="TextBox",
    // buttons?.push(
    //     {
    //         icon:MaterialDesignIcons.edit,
    //         label:"edit"
    //     }
    // )
    // }

    // card.options.title = `Information about ${button.text()}`;
    // card.options.sub_title = "Transition Action";
    // card.options.buttons?.push(
    //     {
    //         icon: MaterialDesignIcons.edit,
    //         label: "edit"
    //     }
    // )

    const cardTitle = document.createElement("div");
    cardTitle.classList.add("card-title");
    cardTitle.setAttribute("part", "card-title");
    cardTitle.innerHTML = `Information about ${button.text()}`;
    tooltipElement.appendChild(cardTitle);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.setAttribute("part", "card-body");
    cardBody.innerHTML = button.tooltip;
    tooltipElement.appendChild(cardBody);



    // newButtonElement.appendChild(tooltipElement);
    newButtonElement.options.tooltip = tooltipElement;

    // //Set the 
    // newButtonElement.setAttribute("aria-describedby", newButtonElement.toolTipId());
    // newButtonElement.setAttribute("data-tooltip-id", newButtonElement.toolTipId());

}

/**
 * toPhaseOpen, toPhaseStart, toPhaseReportable, toPhaseRemoved, toPhaseSystemClosedPhase, toPhaseOptimumPath
 * @param button 
 * @param newButtonElement 
 */
function addButtonCSSForPhaseToBooleanOptions(button: IButton, newButtonElement: ASMaterialButton) {
    if (button.isOpen) {
        newButtonElement.classList.add("toPhaseOpen");
    }
    if (button.isStart) {
        newButtonElement.classList.add("toPhaseStart");
    }
    if (button.isReportable) {
        newButtonElement.classList.add("toPhaseReportable");
    }
    if (button.isRemoved) {
        newButtonElement.classList.add("toPhaseRemoved");
    }
    if (button.isSystemClosedPhase) {
        newButtonElement.classList.add("toPhaseSystemClosedPhase");
    }
    if (button.isOptimumPath) {
        newButtonElement.classList.add("toPhaseOptimumPath");
    }

}
function ensureButtonIds(buttons: IButton[]) {
    buttons.forEach(button => {
        if (!button.id) {
            button.id = "button_" + button.order;
        }
    });
}