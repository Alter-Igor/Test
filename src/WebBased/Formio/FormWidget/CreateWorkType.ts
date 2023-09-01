

export function createWorkType(workItem: string, aspectData:string,keyDates:string,participants:string,formBuilder: any) {
    
    
    let request : any= {};

    if(workItem){
        request["workItem"] = eval(workItem);
    }

    if(aspectData){
        request["aspectData"] =eval(aspectData);
    }

    if(keyDates){
        request["keyDates"] =eval(keyDates);
    }

    if(participants){
        request["participants"] =eval(participants);
    }

    request.aspectData = request.aspectData || {};
    request.aspectData["FormBuilder"] = formBuilder;


    // Use fetch API instead of $ajax for a more modern approach. 
    // This example assumes a JSON response and POST request type. 
    // Adjust as necessary.
    fetch("/api/v1/public/workItem", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    })
        .then(response => response.json())
        .then(data => {
            return data.workItem;
        })
};
