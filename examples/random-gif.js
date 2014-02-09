ko.components['random-gif'] = {
    template:'<img data-bind="attr: { src: src}" />',
    ctor: function () {
        this.src = ko.observable('http://thecatapi.com/api/images/get?format=src&type=gif');
    }
};