import { Options } from '@eonasdan/tempus-dominus';


export interface IDatePickerAspectOptions {
    title: string  | undefined;
    formBuilderField: string  | undefined;
    pickerEnabled: boolean  | undefined;
    eventToFireOnUpdate: Array<string> | undefined;
    datePickerOptions: Options  | undefined;
    defaultDateFromNowHours: number  | undefined;
}