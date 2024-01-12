import React from 'react';
import PropertyCard from './PropertyCard';

const PropertyList = ({ properties, onAddToFavorites }) => {
  return (
    <div className="property-list">
      <h2>Properties</h2>
      <div className="property-cards">
        {properties && properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              addToFavorites={onAddToFavorites} 
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
