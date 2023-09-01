

export function camelize(str: string) {
  if (!str) return str;

  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}


export function cleanJSON(rawData: string) {

  // Remove surrounding <p> tags, newline representations, and &nbsp;
  let cleanedString = rawData.replace(/^<p>|<\/p>|\/n|&nbsp;/g, '').trim();

  // Given that JSON keys should be wrapped in double quotes, but values could already contain them,
  // we'll use a regex to match the pattern of a key followed by a colon.
  let validJsonString = cleanedString.replace(/(?<!")(\b\w+\b)(?=:)/g, '"$1"');

  // The above will handle the JSON keys. Let's assume the values are already correctly formatted.
  // If they aren't, this can get a lot trickier.

  try {
    let jsonObject = JSON.parse(validJsonString);
    console.log(jsonObject);
    return JSON.stringify(jsonObject, null, 2);
  } catch (error:any) {
    console.error("Error parsing JSON:", error.message);
    return error.message;
  }

}