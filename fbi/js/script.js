/*
var is_mobile = false;
$( window ).resize(function() {
    if( $( window ).width() < 500 ) {
        is_mobile = true;
        $(".header .nav").hide();
        $("#dropdown-button").mouseout(function() {
            $(".header .nav").hide();
        });
    } else {
        is_mobile = false;
        $(".header .nav").show();
    }
});
*/

$("#dropdown-button").click(function() {
    $(".header nav").toggle();
});

$("#dropdown-button").mouseover(function() {
    $(".header nav").show();
});
