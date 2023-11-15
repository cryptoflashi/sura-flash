var listaEstilos = new Array();
var map;
var cantidadPuntos = 0;

function getQueryParameter(parameterName) {
    //var ruta = "https://www.segurossura.com.co/Mapas/default.htmldefault.html?tiposolicitud=spp#";
    var queryString = window.location.search.substring(1);
    var parameterName = parameterName + "=";
    if (queryString.length > 0) {
        begin = queryString.indexOf(parameterName);
        if (begin != -1) {
            begin += parameterName.length;
            end = queryString.indexOf("&", begin);
            if (end == -1) {
                end = queryString.length
            }
            return unescape(queryString.substring(begin, end));
        }
    }
    return null;
}

function CargarXML(tipo, ciudad) {
    var ruta = '../Mapas/kml/' + tipo + '/' + ciudad + '?nocache=' + new Date().getTime();
    //    var objcargador = document.getElementById('cargador');
    //    objcargador.style.opacity = .8;
    //    objcargador.style.display = 'block';
    //    objcargador.style.left = $('#mapa_autosura').position().left;
    //    objcargador.style.top = $('#mapa_autosura').position().top;
    $.ajax({
        type: "GET",
        url: ruta,
        dataType: "xml",
        success: parseXml
    });
}

function parseXml(xml) {
    var popup;
    var n = 1;
    var index;
    var idEstilo;
    var urlIcon;
    var latlng = new google.maps.LatLng(4.570868, -74.297333);
    var options = {
        zoom: 18,
        center: latlng,
        fullScreenControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: true,
        mapTypeControlOptions: { mapTypeIds: [] }
    };
    
    
    map = new google.maps.Map(document.getElementById('mapa_autosura'), options);
    var limits = new google.maps.LatLngBounds();
    //Cargamos los estilos
    var estilos = $(xml).find("Style");
    for (index = 0; index < estilos.length; index++) {
        idEstilo = "#" + estilos[index].getAttribute("id");
        try {
            urlImage = $($(estilos[index]).find("IconStyle").find("Icon").find("href")[0]).text();
        } catch (err) {
            urlImage = "";
        }
        listaEstilos[idEstilo] = new Object({
            urlImage: urlImage
        });
    }
    var estiloIconoDefault = new Object({
        urlImage: 'http://gmaps-samples.googlecode.com/svn/trunk/markers/pink/blank.png'
    });
    //Cargamos los puntos
    var puntos = $(xml).find("Placemark");
    cantidadPuntos = puntos.length;
    for (index = 0; index < puntos.length; index++) {
        var nombrePunto = $($(puntos[index]).find("name")[0]).text();
        var descripcionPunto = $($(puntos[index]).find("description")[0]).text();
        var coordenadas = $($(puntos[index]).find("Point").find("coordinates")[0]).text().split(",");
        var ubicacion = new google.maps.LatLng(coordenadas[1], coordenadas[0]);
        try {
            idEstilo = listaEstilos[$($(puntos[index]).find("styleUrl")[0]).text()];
        } catch (err) {
            idEstilo = estiloIconoDefault;
        }
        var marker = new google.maps.Marker({
            position: ubicacion,
            map: map,
            title: nombrePunto,
            icon: new google.maps.MarkerImage(idEstilo.urlImage, null, null, null, new google.maps.Size(34, 34)),
            description: descripcionPunto
        });
        google.maps.event.addListener(marker, 'click', function() {
            if (!popup) {
                popup = new google.maps.InfoWindow();
            }
            var note = "<div><div style='font-weight:bold'>" + this.title + "</div><div>" + this.description + "</div></div>";
            popup.setContent(note);
            popup.open(map, this);
        });
        limits.extend(ubicacion);
    }
    map.fitBounds(limits);
}

function EstablecerZoom() {
    if (cantidadPuntos == 1) {
        map.setZoom(18);
    }
    //    document.getElementById('cargador').style.display = 'none';
}