
// initialize the ko.components namespace
ko.components = {};

// ko_components namespgrunt ace...
var ko_components = {};


var
    // shortcut references
    $$ = function(id){return document.getElementById(id)},
    extend = ko.utils.extend;


var
    // private constants
    PRE_TEMPLATE_HANDLER = "__ko_components_template_handler",
    ATTRIBUTE_BINDING_STRING = "attribute_bindings";
