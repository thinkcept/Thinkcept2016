var map;
var infowindow;
var markers = [];
var startLatLng;
var startObj = {
	lat : 1.0,
	lng : 1.0
};
var endObj = {
		lat : 1.0,
		lng : 1.0
	};

var direction = {
	start: {
		lat:1,
		lng:1
	},
	end: {
		lat:1,
		lng:1
	}
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
	startObj = pyrmont;
	
	map = new google.maps.Map(document.getElementById('map'), {
		center : startObj,
		zoom : 18
	});

	infowindow = new google.maps.InfoWindow();
	var geocoder = new google.maps.Geocoder;
	geocoder.geocode({
		'location' : startObj
	}, function(results, status) {
		if (status === 'OK') {
			if (results[1]) {
				map.setZoom(18);
				var marker = new google.maps.Marker({
					position : startObj,
					animation : google.maps.Animation.BOUNCE,
					map : map,
					draggable: true
				});
				//alert(this.position);
//				var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + pyrmont.lat + "," + pyrmont.lng+"&sensor=true";
//				findAddressByLatLon(url, "src");
				
				//document.getElementById('src').value = results[1].formatted_address;
				infowindow.setContent(results[1].formatted_address);
				infowindow.open(map, marker);
				
				direction.start.lat = startObj.lat;
				direction.start.lng = startObj.lng;
				
				var geocoder = new google.maps.Geocoder;

				geocoder.geocode({'location': startObj}, function(results, status) {
				    if (status === google.maps.GeocoderStatus.OK) {
				      if (results[1]) {
				        console.log(results[1].place_id);
				        document.getElementById('src').value = results[1].place_id;
				      } else {
				        window.alert('No results found');
				      }
				    } else {
				      window.alert('Geocoder failed due to: ' + status);
				    }
				  });
				
				google.maps.event.addListener(marker, 'click', function() {
					console.log(this.position.toJSON());
					infowindow.open(map, this);
					document.getElementById('src').value = place.place_id;//place.name + ", San Francisco, CA 94128, United States";
				});
			} else {
				window.alert('No results found');
			}
		} else {
			window.alert('Geocoder failed due to: ' + status);
		}
	});

	var placeType = document.getElementById('placeType').value;
	if(placeType != "")
	{
		nearByPlace(placeType);
	}
	
}

function nearByPlace(placeType) {
	var service = new google.maps.places.PlacesService(map);
	//var placeType = document.getElementById('placeType').value;
	var latitude = document.getElementById('latitude').value;
	var longitude = document.getElementById('longitude').value;
	var start = {
			lat : 1.0,
			lng : 1.0
		};
	start.lat = Number(latitude);
	start.lng = Number(longitude);
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
	//alert(place.geometry.location);
	var marker = new google.maps.Marker({
		map : map,
		animation : google.maps.Animation.DROP,
		icon : 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
		position : place.geometry.location,
		draggable: true
	});
	markers.push(marker);
	google.maps.event.addListener(marker, 'click', function() {
		console.log("End: " + this.position.toJSON());
		infowindow.setContent(place.name+'<p><input type=button value=Route onclick=getRoute()>&nbsp;&nbsp;<input type=button value=Go onclick=move()></p><span id="duration"></span>');
		infowindow.open(map, this);
		document.getElementById('dest').value = place.place_id;  //place.name + ", San Francisco, CA 94128, United States";

		direction.end.lat = this.position.toJSON().lat;
		direction.end.lng = this.position.toJSON().lng;
		
		endObj.lat = place.geometry.location.lat();
		endObj.lng = place.geometry.location.lng();
		
//		var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + endObj.lat + "," + endObj.lng+"&sensor=true";
//		findAddressByLatLon(url, "dest");
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

function calculateAndDisplayRoute1(directionsService, directionsDisplay) {
	var start = new google.maps.LatLng(direction.start.lat, direction.start.lng);
    //var end = new google.maps.LatLng(38.334818, -181.884886);
    var end = new google.maps.LatLng(direction.end.lat, direction.end.lng);
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(start);
    bounds.extend(end);
    map.fitBounds(bounds);
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            directionsDisplay.setMap(map);
        } else {
            alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
        }
    });
}


function calculateAndDisplayRoute(directionsService, directionsDisplay) {
//	alert(document.getElementById('src').value);
//	alert(document.getElementById('dest').value);
	var startPlaceId = document.getElementById('src').value;
	var endPlaceId = document.getElementById('dest').value;
	console.log("startPlaceId = " + startPlaceId);
	console.log("endPlaceId = " + endPlaceId);
	
	
	var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + direction.start.lat + "," + direction.start.lng+"&sensor=true";
	findAddressByLatLon(url, 'srcPlaceName');
	
	var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + direction.end.lat + "," + direction.end.lng+"&sensor=true";
	findAddressByLatLon(url, "destPlaceName");
	
	var startPlaceName = document.getElementById('srcPlaceName').value;
	var endPlaceName = document.getElementById('destPlaceName').value;
	console.log("startPlace Name = " + startPlaceName);
	console.log("endPlace Name = " + endPlaceName);
	
	var startLatLng = new google.maps.LatLng(direction.start.lat, direction.start.lng);
	var endLatLng = new google.maps.LatLng(direction.end.lat, direction.end.lng);
	
	var bounds = new google.maps.LatLngBounds(startLatLng, endLatLng);
//    bounds.extend(start);
//    bounds.extend(end);
    map.fitBounds(bounds);
    
    
	directionsService.route({
		origin : startLatLng,
		destination : endLatLng,
//		origin : "Harbor Village Kitchen, International Terminal, South Mcdonnell Road, San Francisco, CA 94128, United States",
//		destination : "Lori's Diner, 900 North Point Street, San Francisco, CA 94128, United States",
//		origin : google.maps.Place(startPlaceId),
//		destination : google.maps.Place(endPlaceId),
		travelMode : google.maps.TravelMode["WALKING"]
	}, function(response, status) {
		
		var distance = google.maps.geometry.spherical.computeDistanceBetween (startLatLng, endLatLng);
		console.log("Distance between two location = " + distance + " m.");
		if (status === google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
			var point = response.routes[ 0 ].legs[ 0 ];
			display = document.querySelector('#duration');
			display.textContent = "Walking Time: " +  point.duration.text + ", Distance: "+parseFloat(distance).toFixed(2)+"m.";
			//document.getElementById("duration").value = "Travel Time :"+point.duration.text;
	        console.log( 'Estimated travel time: ' + point.duration.text + ' (' + point.distance.text + ')' );
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
	document.getElementById('latitude').value = endObj.lat;
	document.getElementById('longitude').value = endObj.lng;
	direction.start.lat = endObj.lat;
	direction.start.lng = endObj.lng;
	startObj = endObj;

	//infowindow.setContent(results[1].formatted_address);
	//infowindow.open(map, marker);
	
	
}

window.onload = function () {
	var modal = document.getElementById('myModal');
	
	var interestId = document.getElementById('interestId');
	var flag = document.getElementById('flag').value;

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
	
	if(flag == undefined || flag == null || flag == '') {
		interestId.style.display = "none";
	} else {
		interestId.style.display = "block";
		var fiveMinutes = 60 * Number(document.getElementById("timeLeft").value),
	    display = document.querySelector('#time');
		startTimer(fiveMinutes, display);
	}
}
//Get the modal


// When the user clicks anywhere outside of the modal, close it
//window.onclick = function(event) {
//    if (event.target == modal) {
//        modal.style.display = "none";
//    }
//}


function findAddressByLatLon(url, targetId){
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
        	var obj = JSON.parse(xmlhttp.responseText);
        	document.getElementById(targetId).value=obj.results[1].formatted_address;
            console.log("targetId: " + targetId + " " + document.getElementById(targetId).value);
        }
    }
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
}

//function callback(response) {
//	console.log(response);
//}

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

// Countdown Counter
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}
