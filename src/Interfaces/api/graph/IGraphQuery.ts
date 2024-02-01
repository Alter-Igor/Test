

export const IGraphQueryDfaults: IGraphQuery = {
    "fields": [
        {
            "path": "workitem.title"
        },
        {
            "path": "workitem.id"
        }
    ],
    "debug": false,
    "allowParallelExecution": true,
    "executeCalculatedFields": true,
    "responseType": "flat",
    "entityType":undefined,
    "entityId": ""
}

export interface IGraphQuery {
  fields: IGraphQueryField[];
  debug: boolean;
  allowParallelExecution: boolean;
  executeCalculatedFields: boolean;
  responseType: string;
  entityType: string | undefined;
  entityId: string;
}

export interface IGraphQueryField {
  path: string;
}