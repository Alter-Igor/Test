

export interface IFormBuilder {
    formData: IFormBuilderData;
}

export interface IFormBuilderData {
    [key: string]: string | undefined | null;
}