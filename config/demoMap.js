define({
    "item": {
        "id": "",
        "owner": "",
        "orgId": "",
        "created": 1386962036000,
        "modified": 1425412391000,
        "guid": null,
        "name": null,
        "title": "CPV",
        "type": "Mapa web",
        "typeKeywords": ["INEI maps", "CPV mapa web gis"],
        "description": "Este mapa contiene informacion del CPV",
        "tags": ["map", "CPV"],
        "snippet": "",
        "thumbnail": "thumbnail/ago_downloaded.png",
        "documentation": null,
        "extent": [[-80.524322, -19.221502], [-68.483306, 0.798059]],
        "spatialReference": null,
        "accessInformation": null,
        "licenseInfo": null,
        "culture": "en",
        "properties": null,
        "url": null,
        "access": "public",
        "size": 4519,
        "appCategories": [],
        "industries": [],
        "languages": [],
        "largeThumbnail": null,
        "banner": null,
        "screenshots": [],
        "listed": false,
        "commentsEnabled": true,
        "numComments": 0,
        "numRatings": 0,
        "avgRating": 0,
        "numViews": 50960
    },
    "itemData": {
        "operationalLayers": [
             
                      
			{
                "id": "Limites_Nacionales_9799",
                "layerType": "ArcGISMapServiceLayer",
                "url": "http://192.168.202.84:6080/arcgis/rest/services/MONITOREO/LIMITES_NACIONALES_MONITOREO/MapServer",
                "visibility": true,
                "opacity": 1,
                "title": "Límites Nacionales",

            }            
            
            
        ],
        "baseMap": {
            "baseMapLayers": [{
                "url": "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer"
            }, {
                "url": "http://server.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer"
            }],
            "title": "Mapa de Fortalecimiento"
        },
        "spatialReference": {"wkid": 102100},
        "authoringApp": "WebMapViewer",
        "authoringAppVersion": "3.9",
        "version": "2.2",
        "applicationProperties": {
            "viewing": {
                "routing": {
                    "enabled": true
                },
                "basemapGallery": {
                    "enabled": true
                },
                "measure": {
                    "enabled": true
                },
                "search": {
                    "enabled": true,
                    "disablePlaceFinder": false,
                    "hintText": "Buscar",
                    "layers": [
                        {
                            "id": "Limites_Nacionales_9799",
                            "field": {
                                "name": "NOMBDEP",
                                "exactMatch": true,
                                "type": "esriFieldTypeString"
                            },
                            "subLayer": 3
                        },
                        {
                            "id": "Limites_Nacionales_9799",
                            "field": {
                                "name": "NOMBPROV",
                                "exactMatch": false,
                                "type": "esriFieldTypeString"
                            },
                            "subLayer": 4
                        },
                        {
                            "id": "Limites_Nacionales_9799",
                            "field": {
                                "name": "NOMBDIST",
                                "exactMatch": false,
                                "type": "esriFieldTypeString"
                            },
                            "subLayer": 5
                        }
                    ]
                }
            }
        }
    }
});
