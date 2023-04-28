// Replace with your own API keys
const SIMPLYRETS_API_KEY = 'simplyrets';
const SIMPLYRETS_API_SECRET = 'simplyrets';
const GOOGLE_MAPS_API_KEY = 'AIzaSyBTQ2hAfA9t3o_QUNZ0rn8mCg71Tgj7CZw';

// Get DOM elements
const searchButton = document.getElementById('search-button');
const locationSearch = document.getElementById('location-search');
const minPrice = document.getElementById('min-price');
const maxPrice = document.getElementById('max-price');
const mapDiv = document.getElementById('map');

// Initialize Google Maps
let map;
function initMap() {
    map = new google.maps.Map(mapDiv, {
        center: { lat: 32.796574, lng: -96.778978 },
        zoom: 15,
    });
}
initMap();



// Clear markers from the map (function definition)
