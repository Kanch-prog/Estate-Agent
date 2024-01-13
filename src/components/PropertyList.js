import React from 'react';
import PropertyCard from './PropertyCard';

const PropertyList = ({ properties, addToFavorites }) => {
  return (
    <div className="property-list">
      {/* Heading */}
      <h2>Properties</h2>
      {/* Property cards container */}
      <div className="property-cards">
        {/* check if properties exist or not */}
        {properties !== null && properties.length > 0 ? (
          // if exist, map each property and render
          properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property} // Pass property data to the PropertyCard component
              addToFavorites={addToFavorites}  // Pass the addToFavorites callback to PropertyCard
            />
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
