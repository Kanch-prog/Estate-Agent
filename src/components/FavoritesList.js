import React from 'react';
import PropertyCard from './PropertyCard';
import { useDrop } from 'react-dnd';

const FavoritesList = ({ favorites, removeFromFavorites, propertyData, addToFavorites }) => {
  const [, drop] = useDrop({
    accept: 'PROPERTY_CARD',
    drop: (item) => {
      if (item && item.property) {
        addToFavorites(item.property);
      }
    },
  });

  return (
    <div className="favorites-list" ref={drop}>
      <h2>Favorites</h2>
      {favorites && favorites.length > 0 ? (
        favorites.map((property) => {
          const matchedProperty = propertyData.properties.find((p) => p.id === property.id);

          return (
            <div key={property.id}>
              <PropertyCard
                property={matchedProperty}
                removeFromFavorites={() => removeFromFavorites(property)}
                addToFavorites={addToFavorites}
                isInFavoritesList={true}
              />
              <button onClick={() => removeFromFavorites(property)}>Remove from Favorites</button>
            </div>
          );
        })
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
};

export default FavoritesList;
