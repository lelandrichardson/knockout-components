(function(){

    var keyCode = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
    };

    function Autocomplete(spec) {

        var self = this;

        self.query = spec.value;
        self.placeholder = spec.placeholder;

        self.items = ko.observableArray();

        self.isMenuVisible = ko.observable(false);

        self.menuPosition = ko.observable();




        var searchTimeout;
        self.query.subscribe(function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(self.search, 200);
        });

        var searchXhr;
        self.search = function () {
            if (searchXhr && searchXhr.readyState != 4) {
                searchXhr.abort();
            }
            if (!self.query()) {
                self.items([]);
                self.isMenuVisible(false);
            }

            return searchXhr = GET({
                url: "/search/suggest",
                data: {q: self.query()}
            }).done(function (data) {
                    self.items($.map(data, mapResultItem));
                    self.isMenuVisible(data.length>0);
                    if (data.length > 0) {
                        self.hoverItem(self.items()[0],true);
                    }
                }).fail(function() {
                    self.items([]);
                    self.isMenuVisible(false);
                });

        };


    }

    ko.utils.extend(Autocomplete.prototype, {
        // move selected item up by one
        moveUp: function(){

        },

        // move selected item down by one
        moveDown: function(){

        },

        // get the index of the current hovered item
        hoveredIndex: function(){

        },

        // close the menu (hide it)
        closeMenu: function(){

        },

        // apply a certain hoverstate to a specific item in the list
        hoverItem: function(item, hoverstate){

        },

        // select the item (navigate to the list)
        selectItem: function(item){

        }

    });



    ko.components['autocomplete'] = {

        template:'#tmpl_autocomplete',

        attributes: [
            'placeholder',
            'value',
            'url',
            'mapResultItem'
        ],


        ctor: Autocomplete
    };

}());