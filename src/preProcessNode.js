ko_components.preprocessNode = function (node){
    if (node.nodeType !== 1) {
        return;
    }

    var name = node.tagName.toLowerCase(),
        component = ko.components[name];

    if (!component) {
        // if ko.components doesn't have a tag defined, there is nothing to do.
        return;
    }

    if (!component.template) {
        // NOTE: it's possible we want this in the case where we simply want to change the binding context
        // to the new model with some params passed in from the current one?
        return;
    }


    var tmplNodes = ko_components.getTemplateDomNodes(component.template),
        preTemplateNode = preTemplateCommentNode(name),
        parent = node.parentNode;


    ko_components.performTransclusion(component, node, tmplNodes);

    // store the original binding string
    ko_components.domData.set(
        preTemplateNode,
        ATTRIBUTE_BINDING_STRING,
        createAttributeBindingsString(
            component.attributes || [],
            component.defaults || {},
            node
        )
    );

    parent.insertBefore(preTemplateNode, node);

    // tmplNodes.length decreases with each iteration since it is getting removed from list
    while(tmplNodes.length > 0){
        parent.insertBefore(tmplNodes[0], node);
    }

    parent.replaceChild(postTemplateCommentNode(), node);


    // TODO: if tag.replaceWith = 'div', turn node into a div...?

    // TODO: check data-bind attribute?

};




function preTemplateCommentNode(name){
    return document.createComment("ko " + PRE_TEMPLATE_HANDLER + ":'" + name + "'");
}

function postTemplateCommentNode(){
    return document.createComment("/ko");
}

function createAttributeBindingsString(attrs, defaults, node){
    var bindingString=[],
        attr,
        attrValue,
        i;

    for(i=0;i<attrs.length;i++){
        attr = attrs[i];
        attrValue = node.getAttribute("data-" + attr);

        // TODO: handle attr's which have unsafe characters (like hyphens)

        // if it is null, the binding wasn't set...
        // we want to write it as the string literal 'null' *unless* there is a default
        // value present, in which case we will leave it out of the binding string entirely.
        if(attrValue !== null || !defaults.hasOwnProperty(attr)){
            bindingString.push(attr + ":" + (attrValue === null ? 'null' : attrValue));
        }
    }
    return bindingString.join(', ');
}

ko_components.getTemplateDomNodes = function(template){
    // TODO: for performance, save the .childNodes of the tag template...
    // TODO: handle an observable? could be useful?
    if(template === undefined){
        throw 'template not provided';
    }
    if(typeof template !== 'string'){
        throw 'expecting template to be a string';
    }

    if(template[0] === '#'){
        // it is referencing an ID. grab it, and return html inside.
        var tmplNode = $$(template.substring(1));
        if('content' in tmplNode){
            // tmplNode is a <template> tag
            return tmplNode.content.cloneNode(true).childNodes; // TODO: i don't think this is done correctly. look into fixing.
        } else {
            return tmplNode.cloneNode(true).childNodes;
        }
    }

    return ko_components.getDomNodesFromText(template);
};

ko_components.getDomNodesFromText = function(text){
    var div = document.createElement('div');
    ko.utils.setHtml(div,text);
    //div.innerHTML = text;
    // NOTE: won't work with virtual elements very well...
    return div.childNodes;
};

ko.bindingProvider.instance.preprocessNode = ko_components.preprocessNode;