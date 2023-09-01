

export function addDefaultFormIOStyleSheetsToShadow(shadow: ShadowRoot) {
    let link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css";
    shadow.appendChild(link);

    link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "https://cdn.form.io/formiojs/formio.full.min.css";
    shadow.appendChild(link);


     //<link rel="stylesheet" type="text/css" href="https://cdn.form.io/formiojs/formio.full.min.css">
     //<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css">

     //<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">

     link = document.createElement('link');
     link.rel = "stylesheet";
     link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css";
     shadow.appendChild(link);
     

}



export function addDefaultFormIOStyleSheetsToIframe(iframe: HTMLIFrameElement) {
    let link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css";
    iframe.contentDocument!.head.appendChild(link);

    link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "https://cdn.form.io/formiojs/formio.full.min.css";
    iframe.contentDocument!.head.appendChild(link);


    link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css";
    iframe.contentDocument!.head.appendChild(link);
     

}




export function checkLowdashCompatability() {
    //lowdash 4 and above has changed contains to includes
    //here we are just aliasing it back to contains for backwards compatibility
    if(!_.contains)
    {
       console.log("!_.contains")
    }

    if(!_.findWhere)
    {
        console.log("!_.findWhere")
    }
}

if(!_.contains)
{
    _.contains = _.includes;
}

if(!_.findWhere)
{
    _.findWhere = _.find;
}