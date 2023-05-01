// Replace with your own API keys
var SIMPLYRETS_API_KEY = 'simplyrets';
var SIMPLYRETS_API_SECRET = 'simplyrets';
var GOOGLE_MAPS_API_KEY = 'AIzaSyBTQ2hAfA9t3o_QUNZ0rn8mCg71Tgj7CZw';

// Get DOM elements
var searchButton = document.getElementById('search-button');
var locationSearch = document.getElementById('location-search');
var minPrice = document.getElementById('min-price');
var maxPrice = document.getElementById('max-price');
var mapDiv = document.getElementById('map');

// Initialize Google Maps
let map;
function initMap() {
    map = new google.maps.Map(mapDiv, {
        center: { lat: 32.796574, lng: -96.778978 },
        zoom: 15,
    });
}

window.onload = function () {
    initMap();
}


// Clear markers from the map (function definition)
// Search function
searchButton.addEventListener('click', async () => {
    var location = locationSearch.value;
    var min = minPrice.value;
    var max = maxPrice.value;

    // if (!location || !min || !max) {
    //     alert('Please fill in all search fields.');
    //     return;
    // }

    try {
        // Move the map to the given city
        await moveMapToCity(location);

        // Fetch data from SimplyRETS API and filter by price range
        var properties = await fetchProperties(location, min, max);

        // Display properties on Google Maps
        displayPropertiesOnMap(properties, map);

        // Save search to localStorage
        saveSearchToHistory(location, min, max, properties.length);

    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please check the console for more details.');
    }
    // Update search history list
    updateSearchHistoryList();
});

// Fetch data from SimplyRETS API and filter by price range (function definition)
async function fetchProperties(location, min, max) {
    var url = new URL('https://api.simplyrets.com/properties');
    var params = {
        cities: location,
    };

    if (min) {
        params.minprice = min;
    }

    if (max) {
        params.maxprice = max;
    }

    url.search = new URLSearchParams(params);

    var response = await fetch(url, {
        headers: {
            'Authorization': 'Basic ' + btoa(SIMPLYRETS_API_KEY + ':' + SIMPLYRETS_API_SECRET),
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching properties: ${response.statusText}`);
    }

    var data = await response.json();
    console.log('Fetched properties:', data);
    return data;
}

// Display properties on Google Maps (function definition)
function displayPropertiesOnMap(properties, map) {
    // Clear any existing markers
    clearMarkers();

    // Loop through properties and add markers to the map
    properties.forEach((property) => {
        var marker = new google.maps.Marker({
            position: {
                lat: property.geo.lat,
                lng: property.geo.lng,
            },
            map,
        });

        // Add marker to markers array
        markers.push(marker);

        // Add an info window to display property details when the marker is clicked
        var photos = property.photos.map((photoUrl) => `<img src="${photoUrl}" width="100" height="100" />`).join('');
        var infoWindow = new google.maps.InfoWindow({
            content: `
                <h3>${property.address.full}</h3>
                <p>Price: $${property.listPrice}</p>
                <p>Elementery School: ${property.school.elementarySchool}</p>
                <p>Middle School: ${property.school.middleSchool}</p>
                <p>High School: ${property.school.highSchool}</p>
                <p>Bedrooms: ${property.property.bedrooms}</p>
                <p>Bathrooms: ${property.property.bathsFull}</p>
                <div>${photos}</div>
                <p>Agent: ${property.agent.firstNamel} + ${property.agent.lastName}</p>
                <p>Email: ${property.agent.contact.email}</p>
                <p>Phone: ${property.agent.contact.office}</p>

            `,
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}

let markers = [];

function clearMarkers() {
    markers.forEach((marker) => {
        marker.setMap(null);
    });
    markers = [];
}

async function moveMapToCity(cityName) {
    var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=${GOOGLE_MAPS_API_KEY}`;

    var response = await fetch(geocodeUrl);

    if (!response.ok) {
        throw new Error(`Error fetching geocode data: ${response.statusText}`);
    }

    var data = await response.json();
    if (data.results.length > 0) {
        var location = data.results[0].geometry.location;
        map.setCenter(location);
        map.setZoom(15);
    } else {
        alert('No results found for the given location.');
    }
}

function saveSearchToHistory(location, minPrice, maxPrice, propertyCount) {
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    var newSearch = {
        location,
        minPrice,
        maxPrice,
        propertyCount,
        timestamp: new Date().toISOString(),
    };
    searchHistory.push(newSearch);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

function getSearchHistory() {
    var history = localStorage.getItem('searchHistory');
    return history ? JSON.parse(history) : [];
}

function updateSearchHistoryList() {
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    var listElement = document.getElementById('search-history');

    // Shows the list of items
    listElement.classList.remove("hidden");

    // Clear existing list items
    listElement.innerHTML = '';

    // Create list items for each search
    searchHistory.forEach((search) => {
        var listItem = document.createElement('li');
        listItem.classList.add("search-history-list");
        listItem.textContent = `${search.location} | Min: $${search.minPrice} | Max: $${search.maxPrice} | Properties: ${search.propertyCount} | Date: ${search.timestamp}`;
        listElement.appendChild(listItem);
    });
}

var clearHistoryButton = document.getElementById('clear-history');

clearHistoryButton.addEventListener('click', () => {
    // Clear localStorage
    localStorage.removeItem('searchHistory');

    // Update the search history list
    updateSearchHistoryList();
});