import * as ko from "knockout";
import {  IWorkTypeContext } from "../ShareDo/IWorkTypeContext";

import { TShareDoBlade } from "../ShareDoJS/AddEditSharedo";
import { FormBuilder } from "../../WebBased/ModuleLoader/AlphacaAdapter";


export interface IFormBuilderContext {
    getAspect(aspecSystemName: string): IAspect<any>;   
    form :FormBuilder | undefined;
    blade:TShareDoBlade | undefined;
    koContext: ko.BindingContext;
    element: HTMLElement;
    workItemContext: IWorkTypeContext    
}    

export interface IWidget
{    
        options: {},
         enabled: () => boolean,
          description: () => string,
          reference: () => string,
          widgetExpanded () : boolean,
          validationErrorCount?: () => number,
          displayStyle:string,
          bladeOpen:boolean,
          base: {
            systemName: string,
            id: string,
            title: () => string,
            isExpanded: () => boolean,
            hasTitle: () => boolean,
            canContextCollapse: () => boolean,
            icon: () => string
        }
        [key:string]: any | undefined        
}

export interface IOdsWidget extends IWidget
{
    odsEntities: () => IOdsWidgetODSEntities[];
}

export interface IOdsWidgetODSEntities {
  roleName: string;
  label: string;
  showSearchOds: boolean;
  selected: (value:boolean|undefined) => boolean;
  roleSystemName: (value:string|undefined) => string;
  required: (value:boolean|undefined) => boolean;
  participantType: (value:string|undefined) => string;
  odsName: (value:string|undefined) => string;
  odsId: (value:string|undefined) => string;
  icon: (value:string|undefined) => string;
}

export interface IAspect<T extends IWidget>
{
    aspectDefinitionId: string;   
    model:  {
        instanceId: string, 
        id: () => string, 
        parentSharedoId: () => string,
         title: () => string, 
         titleIsUserProvided: () => string
    }
    widget: T 
  
    
}