var map;
var infowindow;
var markers = [];
var startLatLng;
var endObj = {
	lat : 1.0,
	lng : 1.0
};
var directionsService;
var directionsDisplay;

function initMap() {
	var latitude = document.getElementById('latitude').value;
	var longitude = document.getElementById('longitude').value;
	var pyrmont = {
		lat : 37.615504,
		lng : -122.389499
	};
	pyrmont.lat = Number(latitude);
	pyrmont.lng = Number(longitude);
	
	
	map = new google.maps.Map(document.getElementById('map'), {
		center : pyrmont,
		zoom : 18
	});

	infowindow = new google.maps.InfoWindow();
	var geocoder = new google.maps.Geocoder;
	geocoder.geocode({
		'location' : pyrmont
	}, function(results, status) {
		if (status === 'OK') {
			if (results[1]) {
				map.setZoom(16);
				var marker = new google.maps.Marker({
					position : pyrmont,
					animation : google.maps.Animation.BOUNCE,
					map : map,
				});

				infowindow.setContent(results[1].formatted_address);
				infowindow.open(map, marker);
			} else {
				window.alert('No results found');
			}
		} else {
			window.alert('Geocoder failed due to: ' + status);
		}
	});

	var placeType = document.getElementById('placeType').value;
	//var onChangeHandler = function() {
		nearByPlace(pyrmont);
	//};
	//document.getElementById('placeType').addEventListener('change',
	//		onChangeHandler);
}

function nearByPlace(start) {
	var service = new google.maps.places.PlacesService(map);
	var placeType = document.getElementById('placeType').value;
	service.nearbySearch({
		location : start,
		radius : 500,
		types : [ placeType ]
	}, callback);
}

function callback(results, status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		clearMarkers();
		for (var i = 0; i < results.length; i++) {
			createMarker(results[i]);
		}
	}
}

function createMarker(place) {

	var placeLoc = place.geometry.location;
	// alert(place.geometry.location);
	var marker = new google.maps.Marker({
		map : map,
		animation : google.maps.Animation.DROP,
		icon : 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
		position : place.geometry.location
	});
	markers.push(marker);
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(place.name+'<p><input type=button value=Route onclick=getRoute()>&nbsp;&nbsp;<input type=button value=Go onclick=move()>');
		infowindow.open(map, this);
		//document.getElementById('end').value = place.name;
		endObj.lat = place.geometry.location.lat();
		endObj.lng = place.geometry.location.lng();
	});
	
}

function clearMarkers() {
	setMapOnAll(null);
	markers = [];
	if (directionsDisplay != null) {
		directionsDisplay.setMap(null);
		directionsDisplay = null;
	}
}
function setMapOnAll(map) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

function getRoute() {

	if (directionsDisplay != null) {
		directionsDisplay.setMap(null);
		directionsDisplay = null;
	}
	directionsService = new google.maps.DirectionsService;
	directionsDisplay = new google.maps.DirectionsRenderer;

	directionsDisplay.setMap(map);
	calculateAndDisplayRoute(directionsService, directionsDisplay);

}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
	directionsService.route({
		origin : new google.maps.LatLng(37.615504, -122.389499),
		destination : new google.maps.LatLng(endObj.lat, endObj.lng),
		travelMode : google.maps.TravelMode.DRIVING
	}, function(response, status) {
		if (status === google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		} else {
			window.alert('Directions request failed due to ' + status);
		}
	});
}
function move()
{
	clearMarkers();
	map = new google.maps.Map(document.getElementById('map'), {
		center : endObj,
		zoom : 18
	});
	var marker = new google.maps.Marker({
		position : endObj,
		animation : google.maps.Animation.BOUNCE,
		map : map,
	});

	//infowindow.setContent(results[1].formatted_address);
	//infowindow.open(map, marker);
	
	
}

window.onload = function () {
	var modal = document.getElementById('myModal');

	// Get the button that opens the modal
	var btn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks the button, open the modal
	btn.onclick = function() {
	    modal.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    modal.style.display = "none";
	}
}
//Get the modal


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
