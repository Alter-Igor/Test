

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
    const dynamicFunc = new Function('value', `return (${formatter});`);
    // Invoke the function with the given value
    let returnValue: any;
    try{
    let returnValue = dynamicFunc(value);
    }
    catch(e)
    {
        console.log(`Error formatting value [${value}] with formatter [${formatter}]`, e);
        returnValue = "Error formatting value - see console"
    }
    return returnValue;


}