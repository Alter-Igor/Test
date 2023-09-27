import { IFieldPlacement } from "./ExternalMatterSearchInterface";

export const DEFAULT_SEARCH_FIELDS_CONFIG : IFieldPlacement =
{
    container:{
    },
    icon:[
        {
            icon: "fa-search fa-2x text-primary",
        }],
        style:[
            {
                rule: "status.toLowerCase()==='closed'",
                style: {
                    color:"lightgrey"
                }
            }
        ],
    rows: [
        {
            fields: [
                {
                    field: "matterCode",
                    style:  "font-weight:bold",
                    icon: [
                        {
                            rule: "status.toLowerCase()==='open'",
                            icon: "fa-folder-open text-success",
                            position: "before"
                        },
                        {
                            rule: "status.toLowerCase()==='closed'",
                            icon: "fa-folder text-danger",
                            position: "before"
                        }
                    ],
                    width: null
                },
                {
                     
                            field: "status",
                            formatter: "value.toUpperCase()",
                            label: "Status",
                            position: "right",
                            width: null,
                },
            ]
        },
        {
            fields: [
                {
                    label: "Client",
                    field: "client",
                    width: null
                }
            ]
        }
    ]
}