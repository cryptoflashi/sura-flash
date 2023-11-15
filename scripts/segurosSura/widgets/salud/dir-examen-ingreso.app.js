var appDirExamenes = angular.module("examenIngreso", ['ngMaterial']);
appDirExamenes.controller("dirExamController", function($scope, $http, $window) {

    $scope.mql = $window.matchMedia('(max-width: 972px)');
    $scope.mql.addListener(screenTest);
    $scope.media = true;
    $scope.show = false;
    $scope.sinresultados = false;
    $scope.resultados = 0;
    $scope.datosAJ = null;

    function screenTest(e, apply = false) {
        if (e.matches) {
            /* the viewport is 972 pixels wide or less */
            $scope.media = false;

            if (!apply) {
                $scope.$apply();
            }
        } else {
            /* the viewport is more  than 972 pixels wide */
            $scope.media = true;
            if (!apply) {
                $scope.$apply();
            }
        }
    }

    $scope.validateField = function(field) {
        return $scope.dirExam[field].$touched && $scope.dirExam[field].$invalid ? true : false;
    }

    $scope.ciudades = [

        { key: "Apartado", value: "Apartadó" },
        { key: "Armenia", value: "Armenia" },
        { key: "Barrancabermeja", value: "Barrancabermeja" },
        { key: "Barranquilla", value: "Barranquilla" },
        { key: "Bogota D.C.", value: "Bogotá D.C." },
        { key: "Bucaramanga", value: "Bucaramanga" },
        { key: "Buenaventura", value: "Buenaventura" },
        { key: "Guadalajara de Buga", value: "Buga" },
        { key: "Cali", value: "Cali" },
        { key: "Cartagena", value: "Cartagena" },
        { key: "Cartago", value: "Cartago" },
        { key: "Cucuta", value: "Cúcuta" },
        { key: "Duitama (Boyacá)", value: "Duitama (Boyacá)" },
        { key: "Espinal", value: "Espinal" },
        { key: "Florencia", value: "Florencia" },
        { key: "Gigante", value: "Gigante" },
        { key: "Girardot", value: "Girardot" },
        { key: "Ibague", value: "Ibagué" },
        { key: "La Dorada", value: "La Dorada (Caldas)" },
        { key: "Magangue", value: "Magangué" },
        { key: "Magdalena", value: "Magdalena" },
        { key: "Maicao", value: "Maicao " },
        { key: "Manizales", value: "Manizales" },
        { key: "Medellin", value: "Medellín" },
        { key: "Mocoa", value: "Mocoa" },
        { key: "Montelibano", value: "Montelibano" },
        { key: "Monteria", value: "Montería" },
        { key: "Neiva", value: "Neiva" },
        { key: "Palmira", value: "Palmira" },
        { key: "Pasto", value: "Pasto" },
        { key: "Pereira", value: "Pereira" },
        { key: "Popayan", value: "Popayán" },
        { key: "Riohacha", value: "Riohacha" },
        { key: "Rionegro", value: "Rionegro" },
        { key: "San Andres Islas", value: "San Andres Islas" },
        { key: "San Gil", value: "San Gil" },
        { key: "Santa Marta", value: "Santa Marta" },
        { key: "Segovia", value: "Segovia" },
        { key: "Sincelejo", value: "Sincelejo" },
        { key: "Sogamoso", value: "Sogamoso (Boyacá)" },
        { key: "Tulua", value: "Tuluá" },
        { key: "Tunja", value: "Tunja" },
        { key: "Valledupar", value: "Valledupar" },
        { key: "Villavicencio", value: "Villavicencio" },
        { key: "Yopal", value: "Yopal" }

    ];

    $scope.servicios = [

        { key: "Todos", value: "Todos los servicios" },
        { key: "Acido úrico", value: "Acido úrico" },
        { key: "Antígeno prostático", value: "Antígeno prostático" },
        { key: "Audiometría", value: "Audiometría" },
        { key: "Bilirrubinas", value: "Bilirrubinas" },
        { key: "Citología vaginal", value: "Citología vaginal" },
        { key: "Citoquimico de orina", value: "Citoquimico de orina" },
        { key: "Colesterol HDL", value: "Colesterol HDL" },
        { key: "Colesterol total", value: "Colesterol total" },
        { key: "Creatinina", value: "Creatinina" },
        { key: "Cuadro hemático ", value: "Cuadro hemático " },
        { key: "Ecocardiograma Modo M Bidimensional y Doppler Color", value: "Ecocardiograma Modo M Bidimensional y Doppler Color" },
        { key: "Ecografía adbominal total", value: "Ecografía adbominal total" },
        { key: "Ecografía pélvica", value: "Ecografía pélvica" },
        { key: "Electrocardiograma", value: "Electrocardiograma" },
        { key: "Espirometria", value: "Espirometria" },
        { key: "Exámen médico general de Ingreso", value: "Exámen médico general de Ingreso" },
        { key: "Exámen médico general de Ingreso Domiciliario", value: "Exámen médico general de Ingreso Domiciliario" },
        { key: "Fosfatasa alcalina", value: "Fosfatasa alcalina" },
        { key: "Glicemia en ayunas", value: "Glicemia en ayunas" },
        { key: "Hemoglobina glicosada", value: "Hemoglobina glicosada" },
        { key: "Impedanciometría", value: "Impedanciometría" },
        { key: "Mamografía bilateral", value: "Mamografía bilateral" },
        { key: "Parcial de orina", value: "Parcial de orina" },
        { key: "Prueba de esfuerzo", value: "Prueba de esfuerzo" },
        { key: "Prueba de VIH", value: "Prueba de VIH" },
        { key: "Radiografia de Torax", value: "Radiografia de Torax" },
        { key: "T3", value: "T3" },
        { key: "Tiroxina T4 libre", value: "Tiroxina T4 libre" },
        { key: "Toma seriada de presión arterial", value: "Toma seriada de presión arterial" },
        { key: "Transaminasa oxaloacetica", value: "Transaminasa oxaloacetica" },
        { key: "Transaminasa piruvica", value: "Transaminasa piruvica" },
        { key: "Triglicéridos", value: "Triglicéridos" },
        { key: "TSH", value: "TSH" },
        { key: "Urea", value: "Urea" },
        { key: "VSG", value: "VSG" }
    ];

    $scope.eje = function() {

        $.ajax({
            dataType: "jsonp",
            url: "https://www.sura.com/_layouts/PratechServices/PratechGenericService.ashx?action=getall&list=Directorio%20para%20Examenes%20de%20Ingreso",
            data: '',
            success: success,
            error: error
        });


        screenTest($scope.mql, true);
    }

    var success = function(data) {

        $scope.datosAJ = data.QueryResult;

    }

    var error = function(error) {
        alert('Error' + error);
    }


    $scope.buscar = function(num) {


        if ((num == 0 && $scope.dirExam['ciudad'].$invalid) || (num == 1 && $scope.dirExam['servicio'].$invalid)) {

            $("div.form-group")[num].className = $("div.form-group")[num].className.replace("success", " ");
            $scope.show = false;
            $scope.sinresultados = false;

        } else {

            $("div.form-group")[num].className = $("div.form-group")[num].className + " success";

        }


        if (!$scope.dirExam.$invalid) {

            var city = $scope.ciudadSelecionada;
            var service = $scope.servicioSelecionado;

            var index = 0;

            $scope.datosAMostrar = $scope.datosAJ.filter(

                (d) => {
                    if (service == "Todos") {
                        return d.Todos_x0020_los_x0020_servicios != null && d.Title == city;
                    } else {
                        return d.Title == city && (d.Servicios.toLowerCase().indexOf(service.toLowerCase()) >= 0);
                    }
                }

            );


            $scope.show = $scope.datosAMostrar.length > 0 ? true : false;
            $scope.sinresultados = !$scope.show;

        }
    }

    $scope.obtenerServicio = function(servicio) {

        if (servicio) {
            return servicio.replace(/(<([^>]+)>)/ig, "").replace("&nbsp;", "");
        } else {
            return " ";
        }

    }

    $scope.obtenerEmail = function(email) {

        if (email) {
            return email.replace("mailto:", "");
        } else {
            return " ";
        }

    }

    $scope.obtenerCiudades = function() {

        $scope.ciudades = $scope.datosAJ.map((data) => {
            if (data.Servicios) {
                return data.Title
            }
        });
        $scope.ciudades.sort();
        $scope.ciudades = $scope.ciudades.filter(
            (valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual
        );
        $scope.ciudades = $scope.ciudades.map((data) => ({ key: data, value: data }));
        $scope.$apply();

    }
});