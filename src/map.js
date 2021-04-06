import * as ajax from "./ajax.js";
import * as main from "./main.js";

let map;

let geojson = {
    type: 'FeatureCollection',
    features: []
};
let markers = [];

function initMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibXI3NzIxIiwiYSI6ImNrOHd3aTVzcTBsNXgzZ3BxN25pMWtzNTYifQ.ewczlV98wG62icflkbQmmw';

    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center: [-110, 40.8],
        zoom: 3.3
    });
}

//markers
function addFFMarkersToMap(geojson) {
    removeAllMarkers();
    // add markers to map
    for (let feature of geojson.features) {

        addMarker(
            feature.geometry.coordinates,
            feature.properties.title,
            feature.properties.description,
            "markerFF"
        );
    }
}

function addTopMarkersToMap(geojson) {
    removeAllMarkers();
    // add markers to map
    for (let feature of geojson.features) {

        addMarker(
            feature.geometry.coordinates,
            feature.properties.title,
            feature.properties.description,
            "markerTop"
        );
    }
}

function addMarker(coordinates, title, description, className) {
    let el = document.createElement('div');
    el.className = className;

    let marker = new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML('<h3>' + title + '</h3><p>' + description + '</p>'))
        .addTo(map);
    markers.push(marker);
}

function removeAllMarkers() {
    for (let m of markers) {
        m.remove();
    }
    markers = [];
}

//load in fast food restraunts
function loadFFData() {
    const url = "data/FastFoodRestaurants.csv";

    //callback function for when data shows up
    function dataLoaded(string) {
        let regions = main.parseCSV(string);
        geojson = makeGeoJSON(regions);
        addFFMarkersToMap(geojson);
        //console.log(geojson);
    }

    //start download
    ajax.downloadFile(url, dataLoaded);
}

function makeGeoJSON(regions) {
    //our "starter 'FeatureCollection" object we will be returning
    const geojson = { type: 'FeatureCollection', features: [] };

    //loop through all of the regions
    for (let r of regions) {
        //"empty" GeoJSON "feature"
        const newFeature = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: []
            },
            properties: {
                title: '',
                description: 'None'
            }
        };

        //initialize `.geometry.coordinates`
        newFeature.geometry.coordinates = [+r.longitude, +r.latitude];

        //name
        newFeature.properties.title = r.name;

        //city and state
        newFeature.properties.description = "Address: " + r.address + ", " + r.city + ", " + r.province + " " + r.postalCode + " Website:" + r.websites;

        //add the new feature to the array
        geojson.features.push(newFeature);
    }

    return geojson;
}

//top 50
function makeTopGeoJSON(regions) {
    //our "starter 'FeatureCollection" object we will be returning
    const geojson = { type: 'FeatureCollection', features: [] };

    //loop through all of the regions
    for (let r of regions) {
        //"empty" GeoJSON "feature"
        const newFeature = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: []
            },
            properties: {
                title: '',
                description: 'None'
            }
        };

        //initialize `.geometry.coordinates`
        newFeature.geometry.coordinates = [+r.longitude, +r.latitude];

        //name and rank
        newFeature.properties.title = "#" + r.ranking + " " + r.name;

        //address state
        newFeature.properties.description = r.address + ", " + r.county + ", " + r.state + " " + r.zip + " Website: " + r.website;

        //add the new feature to the array
        geojson.features.push(newFeature);
    }

    return geojson;
}

function loadTopData() {
    const url = "data/top-us-restaurants.csv";

    //callback function for when data shows up
    function dataLoaded(string) {
        let regions = main.parseTopCSV(string);
        geojson = makeTopGeoJSON(regions);
        addTopMarkersToMap(geojson);
        //console.log(geojson);
    }

    //start download
    ajax.downloadFile(url, dataLoaded);
}


export { initMap, addFFMarkersToMap, addTopMarkersToMap, addMarker, removeAllMarkers, loadFFData, loadTopData };