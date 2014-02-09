
var getElementsByClassName = (function(document){
    if(document.getElementsByClassName){
        return function(className, context){
            return context.getElementsByClassName(className);
        }
    }
    return function(className, context){
        var nodes = context.getElementsByTagName('*'),
            idx = nodes.length,
            hasClass = new RegExp('\\b' + className + '\\b'),
            res = [];
        while(--idx) {
            if (!!nodes[idx].className && hasClass.test(nodes[idx].className)) {
                res.push(nodes[idx]);
            }
        }
    };
}(document));

var getElementsByTagName = function(tagName, context){
    return context.getElementsByTagName(tagName);
};