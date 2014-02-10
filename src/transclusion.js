/**
 * Given an array-like structure of DOM nodes, returns an array of
 * every <content> node in the list, or any element of the list's subtree.
 * @param nodeList {Array<HTMLElement>}
 * @returns {Array}
 */
function getContentNodes(nodeList){
    var res = [],
        idx = nodeList.length,
        found;
    while(--idx>=0){
        found = getElementsByTagName('content', nodeList[idx]);
        if(found.length){
            res.push.apply(res, found);
        }
    }
    return res;
}

/**
 * This is where the actual transclusino takes place. Given a contentNode
 * @method replaceContentNodeWithTranscludedNodes
 * @for ko_components
 * @param contentNode {HTMLElement} - The content node which will be replaced/removed
 * @param componentNode {HTMLElement} - The
 */
ko_components.replaceContentNodeWithTranscludedNodes = function(select, contentNode, componentNode){
    var toMove,
        parent = contentNode.parentNode;

    if(select === "*"){
        // transclude everything
        toMove = componentNode.childNodes;
    } else if (select[0] == '.') {
        // get by class
        toMove = getElementsByClassName(select.substring(1), componentNode);
    } else {
        // get by tag name
        toMove = getElementsByTagName(select, componentNode);
    }

    var idx = toMove.length;
    if(idx>0){
        // if there are content nodes we are inserting, we are going to wrap them with a knockout
        // comment which changes the binding context to the parent scope, so that it is less
        // confusing to the user what is going on.
        parent.insertBefore(document.createComment("ko with: $parent"), contentNode);
        while(--idx>=0){
            parent.insertBefore(toMove[idx], contentNode);
        }
        parent.insertBefore(document.createComment("/ko"), contentNode);
    }

    // remove the content node from the DOM entirely
    parent.removeChild(contentNode);
};


/**
 *
 * @param component {Component}
 * @param componentNode {HTMLElement}
 * @param templateNodes {Array<HTMLElement>}
 */
ko_components.performTransclusion = function(component, componentNode, templateNodes){

    var contentNodes = getContentNodes(templateNodes);

    var length = contentNodes.length, i;

    var transcludeAll;
    for (i = 0; i < length; i++) {
        var contentNode = contentNodes[i],
            select = contentNode.getAttribute("select");

        if (select === null || select === "*"){
            // this can only happen once, and we need to do it last... so we cache until after loop
            transcludeAll = contentNode;
        } else {
            ko_components.replaceContentNodeWithTranscludedNodes(select, contentNode, componentNode);
        }
    }
    if (transcludeAll){
        ko_components.replaceContentNodeWithTranscludedNodes("*", transcludeAll, componentNode);
    }
};

