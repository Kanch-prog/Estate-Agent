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
      const locationMatch = searchMethod.location
        ? property.location.toLowerCase().includes(searchMethod.location.toLowerCase())
        : true;

      const tenureMatch = searchMethod.tenure
        ? property.tenure === searchMethod.tenure
        : true;

      return locationMatch && tenureMatch;
    });
    setFilteredProperties(filteredProperties.length > 0 ? filteredProperties : null);
  };

  const handleAdvancedSearch = (advancedSearchCriteria) => {
    const filteredProperties = propertyData.properties.filter((property) => {
      // Check if the property type matches the advanced search criteria
      const typeMatch = advancedSearchCriteria.type
        ? property.type.toLowerCase() === advancedSearchCriteria.type.toLowerCase()
        : true;

      // Check if the property price is within the specified range
      const priceInRange =
        (!advancedSearchCriteria.minPrice || property.price >= Number(advancedSearchCriteria.minPrice)) &&
        (!advancedSearchCriteria.maxPrice || property.price <= Number(advancedSearchCriteria.maxPrice));

      // Check if the number of bedrooms is within the specified range
      const bedroomsInRange =
        (!advancedSearchCriteria.minBedrooms || property.bedrooms >= Number(advancedSearchCriteria.minBedrooms)) &&
        (!advancedSearchCriteria.maxBedrooms || property.bedrooms <= Number(advancedSearchCriteria.maxBedrooms));

      return typeMatch && priceInRange && bedroomsInRange;
    });

    setFilteredProperties(filteredProperties.length > 0 ? filteredProperties : null);
    setShowAdvancedSearch(false);
  };

  const handleAddToFavorites = (propertyToAdd) => {
    // Check if the property is already in favorites
    if (!favorites.some((favProperty) => favProperty.id === propertyToAdd.id)) {
      // Add the property to favorites
      setFavorites((prevFavorites) => [...prevFavorites, propertyToAdd]);
    }
  };

  const removeFromFavorites = (propertyToRemove) => {
    // Remove the property from favorites
    setFavorites((prevFavorites) =>
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
                <Navbar onToggleAdvancedSearch={() => setShowAdvancedSearch(!showAdvancedSearch)} />
    
                {showAdvancedSearch ? (
                  <AdvancedSearchForm onAdvancedSearch={handleAdvancedSearch} />
                ) : (
                  <>
                    <Banner />
                    <SearchForm
                      onSearch={handleSearch}
                      onInputChange={(field, value) => setSearchMethod({ ...searchMethod, [field]: value })}
                      searchMethod={searchMethod}
                      setSearchMethod={setSearchMethod}
                      handleSearch={handleSearch}
                    />
                    <div className='content-section'>
                      <PropertyList
                        properties={filteredProperties || propertyData.properties}
                        onAddToFavorites={handleAddToFavorites}
                        addToFavorites={handleAddToFavorites} 
                      />
                      <FavoritesList
                        favorites={favorites}
                        removeFromFavorites={removeFromFavorites}
                        propertyData={propertyData}
                        addToFavorites={handleAddToFavorites} 
                      />
                    </div>
                  </>
                )}
              </div>
            }
          />
    
          <Route path="/property/:id" element={<PropertyPage propertyData={propertyData} />} />
        </Routes>
      </DndProvider>
    </Router>
  );
}

export default App;