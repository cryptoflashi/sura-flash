////////////////COTIZAR SEGURO///////////////
function focusSelect(select,clase){
    var divparent = select.parentNode
    divparent.className = clase+'-select '+clase+'-select-active'
} 

function unfocusSelect(select,clase){
    var divparent = select.parentNode
    divparent.className = clase+'-select'
}

function clickCotizaSeguro(select){
    var valor = select.value
    document.getElementById('cotiza-seguro-link').setAttribute('href',valor)

    var btn = document.getElementById('cotiza-seguro-btn')
    if(valor=="#"){
        btn.className = 'cotiza-seguro-btn-locked'
        btn.locked = true
    }else{
        btn.className = ''
        btn.locked = false
    }
}

/*function clickCotizaSeguro(event,btn){
    var status = $(btn).attr('status')
    if(status=='collapsed'){
        $('#cotiza-seguro-wrap').attr('class', 'cotiza-seguro-expanded')
        $('#cotiza-seguro-btn').attr('status', 'expanded')
    }else{
        $('#cotiza-seguro-wrap').attr('class', 'cotiza-seguro-collapsed')
        $('#cotiza-seguro-btn').attr('status', 'collapsed')
    }
    event.preventDefault()
}*/


///////////////////SLIDESHOW PRINCIPAL//////////////////
function setSlideshow(data){
    //var pages = document.getElementById(data.wrapper).getElementsByClassName(data.wrap)
    var slider = document.getElementById(data.wrapper).getAttribute('slider')
    if(slider!='off'){
        var active = data.page+'-active'
        var pages = $("#"+data.wrapper+" ."+data.wrap)
        document.getElementById(data.wrapper).style.width = 'calc(100% * '+pages.length+')'
        document.getElementById(data.wrapper).style.width = '-moz-calc(100% * '+pages.length+')'
        document.getElementById(data.wrapper).style.left = '0%'
    
        document.getElementById(data.prev).setAttribute('onclick',"prevSlideshow("+"'"+data.wrapper+"','"+data.wrap+"','"+data.paginator+"','"+active+"',event)")
        document.getElementById(data.next).setAttribute('onclick',"nextSlideshow("+"'"+data.wrapper+"','"+data.wrap+"','"+data.paginator+"','"+active+"',event)")
    
        $('#'+data.wrapper).attr('page','0')
        $("#"+data.wrapper+" ."+data.wrap).attr('style','width:calc(100% / '+pages.length+'); width:-moz-calc(100% / '+pages.length+')');
    
        //agregar paginas al paginador
        document.getElementById(data.paginator).innerHTML = ''
        for(var i = 0;i<pages.length;i++){
            var pag = document.createElement('div')
            if(i==0){
                pag.className = data.page+' '+active
            }else{
                pag.className = data.page
            }
            pag.setAttribute('onclick',"clickSlideshow("+"'"+data.wrapper+"','"+data.wrap+"','"+data.paginator+"','"+active+"',"+i+")")
            document.getElementById(data.paginator).appendChild(pag)
        }
    
        if(data.time!=null&&data.time!=undefined){
            data.animation = setInterval(function(){
                nextSlideshow(data.wrapper,data.wrap,data.paginator,active)
            },data.time)
        }
    }
}

function nextSlideshow(wrapper,wrap,paginator,active,event){
    var actual_page = parseInt($('#'+wrapper).attr('page'))
    var total_pages = document.getElementById(wrapper).getElementsByClassName(wrap).length

    if(actual_page<(total_pages-1)){
        actual_page++
        document.getElementById(wrapper).style.left = ('-'+actual_page+'00%')
        $('#'+wrapper).attr('page',actual_page)
        
    }else{
        //reiniciar
        actual_page = 0
        document.getElementById(wrapper).style.left = actual_page+'%'
        $('#'+wrapper).attr('page',actual_page)
    }

    //pages
    var pages = document.getElementById(paginator).getElementsByTagName('div')
    for(var i = 0;i<pages.length;i++){
        pages[i].classList.remove(active)
    }
    pages[actual_page].classList.add(active)
    if(event!=null&&event!=undefined){
        event.preventDefault()
    }
}
function prevSlideshow(wrapper,wrap,paginator,active,event){
    var actual_page = parseInt($('#'+wrapper).attr('page'))
    var total_pages = document.getElementById(wrapper).getElementsByClassName(wrap).length

    if(actual_page>0){
        actual_page--
        document.getElementById(wrapper).style.left = ('-'+actual_page+'00%')
        $('#'+wrapper).attr('page',actual_page)
    }else{
        //poner la ultima
        actual_page = (total_pages-1)
        document.getElementById(wrapper).style.left = ('-'+actual_page+'00%')
        $('#'+wrapper).attr('page',actual_page)
    }

    //pages
    var pages = document.getElementById(paginator).getElementsByTagName('div')
    for(var i = 0;i<pages.length;i++){
        pages[i].classList.remove(active)
    }
    pages[actual_page].classList.add(active)
    if(event!=null&&event!=undefined){
        event.preventDefault()
    }
}
function clickSlideshow(wrapper,wrap,paginator,active,p){
    actual_page = p
    document.getElementById(wrapper).style.left = ('-'+actual_page+'00%')
    $('#'+wrapper).attr('page',actual_page)

    var pages = document.getElementById(paginator).getElementsByTagName('div')
    for(var i = 0;i<pages.length;i++){
        pages[i].classList.remove(active)
    }
    pages[actual_page].classList.add(active)
}

function prevSlider(event){
    $('#beneficios-noticias-scroll').attr('class','beneficios-noticias-scroll-start')
    if(event!=null&&event!=undefined){
        event.preventDefault()
    }
}
function nextSlider(event){
    $('#beneficios-noticias-scroll').attr('class','beneficios-noticias-scroll-end')
    if(event!=null&&event!=undefined){
        event.preventDefault()
    }
}


/////////////TABS EXTRANJEROS//////////////
function clickTabExt(btn,tab){
    var aria = btn.getAttribute('data')
    var titles = document.getElementById('ext-tabs'+tab).getElementsByClassName('ext-tab-title')
    for(var i = 0;i<titles.length;i++){
        titles[i].classList.remove('ext-tab-title-active')
    }
    var contents = document.getElementById('ext-tabs'+tab).getElementsByClassName('ext-tabs-content')
    for(var i = 0;i<contents.length;i++){
        contents[i].classList.remove('ext-tabs-content-active')
    }
    document.getElementById('ext-tabs-title-'+aria).classList.add('ext-tab-title-active')
    document.getElementById('ext-tabs-content-'+aria).classList.add('ext-tabs-content-active')

    /*var tibot_chatea_parent = getE('tibot_preguntas_frecuentes').parentNode.parentNode
    var tibot_chatea = tibot_chatea_parent.getElementsByClassName('openchat')[0]
    tibot_chatea.innerHTML = 'Chatea con Tibot'*/
    if(aria=='1'){
        getE('tibot_preguntas_frecuentes').setAttribute('href','https://www.arlsura.com/index.php/preguntas-frecuentes-arl')
        getE('tibot_whatsapp_li').setAttribute('style','display:none;')
        getE('tibot_whatsapp').setAttribute('href','')
        getE('tibot_escribenos').setAttribute('href','https://www.arlsura.com/index.php/3942')
        getE('tibot_puntos_atencion').setAttribute('href','https://www.arlsura.com/index.php/oficinas-arl-sura')
        getE('tibot_preguntas_covid').setAttribute('href','https://www.segurossura.com.co/covid-19/paginas/personas/que-hacer-cuando.aspx')
    }else if(aria=='2'){
        getE('tibot_preguntas_frecuentes').setAttribute('href','https://epssura.com/faqs')
        getE('tibot_whatsapp_li').removeAttribute('style')
        getE('tibot_whatsapp').setAttribute('href','https://wa.me/573175180237?text=EPS%20SURA')
        getE('tibot_escribenos').setAttribute('href','https://epssura.com/escribenos')
        getE('tibot_puntos_atencion').setAttribute('href','https://epssura.com/oficinas')
        getE('tibot_preguntas_covid').setAttribute('href','https://www.segurossura.com.co/covid-19/paginas/personas/que-hacer-cuando.aspx')
    }else if(aria=='3'){
        getE('tibot_preguntas_frecuentes').setAttribute('href','https://www.segurossura.com.co/paginas/preguntas-frecuentes.aspx')
        getE('tibot_whatsapp_li').removeAttribute('style')
        getE('tibot_whatsapp').setAttribute('href','https://wa.me/573152757888?text=Seguros%20SURA')
        getE('tibot_escribenos').setAttribute('href','https://www.segurossura.com.co/paginas/escribenos.aspx')
        getE('tibot_puntos_atencion').setAttribute('href','https://www.segurossura.com.co/paginas/oficinas-y-sucursales.aspx')
        getE('tibot_preguntas_covid').setAttribute('href','https://www.segurossura.com.co/covid-19/paginas/personas/que-hacer-cuando.aspx')
    }
}

function getE(idname){
    return document.getElementById(idname)
}

////////////TABS ENLACES INTERES//////////////
function clickEnlaceInteres(t){
    //limpiar clase active
    var listas = document.getElementById('enlaces-interes-lista').getElementsByTagName('p')
    for(var i = 0;i<listas.length;i++){
        listas[i].classList.remove('enlaces-interes-list-active')
    }
    //ocultar boards
    var boards = document.getElementById('enlaces-interes-col2').getElementsByClassName('enlaces-interes-row2')
    for(var j = 0;j<boards.length;j++){
        boards[j].classList.remove('enlaces-interes-row-active')
    }
    listas[t-1].classList.add('enlaces-interes-list-active')
    boards[t-1].classList.add('enlaces-interes-row-active')
}


//////////////////SETEAR SLIDESHOWS DEL HOME-PERSONAS///////////////
$(document).ready(function() {
    if(document.getElementById('slideshow-wrapper')!=null){
        setSlideshow({
            wrapper:'slideshow-wrapper',
            wrap:'slideshow-wrap',
            paginator:'slideshow-paginator',
            page:'slideshow-page',
            prev:'slideshow-prev-btn',
            next:'slideshow-next-btn',
            animation:null,
            time:7000
        })
    }
    if(document.getElementById('capacidades-parati-slider-wrap')!=null){
        setSlideshow({
            wrapper:'capacidades-parati-slider-wrap',
            wrap:'capacidades-parati-row',
            paginator:'capacidades-parati-pages',
            page:'capacidades-parati-page',
            prev:'capacidades-parati-paginator-prev',
            next:'capacidades-parati-paginator-next',
            animation:null,
            time:null
        })
    }
    if(document.getElementById('enterate-wrap')!=null){
        setSlideshow({
            wrapper:'enterate-wrap',
            wrap:'enterate-card',
            paginator:'enterate-pages',
            page:'enterate-page',
            prev:'enterate-paginator-prev',
            next:'enterate-paginator-next',
            animation:null,
            time:null
        })
    }

    //crear modal temporal para sucursal virtual personas
    /*var mm_html = ''//modal mantenimiento
    
    mm_html+='<div id="modal-english-back" onclick="unsetModalEnglish2()"></div>'
    mm_html+='<div id="modal-english-box">'
        mm_html+='<h1>Sitio en mantenimiento</h1>'
        mm_html+='<div class="modal-english-box-text">'
            mm_html+='<p>Este sitio no se encuentra habilitado temporalmente. Puede consultar su estado más tarde.</p>'
            mm_html+='<p>Gracias por su comprensión.</p>'
        mm_html+='</div>'
        mm_html+='<div class="modal-english-buttons">'
            mm_html+='<button type="button" onclick="unsetModalEnglish2()"><a>Aceptar</a></button>'
        mm_html+='</div>'
    mm_html+='</div>'

    var opcion_sucursal_empresas = document.getElementById('iniciar-sesion-options')
    var opcion_sucursal_empresas_1 = opcion_sucursal_empresas.getElementsByClassName('iniciar-sesion-option')[1]

    var opcion_sucursal_empresas2 = document.getElementById('iniciar-sesion-options2')
    var opcion_sucursal_empresas2_1 = opcion_sucursal_empresas2.getElementsByClassName('iniciar-sesion-option2')[1]

    if(opcion_sucursal_empresas_1!=null&&opcion_sucursal_empresas_1!=undefined){
        var div_html = document.createElement('div')
        div_html.setAttribute('id','modal-english2')
        div_html.setAttribute('class','modal-english-off')
        div_html.innerHTML = mm_html
        document.getElementsByClassName('footer')[0].appendChild(div_html)

        var a_tag = opcion_sucursal_empresas_1.getElementsByTagName('a')[0]
        a_tag.removeAttribute('href')
        opcion_sucursal_empresas_1.setAttribute('onclick','setModalEnglish2()')
    }
    if(opcion_sucursal_empresas2_1!=null&&opcion_sucursal_empresas2_1!=undefined){
        var a_tag2 = opcion_sucursal_empresas2_1.getElementsByTagName('a')[0]
        a_tag2.removeAttribute('href')
        opcion_sucursal_empresas2_1.setAttribute('onclick','setModalEnglish2()')
    }*/

});