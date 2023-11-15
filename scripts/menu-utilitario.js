$(function() {
    //Body click
    $("body").on("click", function(e) {
        if ($("#l-country.active").length > 0) {
            $("#l-country").trigger("click");
        }
    });

    //stoppropagation
    $("#l-country").on("click", function(e) {
        e.stopPropagation();
    });

    //Country
    var country = $("#country");
    $("#l-country").on("click", function() {
        if ($(this).hasClass("active")) {

            $(this).removeClass("active");
            country.animate({
                marginTop: 30 + "px",
                opacity: 0
            }, 300, function() {
                $("#country").hide();
            });
        } else {
            $(this).addClass("active");
            country.show().animate({
                marginTop: 5 + "px",
                opacity: 1
            }, 300);

            dataLayer.push({
                'accion': 'desplegable',
                'event': 'menu-latam-segurossura-col',
                'etiqueta': 'opcion-pais',
            });
        }
    });
})