(function (angular) {
    'use strict';
    // App Modulo
    var App = angular.module('IneiCpvMonitoreo', ['ngRoute', 'esri.map', 'ngSanitize']);

    // CPV: Contiene todas las URLs usadas como WebService
    App.value('CPV', {
        MONITOREO_URL: 'http://arcgiscpv.inei.gob.pe:6080/arcgis/rest/services/MONITOREO/SEGMENTACION/MapServer',
        CENSO_EXPERIMENTAL_URL: 'http://arcgiscpv.inei.gob.pe:6080/arcgis/rest/services/MONITOREO/SEGMENTACION_EXPERIMENTAL/MapServer',
        RECLUTAMIENTO_URL: 'http://arcgiscpv.inei.gob.pe:6080/arcgis/rest/services/MONITOREO/RECLUTAMIENTO/MapServer',
        CONVENIOS_URL: 'http://arcgiscpv.inei.gob.pe:6080/arcgis/rest/services/MONITOREO/CONVENIOS/MapServer',
        ASIST_EMPADRONAMIENTO_URL: 'http://arcgiscpv.inei.gob.pe:6080/arcgis/rest/services/MONITOREO/EMPADRONAMIENTO_EXPERIMENTAL_0/MapServer',
        COBERT_EMPADRONAMIENTO_URL: 'http://arcgiscpv.inei.gob.pe:6080/arcgis/rest/services/MONITOREO/EMPADRONAMIENTO_EXPERIMENTAL_1/MapServer',
        CAPACITACION_URL: 'http://arcgiscpv.inei.gob.pe:6080/arcgis/rest/services/MONITOREO/CAPACITACION/MapServer',
        DESASTRES_NATURALES_1_URL: 'http://arcgiscpv.inei.gob.pe:6080/arcgis/rest/services/NIÑO_COSTERO/NIÑO_COSTERO_0/MapServer',
        DESASTRES_NATURALES_2_URL: 'http://arcgiscpv.inei.gob.pe:6080/arcgis/rest/services/NIÑO_COSTERO/NIÑO_COSTERO_2/MapServer',
    });

    App.factory('ineiWidgets', ['esriRegistry', 'esriLoader', function (esriRegistry, esriLoader) {

        function renderWidgets() {
            // load esri modules
            esriLoader.require([
                'esri/widgets/Legend',
                'esri/widgets/Print',
                'esri/widgets/LayerList',
                'esri/widgets/BasemapGallery',
                'esri/widgets/Search'
            ], function (Legend, Print, LayerList, BasemapGallery, Search) {
                esriRegistry.get('mapaPrincipal').then(function (res) {
                    //console.dir(res);
                    var view = res.view;

                    var search = new Search({
                        view: view
                    });
                    var gallery = new BasemapGallery({
                        view: view
                    });
                    var layerList = new LayerList({
                        view: view
                    });
                    var legend = new Legend({
                        view: view
                    });

                    // Adds widget below other elements in the top left corner of the view
                    view.ui.add(["toolbar", search, layerList, legend], {
                        position: "top-right"
                    });
                    // view.ui.add("select_capas", {
                    //     position: "top-left",
                    //     index: 0
                    // });
                    // establish a click listener on the view in the response
                    view.on('click', function (e) {
                        // set or update the point property that is used in the html template
                        //self.mapViewPoint = e.mapPoint;

                        // NOTE: $scope.$apply() is needed b/c the view's click event
                        // happens outside of Angular's digest cycle
                        //$scope.$apply();
                    });

                    // JQUERY FUNCTIONS
                    $('[data-popup="tooltip"]').tooltip();
                    $(document).on('click', '.sidebar-main-toggle', function (e) {
                        e.preventDefault();
                        $('body').toggleClass('sidebar-xs');
                    });
                });
            });
        }

        // Return list of aformentioned functions
        return {
            render: renderWidgets
        };
    }]);

    App.factory('identificarCapas', ['esriRegistry', 'esriLoader', function (esriRegistry, esriLoader) {

        function work(options, fn) {

            // load esri modules
            esriLoader.require([
                'esri/Map',
                'esri/layers/MapImageLayer',
                'esri/tasks/IdentifyTask',
                'esri/tasks/support/IdentifyParameters'
            ], function (Map, MapImageLayer, IdentifyTask, IdentifyParameters) {
                var identifyTask = new IdentifyTask(options.url);
                var identifyParams = new IdentifyParameters();

                identifyParams.tolerance = options.tolerance || 3;
                identifyParams.returnGeometry = true;
                identifyParams.layerIds = options.layerIds || [];
                identifyParams.layerOption = options.layerOption || 'top';
                identifyParams.width = options.width || 1000;
                identifyParams.height = options.height || 900;

                identifyParams.mapExtent = options.mapExtent || {};
                identifyParams.geometry = options.geometry || {};

                identifyTask.execute(identifyParams).then(fn);
            });
        }

        return {
            run: work
        }
    }]);

    App.directive('bindHtmlCompile', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function (evento) {
                    console.log(evento);
                    return scope.$eval(attrs.bindHtmlCompile);
                }, function (value) {
                    element.html(value);
                    $compile(element.contents())(scope);
                });
            }
        };
    }]);

    App.config(function ($locationProvider, $routeProvider, $httpProvider) {
        $locationProvider.hashPrefix('');
        //$locationProvider.html5Mode(true);
        $routeProvider
        // TODO: add home page
            .when('/', {
                templateUrl: 'app/views/mapa.html',
                controller: 'SegmentacionCtrl',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });

        //Enable cross domain calls
        $httpProvider.defaults.useXDomain = true;

        //Remove the header containing XMLHttpRequest used to identify ajax call
        //that would prevent CORS from working
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });

}(angular));
