ko.components['click-to-edit'] = {

    template:
        '<a data-bind="text: value, visible: !editing(), click: click"></a>' +
        '<input type="text" data-bind="value: value, visible: editing, hasfocus: editing" />',

    attributes: ['value'],

    // passBindingsToRoot: true, // not sure how we would do this yet...

    ctor: function (spec, viewModel, bindingContext) {

        this.value = spec.value;
        this.editing = ko.observable(false);


        this.click = function(){
            this.editing(!this.editing());
        }.bind(this);
    }
};