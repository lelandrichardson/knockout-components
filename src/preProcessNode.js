/* global $: false */
/* global ko: false */

(function () {
    "use strict";
    
    ko_components.preprocessNode = function (node){
        if (node.nodeType !== 1) {
            return;
        }
        
        var name = node.tagName.toLowerCase(),
            tag = ko.components[name];
    
        if (!tag) {
            // if ko.components doesn't have a tag defined, bail.
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
    }
    
    
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
}());