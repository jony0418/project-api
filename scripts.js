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
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 10,
    });
}

// Search function
searchButton.addEventListener('click', async () => {
    const location = locationSearch.value;
    const min = minPrice.value;
    const max = maxPrice.value;

    if (!location || !min || !max) {
        alert('Please fill in all search fields.');
        return;
    }

    // Fetch data from SimplyRETS API and filter by price range
    const properties = await fetchProperties(location, min, max);

    // Display properties on Google Maps
    displayPropertiesOnMap(properties);
});

// Fetch data from SimplyRETS API and filter by price range (function definition)
async function fetchProperties(location, min, max) {
    const url = new URL('https://api.simplyrets.com/properties');
    const params = {
        q: location,
        minprice: min,
        maxprice: max,
    };

    url.search = new URLSearchParams(params);

    const response = await fetch(url, {
        headers: {
            'Authorization': 'Basic ' + btoa(SIMPLYRETS_API_KEY + ':' + SIMPLYRETS_API_SECRET),
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching properties: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}

// Display properties on Google Maps (function definition)
function displayPropertiesOnMap(properties) {
    // Clear any existing markers
    clearMarkers();

    // Loop through properties and add markers to the map
    properties.forEach((property) => {
        const marker = new google.maps.Marker({
            position: {
                lat: property.geo.lat,
                lng: property.geo.lng,
            },
            map,
        });

        // Add an info window to display property details when the marker is clicked
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <h3>${property.address.full}</h3>
                <p>Price: $${property.listPrice}</p>
                <p>Bedrooms: ${property.property.bedrooms}</p>
                <p>Bathrooms: ${property.property.bathsFull}</p>
            `,
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}

// Clear markers from the map (function definition)
function clearMarkers() {
    // Implement a function to clear any existing markers on the map
}