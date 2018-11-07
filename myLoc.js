window.onload = getMylocation;

function getMylocation(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(displayLocation,displayError);
    }else{
        alert("Oops,no geolocation support");
    }
}

function displayLocation(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var div = document.getElementById("location");
    div.innerHTML = "You are at latitude: " + latitude + ", longitude: " + longitude;

    var km = computeDistance(position.coords,ourCoords);
    var distance = document.getElementById("distance");
    distance.innerHTML = "You are " + km + "km from the WichedlySmart HQ";

    //showMap(position.coords);
}

function computeDistance(startCoords,destCoords){
    var startLatRads = degreeToRadians(startCoords.latitude);
    var startLongRads = degreeToRadians(startCoords.longitude);
    var destLatRads = degreeToRadians(destCoords.latitude);
    var destLongRads = degreeToRadians(destCoords.longitude);

    var Radius = 6371;         //地球半径 km
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
                    Math.cos(startLatRads) * Math.cos(destLatRads) *
                    Math.cos(startLongRads-destLongRads)) * Radius;
    
    return distance;
}

function degreeToRadians(degree){
    var radians = (degree * Math.PI)/180;
    return radians;
}

var ourCoords = {
    latitude:47.624851,
    longitude:-122.52099
};

function displayError(error){
    var errorTypes = {
        0:"Unknown error",
        1:"Permission denied by user",
        2:"Position is not available",
        3:"Request timed out"
    };
    var errorMessage = errorTypes[error.code];
    if(error.code == 0||error.code == 2){
        errorMessage = errorMessage + " " +error.message;
    }
    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}










var map;

function showMap(coords){
    var googleLatAndlong = new google.map.LatLng(coords.latitude,coords.longitude);

    var mapOptions = {
        zoom:10,
        center:googleLatAndlong,
        mapTypeId:google.maps.mapTypeId.ROADMAP
    };
    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv,mapOptions);
}
