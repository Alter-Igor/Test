import { IWidget } from "../Widgets/IWidget";
import { IOdsWidgetOptions } from "./IOdsWidgetOptions";

export interface IOdsWidget extends IWidget
{
    odsEntities: () => IOdsWidgetODSEntities[];
    options: IOdsWidgetOptions;

}


export interface IOdsWidgetODSEntities {
    roleName: string;
    label: string;
    showSearchOds: boolean;
    selected: (value?:boolean) => boolean;
    roleSystemName: (value?:string) => string;
    required: (value?:boolean) => boolean;
    participantType: (value?:string) => string;
    odsName: (value?:string) => string;
    odsId: (value?:string) => string;
    icon: (value?:string) => string;
  }
  