import * as ko from "knockout";
import { Phase, Transition } from "../../../Typings/api/PhasePlan/PhasePlan";
import {  IButton } from "./ButtonBuilder";
import { ASMaterialDesignButtonStyles } from "alterspective-material-design-web-components";


export function convertTransitionToButton (transitionsForButtons: Transition[], phasePlans:Phase[], options: any) : IButton[] {

    let buttons: IButton[] = [];
    let i = 0;
    transitionsForButtons.forEach((transition) => {
    
        let toPhase = phasePlans.find((phase) => phase.systemName === transition.toPhaseSystemName);

        if(!toPhase)
        {
            return;
        }

        i++;
        let button: IButton = {
            id: transition.systemName,
            order: i,
            text: ko.observable(transition.name),
            icon: ko.observable(toPhase.iconClass) ,
            color: ko.observable(toPhase.colour),
            enabled: ko.observable(true),
            visible: ko.observable(true),
            onClick: options.onClick,
            tooltip: toPhase.description || `Progress to ${toPhase.name} phase`,
            type: ko.observable(getButtonType(transition, toPhase)),
            isOptimumPath: transition.isOptimumPath,
            isSystemClosedPhase: toPhase.isSystemClosedPhase,
            isRemoved: toPhase.isRemoved,
            isOpen: toPhase.isOpen,
            isStart: toPhase.isStart,
            isReportable: toPhase.isReportable
        }
        buttons.push(button);
    });


    console.log(buttons);

    return buttons;


}

function getButtonType(transition: Transition, toPhase: Phase):ASMaterialDesignButtonStyles {
    
    let retValue = ASMaterialDesignButtonStyles.text;

    if(transition.isOptimumPath === true)
    {
        retValue = ASMaterialDesignButtonStyles.raised;
    }

    if(toPhase.isRemoved === true)
    {
        retValue = ASMaterialDesignButtonStyles.text;
    }

    if(toPhase.isSystemClosedPhase === true)
    {
        retValue = ASMaterialDesignButtonStyles.outlined;
    }



    return retValue;
}
