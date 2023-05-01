
The Property Search Web App is a user-friendly application designed to help users find properties based on their desired location and price range. Utilizing the SimplyRETS API for property data and the Google Maps JavaScript API for visualization, this web app provides an intuitive and interactive experience for property searching.

## Features

- **Search properties**: Users can search for properties by specifying a location (city) and an optional price range (minimum and maximum prices).
- **Interactive map**: The Google Maps integration allows users to visualize the properties that match their search criteria. They can navigate and zoom on the map to explore the properties in the area.
- **Property details**: By clicking on a map marker, users can view more details about each property, such as address, price, number of bedrooms, photographs of the property, and number of bathrooms.
- **Search history**: The application maintains a list of recent searches, allowing users to quickly revisit previous searches and compare results.
- **Search results count**: For each search in the history list, the number of properties found is displayed, giving users an overview of the search results.
- **Clear search history**: Users can easily clear the search history by clicking the "Clear History" button.

## Installation

1. Clone the repository:

git clone https://github.com/yourusername/property-search-webapp.git

2. Open the index.html file in a web browser. No additional installation steps are required, as the application runs directly in the browser.

## Usage

1. Enter the location (city) where you want to search for properties in the "Location" input field.
2. (Optional) Enter a minimum price and a maximum price for the properties in the "Min Price" and "Max Price" input fields, respectively.
3. Click the "Search" button to start the search.
4. The map will update to display the properties that match your search criteria, with each property represented by a marker.
5. Click on a marker to open an info window with more details about the property, such as address, price, number of bedrooms, and number of bathrooms.
6. Each search will be saved in the search history list below the search form, along with the number of properties found in that search.
7. To remove all saved searches from the search history list, click the "Clear History" button.

## Dependencies

- [SimplyRETS API](https://docs.simplyrets.com/): Provides property data for the application.
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview): Used for displaying property locations on an interactive map.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT), which permits open-source use, modification, and distribution with some conditions.`;