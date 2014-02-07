/* global $: false */
/* global ko: false */

(function () {
    "use strict";
    
    /*
    Notes:
    - the data-bind attribute of the template should be used/passed to the wrapper element
    - a <content> element inside of the template is used to place the "inner" HTML of the
      component
    - binding context passed
    - perhaps handle templates loaded from HTML?
     */
    
    
    // potential API
    
    ko.components["x-abc"] = {
        template: '#templateId', // the template ID or actual HTML template (string)...
        tag: 'div', // optional, the tag of the wrapper div
        
        // in this case attributes is an object dictionary of all the attributes on the element...
        // ie, <abc prop="propValue" data-prop="dataPropValue"> results in attributes = {prop: "propValue" }, and data = { prop: "dataPropValue" }
        ctor: function (rootElement, attributes, data, bindingContext) {
    
        },
        update: function () {
    
        }
    };
    
    
    ko.tags = {
        "abc": {
            template: '#ko-tag-abc'
        }
    };
    
    ko.bindingProvider.instance.preprocessNode = function (node) {
        if (node.nodeType !== 1) {
            return;
        }
        
        var name = node.tagName.toLowerCase(),
            tag = ko.tags[name];
    
        if (!tag) {
            return;
        }
        
        if (tag.template) {
    
            var $node = $(node),
                $wrapper = $("<div>").html($(tag.template).html());
    
            $wrapper
                .find("content")
                .replaceWith($node.html());
    
            $node
                .replaceWith($wrapper.html());
    
        }
    };
    
    ko.applyBindings({
        label: ko.observable("this is inside the content"),
        label2: ko.observable("this is in the template"),
        sub: {
            sublabel: ko.observable("this is in a sub-observable")
        }
    });
}());