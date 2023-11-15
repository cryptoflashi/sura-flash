$(document).ready(function() {
    /** ===== Script para habilitar y deshabilitar opciones según sea necesario ===== **/
    //var onclick = $("<li><a href='#' " + "onclick=\"javascript:document.getElementsByClassName('inbenta-bot__launcher')[0].click(); return false;\"><span>" + 'Chat en línea' + "</span></a></li>");
    /** if($('body').attr('class') == "pac") {
           console.log('I am in PAC inner');
		   $(onclick).appendTo("ul.floatingMenu");
           $("<li><a href='https://epssura.com/faqs' target='_blank'><span>Preguntas frecuentes</span></a></li>").appendTo("ul.floatingMenu");
           $("<li><a href='https://wa.me/573175180237?text=EPS%20SURA' target='_blank'><span>Comunícate por WhatsApp</span></a></li>").appendTo("ul.floatingMenu");
           $("<li><a href='#' onclick='pacform_openModal()' target='_self'><span>Escríbenos</span></a></li>").appendTo("ul.floatingMenu");
           $("<li><a href='https://epssura.com/oficinas' target='_blank'><span>Puntos de atención</span></a></li>").appendTo("ul.floatingMenu");
           $("<li><a href='https://www.segurossura.com.co/covid-19/paginas/personas/que-hacer-cuando.aspx' target='_blank'><span>Preguntas COVID-19</span></a></li>").appendTo("ul.floatingMenu");
        } else {
           console.log('I am in other EPS inner');
		   $(onclick).appendTo("ul.floatingMenu");
           $("<li><a href='https://epssura.com/faqs' target='_blank'><span>Preguntas frecuentes</span></a></li>").appendTo("ul.floatingMenu");
           $("<li><a href='https://wa.me/573175180237?text=EPS%20SURA' target='_blank'><span>Comuní­cate por WhatsApp</span></a></li>").appendTo("ul.floatingMenu");
           $("<li><a href='https://epssura.com/escribenos' target='_blank'><span>Escríbenos</span></a></li>").appendTo("ul.floatingMenu");
           $("<li><a href='https://epssura.com/oficinas' target='_blank'><span>Puntos de atención</span></a></li>").appendTo("ul.floatingMenu");
           $("<li><a href='https://www.segurossura.com.co/covid-19/paginas/personas/que-hacer-cuando.aspx' target='_blank'><span>Preguntas COVID-19</span></a></li>").appendTo("ul.floatingMenu");
        } **/

    $('.floatingButton').on('click',
        function(e) {
            e.preventDefault();
            $(this).toggleClass('open');
            if ($(this).children('.fa').hasClass('fa-plus')) {
                $(this).children('.fa').removeClass('fa-plus');
                $(this).children('.fa').addClass('fa-close');
            } else if ($(this).children('.fa').hasClass('fa-close')) {
                $(this).children('.fa').removeClass('fa-close');
                $(this).children('.fa').addClass('fa-plus');
            }
            $('.floatingMenu').stop().slideToggle();
        }
    );
    $(this).on('click', function(e) {
        var container = $(".floatingButton");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && $('.floatingButtonWrap').has(e.target).length === 0) {
            if (container.hasClass('open')) {
                container.removeClass('open');
            }
            if (container.children('.fa').hasClass('fa-close')) {
                container.children('.fa').removeClass('fa-close');
                container.children('.fa').addClass('fa-plus');
            }
            $('.floatingMenu').hide();
        }
    });

});