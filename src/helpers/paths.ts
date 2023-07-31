import * as vscode from 'vscode';

export function getProjectRootPath(): string {
//get vsCode workspace root path
    if(vscode.workspace.workspaceFolders){
        let rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
        console.log(rootPath);
    }
    return "";
}

