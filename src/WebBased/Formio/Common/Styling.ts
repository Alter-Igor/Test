import * as _ from 'lodash';

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
