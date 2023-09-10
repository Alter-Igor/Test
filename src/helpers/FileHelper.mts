import * as fs from 'fs/promises';


export async function getStringContentsFromfileUri(filePath: string): Promise<string> {
    //write code to read the file contents

    return fs.readFile(filePath, 'utf8').then((data) => {
        return removeUTF8BOM(data);
    }).catch((err) => {
        console.log(err);
        return Promise.reject(err);
    });

}


export function removeUTF8BOM(content: string) {
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.substring(1);
    }
    return content;
}
