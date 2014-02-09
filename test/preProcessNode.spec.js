describe("ko.components",function(){
   it("should be present",function(){
       expect(ko.components).toBeDefined();
   });
});

describe("ko_components",function(){


    it("should be present",function(){
        expect(ko_components).toBeDefined();
    });

    describe("getTemplateHtml",function(){

        var idName = "test-tmpl";


        beforeEach(function(){
            $("body").append($("<div>").attr("id",idName));
            $('#' + idName).html('<div class="template_div">this is a template</div>');
        });

        afterEach(function(){
            $('#' + idName).remove();
        });


        it("should be a defined",function(){
            expect(ko_components.getTemplateHtml).toBeDefined();
        });

        it("should use a string starting with '#' as an id reference",function(){
            var result = ko_components.getTemplateHtml('#' + idName);

            expect(result).toBeTruthy();
            expect(result).toMatch(/template_div/);
            expect(result).toMatch(/this is a template/);
            expect(result[0]).toEqual('<');


        });

        it("should allow an html string",function(){
            var html = '<div class="template_div">this is a template</div>';
            var result = ko_components.getTemplateHtml(html);

            expect(result).toBeTruthy();
            expect(result).toEqual(html);

        });

        it("should work with a template tag as well", function(){

            var templateSupport = 'content' in document.createElement('template');

            var templateString = '<div class="template_div">this is a template</div>';


            if(templateSupport){
                var tmpl = document.createElement('template');
                tmpl.id = idName;
                tmpl.content.innerHtml = templateString;
            } else {
                $("body").append($("<template>").attr("id", idName));
                $('#' + idName).html('<div class="template_div">this is a template</div>');
            }

            var result = ko_components.getTemplateHtml('#' + idName);

            expect(result).toBeTruthy();
            expect(result).toMatch(/template_div/);
            expect(result).toMatch(/this is a template/);
            expect(result[0]).toEqual('<');



        });

    });
});