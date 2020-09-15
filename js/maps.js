var map;
var currentLocation;

var restaurantMarkers = new Array(); 
   
var directionsService = new google.maps.DirectionsService();
var directionsRenderer = new google.maps.DirectionsRenderer();

function initMap() {

    // sets maps to an arbitrary location before it Geolocates to your IP Address
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 12
    });
    getPos(); 
    plotRestaurants(); 
} // initMap

function getPos () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          // currentPos is a location OBJECT, made up of a latitude param, and a longitude param. 
          currentLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            myLocation = new google.maps.Marker({
                position: currentLocation,
                labelContent: "Center",
                // access the blue teardrop marker
                icon: {                             
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                }
            });

            // new marker on maps
            myLocation.setMap(map); 
            // sets center of the map to your location
            map.setCenter(currentLocation);
      }, function() {
        handleLocationError(true, marker, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, marker, map.getCenter());
    } // if/else
} // getPos

  // error catch function
function handleLocationError(browserHasGeolocation, marker, currentPos) {
    marker.setPosition(currentPos);
    marker.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    marker.open(map);
} // location Error

function plotRestaurants() {

    var directionsDiv = document.getElementById("directions"); 
    var ratingsDiv = document.getElementById("ratings"); 
    
    var request = {
        location: currentLocation,
        radius: '3000',
        type: ['restaurant']
    };

    callback = function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            // results is the json array that is returned by a successful request
            results.sort(function(a, b){
                return b.rating-a.rating;
            });

            for (var i = 0; i < 3; i++) {
                // adds a mar 
                restaurantMarkers.push(new google.maps.Marker({
                    position: results[i].geometry.location,
                    map: map, 
                    icon: {                             
                        url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                    }
                })); 
                
                restaurantMarkers[i].setMap(map); 
                
                var rating = document.createElement("H4");  //<button> element
                var textA = document.createTextNode(results[i].name + " - Rating: " + results[i].rating); // Create a text node
                rating.appendChild(textA);
                rating.className = "ratingList";
                ratingsDiv.appendChild(rating);//to show on myView 

                var direction = document.createElement("BUTTON");  //<button> element
                var textB = document.createTextNode(results[i].name); // Create a text node
                direction.appendChild(textB);
                direction.setAttribute("id", "restaurant" + i); 
                direction.addEventListener('click', function(){ directions(this.id)});
                direction.className = "restaurantButton";
                directionsDiv.appendChild(direction);//to show on myView 
            } // for
        }
    } // callback

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
} // plotMeetSpots

function directions(id) { 

    alert("Id:" + id); 
    var arrayIndex = id.substring(10, id.length+1);
    alert("Index: " + arrayIndex); 
    var destinationRestaurant = restaurantMarkers[arrayIndex].getPosition(); 
    alert("destObj: " + destinationRestaurant); 
    alert("curLoc: " + currentLocation.lat); 

    var request = {
        origin: currentLocation,
        destination: destinationRestaurant,
        travelMode: 'DRIVING'
    };

    directionsService.route(request, function(response, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
    directionsRenderer.setMap(map);
} // directions
