;
(function ($){

    function setHeight() {
        return $("#ytvideo").width()/16 * 9;
    };
    $(document).ready(function(e) {
        $("#ytvideo").height(setHeight());
        $("#add_video").on("click", function() {
            console.log("clicked");
        });
    });
    $(window).resize(function(){
        $("#ytvideo").height(setHeight());
    });

})(jQuery);