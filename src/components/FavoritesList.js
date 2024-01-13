import React from 'react';
import PropertyCard from './PropertyCard';
import { useDrop } from 'react-dnd';

const FavoritesList = ({ favorites, removeFromFavorites, propertyData, addToFavorites }) => {
  //useDrop hook to make FavoriteList a drop section fro draggable items
  const [, drop] = useDrop({
    accept: 'PROPERTY_CARD',// accepts items with this type
    drop: (item) => {
      if (item && item.property) {
        // If a valid item is dropped, add its property to favorites using addToFavorites callback
        addToFavorites(item.property);
      }
    },
  });

  return (
    // container for favorites list with a drop secton ref
    <div className="favorites-list" ref={drop}>
      <h2>Favorites</h2>

      {/* Check if favorites exist and are not */}
      {favorites && favorites.length > 0 ? (

        // if exist map each favorite property
        favorites.map((property) => {

          // find tje matching property from  propertyData based on id
          const matchedProperty = propertyData.properties.find((p) => p.id === property.id);

          return (
            <div key={property.id}>
              <PropertyCard
                property={matchedProperty}  // Pass the matching property to PropertyCard
                removeFromFavorites={() => removeFromFavorites(property)}  // Callback to remove a property from favorites
                addToFavorites={addToFavorites}  // Callback to add a property to favorites
                isInFavoritesList={true}  // Shows that the property is in the favorites list
              />
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
