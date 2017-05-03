(function (angular) {
    'use strict';

    angular.module('IneiCpvMonitoreo')
        .controller('SegmentacionCtrl', ['$sce', 'CPV', 'esriLoader', '$http', 'ineiWidgets', 'identificarCapas',
            function ($sce, CPV, esriLoader, $http, ineiWidgets, identificarCapas) {
                var self = this;
                self.viewLoaded = false;
                self.BASEURL = `http://192.168.200.123:82/services/`;
                self.tbody_data = ''
                // load esri modules
                esriLoader.require([
                    'esri/Map',
                    'esri/layers/MapImageLayer',
                    'esri/tasks/IdentifyTask',
                    'esri/tasks/support/IdentifyParameters'
                ], function (Map, MapImageLayer, IdentifyTask, IdentifyParameters) {
                    // CREA TODAS LAS CAPAS DISPONIBLES
                    var layers = new MapImageLayer({
                        id: 'monitoreo_layers',
                        url: CPV.MONITOREO_URL,
                        opacity: 1
                    });
                    // create the map
                    self.map = new Map({
                        basemap: 'streets'
                    });
                    self.map.add(layers);
                    self._view = null;


                    // Mapa loaded
                    self.onViewCreated = (view) => {
                        view.on('click', (evt) => {
                            //console.log("Click at: X:"+evt.x+", Y:"+evt.y);
                            var options = {
                                url: CPV.MONITOREO_URL,
                                width: view.width,
                                height: view.height,
                                mapExtent: view.extent,
                                geometry: evt.mapPoint,
                            };
                            identificarCapas.run(options, function (response) {
                                if (response.results.length) {
                                    response.results.map((result, index) => {
                                        console.log(result)
                                        switch (result.layerName) {
                                            case 'LIMITE_DEPARTAMENTO':
                                                self.getFieldsReporte(1)
                                                break;
                                            case 'DISTRITOS SEGMENTADOS EN LA PROVINCIA':
                                                self.getFieldsReporte(2)
                                                break;
                                            case 'AVANCE SEGMENTADO DEL DISTRITO':
                                                self.getFieldsReporte(3)
                                                break;
                                            case 'CENTROS POBLADOS':
                                                self.getFieldsReporte(4)
                                                break;
                                            case 'MANZANA':
                                                self.getFieldsReporte(5)
                                                break;
                                            case 'VIVIENDAS':
                                                self.getFieldsReporte(6)
                                                break;
                                        }
                                    })
                                } else {
                                    new PNotify({
                                        text: 'No se puede mostrar información de Capas',
                                        icon: 'icon-info22',
                                        addclass: 'alert alert-styled-left',
                                        type: 'warning'
                                    });
                                }

                            });
                        });
                        // provide the view instance to the bound scope
                        // of the custom esri-home-button directive
                        self.mapView = view;
                        // update the bound property for ng-show
                        self.viewLoaded = true;
                    };
                    // Toggle Widgets
                    self.toggleWidget = function (evt, index) {
                        $('.esri-component.esri-' + index + '.esri-widget').toggle();
                        evt.stopPropagation();
                    };
                    self.getFieldsReporte = (nivel) => {
                        let url = `${self.BASEURL}campos/${nivel}/`;
                        return $http.get(url).success((data) => {
                            self.drawReporte(data)
                        })
                    }
                    self.drawReporte = (data) => {
                        self.tbody_data = ''
                        data.map((value, index) => {
                            let dato_random = Math.floor((Math.random() * 100) + 1);
                            if (value.islabel == 1) {
                                self.tbody_data += `<tr><td><span class="text-black">${value.descripcion}</span></td><td>${dato_random}</td></tr>`;
                            } else if (value.islabel == 2) {
                                self.tbody_data += `<tr><td>${value.descripcion}</td><td>${dato_random}</td></tr>`;
                            } else if (value.islabel == 0) {
                                self.tbody_data += `<tr><td colspan="2"><span class="text-black">${value.descripcion}</span></td></tr>`;
                            }
                        });
                        $('#modal_reportes').modal()
                    }
                });// esriLoader
                ineiWidgets.render();
            }]);// NG-CONTROLLER
}(angular));
