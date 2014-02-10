ko.components['transclusion-test'] = {

    template:
        '<div style="border: 1px solid #000;">div1<br/>' +
            '<content select=".one" ></content>' +
        '</div>' +
        '<div style="border: 1px solid #000;">div2<br/>' +
            '<content select=".two" ></content>' +
        '</div>' +

        '<div style="border: 1px solid #000;">div all<br/>' +
            '<content select="*" ></content>' +
        '</div>',

    ctor: function (spec) {

    }
};