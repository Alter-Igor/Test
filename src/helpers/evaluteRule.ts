import { l, inf, err, lh1 } from "../Common/Log";

export function evaluteRule(rule: string, dataContext: any, dataContextName?: string): boolean {
  

  try {
    const returnValue: any = executeFunc(rule, dataContext, dataContextName);
    if (typeof returnValue === 'boolean') {
      return returnValue;
    } else {
      l(err((`Rule [${rule}] did not return a boolean value. It returned: ${returnValue}`)));
      return false; // Default value if the rule doesn't return a boolean
    }
  } catch (e) {
    console.log(`Error evaluating rule [${rule}] with data context`, e);
    return false; // Default value in case of an error
  }
}

export function executeFunc(expression: string | undefined | null, dataContext: any, dataContextName?: string) {
  // Create a new function based on the formatter
  l(inf(`evaluteRule(${expression})`), dataContext);

  if (expression === "") {
    return "";
  }

  if (!expression) {
    return undefined;
  }


  let dataContextNameToUse = 'dataContext';

  //replace the dataContextName with the dataContextNameToUse
  // Replace the dataContextName with the dataContextNameToUse
  if (dataContextName) {
    // Escape special characters in the string for use in regular expressions
    const escapedDataContextName = dataContextName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const regex = new RegExp(escapedDataContextName, 'g');
    expression = expression.replace(regex, dataContextNameToUse);
  }

  checkAndLogUndefined(dataContext, expression, dataContextNameToUse);

  let dynamicFunc: Function

  try {
    dynamicFunc = new Function(`${dataContextNameToUse}`, `return (${expression});`);

  }
  catch (e) {
    let errMessage = `Error creating function for expression [${expression}]`;
    l(err(errMessage), e);
    return errMessage;
  }


  l(inf(`evaluteRule(${expression}) - dynamicFunc: `), dynamicFunc);

  try {
    const returnValue: any = dynamicFunc(dataContext);
    return returnValue;
  } catch (e) {
    console.log(`Error evaluating rule [${expression}] with data context`, e);
    return `${e}`; // Default value in case of an error
  }
}



export function checkAndLogUndefined(obj: any, rule: string, dataContextName: string) {
  const props = rule.split('.');
  let current: any = {};
  current[dataContextName] = obj;

  for (let i = 0; i < props.length; i++) {
    if (current[props[i]] === undefined) {
      l(err(`Error while evaluating a rule ${rule}! The property ${dataContextName}.${props.slice(0, i + 1).join('.')} is undefined.`));
      l(err(`Check the configuration of the rule ${rule}!`));
      return undefined;
    }
    current = current[props[i]];
  }

  return current;
}
