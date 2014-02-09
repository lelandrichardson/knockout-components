

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

ko_components.performTransclusion = function(component, componentNode, templateNodes){

    var contentNodes = getContentNodes(templateNodes);

    var length = contentNodes.length, i;

    for (i = 0; i < length; i++) {
        ko_components.replaceContentNodeWithTranscludedNodes(contentNodes[i], componentNode);
    }
};


ko_components.replaceContentNodeWithTranscludedNodes = function(contentNode, componentNode){
    var select = contentNode.getAttribute("select"),
        toMove,
        parent = componentNode.parentNode;

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