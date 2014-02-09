
function createAttributeBindingEvaluator(bindingsString){
    // note: should we use bindingprovider here?
    var functionBody = "with($context){with($data||{}){return{" + bindingsString + "}}}";
    return new Function("$context", "$element", functionBody);
}

function parseAttributeBindingsString(bindingsString, context, defaults, el){
    try {
        return extend(extend({}, defaults), createAttributeBindingEvaluator(bindingsString)(context, el));
    } catch (ex) {
        ex.message = "(ko-components): Unable to parse attributes bindings.\nBindings value: " + bindingsString + "\nMessage: " + ex.message;
        throw ex;
    }
}


ko_components.preTemplateHandler = {
    init: ko.bindingHandlers.with.init,
    update: function(el, valueAccessor, allBindings, data, context) {

        var component = ko.components[valueAccessor()]; // valueAccessor() should never be an observable.

        if(component === undefined){
            return;
        }

        var bindingString = ko_components.domData.get(el, ATTRIBUTE_BINDING_STRING);

        return ko.bindingHandlers.with.update(
            el,
            function(){
                return new component.ctor(
                    parseAttributeBindingsString(bindingString, context, component.defaults, el),
                    data,
                    context);
            },
            allBindings,
            data,
            context
        );
    }
};

ko.bindingHandlers[PRE_TEMPLATE_HANDLER] = ko_components.preTemplateHandler;
ko.virtualElements.allowedBindings[PRE_TEMPLATE_HANDLER] = true;