# Project Outline
Using the Google Maps API, show a map of your local area, with your location as a blue marker.

EXTRA:

1. Show the 3 restaurants in a 3km radius with the highest star rating with a yellow marker and show the name + rating of each restaurant.   
2. Add a button for each restaurant that shows directions from you to the restaurant. 

# View Example of Project (Directions are not working) 
Project: 

# Important things!!! PLEASE READ!!

1. IGNORE Files
- server.js
- package.json
- package-lock.json
- Folder* Node_modules
This is just to run the website online

2. Here are some links that will also help you with various requirments of the project. 
- Initilizing the map: https://developers.google.com/maps/documentation/javascript/adding-a-google-map?hl=en_US  
- When you receive a response for your search request it will look like this: https://developers.google.com/places/web-service/search#PlaceSearchResponses This is where you can access the "Rating" of the restaurant
- When searching for the restaurants, the API has a built in service called "nearby search" learn about it here: https://developers.google.com/maps/documentation/javascript/places#place_search_requests

3. You will NEED to add `&libraries=places` in between your API_KEY and &callback=initMap in the script link at the bottom of your HTML file. 

Example `https://maps.googleapis.com/maps/api/js?key=API_KEY&libraries=places&callback=initMap`
