

/**
 * * Format a value using a formatter string
 * * Examples: 
 * * 1. value
 * * 2. value.toUpperCase()
 * * 3. value ? value.toUpperCase() : ""
 * * 4. value ? value.toUpperCase() : "No Value"
 * * 5. new Date(value).toLocaleDateString()
 * * 6. value ? new Date(value).toLocaleDateString() : ""
 * @param value 
 * @param formatter 
 * @returns 
 */
export function formatValue(value: any, formatter: string): any {
    // Create a new function based on the formatter
    let dynamicFunc : Function
    let returnValue: any;
    try{
         dynamicFunc = new Function('value', `return (${formatter});`);
    // Invoke the function with the given value
     returnValue = dynamicFunc(value);
    }
    catch(e)
    {
        returnValue = `Error formatting value ${value} with formatter ${formatter} - ${e}`;
    }
    return returnValue;
}

export const formatFunc = formatValue; // For backwards compatibility