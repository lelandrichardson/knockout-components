ko.components['placekitten'] = {

    template:
        '<img data-bind="attr: { src: src, title: title}" />',

    attributes:
        ['width', 'height', 'title'],

    defaults: {
        width: 100,
        height: 100,
        title: 'kittenz!'
    },

    ctor: function (attributes, viewModel, bindingContext) {

            this.src = ko.computed(function(){
                return 'http://placekitten.com/'
                    + ko.unwrap(attributes.width) + '/'
                    + ko.unwrap(attributes.height);
            });
            this.title = attributes.title;
        }
};