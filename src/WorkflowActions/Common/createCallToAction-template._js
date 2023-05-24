let cta = actions.sharedo
    .BuildCallToAction()
    .WithDisplay(sharedo.buildString("$model.Configuration.title;"))
// $ifNotNull.Configuration.styles
    .WithStyles("$model.Configuration.styles")
// $endif
    .Build();

cta.CallToActionContextType = "$model.Configuration.contextType";

// $ifNotNull.Configuration.contextIdVariable
var contextId = ctx["$model.Configuration.contextIdVariable"];
if (contextId)
{
    cta.CallToActionContextId = Guid.Parse(contextId);
}
// $endif

cta.CallToActionCommand = "$model.Configuration.command";

// $ifNotNull.Configuration.commandConfig
cta.CallToActionCommandConfiguration = "$model.Configuration.commandConfig";
// $endif

// $ifNull.Configuration.commandConfig
cta.CallToActionCommandConfiguration = "{}";
// $endif

// $ifNotNull.Configuration.icon
cta.CallToActionIcon = "$model.Configuration.icon";
// $endif;    

// $ifNotNull.Configuration.css
cta.CallToActionCss = "$model.Configuration.css";
// $endif;

// $ifNotNull.Configuration.outputVariable
ctx["$model.Configuration.outputVariable"] = cta;
// $endif;

