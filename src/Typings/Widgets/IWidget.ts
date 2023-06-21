
export interface IWidget
{    
   
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
