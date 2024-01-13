import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PropertyPage from './components/PropertyPage';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import PropertyList from './components/PropertyList';
import FavoritesList from './components/FavoritesList';
import AdvancedSearchForm from './components/AdvancedSearchForm';
import SearchForm from './components/SearchForm';
import Footer from './components/Footer';
import './App.css';
import propertyData from './propertyData';

const App = () => {
  const [searchMethod, setSearchMethod] = useState({ location: '', tenure: '' });
  const [filteredProperties, setFilteredProperties] = useState(null);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const handleSearch = () => {
    // Filter properties based on search criteria
    const filteredProperties = propertyData.properties.filter((property) => {
      //Check if there is a location matched to the search criteria, if there is do a case-insensitive comparison. if no defaults to true
      const locationMatch = searchMethod.location
        ? property.location.toLowerCase().includes(searchMethod.location.toLowerCase())
        : true;
      //Check if there is a tenure search criteria, if there is, check if it matches the specified seach tenure.
      const tenureMatch = searchMethod.tenure
        ? property.tenure === searchMethod.tenure
        : true;

      return locationMatch && tenureMatch;
    });
    //Set the state with the filtered properties or null if no matches
    setFilteredProperties(filteredProperties.length > 0 ? filteredProperties : null);
  };

  const handleAdvancedSearch = (advancedSearch) => {
    console.log('Advanced Search Criteria:', advancedSearch);
  
    const filteredProperties = propertyData.properties.filter((property) => {
      // Check if the property type matches the advanced search criteria, if there is do a case-insensitive comparison. If not, default to true
      const typeMatch =
        !advancedSearch.type ||
        property.type.toLowerCase() === advancedSearch.type.toLowerCase();
  
      // If "houses" is entered in the type field, only show houses
      const isHousesSearch = advancedSearch.type.toLowerCase() === 'houses';
  
      // Check if the property price is within the specified range
      const priceInRange =
        (!advancedSearch.minPrice ||
          property.price >= advancedSearch.minPrice) &&
        (!advancedSearch.maxPrice ||
          property.price <= advancedSearch.maxPrice);
  
      // Check if the number of bedrooms is within the specified range
      const bedroomsInRange =
        (!advancedSearch.minBedrooms ||
          property.bedrooms >= advancedSearch.minBedrooms) &&
        (!advancedSearch.maxBedrooms ||
          property.bedrooms <= advancedSearch.maxBedrooms);
  
      // Extract postcode area from the property location
      const postcodeArea = property.location.split(' ').pop().toUpperCase();
      const searchPostcodeArea = advancedSearch.postcodeArea.toUpperCase();
  
      // Check if the postal code area matches with the specified
      const postcodeAreaMatch =
        !advancedSearch.postcodeArea ||
        postcodeArea.includes(searchPostcodeArea);
  
      // Return true only if at least one criteria matches, and, if "houses" is entered, only show houses
      return (typeMatch || isHousesSearch) && priceInRange && bedroomsInRange && postcodeAreaMatch;
    });
  
    console.log('Filtered Properties:', filteredProperties);
  
    // Set the state with the filtered properties or null if no matches
    setFilteredProperties(filteredProperties.length > 0 ? filteredProperties : null);
  
    // Hide the advanced search form after filtering
    setShowAdvancedSearch(false);
  };


  const handleAddToFavorites = (propertyToAdd) => {
    // Check if the property is already not in favorites with the same id as the propertyToAdd.id
    if (!favorites.some((favProperty) => favProperty.id === propertyToAdd.id)) {
      // If not add the property to favorites by updating the function taking the previous state
      setFavorites((prevFavorites) => [...prevFavorites, propertyToAdd]);
    }
  };

  const removeFromFavorites = (propertyToRemove) => {
    //setFavorites functions takes a callback function to receive the previous state
    setFavorites((prevFavorites) =>
    //And filters the property to be removed based on if current id in the array not equal to the id of the property to be removed and update the array.
      prevFavorites.filter((property) => property.id !== propertyToRemove.id)
    );
  };

  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <Routes>
          <Route
            path="/"
            element={
              <div className="app">

                {/* Render the component with the onToggleAdvancedSearch prop set to visibility of advancedSearch */}
                <Navbar onToggleAdvancedSearch={() => setShowAdvancedSearch(!showAdvancedSearch)} />

                {/* Conditional rendering based on showAdvancedSearch */}
                {showAdvancedSearch ? (
                  //Render the component with the onAdvancedSearch prop set to handleAdvancedSearch
                  <AdvancedSearchForm onAdvancedSearch={handleAdvancedSearch} />
                ) : (
                  <>
                    {/* Banner component */}
                    <Banner />

                    {/* SearchForm component with search-related props */}
                    <SearchForm
                      onInputChange={(field, value) => setSearchMethod({ ...searchMethod, [field]: value })}  // Callback for handling input changes and updating searchMethod state
                      searchMethod={searchMethod}  // Shows the current state
                      setSearchMethod={setSearchMethod}  // Update the searchMethod state
                      handleSearch={handleSearch}  // Callback function for handling the search action
                    />

                    <div className='content-section'>
                      {/* Render a list of properties */}
                      <PropertyList
                        properties={filteredProperties || propertyData.properties} //propertise to be displayed either filtered or entire
                        addToFavorites={handleAddToFavorites}  // Callback for adding a property to favorites
                      />
                      <FavoritesList
                      // Render a list of favorite properties 
                        favorites={favorites}  // List of favorite properties
                        removeFromFavorites={removeFromFavorites}  // Callback for removing a property from favorites
                        propertyData={propertyData}  // Property data used by the FavoritesList component
                        addToFavorites={handleAddToFavorites}  // Callback for adding a property to favorites
                      />
                    </div>
                    <Footer />
                  </>
                )}
              </div>
            }
          />
          {/*Render the PropertyPage component when navigating to a path matching "/property/:id", passing the propertyData prop*/}
          <Route path="/property/:id" element={<PropertyPage propertyData={propertyData} />} />
        </Routes>
      </DndProvider>
    </Router>
  );
}

export default App;