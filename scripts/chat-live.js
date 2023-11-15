var accessToken = "45a00dc0095f4aa68fd5f682aafe8ed0";
var baseUrl = "https://api.api.ai/v1/";

$(document).ready(function() {
	$("#pregunta").keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			var text = $("#pregunta").val();
			send(text);
		}
	});
});

function enviar(){
	var text = $("#pregunta").val();
	send(text);
}

function send(text) {

	$.ajax({
		type: "POST",
		url: baseUrl + "query?v=20150910",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: {
			"Authorization": "Bearer " + accessToken
		},
		
		data: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),

		success: function(data) {
			setResponse(data,1);
		},
		error: function() {
			setResponse("En el momento no tenemos disponible el servicio, por favor intenta nuevamente mas tarde.",0);
		}
	});
}

function setResponse(val, msj) {

	var clear = "<div class=\"clear\"></div>";


	// escribimos la pregunta del usuario
	if ($("#pregunta").val() != ""){

		var p = "<div class=\"left\"> <p class=\"speaker\"> Usuario dice " + fecha() +") : </p><div class=\"triangle-left\">"+$("#pregunta").val()+"</div></div>"
		$("#contenedor").append(p);
		$("#contenedor").append(clear);

		autoscroll();
	}


	// extraemos lo que venga en speech simple
	var tigre = '/images/bot/tigre.png';
	
	if (msj==1){
		var respuesta = val.result.fulfillment.speech;
	}
	else{
		var respuesta = val;
	}

	if (respuesta != "") {
		var e = "<div class=\"right\"> <p class=\"speaker\"><img class = \"tumbnail\" src='" + tigre + "'> Tigre dice " + fecha() +"):</p><div class=\"triangle-right\">"+ respuesta.replace(/[\n\r]/g,'<br/>') +"</div></div>"

		$("#contenedor").append(e);
		$("#contenedor").append(clear);

		autoscroll();
	}



	console.log(val);
	//extraemos si el tipo de respuesta es texto o richtext
	if (msj==1){

		var tipo_respuesta = val.result.fulfillment.messages[0].type;
	
		switch(tipo_respuesta) {
			case 2:
				var title = val.result.fulfillment.messages[0].title;
				
				var e = "<div class=\"right\"> <p class=\"speaker\"> <img class = \"tumbnail\" src='" + tigre + "'>Tigre dice " + fecha() +"):</p><div class=\"triangle-right\">"+ title + "<br>"

				autoscroll();

				var x = val.result.fulfillment.messages[0].replies;
				for (var i = 0; i < x.length; i++) {
				e = e + "<button id='" + x[i] + "' onclick='preparar(\"" + String(x[i]) + "\")'>" + x[i] + "</button>"
				}
				e= e +"</div></div>";
				
				$("#contenedor").append(e);
				$("#contenedor").append(clear);
				autoscroll();
				break;
				
			default:
				break;
		}
	}
		
	$("#pregunta").val("");


}

function preparar(val){
	var clear = "<div class=\"clear\"></div>";

	var p = "<div class=\"left\"><p class=\"speaker\">Usuario dice " + fecha() +"):</p><div class=\"triangle-left\">"+ val +"</div></div>"
	$("#contenedor").append(p);
	$("#contenedor").append(clear);
	send(val);
	autoscroll();
	
	
}

function autoscroll(){
	var objDiv = document.getElementById("contenedor");
	objDiv.scrollTop = objDiv.scrollHeight;
	document.getElementById("pregunta").focus();
}

function fecha(){
		var d = new Date();
		var mes = d.getMonth() + 1;
		var fecha = "(" + d.getDate() + "/" + mes  + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
		return fecha;
}
