import { IFieldPlacement } from "./ExternalMatterSearchInterface";

export const DEFAULT_SEARCH_FIELDS_CONFIG : IFieldPlacement =
{
    "container": {},
    "icon": [
        {
            "icon": "fa-search fa-2x text-primary"
        }
    ],
    "style": [
        {
            "rule": "dataContext.data.data.status.toLowerCase()==='closed'",
            "style": {
                "color": "lightgrey"
            }
        }
    ],
    "rows": [
        {
            "fields": [
                {
                    "field": "${dataContext.data.data.matterCode||dataContext.data.data.code}",
                    "style": "font-weight:bold",
                    "icon": [
                        {
                            "rule": "dataContext.data.data.status.toLowerCase()==='open'",
                            "icon": "fa-folder-open text-success",
                            "position": "before"
                        },
                        {
                            "rule": "dataContext.data.data.status.toLowerCase()==='closed'",
                            "icon": "fa-folder text-danger",
                            "position": "before"
                        }
                    ],
                    "width": null
                },
                {
                    "style": {
                        "color": "blue"
                    },
                    "field": "${dataContext.data.title}"
                },
                {
                    "field": "${dataContext.data.data.status}",
                    "formatter": "value.toUpperCase()",
                    "label": "Status",
                    "position": "right",
                    "width": null
                }
            ]
        },
        {
            "fields": [
                {
                    "field": ""
                },
                {
                    "label": "Client",
                    "field": "${dataContext.data.data.client}",
                    "width": null
                },
                {
                    "field": ""
                }
            ]
        }
    ]
}