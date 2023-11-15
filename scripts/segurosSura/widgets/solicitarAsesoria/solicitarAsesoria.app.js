var appAsesoria = angular.module("asesoriaApp", []);
appAsesoria.controller("solicitarController", function($scope, $http, $timeout) {
    var typeDoc = window.ServicesConfig.TiposDocumentos;
    var data = {};
    var type = "";
    var list = "";

    $scope.init = function() {
        $scope.ltIdTypes = typeDoc.tiposDeIdentificacion;
        $scope.leads = "";
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

    /*
    $scope.submit = function() {

        $scope.showSucess = false;
        $scope.showErrors = false;
        $scope.formNotValid = !($scope.leads.TipoIdentificacion != undefined && $scope.leads.NumIdentificacion != undefined && $scope.leads.Nombre != undefined && $scope.leads.Ciudad != undefined && $scope.leads.Celular != undefined && $scope.leads.Correo != undefined);
        $scope.emailNotValid = !$scope.checkValidEmail($scope.leads.Correo);
        $scope.cellphoneNotValid = !$scope.checkValidCellPhone($scope.leads.Celular);
        if ($scope.formNotValid == false && $scope.emailNotValid == false && $scope.cellphoneNotValid == false) {
            enviarContacto();
            // ANALYTICS
            dataLayer.push({
                'nombredeformulario': document.location.pathname
            });
            dataLayer.push({
                'event': 'Registro_Exitoso'
            });
            $scope.showSucess = true;
        } else {
            $scope.showErrors = true;
            $scope.showSucess = false;
        }
    };
    $scope.checkValidEmail = function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    $scope.checkValidCellPhone = function(cellphone) {
        var re = /^([0-9]{10})$/;
        return re.test(cellphone);
    };

    */


    $scope.limpiarCampos = function() {
        $('#campos').find('input:text').val('');
        $scope.leads = "";
    }

    function enviarContacto() {
        //Se valida que la url contenga utm
        $scope.leads.url = location.href.indexOf("?utm") > 0 ? location.href.substring(0, location.href.indexOf("?utm")).toLowerCase() : location.href.toLowerCase();

        $scope.leads.url = location.href.indexOf("#") > 0 ? location.href.substring(0, location.href.indexOf("#")).toLowerCase() : location.href.toLowerCase();

        //$scope.leads.url = location.href;
        type = 'SP.Data.ContactosListItem';
        list = "'Contactos'";
        saveContact(type, list)
        if ($scope.leads.url == "https://www.segurossura.com.co/paginas/movilidad/autos/centros-de-servicio/inicio.aspx".toLowerCase()) {
            //GUARDA EN LA LISTA CONTACTOSAUTOS CENTRO DE SERVICIOS
            type = 'SP.Data.ContactosAutosListItem';
            list = "'ContactosAutos'";
            saveContact(type, list)
        }
        if ( //GUARDA EN LA LISTA CONTACTOSTELEVENTAS TELEVENTAS
            $scope.leads.url == "https://www.segurossura.com.co/paginas/hogar/plan-inversion-protegida.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/vida/vida-para-todos.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/movilidad/autos/plan-carros-electricos.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/exequias/inicio.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/exequias/exequias-global-plus.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/exequias/exequias-global.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/exequias/exequias-clasico-plus.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/exequias/exequias-clasico.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/exequias/exequias-basico-plus.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/exequias/exequias-basico.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/movilidad/bicicleta/centros-de-servicio-para-bici.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/salud/salud-evoluciona.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/hogar/inicio.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/hogar/hogar-sura.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/hogar/hogar-global.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/hogar/hogar-clasico.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/hogar/hogar-basico.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/otros-seguros/rc-familiar.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/empresas/bienes-y-patrimonio/plan-empresa-protegida.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/bienes-y-patrimonio/plan-empresario-sura.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/transporte/vehiculos-utilitarios-pesados.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/empresas/responsabilidad-civil/proteccion-legal.aspx".toLowerCase()) {

            type = 'SP.Data.ContactosTeleventasListItem';
            list = "'ContactosTeleventas'";
            saveContact(type, list)

        }
        if ( //GUARDA EN LA LISTA CONTACTOSASESORES CANAL TRADICIONAL
            $scope.leads.url == "https://www.segurossura.com.co/paginas/movilidad/vehiculos-utilitarios-y-pesados.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/vida/inicio.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/vida/capital-clasico.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/vida/vida-prorrogado.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/vida/vida-prorrogado.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/vida/vida-saldado.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/vida/vida-personal.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/vida/accidentes.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/vida/colectivo-vida.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/vida/credito-protegido.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/salud/planes.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/salud/salud-global.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/salud/salud-clasico.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/salud/salud-personalizado.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/salud/salud-mayores.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/salud/enfermedades-graves.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/futuro/renta-diaria.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/futuro/educacion.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/futuro/pension.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/futuro/renta-vitalicia.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/hogar/arrendamiento.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/otros-seguros/profesionales-salud.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/otros-seguros/profesionales-veterinarios.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/otros-seguros/embarcaciones-recreo.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/otros-seguros/energia-solar.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/bienes-y-patrimonio/equipo-electronico.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/bienes-y-patrimonio/incendio.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/bienes-y-patrimonio/multirriesgo-copropiedades.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/bienes-y-patrimonio/multirriesgo-empresarial.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/bienes-y-patrimonio/rotura-de-maquinaria.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/bienes-y-patrimonio/sustraccion-establecimientos.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/transporte/agentes-carga.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/transporte/carga-proyectos.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/transporte/embarcaciones-comerciales.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/transporte/embarcaciones-recreo.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/transporte/terrestres-carga.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/empresas/transporte/transporte-mercancias-automatico.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/empresas/transporte/transporte-mercancias-especifico.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/transporte/transporte-valores.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/ingenieria/construccion.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/ingenieria/energia-solar.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/empresas/ingenieria/maquinaria-y-equipo-de-contratistas.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/ingenieria/montaje.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/ingenieria/obras-civiles-terminadas.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/empresas/ingenieria/vivienda-segura-sura.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/empresas/cumplimiento/arrendamiento.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/cumplimiento/caucion-judicial.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/cumplimiento/disposiciones-legales.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/cumplimiento/eficiencia-energetica.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/cumplimiento/servicios-publicos-domiciliarios.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/cumplimiento/favor-entidades-estatales.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/cumplimiento/grandes-beneficiarios.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/cumplimiento/favor-particulares.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/agricola/cosecha.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/agricola/planta.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/fraude/fraude-empleado.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/fraude/infidelidad-riesgos-financieros.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/fraude/manejo-sector-publico.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/responsabilidad-civil/responsabilida-civil-ambiental.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/empresas/responsabilidad-civil/clinicas-hospitales.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/empresas/responsabilidad-civil/responsabilidad-del-empleador.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/responsabilidad-civil/derivada-de-cumplimiento.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/empresas/responsabilidad-civil/directivos-y-administradores.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/responsabilidad-civil/parqueaderos.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/responsabilidad-civil/danos-terceros.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/responsabilidad-civil/proteccion-digital.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/responsabilidad-civil/talleres.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/personas/programas-bienestar/plan-nueva-mente.aspx".toLowerCase() ||

            $scope.leads.url == "https://www.segurossura.com.co/Paginas/vida/empresario-sura.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/vida/vida-integral.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/vida/vida-deudores.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/vida/vida-docentes.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/futuro/renta-vitalicia-obligatoria.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/futuro/renta-conmutacion-pensional.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/futuro/renta-vitalicia-voluntaria.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/empleados/seguro-colectivo-autos.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/empleados/seguro-colectivo-hogar.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/empleados/seguro-colectivo-salud.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/empleados/seguro-colectivo-vida.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/empleados/seguro-educacion.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/empleados/seguro-pension.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/empleados/invalidez-y-sobrevivencia.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/empleados/seguro-renta.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/empresas/empleados/seguro-renta-voluntaria.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/empresas/empleados/seguro-renta-conmutacion-pensional.aspx".toLowerCase() ||

            $scope.leads.url == "https://www.segurossura.com.co/paginas/empresas/sector/servicios.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/empresas/sector/logistica-y-transporte.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/Paginas/empresas/bienes-y-patrimonio/multirriesgo-corporativo.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/empresas/responsabilidad-civil/hidrocarburos-mercancias-peligrosas.aspx".toLowerCase() ||
            $scope.leads.url == "hhttps://www.segurossura.com.co/paginas/empresas/sector/comercio.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/empresas/sector/industrial.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/salud/familiar-clasico-mayores.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/salud/familiar-global-mayores.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/te-aseguramos/vida.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/te-aseguramos/futuro.aspx".toLowerCase() ||

            $scope.leads.url == "https://www.segurossura.com.co/paginas/empresas/cumplimiento/contratistas-proveedores.aspx ".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/empresas/agricola/forestal.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/hogar/nuevos-planes.aspx".toLowerCase() ||
            $scope.leads.url == "https://www.segurossura.com.co/paginas/movilidad/autos/plan-carros-electricos.aspx".toLowerCase()

        ) {

            type = 'SP.Data.ContactosAsesoresListItem';
            list = "'ContactosAsesores'";
            saveContact(type, list)
        }

        $scope.showSucess = true;
        $scope.limpiarCampos();
        $scope.formDatos.$setPristine();
    }

    function saveContact(type, list) {
        $scope.leads.__metadata = {
            'type': type
        };
        var requestHeaders = {
            "ACCEPT": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
        }
        requestBody = JSON.stringify($scope.leads);
        jQuery.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle(" + list + ")/items",
            type: "POST",
            contentType: "application/json;odata=verbose",
            headers: requestHeaders,
            async: false,
            data: requestBody,
            success: function(success) {},
            error: function(error) {
                console.log(error);
            }
        });
    }
    $scope.init();
});