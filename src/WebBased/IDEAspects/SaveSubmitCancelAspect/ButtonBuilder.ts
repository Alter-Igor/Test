
import { TShareDoBlade } from '../../../Typings/ShareDoJS/AddEditSharedo';


export interface IButtonGroup {
    name: ko.Observable<string>;
    showTitle: ko.Observable<boolean>;
    enabled: ko.Observable<boolean>;
    order: number;
    buttons: IButton[];
}

export interface IButton {
    group?: IButtonGroup; // group buttons together
    id: string;
    order: number; // order of the button in the group
    text: string;
    icon: string;
    enabled: ko.Observable<boolean>;
    visible: boolean;
    onClick: any;
    tooltip: string;
    type: ButtonType; // primary, secondary, destructive, save added to class
    color: string | undefined;  // color of the button for emphasis
    isOptimumPath: boolean; // is this button on the optimum path for css
    isSystemClosedPhase: boolean; // is this button on a closed phase for css
    isRemoved: boolean; // is this button on a removed phase for css
    isOpen: boolean; // is this button on an open phase for css
    isStart: boolean; // is this button on a start phase for css
    isReportable: boolean; // is this button on a reportable phase for css
}

export enum ButtonType {
    destrustive = "destructive",
    primary = "primary",
    secondary = "secondary",
    save = "save",
    cancel = "cancel"
}

function ensureButtonIds(buttons: IButton[]) {
    buttons.forEach(button => {
        if (!button.id) {
            button.id = "button_" + button.order;
        }
    });
}
/**
 * Creates the button group elements 
 * @param buttonGroups 
 * @param blade 
 * @returns 
 */
export function buildButtonGroupElement(buttonGroups: IButtonGroup[], blade: TShareDoBlade): HTMLElement {
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
        let buttons = buildButtonsElement(group.buttons, blade);
        groupElement.appendChild(buttons);
        buttonGroupElement.appendChild(groupElement);
    });

    return buttonGroupElement;
}

export function buildButtonsElement(buttons: IButton[], blade: TShareDoBlade): HTMLElement {
    
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
        const newButtonElement = document.createElement("ASMaterialButton") as ASMaterialButton;
        newButtonElement.classList.add("btn");
        newButtonElement.classList.add(button.type);
        newButtonElement.id = button.id || "button_" + button.order;
        newButtonElement.innerText = button.text;
        newButtonElement.addEventListener("click", button.onClick);
        
        newButtonElement.disabled = !button.enabled();
        newButtonElement.style.display = button.visible ? "block" : "none";
        newButtonElement.title = button.tooltip;

        applyButtonIsClasses(button, newButtonElement);

        button.enabled.subscribe((enabled) => {
            newButtonElement.disabled = !enabled;
            applyButtonEmphasis(button, enabled, newButtonElement);
        });

        const icon = document.createElement("span");
        icon.classList.add("icon");
        icon.classList.add("fa");
        icon.classList.add(button.icon);
        icon.classList.add("fa-xl");
        newButtonElement.appendChild(icon);
        buttonsElement.appendChild(newButtonElement);
    })
    return buttonsElement;

    function applyButtonEmphasis(button: IButton, isValid: any, newButtonElement: HTMLButtonElement) {
        let boxShadow = `0 8px 8px -4px lightgray`;
        let boxShadowHover = `0px 0px 17px 4px lightgray`;
        if (button.color) {
            boxShadow = `0 8px 8px -4px ${button.color}`;
            boxShadowHover = `0px 0px 17px 4px ${button.color}`;
        }

        if (isValid) {
            newButtonElement.style.boxShadow = boxShadow;
            newButtonElement.onmouseover = function () {
                newButtonElement.style.boxShadow = boxShadowHover;
            }
            newButtonElement.onmouseout = function () {
                newButtonElement.style.boxShadow = boxShadow;
            }
        }
        else {
            newButtonElement.style.boxShadow = ``;
            newButtonElement.onmouseover = function () {
                newButtonElement.style.boxShadow = ``;
            }
            newButtonElement.onmouseout = function () {
                newButtonElement.style.boxShadow = ``;
            }
        }
    }
}

function applyButtonIsClasses(button: IButton, newButtonElement: HTMLButtonElement) {
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

function runThroughColors(forColor: any, newButtonElement: HTMLButtonElement) {
    for (let i = 0; i < forColor.length; i++) {
        setTimeout(() => {
            let rgb = "rgb(" + forColor[i].r + "," + forColor[i].g + "," + forColor[i].b + ")";
            console.log(`${i} :`, rgb);
            newButtonElement.style.color = rgb;
        }, (i + 1) * 2000);
    }
}
