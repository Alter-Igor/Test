import * as ko from "knockout";
import { Phase, Transition } from "../../../Typings/api/PhasePlan/PhasePlan";
import { ButtonType, IButton } from "./ButtonBuilder";


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
            text: transition.name,
            icon: toPhase.iconClass || "",
            color: toPhase.colour || "",
            enabled: ko.observable(true),
            visible: true,
            onClick: options.onClick,
            tooltip: toPhase.description || `Progress to ${toPhase.name} phase`,
            type: getButtonType(transition, toPhase),
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

function getButtonType(transition: Transition, toPhase: Phase):ButtonType {
    
    let retValue = ButtonType.primary;

    if(transition.isOptimumPath === false)
    {
        retValue = ButtonType.secondary;
    }

    if(toPhase.isRemoved === true)
    {
        retValue = ButtonType.destrustive;
    }

    if(toPhase.isSystemClosedPhase === true)
    {
        retValue = ButtonType.primary;
    }



    return retValue;
}
