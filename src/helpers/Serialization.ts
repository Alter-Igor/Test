

/**
 * Serializes an object to a base64 string.
 * @param obj The object to serialize.
 * @returns The serialized object.
 */
export function serializeObjectToBase64(obj: any): string {
    return btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
}

/**
 * Deserializes an object from a base64 string.
 * @param base64 
 * @returns 
 */
export function deserializeObjectFromBase64<T>(base64: string): T {
    return JSON.parse(decodeURIComponent(escape(window.atob(base64)))) as T;
}