import { IFieldPlacement } from "../BaseClasses/Template/Interfaces";

export const DEFAULT_SELECTED_FIELDS_CONFIG: IFieldPlacement =
{
    "container": {
        "style": [
            {
                "rule": "dataContext.data.secure",
                "style": {
                    "box-shadow": "1px 1px 62px #cb8383"
                }
            },
            {
                "rule": "!dataContext.data.secure",
                "style": {
                    "box-shadow": "1px 1px 10px #a4a3a3"
                }
            }
        ]
    },
    "icon": [
        {
            "rule": "dataContext.data.secure",
            "icon": "fa-shield text-warning fa-2x",
            "position": "before"
        }
    ],
    "rows": [
        {
            "fields": [
                {
                    "field": "${dataContext.data.matterCode}",
                    "style": "font-weight:bold",
                    "icon": [
                        {
                            "rule": "dataContext.data.status.toLowerCase()==='open'",
                            "icon": "fa-folder-open text-success",
                            "position": "before"
                        },
                        {
                            "rule": "dataContext.data.status.toLowerCase()==='closed'",
                            "icon": "fa-folder text-danger",
                            "position": "before"
                        }
                    ],
                    "width": null
                },
                {
                    "field": "${dataContext.data.shortName}",
                    "width": null,
                    "style": {
                        "font-weight": "bold",
                        "color": "red",
                        "font-size": "larger"
                    }
                },
                {
                    "field": "${dataContext.data.status}",
                    "formatter": "value.toUpperCase()",
                    "label": "Status",
                    "position": "right",
                    "width": null,
                    "style": "font-weight:bold"
                }
               
            ]
        },
        {
            "fields": [
                {
                    "field": [
                        {
                            "rule": "dataContext.data.secure",
                            "field": "Secured!"
                        },
                        {
                            "rule": "!dataContext.data.secure",
                            "field": "Not Secured"
                        }
                    ],
                    "style": [
                       {
                           "style": {
                                "margin-top":"-10px",
                                "font-size":"x-small"
                            }
                       },
                        {
                            "rule": "!dataContext.data.secure",
                            "style": {
                                "color": "green",
                                "font-weight": "bold"
                            }
                        },
                        {
                            "rule": "dataContext.data.secure",
                            "style": {
                                "color": "red",
                                "font-weight": "bold"
                            }
                        }
                    ]
                },
                {
                    "style": {
                        "font-size": "smaller",
                        "margin-top": "-10px"
                    },
                    "field": "${dataContext.data.practiceGroup}"
                },
                {
                    "field": ""
                }
            ]
        },
        {
            "fields": [
                {
                    "label": "Client",
                    "field": "${dataContext.data.client.name}",
                    "width": null
                },
                {
                    "field": "${dataContext.data.client.code}",
                    "width": null,
                    "style": {}
                }
            ]
        },
        {
            "fields": [
                {
                    "label": "Partner",
                    "field": "${dataContext.data.partner.name}",
                    "width": null
                },
                {
                    "field": "${dataContext.data.partner.code}",
                    "width": null,
                    "style": {}
                }
            ]
        },
        {
            "fields": [
                {
                    "label": "Location",
                    "field": "${dataContext.data.location.country}",
                    "width": null
                },
                {
                    "label": "Office",
                    "field": "${dataContext.data.location.office}",
                    "width": null,
                    "style": {}
                },
                {
                    "label": "Region",
                    "field": "${dataContext.data.location.region}",
                    "width": null,
                    "style": {}
                }
            ]
        }
    ]
}