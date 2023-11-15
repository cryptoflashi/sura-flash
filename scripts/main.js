var documentW = 0,
    screen_sm = 768,
    screen_md = 991,
    openMnu, btn, navbarSide, windowW;

$(function() {
    documentW = $(document).width();
    $(window).resize(function() {
        documentW = $(document).width();
        widthSizePage();
        if (openMnu && $(window).width() != windowW) {
            openMainMenu();
        }
    });

    if (documentW <= screen_sm) {
        $('.carousel').carousel({
            interval: false
        });
    }

    $('.ctn-nav-footer .title-nav').click(function() {
        var current = $(this);
        if (documentW <= screen_md) {
            accordionMenuFooter(current);
        }
        return false;
    });

    $(window).scroll(function(event) {
        var scroll = $(window).scrollTop();

        if (scroll > 35) {
            $('.ctn-top').addClass("hide-t");
        } else {
            $('.ctn-top').removeClass("hide-t");
        }
    });

    widthSizePage();
    $(".navbar-toggle").click(function() {
        btn = $(this);
        openMainMenu();
    });
});

function accordionMenuFooter(current) {
    var allBtnPanel = $('.ctn-nav-footer .title-nav');
    var allMenusFooter = $('.ctn-nav-footer ul li ul');
    var target = current.next();
    if (target.hasClass('open')) {
        current.removeClass('active');
        target.removeClass('open').slideUp();
    } else {
        allBtnPanel.removeClass('active');
        allMenusFooter.removeClass('open').slideUp();
        target.addClass('open').slideDown();
        current.addClass('active');
    }
}

function openMainMenu() {
    page = $("body");
    contentMenu = $(".container-fluid");
    navbarSide = $(btn.data("target"));
    //navbarSide.css( 'height', window.innerHeight);
    navbarSide.css('overflow-y', 'auto');
    if (!openMnu) {
        openMnu = true;
        windowW = $(window).width();
        contentMenu.append('<div class="menu-back"></div>');
        $(".menu-back").on("touchmove", false);
        page.toggleClass("page-overflow");
        btn.toggleClass("in");
        navbarSide.toggleClass("in-side");
    } else {
        openMnu = false;
        $(".menu-back").remove();
        page.toggleClass("page-overflow");
        btn.toggleClass("in");
        navbarSide.toggleClass("in-side");
    }
    $(".menu-back, .navbar-close").click(function() {
        openMainMenu();
    });
}

function widthSizePage() {
    if (documentW >= screen_md) {
        $('.ctn-nav-footer .title-nav').removeClass('active');
        $('.ctn-nav-footer ul li ul').show();
    }
}


$(document).ready(function() {

    $("#menu").removeClass("menu-fijo");

    // Cotizador flotante responsive
    $(".btn-open").on("click", function() {
        $('.btn-action-i-options button').addClass('active');
        $('.insurance-options-content').slideDown('200', function() {
            $(".btn-open").css("display", "none");
            $(".btn-close").css("display", "block");
        });
    });
    $(".btn-close").on("click", function() {
        $('.btn-action-i-options button').removeClass('active');
        $('.insurance-options-content').slideUp('200', function() {
            $(".btn-close").css("display", "none");
            $(".btn-open").css("display", "block");
        });
    });
    //Buscador desplegable
    var submitIcon = $('.searchbox-icon');
    var inputBox = $('.searchbox-input');
    var searchBox = $('.searchbox');
    var isOpen = false;
    submitIcon.click(function() {
        if (isOpen == false) {
            searchBox.addClass('searchbox-open');
            inputBox.focus();
            isOpen = true;
        } else {
            searchBox.removeClass('searchbox-open');
            inputBox.focusout();
            isOpen = false;
        }
    });
    submitIcon.mouseup(function() {
        return false;
    });
    searchBox.mouseup(function() {
        return false;
    });
    $(document).mouseup(function() {
        if (isOpen == true) {
            $('.searchbox-icon').css('display', 'block');
            submitIcon.click();
        }
    });

    function buttonUp() {
        var inputVal = $('.searchbox-input').val();
        inputVal = $.trim(inputVal).length;
        if (inputVal !== 0) {
            $('.searchbox-icon').css('display', 'none');
        } else {
            $('.searchbox-input').val('');
            $('.searchbox-icon').css('display', 'block');
        }
    };
    // stop men� fijo interna detalle de producto 
    var contenedor = $('#menu-contenedor');
    var menu = $('#menu');
    var cont_offset = contenedor.offset();


    $(window).scroll(function(event) {

        var scroll = $(window).scrollTop();
        // alert($(window).scrollTop());
        if (scroll > 320) {
            menu.addClass('menu-fijo');
        } else {
            menu.removeClass('menu-fijo');
        }
    });

    // Anclas del menu
    var currentOff = '180';
    var dieronclick = false;
    $('.ancla').click(function() {
        dieronclick = true;
        var link = $(this);
        var anchor = link.attr('href');
        $('html, body').stop().animate({
            scrollTop: (jQuery(anchor).offset().top - currentOff)
                //scrollTop: (200)
        }, 500, function() {
            dieronclick = false;
        });
        return false;
    });



});
$(function() {
    //tooltips tablas
    $('[data-toggle="tooltip"]').tooltip()
        // Modificador de selects
    $('.select-full').customSelect();
    // tabla responsive
    $('#simple-example-table').stacktable();
});

//adaptar categorias empresariales
$(window).load(function() {
    var $container = $('.category');
    $container.masonry({
        itemSelector: '.element'
    });
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('.main-sectors').delay(350).css({
        'overflow': 'visible'
    });
});

// labels flotantes
$(document).ready(function() {
    function updateText(event) {
        var input = $(this);
        setTimeout(function() {
            var val = input.val();
            if (val != "") input.parent().addClass("float-label-float");
            else input.parent().removeClass("float-label-float");
        }, 1)
    }
    $(".float-label input").keydown(updateText);
    $(".float-label input").change(updateText);

});


$(function() {

    if (!$("#s4-ribbonrow").is(":visible")) {
        $(".header").addClass("fixed-header");
    } else {
        $("#s4-bodyContainer .content").css("margin-top", "0");
        $("#menu").addClass("edit");
    }


    $(document).scroll(function() {

        var y = $(this).scrollTop();

        if (y > $('#sura-right-column').height() + 300) {
            $('.box-float').addClass('opacityOn');
        } else {
            if ($("md-autocomplete[name='cityR']  input[type='search']").attr("aria-expanded") !== "true") {
                $('.box-float').removeClass('opacityOn');
            }
        }

        var h = $(this).scrollTop();

        if (h > $('#sura-left-column').height() - 200) {
            $('.box-float').addClass('opacityOff');
        } else {
            $('.box-float').removeClass('opacityOff');
        }
    });


    // Dropdown calificacion del home

    // Add slideDown animation to dropdown
    $('.dropdown').on('show.bs.dropdown', function(e) {
        $(this).find('.dropdown-menu.cal').first().stop(true, true).slideDown(200);
    });

    // Add slideUp animation to dropdown
    $('.dropdown').on('hide.bs.dropdown', function(e) {
        $(this).find('.dropdown-menu.cal').first().stop(true, true).slideUp(100);
    });


    //Rotador autopauta
    $('.flexslider').flexslider({
        animation: "slide",
        directionNav: false,
    });

})