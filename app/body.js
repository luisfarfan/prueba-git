(function (angular) {
    'use strict';

    angular.module('IneiCpvMonitoreo')
        .controller('BodyCtrl', ['$scope', 'CPV', 'esriLoader', 'esriRegistry', '$http', '$location', function ($scope, CPV, esriLoader, esriRegistry, $http, $location) {
            var self = this;
            var monitoreo

            esriLoader.require([
                'esri/Map',
                'esri/layers/MapImageLayer',
                'esri/tasks/QueryTask',
                'esri/tasks/support/Query'
            ], function (Map, MapImageLayer, QueryTask, Query) {
                monitoreo = new MapImageLayer({
                    id: 'monitoreo_layers',
                    url: CPV.SEGMENTACION_URL,
                    opacity: 1
                });
            });

            $scope.switchCensos = function (censo) {
                console.log(censo)
                esriRegistry.get('mapaPrincipal').then(function (res) {
                    var view = res.view;
                    view.map.add(monitoreo);
                });
            };
        }]);
}(angular));