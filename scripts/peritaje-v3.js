var modal_fake = document.getElementById('modal-agenda-cita-box');
modal_fake.innerHTML = modal_fake.innerHTML.replace(/&nbsp;/g,'');
var contenedor_agenda = document.getElementById('agenda-cita-container');
contenedor_agenda.innerHTML = contenedor_agenda.innerHTML.replace(/&nbsp;/g,'');

var mensajes_chrome_modal = document.getElementById('modal-agenda-cita-content').getElementsByClassName('modal-agenda-info-text')
for(var mcm = 0;mcm<mensajes_chrome_modal.length;mcm++){
    mensajes_chrome_modal[mcm].innerHTML = '<p>Para que tengas una mejor experiencia al momento de agendar tu cita, te recomendamos hacerlo a través del navegador <span>Google Chrome</span></p>'
}

var global_ciudad_agenda = null
function openModalCita(ciudad) {
    document.getElementById('modal-agenda-cita-title').innerHTML = 'Necesitas un servicio para:'
    
    //reiniciar selects
    var forms_coll = document.getElementById('modal-agenda-cita-content-'+ciudad).getElementsByClassName('modal-agenda-cita-select')
    for(var i = 0;i<forms_coll.length;i++){
        forms_coll[i].getElementsByTagName('select')[0].value = '0'
        forms_coll[i].getElementsByTagName('span')[0].innerHTML = 'Selecciona una opción'
    }
    
    var whatsapp_btn = document.getElementById('btn-ir-'+ciudad)
    var booking_btn = document.getElementById('btn-agenda-'+ciudad)

    /*if (ciudad == 'bogota') {
        whatsapp_btn.setAttribute('href', 'https://bit.ly/3obF1eD')
    } else if (ciudad == "cali") {
        whatsapp_btn.setAttribute('href', 'https://bit.ly/2RlTrfq')
    } else if (ciudad == "medellin") {
        document.getElementById('modal-agenda-cita-title').innerHTML = 'Si necesitas un servicio mecánico para:'
        whatsapp_btn.setAttribute('href', 'https://bit.ly/3nKihBL')
    } else if (ciudad == "pereira") {
        whatsapp_btn.setAttribute('href', 'https://bit.ly/3tiKgd9')
    }*/
    whatsapp_btn.removeAttribute('href')
    booking_btn.removeAttribute('href')

    document.getElementById('modal-agenda-cita-content').className = 'modal-agenda-cita-content-box-'+ciudad
    document.getElementById('modal-agenda-cita').className = 'modal-agenda-cita-on'
}

function closeModalCita() {
    document.getElementById('modal-agenda-cita').className = 'modal-agenda-cita-off'
}

function changeSelectCita(select,ciudad) {
    var booking_btn = document.getElementById('btn-agenda-'+ciudad)
    var txt = select.options[select.selectedIndex].text
    var val = select.value
    var parent = select.parentNode
    var span = parent.getElementsByTagName('span')[0]
    span.innerHTML = txt

    if (ciudad == 'bogota') {
        if (val == 'autos') {
            booking_btn.setAttribute('href', 'https://outlook.office365.com/owa/calendar/CopiadeCentrodeServiciosSURABogota@sura.com/bookings/')
        } else if (val == 'motos') {
            booking_btn.setAttribute('href', 'https://outlook.office365.com/owa/calendar/MotoSuraBogota@sura.com/bookings/')
        } else if (val == 'bici') {
            booking_btn.setAttribute('href', 'https://outlook.office365.com/owa/calendar/CentrodeserviciosBiciSuraBogota@sura.com/bookings/')
        } else{
            booking_btn.removeAttribute('href')
        }
    } else if (ciudad == 'cali') {
        if (val == 'autos') {
            booking_btn.setAttribute('href', 'https://outlook.office365.com/owa/calendar/SURA6@sura.com/bookings/')
        } else if (val == 'motos') {
            booking_btn.setAttribute('href', 'https://outlook.office365.com/owa/calendar/MotoSuraCali@sura.com/bookings/')
        } else{
            booking_btn.removeAttribute('href')
        }
    } else if (ciudad == 'medellin') {
        if (val == 'autos') {
            booking_btn.setAttribute('href', 'https://outlook.office365.com/owa/calendar/AutosSuraMedelln@sura.com/bookings/')
        } else if (val == 'motos') {
            booking_btn.setAttribute('href', 'https://outlook.office365.com/owa/calendar/MotoSuraMedellin@sura.com/bookings/')
        } else{
            booking_btn.removeAttribute('href')
        }
    } else if (ciudad == 'pereira') {
        if (val == 'autos') {
            booking_btn.setAttribute('href', 'https://outlook.office365.com/owa/calendar/CentrodeServiciosPereira@sura.com/bookings/')
        } else if (val == 'motos') {
            booking_btn.setAttribute('href', 'https://outlook.office365.com/owa/calendar/CentrodeServiciosMotoPereira@sura.com/bookings/')
        } else{
            booking_btn.removeAttribute('href')
        }
    }
}

function changeSelectCita2(select,ciudad) {
    var whatsapp_btn = document.getElementById('btn-ir-'+ciudad)
    var txt = select.options[select.selectedIndex].text
    var val = select.value
    var parent = select.parentNode
    var span = parent.getElementsByTagName('span')[0]
    span.innerHTML = txt

    if (val == 'autos') {
        whatsapp_btn.setAttribute('href', 'https://wa.me/573152757888?text=Hola%2C%20deseo%20un%20servicio%20para%20mi%20veh%C3%ADculo.%20')
        console.log("cambia a autos")
    } else if (val == 'motos') {
        whatsapp_btn.setAttribute('href', 'https://outlook.office365.com/owa/calendar/MotoSuraMedellin@sura.com/bookings/')
        console.log("cambia a motos")
    } else if (val == 'bici') {
        whatsapp_btn.setAttribute('href', 'https://outlook.office365.com/owa/calendar/CentrodeserviciosBiciSuraMedelln@sura.com/bookings/')
        console.log("cambia a bici")
    }else{
        if (ciudad == 'bogota') {
            whatsapp_btn.setAttribute('href', 'https://bit.ly/3obF1eD')
        } else if (ciudad == "cali") {
            whatsapp_btn.setAttribute('href', 'https://bit.ly/2RlTrfq')
        } else if (ciudad == "medellin") {
            whatsapp_btn.setAttribute('href', 'https://bit.ly/3nKihBL')
        } else if (ciudad == "pereira") {
            whatsapp_btn.setAttribute('href', 'https://bit.ly/3tiKgd9')
        }
    }
}
