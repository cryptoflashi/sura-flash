var appAsesoria = angular.module("asesoriaApp", ['SegurosServices', 'ngMaterial']);
appAsesoria.controller("solicitarController", function($scope, $http, $timeout, segurosServices) {
    var typeDoc = window.ServicesConfig.TiposDocumentos;

    $scope.init = function() {
        $scope.ltIdTypes = typeDoc.tiposDeIdentificacion;
        $scope.leads = "";
        $scope.showCitiesError = false;
    };

    $scope.submit = function() {

        $scope.showSucess = false;

        if (!$scope.check) {
            $scope.show = true;
        }

        enviarContacto();
        // ANALYTICS
        dataLayer.push({
            'nombredeformulario': document.location.pathname
        });
        dataLayer.push({
            'event': 'Registro_Exitoso'
        });

    };

    $scope.limpiarCampos = function() {

        $scope.formDatos.$setPristine();
        $scope.formDatos.$setUntouched();

        $scope.check = false;
        $scope.leads.TipoIdentificacion = "";
        $scope.leads.NumIdentificacion = "";
        $scope.leads.Nombre = "";
        $scope.leads.Apellido = "";
        $scope.leads.Ciudad = "";
        $scope.leads.Celular = "";
        $scope.leads.Correo = "";

        $("input[type='search']").val("");
        $("select[name='tipo'] + span.select-full span:first").text("Tipo de identificación");
        $("div.float-label-float").each(function() {
            this.className = 'float-label';
        });
    }

    $scope.urlCodes = [
        { path: "/salud/familiar-clasico-mayores.aspx", code: "01td0000000n9XVAAY" },
        { path: "/salud/familiar-clasico-mayores.aspx", code: "01td0000000n9XVAAY" },
        { path: "/salud/inicio.aspx", code: "01td0000000n9XVAAY" },
        { path: "/te-aseguramos/vida.aspx", code: "01td0000000n9XLAAY" },
        { path: "/te-aseguramos/futuro.aspx", code: "01td0000000n9XLAAY" },
        { path: "/movilidad/vehiculos-utilitarios-y-pesados.aspx", code: "01td0000000n9XBAAY" },
        { path: "/movilidad/autos/plan-seguro-por-uso.aspx", code: "01td0000000n9XBAAY" },
        { path: "/vida/vida-personal.aspx", code: "01td0000000n9XLAAY" },
        { path: "/vida/vida-deudores.aspx", code: "01td0000000n9XLAAY" },
        { path: "/vida/vida-docentes.aspx", code: "01td0000000n9XLAAY" },
        { path: "/futuro/renta-vitalicia-obligatoria.aspx", code: "01td0000000n9XfAAI" },
        { path: "/futuro/renta-conmutacion-pensional.aspx", code: "01td0000000n9XfAAI" },
        { path: "/futuro/renta-vitalicia-voluntaria.aspx", code: "01td0000000n9XfAAI" },
        { path: "/vida/inicio.aspx", code: "01td0000000n9XLAAY" },
        { path: "/vida/capital-clasico.aspx", code: "01td0000000n9XLAAY" },
        { path: "/vida/vida-prorrogado.aspx", code: "01td0000000n9XLAAY" },
        { path: "/vida/vida-prorrogado.aspx", code: "01td0000000n9XLAAY" },
        { path: "/vida/vida-saldado.aspx", code: "01td0000000n9XLAAY" },
        { path: "/vida/vida-para-todos.aspx", code: "01t0V000004sx9NQAQ" },
        { path: "/vida/accidentes.aspx", code: "01td0000000n9XLAAY" },
        { path: "/vida/colectivo-vida.aspx", code: "01td0000000n9XLAAY" },
        { path: "/vida/credito-protegido.aspx", code: "01td0000000n9XLAAY" },
        { path: "/salud/planes.aspx", code: "01td0000000n9XVAAY" },
        { path: "/salud/salud-global.aspx", code: "01td0000000n9XVAAY" },
        { path: "/salud/salud-clasico.aspx", code: "01td0000000n9XVAAY" },
        { path: "/salud/salud-personalizado.aspx", code: "01td0000000n9XVAAY" },
        { path: "/salud/salud-mayores.aspx", code: "01td0000000n9XVAAY" },
        { path: "/salud/enfermedades-graves.aspx", code: "01td0000000n9XVAAY" },
        { path: "/futuro/renta-diaria.aspx", code: "01td0000000n9XfAAI" },
        { path: "/futuro/educacion.aspx", code: "01td0000000n9XkAAI" },
        { path: "/futuro/pension.aspx", code: "01td0000000n9XfAAI" },
        { path: "/futuro/renta-vitalicia.aspx", code: "01td0000000n9XfAAI" },
        { path: "/personas/programas-bienestar/plan-nueva-mente.aspx", code: "01td0000000n9XVAAY" },
        { path: "/empresas/sector/servicios.aspx", code: "01t0V000004u2OQQAY" },
        { path: "/empresas/sector/logistica-y-transporte.aspx", code: "01td00000036vNUAAY" },
        { path: "/empresas/bienes-y-patrimonio/multirriesgo-corporativo.aspx", code: "01td00000034GM0AAM" },
        { path: "/empresas/responsabilidad-civil/hidrocarburos-mercancias-peligrosas.aspx", code: "01td00000036vNLAAY" },
        { path: "/empresas/sector/comercio.aspx", code: "01td00000034GM0AAM" },
        { path: "/empresas/sector/industrial.aspx", code: "01td00000034GM0AAM" },
        { path: "/empresas/empleados/seguro-colectivo-autos.aspx", code: "01td00000034GLqAAM" },
        { path: "/empresas/empleados/seguro-colectivo-hogar.aspx", code: "01td00000034GLqAAM" },
        { path: "/empresas/empleados/seguro-colectivo-salud.aspx", code: "01td00000034GLqAAM" },
        { path: "/empresas/empleados/seguro-colectivo-vida.aspx", code: "01td00000034GLqAAM" },
        { path: "/empresas/empleados/seguro-educacion.aspx", code: "01td0000000n9XkAAI" },
        { path: "/empresas/empleados/seguro-pension.aspx", code: "01td0000000n9XfAAI" },
        { path: "/empresas/empleados/invalidez-y-sobrevivencia.aspx", code: "01td0000000n9XfAAI" },
        { path: "/empresas/empleados/seguro-renta.aspx", code: "01td0000000n9XfAAI" },
        { path: "/empresas/empleados/seguro-renta-voluntaria.aspx", code: "01td0000000n9XfAAI" },
        { path: "/empresas/empleados/seguro-renta-conmutacion-pensional.aspx", code: "01td0000000n9XfAAI" },
        { path: "/empresas/bienes-y-patrimonio/equipo-electronico.aspx", code: "01td00000036vNTAAY" },
        { path: "/empresas/bienes-y-patrimonio/incendio.aspx", code: "01td00000036vNbAAI" },
        { path: "/empresas/bienes-y-patrimonio/multirriesgo-copropiedades.aspx", code: "01td00000034GM0AAM" },
        { path: "/empresas/bienes-y-patrimonio/multirriesgo-empresarial.aspx", code: "01td00000034GM0AAM" },
        { path: "/empresas/bienes-y-patrimonio/rotura-de-maquinaria.aspx", code: "01td00000036vNTAAY" },
        { path: "/empresas/bienes-y-patrimonio/sustraccion-establecimientos.aspx", code: "01td00000036vNQAAY" },
        { path: "/empresas/transporte/agentes-carga.aspx", code: "01td00000036vNUAAY" },
        { path: "/empresas/transporte/carga-proyectos.aspx", code: "01td00000036vNUAAY" },
        { path: "/empresas/transporte/embarcaciones-comerciales.aspx", code: "01td00000036vNUAAY" },
        { path: "/empresas/transporte/embarcaciones-recreo.aspx", code: "01td00000036vNUAAY" },
        { path: "/empresas/transporte/terrestres-carga.aspx", code: "01td00000036vNUAAY" },
        { path: "/empresas/transporte/transporte-mercancias-automatico.aspx", code: "01td00000036vNUAAY" },
        { path: "/empresas/transporte/transporte-mercancias-especifico.aspx", code: "01td00000036vNUAAY" },
        { path: "/empresas/transporte/transporte-valores.aspx", code: "01td00000036vNUAAY" },
        { path: "/empresas/cumplimiento/caucion-judicial.aspx", code: "01td00000036vNNAAY" },
        { path: "/empresas/cumplimiento/disposiciones-legales.aspx", code: "01td00000036vNNAAY" },
        { path: "/empresas/cumplimiento/eficiencia-energetica.aspx", code: "01td00000036vNNAAY" },
        { path: "/empresas/cumplimiento/servicios-publicos-domiciliarios.aspx", code: "01td00000036vNNAAY" },
        { path: "/empresas/cumplimiento/favor-entidades-estatales.aspx", code: "01td00000036vNNAAY" },
        { path: "/empresas/cumplimiento/grandes-beneficiarios.aspx", code: "01td00000036vNNAAY" },
        { path: "/empresas/cumplimiento/favor-particulares.aspx", code: "01td00000036vNNAAY" },
        { path: "/empresas/agricola/cosecha.aspx", code: "01td00000036vNJAAY" },
        { path: "/empresas/agricola/planta.aspx", code: "01td00000036vNJAAY" },
        { path: "/empresas/fraude/fraude-empleado.aspx", code: "01td00000034GLvAAM" },
        { path: "/empresas/fraude/infidelidad-riesgos-financieros.aspx", code: "01td00000034GLvAAM" },
        { path: "/empresas/fraude/manejo-sector-publico.aspx", code: "01td00000034GLvAAM" },
        { path: "/empresas/responsabilidad-civil/responsabilida-civil-ambiental.aspx", code: "01td00000036vNOAAY" },
        { path: "/empresas/responsabilidad-civil/clinicas-hospitales.aspx", code: "01td00000036vNOAAY" },
        { path: "/empresas/responsabilidad-civil/responsabilidad-del-empleador.aspx", code: "01td00000036vNOAAY" },
        { path: "/empresas/responsabilidad-civil/derivada-de-cumplimiento.aspx", code: "01td00000036vNOAAY" },
        { path: "/empresas/responsabilidad-civil/directivos-y-administradores.aspx", code: "01td00000036vNOAAY" },
        { path: "/empresas/responsabilidad-civil/parqueaderos.aspx", code: "01td00000036vNOAAY" },
        { path: "/empresas/responsabilidad-civil/danos-terceros.aspx", code: "01td00000036vNOAAY" },
        { path: "/empresas/responsabilidad-civil/proteccion-digital.aspx", code: "01td00000036vNOAAY" },
        { path: "/empresas/responsabilidad-civil/talleres.aspx", code: "01td00000036vNOAAY" },
        { path: "/empresas/responsabilidad-civil/responsabilidad-civil-profesional.aspx", code: "01td00000036vNOAAY" },
        { path: "/vida/empresario-sura.aspx", code: "01td00000034GLqAAM" },
        { path: "/vida/vida-integral.aspx", code: "01td00000034GLqAAM" },
        { path: "/otros-seguros/profesionales-salud.aspx", code: "01td00000036vNOAAY" },
        { path: "/otros-seguros/profesionales-veterinarios.aspx", code: "01td00000036vNOAAY" },
        { path: "/otros-seguros/embarcaciones-recreo.aspx", code: "01td00000036vNOAAY" },
        { path: "/hogar/arrendamiento.aspx", code: "01td00000036vNcAAI" },
        { path: "/empresas/cumplimiento/arrendamiento.aspx", code: "01td00000036vNcAAI" },
        { path: "/empresas/ingenieria/construccion.aspx", code: "01td00000036vNiAAI" },
        { path: "/empresas/ingenieria/energia-solar.aspx", code: "01td00000036vNiAAI" },
        { path: "/empresas/ingenieria/maquinaria-y-equipo-de-contratistas.aspx", code: "01td00000036vNiAAI" },
        { path: "/empresas/ingenieria/montaje.aspx", code: "01td00000036vNiAAI" },
        { path: "/empresas/ingenieria/obras-civiles-terminadas.aspx", code: "01td00000036vNiAAI" },
        { path: "/empresas/ingenieria/vivienda-segura-sura.aspx", code: "01td00000036vNiAAI" },
        { path: "/otros-seguros/energia-solar.aspx", code: "01td00000036vNiAAI" },
        { path: "/hogar/arrendamiento-tradicional.aspx", code: "00G3w000004W3ek", reason:"Arrendamiento tradicional"},
        { path: "/otros-seguros/seguro-proteccion-digital.aspx", code: "00G3w000004QiOh" },

        { path: "/movilidad/autos/plan-carros-electricos.aspx", code: "01td0000000n9XBAAY", reason:"Autos Eléctricos e Híbridos" },
        { path: "/exequias/inicio.aspx", code: "01td0000000n9XQAAY" },
        { path: "/exequias/exequias-global-plus.aspx", code: "01td0000000n9XQAAY" },
        { path: "/exequias/exequias-global.aspx", code: "01td0000000n9XQAAY" },
        { path: "/exequias/exequias-clasico-plus.aspx", code: "01td0000000n9XQAAY" },
        { path: "/exequias/exequias-clasico.aspx", code: "01td0000000n9XQAAY" },
        { path: "/exequias/exequias-basico-plus.aspx", code: "01td0000000n9XQAAY" },
        { path: "/exequias/exequias-basico.aspx", code: "01td0000000n9XQAAY" },
        { path: "/salud/salud-evoluciona.aspx", code: "01t0V000004sx9OQAQ" },
        { path: "/hogar/inicio.aspx", code: "01td0000000n9X6AAI" },
        { path: "/hogar/hogar-sura.aspx", code: "01td0000000n9X6AAI" },
        { path: "/hogar/hogar-global.aspx", code: "01td0000000n9X6AAI" },
        { path: "/hogar/hogar-clasico.aspx", code: "01td0000000n9X6AAI" },
        { path: "/hogar/hogar-basico.aspx", code: "01td0000000n9X6AAI" },

        { path: "/hogar/nuevos-planes.aspx", code: "01td0000000n9X6AAI", reason:"Nuevos planes hogar" },

        { path: "/salud/salud-para-todos.aspx", code: "01t3w000006HpMZAA0", reason:"Salud para todos CDND"}

        /*      
        
        
        { path: "/salud/salud-evoluciona.aspx", code: "01t0V000004sx9OQAQ" },
            
        */
    ];

    function enviarContacto() {
        //Se valida que la url contenga utm
        $scope.leads.url = location.href.indexOf("?utm") > 0 ? location.href.substring(0, location.href.indexOf("?utm")).toLowerCase() : location.href.toLowerCase();

        $scope.leads.url = location.href.indexOf("#") > 0 ? location.href.substring(0, location.href.indexOf("#")).toLowerCase() : location.href.toLowerCase();
        //obtiene el Path a buscar
        var checkUrl = $scope.leads.url.substring(location.origin.length, $scope.leads.url.length);
        checkUrl = checkUrl.substring(8, checkUrl.length);

        //Buscar el Path en el arreglo
        var finded = $scope.urlCodes.find(
            (o) => o.path.toLowerCase() == checkUrl
        );

        if (finded) {

            $scope.leads.salesForceId = finded.code;
            $scope.leads.reazon = finded.reason ? finded.reason : "Formulario de contacto";


            saveContact();

            $scope.showSucess = true;
            $scope.limpiarCampos();

        } else {
            $scope.showError = true;
            console.log("Url no Encontrada");

        }

    }


    function saveContact() {

        data = {
            'oid': '00Dd0000000c6Xg',
            'debug': '1',
            'debugEmail': 'soportesalesforcecrm@suramericana.com.co',
            'first_name': $scope.leads.Nombre,
            'last_name': $scope.leads.Apellido,
            'email': $scope.leads.Correo,
            'lead_source': 'Sitios Web',
            'sub_origen__c': 'segurossura.com',
            'strCual_TR__c':  $scope.leads.reazon,
            '00Nd0000004DBal': $scope.leads.NumIdentificacion,
            '00Nd0000004DBax': $scope.leads.TipoIdentificacion,
            'Texto_Ciudad_Referido__c': $scope.leads.Ciudad,
            'mobile': $scope.leads.Celular,
            '00N0V000009BoOr': $scope.leads.url,
            '00N0V000009L0y5': $scope.leads.salesForceId
        }

        jQuery.ajax({
            url: "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8",
            dataType: 'jsonp',
            crossDomain: true,
            type: "POST",
            //async: false,
            data: data,
            success: function(success) {},
            error: function(error) {
                console.log(error);
            }
        });

    }

    $scope.init();

    $scope.searchTextChange = function(text) {

        if (text) {

            $scope.cities.filter(

                (c) => c.descripcion.toLowerCase().indexOf(text.toLowerCase) === 0

            );

        }

    }

    $scope.selectedItemChange = function(item) {

        $scope.leads.Ciudad = item.tipo;

    }


    $scope.getCities = function() {

        var query = {
            api: "public",
            urlParams: ["QueryParam"],
            service: "",
            data: {
                type: "CIUDADESDEPARTMTOS"
            }
        };

        segurosServices.invokeService(query).then(
            function(result) {

                $scope.cities = result.respuestaListaParametros.parametros;

            },
            function() {

                $scope.showCitiesError = true;

            }
        );
    };

});