
/**
 * @namespace ko.components
 */
ko.components = {};

/**
 * @module ko_components
 * @main ko_components
 */
var ko_components = {};


// shortcut references
var
    $$ = function(id){return document.getElementById(id)},
    extend = ko.utils.extend;


// private constants
var
    /**
     * @constant {string}
     */
    PRE_TEMPLATE_HANDLER = "__ko_components_template_handler",
    /**
     * @constant {string}
     */
    ATTRIBUTE_BINDING_STRING = "attribute_bindings";



// for yuidoc / documentation purposes

/**
 * @class Component
 * @property {Array<string>} [attributes]
 * @property {Object} [defaults]
 */

/**
 * @property {string} template
 * @type string
 * @for Component
 */

/**
 * @property ctor
 * @constructor
 * @type function
 * @for Component
 * @param {Object} attributes
 * @param {Object} viewModel
 * @param {Object} bindingContext
 */