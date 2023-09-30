import { executeFunc } from "./evaluteRule";
import { formatFunc } from "./Formatter";


/**
 * This function will extract the value from the value string.
 * The value string can be a simple string, or a function call.
 * @param value The value to extract or calculated value
 * @param viewModel The view model to use for the function call and data context
 * @param formatter A formatter to use on the value e.g. value.ToUpper()
 * @returns 
 */
export function extractValue(value: string, viewModel: any, formatter: string | null | undefined,dataContextName?:string) {
    let valueToSet = executeFunc(value, viewModel,dataContextName);
  
    if (typeof valueToSet !== "string") {
      valueToSet = JSON.stringify(valueToSet, null, 2);
    }
  
    if (formatter) {
      valueToSet = formatFunc(valueToSet, formatter);
    }
    return valueToSet;
  }