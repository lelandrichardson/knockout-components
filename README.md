knockout-components
===================

---

A components library for Knockout.js (3.0 and above)



## Summary ##


knockout-components is a small library that sits on top of [knockout.js](http://knockoutjs.com) and provides a framework to reuse and encapsulate logic in a semantic fashion.

Inspired from the new [Web Components Spec](http://www.w3.org/TR/components-intro/) and other polyfill libraries like [polymer](http://www.polymer-project.org/), although knockout-components comes packed the power of knockout.js.


    

## API ##


To define a custom component, one must put a component declaration in the `ko.components` namespace, where `ko.components['widget-name']` corresponsed to a `<widget-name>` HTML element being defined.


    ko.components['widget-name'] = {
    
        template: '<div>a custom template string or id name of template in document</div>',
    
        attributes: [/* an array of attributes to pass into constructor */],
    
        defaults: {
            /* default values for attributes */
        },
    
        ctor: function (attributes, viewModel, bindingContext) {
    
            /* construct your widget instance. the template
             * is bound to the value of `this` 
             */
        }
    };

simple example:

    ko.components['placekitten'] = {
    
        template: '<img data-bind="attr: { src: src, width: width, height: height }" />',
    
        attributes: ['width', 'height'],
    
        defaults: {
            width: 100,
            height: 100
        },
    
        ctor: function (attributes, viewModel, bindingContext) {
    
            this.src = ko.computed(function(){
                return 'http://placekitten.com/'
                    + ko.unwrap(attributes.width) + '/'
                    + ko.unwrap(attributes.height);
            });
        }
    };

### Component Definition ###

<table>
<tr>
    <td>Name</td>
    <td>Type</td>
    <td>Default</td>
    <td>Description</td>
<tr>

<tr>
    <td>template</td>
    <td>string</td>
    <td>none</td>
    <td>
    Can either be an HTML string of the actual template, or CSS ID selector pointing to a node in the document that defines the template (ie, '#my-template')
    </td>
</tr>

<tr>
    <td>attributes</td>
    <td>Array&lt;string&gt;</td>
    <td>none</td>
    <td>
    An array of special attributes names which are able to be specified on the component HTML element, and sequentially passed into the constructor function.
    </td>
</tr>

<tr>
    <td>defaults</td>
    <td>Object</td>
    <td>none</td>
    <td>
    A simple object hash of default "attributes" that will be passed into the constructor if they are not explicitly bound in the HTML.
    </td>
</tr>

<tr>
    <td>ctor</td>
    <td>Function</td>
    <td>none</td>
    <td>
    A constructor function to instantiate your widget.  The value of <code>this</code> is bound to the current instance, which will be the current binding scope of your widget template. There are three parameters passed in, which are discussed in more detail below. 
    </td>
</tr>

</table>


 
### Component Cunstructor Function ###

    ko.components['my-component'] = {
        ctor: function (attributes, viewModel, bindingContext) {
            
        }
    };

The `ctor` property of the component definition is the widget's constructor function. It is called once every time the widget is created and the value bound to `this` (or the value the function returns) is what the template is bound to.


    ko.components['random-number'] = {
        template: '<span data-bind="text: value"></span>',
        ctor: function () {
            this.value = Math.random();
        }
    };

The constructor function has three parameters passed into it. In order,

1. The **`attributes`** param:

This is an object with values specified through HTML attributes on the widget element. The attribute values are parsed with regard to the current knockout binding scope, and can be thought of as similar to the `data-bind` attributes that knockout uses.


For example, we can declare a "fancy-name" element as follows:


    ko.components['fancy-name'] = {
        template: '<div data-bind="text: fullName"></span>',
        attributes: ['first', 'last'],
        ctor: function (attributes) {

            this.first = attributes.first;
            this.last = attributes.last;

            this.fullName = ko.computed(function(){
                return [ko.unwrap(this.first), ko.unwrap(this.last)].join(' ');
            }, this);
        }
    };

In this case, I would use a `<fancy-name>` component like:

    <input data-bind="value: firstName"/>
    <input data-bind="value: lastName"/>
    <fancy-name data-first="firstName" data-last="lastName"></fancy-name>

    <script>
        ko.applyBindings({ firstName: ko.observable(), lastName: ko.observable() });
    </script>


2. the **`viewModel`** param:

The second parameter of the constructor function is the viewmodel that was in current binding scope where the tag was declared, (ie, it will be whatever `$data` of the binding context was)

This is useful if your component is somehow behaves differently depending on the context where it was bound, or if it uses the parent viewModel in any way.

//TODO: good example of this here.

3. the **`bindingContext`** param:

The third parameter of the constructor function is the binding context where the tag was declared.

    ko.components['fancy-name'] = {

        /* ... */

        ctor: function (attributes, viewModel, bindingContext) {

            if(bindingContext.$data === viewModel) {
                // this will always be true.
            }
            
        }
    };






### Flash of unstyled content ###

It is recommended that the following CSS be included at the head of the page when using knockout-components in order to prevent a [Flash of unstyled content](http://en.wikipedia.org/wiki/Flash_of_unstyled_content):

    :unresolved { opacity: 0; }

which will hide all custom tag content from rendering until bound by knockout.





### Comparison with web components ###


<table>

<tr>
<th></th>
<th>Web Components</th>
<th>Knockout Components</th>
</tr>


<tr>
<td>Content Transclusion / Insertion Points</td>
<td align="center">Yes</td>
<td align="center">Yes</td>
</tr>
 

<tr>
<td>Semantic / Custom Markup</td>
<td align="center">Yes</td>
<td align="center">Yes</td>
</tr>

<tr>
<td>Browser Compatibility</td>
<td align="center">No</td>
<td align="center">(IE 8+)</td>
</tr>

<tr>
<td>Knockout.js Binding Power</td>
<td align="center">No</td>
<td align="center">Yes</td>
</tr>

<tr>
<td>CSS Style encapsulation</td>
<td align="center">Yes</td>
<td align="center">No</td>
</tr>



</table>



### Insertion Points / Transclusion ###

Inside your component template, you can use the special HTML `<content>` element to specify insertion points, along with an optional `select` attribute which uses a CSS selector (only tag names and class names allowed right now).

For instance:

Let's say I have the following template defined for a custom component `<foo>`:

    <template id="foo_template">
        <content select="h2"></content>
        <content select=".title"></content>
        <hr />
        <div>
            <div><b>Description:</b></div>
            <content select="*"></content>
        </div
    </template>

and then in our markup we have a foo widget:

    <foo>
        <h1 class="title">My Title</h1>
        <h2>My Subtitle</h2>
        <div>some cool description</div>
    </foo>


The markup will get transcluded, and after binding will be:

    <h2>My Subtitle</h2>
    <h1 class="title">My Title</h1>
    <hr />
    <div>
        <div><b>Description:</b></div>
        <div>some cool description</div>
    </div>



Or perhaps a more practical example:


    <template id="modal_template">
        <div class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-bind="click: close">&times;</button>
                        <h4 class="modal-title" data-bind="text:title"></h4>
                    </div>
                    <div class="modal-body">
                        <content></content>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-bind="click: close">Close</button>
                        <button type="button" class="btn btn-primary" data-bind="click: save, text: okText"></button>
                    </div>
                </div>
            </div>
        </div>
    </template>


with the markup:

    <modal data-title="'Save Document?'" data-ok-text="'Save Changes'">
        <h4>Your document has pending changes.</h4>
        <p>
            If you leave without saving, some of your work could be lost.
        </p>
    </modal>



### Things left to do ###

- full browser compatibility testing has not been done yet, but the mission is to get it fully compatible with all major browsers, and IE 8 and above for IE.
- I am still looking through different scenarios where insertion points could be more intuitive and flexible to attain something useful.  This will involve a feedback loop with the community, as well as building several real-word components and seeing how I want them to be used.
- right now the knockout binding context of transcluded elements is that of the widget. It might be more intuitive if the binding context was switched back to that of the parent context.



###  Things I am currently unsure of, and are possibly going to change ###

- right now an `attributes: ['foo','bar']` corresponds to the data-* attributes `<my-tag data-foo="..." data-bar="..."></my-tag>`.  It is possible I might release this constraint and allow *any* attributes to be defined so that it is more legible and compact, although I am not sure what sort of issues this could cause when they attribute names are used that have other meanings.  If anyone has any opinions on this, I would like to hear them.
- i might include an option which will automatically map the attributes' values to the instance of the component, rather than requiring the developer do that explicitly in the constructor.
- I might include a `prototype` option to the component declaration which automatically get's mapped to the actual constructor prototype, with the value of `this` correctly bound to everything. Technically, this is already easily possible, just not super clean syntactically (ie, just extend `ko.components['tag-name'].ctor.prototype`.