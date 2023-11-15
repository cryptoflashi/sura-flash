//terminar de desacoplar la llamada a  los servicios
window.ServicesConfig = {
    "apiHost": "https://api.segurossura.com.co",
    "apiHostLab": "https://apilab.segurossura.com.co",
    getApiUrl: function(api, controller) {
        return this.apiHost + this[api] + controller;
    },
    getApiUrlLab: function(api, controller) {
        return this.apiHostLab + this[api] + controller;
    },
    "profile": "/profile/v1/",
    "public": "/public/v1",
    "urlBase": "https://www.segurossura.com.co",

    "TiposDocumentos": {
        "tiposDeIdentificacion": [{
            "key": "C",
            "text": "CEDULA"
        }, {
            "key": "E",
            "text": "CED.EXTRANJERIA"
        }, {
            "key": "A",
            "text": "NIT"
        }, {
            "key": "P",
            "text": "PASAPORTE"
        }, {
            "key": "D",
            "text": "DIPLOMATICO"
        }, {
            "key": "R",
            "text": "REGISTRO CIVIL"
        }, {
            "key": "T",
            "text": "TARJ.IDENTIDAD"
        }, {
            "key": "X",
            "text": "DOC.IDENT. DE EXTRANJEROS"
        }, {
            "key": "N",
            "text": "NUIP"
        }, {
            "key": "F",
            "text": "IDENT. FISCAL PARA EXT"
        }, {
            "key": "CA",
            "text": "NIT PERSONAS NATURALES"
        }]
    }
    /*
    "appointments": "/appointments/v1/",
    "public": "/public/v1/",
    "analytics": "/analytics/v1/",
    //External
    "repository": "/public/",
    "urlApiSuraEnLinea": "https://api.suraenlinea.com",
    "urlSuraEnLineaSoatFinish": "https://www.suraenlinea.com/soat/datos-personales/"

    */
};
if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
        if (typeof start !== 'number') {
            start = 0;
        }
        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}