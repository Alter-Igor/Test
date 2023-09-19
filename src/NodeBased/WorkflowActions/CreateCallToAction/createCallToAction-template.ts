import { ICallToAction } from "../../../Interfaces/Workflows/ICallToAction";

let cta : ICallToAction = {
    title: undefined,
    styles: undefined,
    contextType: undefined,
    contextIdVariable: undefined,
    command: undefined,
    commandConfig: undefined,
    icon: undefined,
    css: undefined
};


cta.title=sharedo.buildString("$model.Configuration.title;");
// $ifNotNull.Configuration.styles
cta.styles=sharedo.buildString("$model.Configuration.styles;");
// $endif   
cta.contextType = "$model.Configuration.contextType";
// $ifNotNull.Configuration.contextIdVariable
    cta.contextIdVariable = "$model.Configuration.contextIdVariable";
// $endif
cta.command = "$model.Configuration.command";
// $ifNotNull.Configuration.commandConfig
cta.commandConfig = "$model.Configuration.commandConfig";
// $endif
// $ifNull.Configuration.commandConfig
cta.commandConfig = "{}";
// $endif
// $ifNotNull.Configuration.icon
cta.icon = "$model.Configuration.icon";
// $endif;    
// $ifNotNull.Configuration.css
cta.css = "$model.Configuration.css";
// $endif;
// $ifNotNull.Configuration.outputVariable
ctx["$model.Configuration.outputVariable"] = cta;
// $endif;

//log 
log.Information('*** BuildCallToAction:');
log.Information(JSON.stringify(cta));
log.Information('************************************');

