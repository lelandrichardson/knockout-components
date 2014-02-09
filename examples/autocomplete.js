ko.components['autocomplete'] = {

    template:
        '<div>' +
            '<h1>' +
                '<span data-bind="text: title"></span>' +
                '<a class="pull-right" data-bind="click: toggle, text: expandText"></a>' +
            '</h1>' +
            '<div data-bind="text: content, visible: expanded"></div>' +
        '</div>',

    attributes: ['title', 'content'],

    transclusion: '*',

    ctor: function (spec) {

        this.title = spec.title;
        this.content = spec.content;

        this.expanded = ko.observable(false);

        this.expandText = ko.computed(function(){
            return this.expanded() ? 'Collapse' : 'Expand';
        }, this);

        this.toggle = function(){
            this.expanded(!this.expanded());
        }.bind(this);
    }
};