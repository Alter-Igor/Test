// namespace("Widgets");

// /**
//  * Constructor for your widget - remember the name of this JS type must match the ID of the widget in it's .widget.json manifest
//  * @param {} element            The Html DOM element to which this widget will bind
//  * @param {} configuration      The configuration passed in from the designer/config
//  * @param {} baseModel          The base widget model (contains unique id etc)
//  * @returns {} 
//  */
// Widgets.ConvertListBooleanToGraphics = function(element, configuration, baseModel)
// {
//     var self = this;
//     var defaults =
//     {
//         // Model items from the designer widget
//         todoMessage: null
//     };
//     var options = $.extend(true, {}, defaults, configuration);

//     // Setup the local model
//     self.model =
//     {
//         // Remember, only things that might change need to be observable!
//         todoMessage: options.todoMessage
//     };
// };

// /**
//  * Called by the UI framework when this widget is being unloaded - clean up
//  * any subscriptions or references here that would keep this instance alive
//  */
// Widgets.ConvertListBooleanToGraphics.prototype.onDestroy = function()
// {
//     var self = this;
// };

// /**
//  * Called by the UI framework after initial creation and binding to load data
//  * into it's model
//  */
// Widgets.ConvertListBooleanToGraphics.prototype.loadAndBind = function()
// {
//     var self = this;
//     console.log("running");
    
//     setInterval(()=>{
//     let trueVals = this.getAllTrueValues();
//     let falseVals = this.getAllFalseValues();

//         trueVals.each(function() {
//             this.innerHTML = `<div class="fa fa-check"></div>`;
//             this.style.color = "green";
//             if(this.parentNode.previousElementSibling.children[0].innerHTML=='Significant Matter')
//             {
//                 this.style.color = "red";
//             }
//         });
        
//         falseVals.each(function() {
//             this.innerHTML = `<div class="fa fa-times"></div>`;
//             this.style.color = "red";
//         });
        
//         },1000);

       
    
        
        
// };


// Widgets.ConvertListBooleanToGraphics.prototype.getAllTrueValues = function() {
//         return $("span:contains('true')",$(".core-listview-card"))
//     }

//     Widgets.ConvertListBooleanToGraphics.prototype.getAllFalseValues = function() {
//         return $("span:contains('false')",$(".core-listview-card"))
//     }