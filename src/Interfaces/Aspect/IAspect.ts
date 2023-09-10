import { IWidget } from "../Widgets/IWidget";

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