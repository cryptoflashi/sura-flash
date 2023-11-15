/*--------------------------------------------------
|                 Main Configuration
|---------------------------------------------------
|
| Main configuration of the Inbenta application.
|
*/

// Inbenta routes - Relative paths where the CSS and JS are hosted
var inbPaths = {
    css: "/css/vendor/inbenta/assets/css/inbenta-core.css",
    js: "/css/vendor/inbenta/assets/js/inbenta-core.js"
}

// Inbenta application configuration
var inbApp = {
    sdkVersion: "1.22.0",
    sdkAuth: {
        inbentaKey: "JdxhcIabPnxPMi5tFrCIZ3DKn1tPlw0kbegng0A5KRA=",
        domainKey: "eyJ0eXBlIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJwcm9qZWN0Ijoic3VyYV9jaGF0Ym90X2VzIiwiZG9tYWluX2tleV9pZCI6IkJYbXh2RGdlVkk1a1ZaeVE2dzRxM3c6OiJ9.KeEH-mjHtEJin3DPFA68TC8p2Wu2NHuWI-J7NIMO0zGNUJKlgnunJrsVhvoWPNMpj6QdlCz8srnLCx5x1_x0jA"
    },
    // Inbenta standard SDK configuration - Check inbenta API/SDK documentation <https://apidocs.inbenta.io/> for more information
    sdkConfig: {
        chatbotId: "sura_chatbot_es", // Chatbot application specific ID
        environment: "production", // Environments => "development" / "preproduction" / "production"
        userType: 0, //0 Default, 1 Chatbot, 2 Sura En Linea, 3 Sura Salud
        lang: "es",
        labels: {
            "es": {
                "interface-title": "Chat en línea",
                "enter-question": "Escribe tu pregunta",
            }
        },
        launcher: {
            title: "¿Tienes alguna duda? Pregúntanos",
        },
        closeButton: {
            visible: true
        },
        ratingOptions: [{
                id: 1,
                label: 'Si',
                comment: false,
                response: "Gracias!"
            },
            {
                id: 2,
                label: 'No',
                comment: false,
                response: "Gracias!"
            }
        ],
        showRatingWithinMessages: true,
        sanitizerOptions: {
            allowedTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
                'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
                'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'img', 'iframe', 'button'
            ],
            allowedAttributes: {
                a: ['href', 'name', 'target', 'onclick'],
                iframe: ['src'],
                img: ['src'],
                button: ['onclick']
            },
            allowedClasses: {
                'p': ['test']
            }
        }
    },
    // Inbenta application custom configuration
    appConfig: {
        headerChatButton: {
            enabled: true,
            text: "¿Quieres hablar con un representante? <br> Horario: Lunes a sábado de 7:00 a.m. a 7:00 p.m.", //"Hablar con representante",
            onClick: "dummyvisibleafi()",
            htmlClasses: "openChatButton header__actions__chat-button inbenta-bot-button inbenta-bot-button2 hide"
        }
    }
}

/*--------------------------------------------------
|                   Starting SDK
|---------------------------------------------------
|
| >> WARNING!
|
| Load & trigger JS & CSS core. Please, be carefull if
| you want to modify this section.
|
*/

// Attach configuration to the window
window.inbAppSdk = inbApp;

// Create CSS core file
var inbScriptCSS = document.createElement("link");
inbScriptCSS.rel = "stylesheet";
inbScriptCSS.type = "text/css";
inbScriptCSS.href = inbPaths.css;
document.head.appendChild(inbScriptCSS);

// Create JS core file
var inbScriptJS = document.createElement("script");
inbScriptJS.src = inbPaths.js;
document.head.appendChild(inbScriptJS);