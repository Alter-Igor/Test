

import { executeGet, executePost, executePut } from "../../Common/api/api";


let hiddenElement = document.querySelector(".navbar-brand");


//<div id="tsparticles"></div>
// let div = document.createElement("div");
// div.id = "tsparticles";
// document.body.appendChild(div);
// loadStarsPreset(tsParticles,true,"tsparticles");

document.addEventListener("DOMContentLoaded", () => {


getUserOrganisationSetting();
});

function getUserOrganisationSetting() {

    //get body and make it blured
   


    if (!$ui.pageContext.user) {
        //wait for the user to be loaded
        let userLoaded = setTimeout(() => {
            console.log("retry...")
            getUserOrganisationSetting();
        }, 1);
        return;
    }

    let currentUserOdsId = $ui.pageContext.user.userid();
    console.log("currentUserOdsId", currentUserOdsId);

    executeGet<any>(`/api/ods/teams/person/${currentUserOdsId}/primaryTeam`).then(async (r) => {
        console.log(`/api/ods/teams/person/${currentUserOdsId}/primaryTeam`, r);

        let primaryTeam = r.primaryTeam;
        let organisationId = primaryTeam.organisationId;
        console.log("organisationId", organisationId);

        let parentTeamId = primaryTeam.parentTeamId;
        console.log("parentTeamId", parentTeamId);

        let teamId = primaryTeam.id;
        console.log("teamId", teamId);

        let payLoad = {
            "search": {
                "page": {
                    "page": 1,
                    "rowsPerPage": 20
                },
                "sort": {
                    "direction": "ascending",
                    "orderBy": "title"
                },

                "types": {
                    "includeTypesDerivedFrom": [
                        "immersion-organization"
                    ]
                },
                "roles": [
                    {
                        "role": "immersion-related-to",
                        "subjectIdsHoldingRole": [teamId]
                    }
                ]
            },
            "enrich": [
                {
                    "path": "title"
                },
                {
                    "path": "reference"
                },
                {
                    "path": "form-immersion-organisation.organizationThemeSystemName"
                }
            ]
        };


        executePost<any>("/api/v1/public/workItem/findByQuery", payLoad).then(async (findResult) => {

            console.log("/api/v1/public/workItem/findByQuery", findResult);

            if (!findResult || !findResult.results || !findResult.results[0]) {
                console.log("findByQuery: Nothing Found")
               
                return;
            }

            let data = findResult.results[0];
            console.log("findByQuery: data", data);
            if(!data.data){
                console.log("findByQuery: No Data")
               
                return;
            }
            let theme = data.data["form-immersion-organisation.organizationThemeSystemName"]
            console.log("form-immersion-organisation.organizationThemeSystemName", theme)
            if (!theme || theme == "") {
                console.log("No Theme")
               
                return;
            }
            loadLogo(theme);
            await applyOrganisationTheme(theme);
            
            //add class loaded to body
            
        }).finally(() => {
            fadeInLogo();
        })
    }).finally(() => {
        
    }).catch((e) => {
        console.log("Error", e);
        fadeInLogo();
    });
}



function fadeInLogo() {
    hiddenElement!.classList.add("loaded");
}

async function applyOrganisationTheme(themeToSet: string) {
   
    console.log("applyOrganisationTheme()....");
    executeGet<any>(`/api/themes/bySystemName/${themeToSet}`).then((r) => {
        console.log(`/api/themes/bySystemName/${themeToSet}`, r);
        let tSettings = JSON.parse(r.jsonConfig);
        console.log("r.jsonConfig", tSettings);
        tSettings.settings.forEach((s: any) => {
            if (s.type == "css-var") {
                console.log("css-var", s);
                document.documentElement.style.setProperty("--" + s.key, s.value);
            }

            if (s.type == "data-attr") {
                console.log("data-attr", s);
                document.documentElement.setAttribute("data-theme-" + s.key, s.value);
            }
        });

        
        console.log("...Done...")

    })
}
async function loadLogo(themeToSet: string) {
    let logoWidget = $ui.widgets.instances().find((w: any) => w.base.systemName == "Sharedo.Core.Case.Widgets.Logo");
    console.log("Sharedo.Core.Case.Widgets.Logo", logoWidget);
    console.log("portalBrandLogoUrl <-- ", `/themes/${themeToSet}/images/portal-brand-logo`);
    $ui.pageContext.portalBrandLogoUrl(`/themes/${themeToSet}/images/portal-brand-logo`);

    console.log("$ui.widgets.create(Sharedo.Core.Case.Widgets.Logo)");
    $ui.widgets.create("Sharedo.Core.Case.Widgets.Logo", logoWidget.base.id, {
        "defaultLogo": "/theme/images/logo.png"
    },
        {
            "id": logoWidget.base.id,
            "systemName": "Sharedo.Core.Case.Widgets.Logo",
            "canExpandCollapse": true,
            "isExpanded": true,
            "icon": null,
            "title": "Logo",
            "helpText": null
        });
}

