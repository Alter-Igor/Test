import { IFieldPlacement } from "./ExternalMatterSearchInterface";

export const DEFAULT_SELECTED_FIELDS_CONFIG: IFieldPlacement =
{
    container: {
        style: [
            {
                rule: "data.secure",
                style: {

                    "box-shadow": "1px 1px 62px #cb8383"
                }
            }
        ],
    },
    icon: [
        {
            rule: "data.secure",
            icon: "fa-shield text-warning fa-2x",
            position: "before",
        }
    ],


    rows: [
        {
            fields: [
                {
                    field: "data.matterCode",
                    style: "font-weight:bold",
                    icon: [
                        {
                            rule: "data.status.toLowerCase()==='open'",
                            icon: "fa-folder-open text-success",
                            position: "before"
                        },
                        {
                            rule: "data.status.toLowerCase()==='closed'",
                            icon: "fa-folder text-danger",
                            position: "before"
                        }
                    ],
                    width: null
                },
                {

                    field: "data.status",
                    formatter: "value.toUpperCase()",
                    label: "Status",
                    position: "right",
                    width: null,
                    style:{
                        "font-size":"0.8em",
                        "font-weight":"bold"
                    }



                },
            ]
        },
        {
            fields: [
                {
                    field: "data.shortName",
                    width: null
                }
            ]
        },
        {
            fields: [
                {
                    label: "Client",
                    field: "data.client.name",
                    width: null
                }
            ]
        }
    ]
}