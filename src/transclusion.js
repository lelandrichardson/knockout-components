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
    while(--idx){
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
ko_components.replaceContentNodeWithTranscludedNodes = function(contentNode, componentNode){
    var select = contentNode.getAttribute("select"),
        toMove,
        parent = contentNode.parentNode;

    if(select === null || select == "*"){
        // transclude everything
        toMove = [componentNode];
    } else if (select[0] == '.') {
        // get by class
        toMove = getElementsByClassName(select.substring(1), componentNode);
    } else {
        // get by tag name
        toMove = getElementsByTagName(select, componentNode);
    }

    var idx = toMove.length;

    while(--idx){
        parent.insertBefore(toMove[idx], contentNode);
    }

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

    for (i = 0; i < length; i++) {
        ko_components.replaceContentNodeWithTranscludedNodes(contentNodes[i], componentNode);
    }
};

