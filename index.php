<?php
    // connecting to the static api through php, so I can use environment variables to store the apikey. You DON'T need to do this. You can link to the api directly in your html. 
	echo "<script defer src='https://maps.googleapis.com/maps/api/js?key=" . $_ENV["APIKEY"] . "&libraries=places&callback=initMap'></script>";

    include "index.html"; 
    
?>