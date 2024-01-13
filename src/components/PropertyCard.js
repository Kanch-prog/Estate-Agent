import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDrag } from 'react-dnd';

const PropertyCard = ({ property, addToFavorites, isInFavoritesList, removeFromFavorites }) => {
  const [isInFavorites, setIsInFavorites] = useState(isInFavoritesList);
  const navigate = useNavigate();

  const navigateToPropertyPage = () => {
    navigate(`/property/${property.id}`);
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'PROPERTY_CARD',
    item: { property },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleFavoriteButton = () => {
    if (isInFavorites && removeFromFavorites) {
      // If removeFromFavorites is provided and property is in favorites, remove it
      removeFromFavorites(property);
  
      // Update the local state to reflect the removal
      setIsInFavorites(false);
    } else {
      // Otherwise, toggle the isInFavorites state
      setIsInFavorites(!isInFavorites);
  
      // If addToFavorites is provided and property is not in favorites, add it
      if (!isInFavorites && addToFavorites) {
        addToFavorites(property);
      }
    }
  };
  

  return (
    <div className={`property-card ${isDragging ? 'dragging' : ''}`} ref={drag}>
      <div>
        <img src={property.picture} alt={property.description} onClick={navigateToPropertyPage} />
        <div className="property-info">
          <h3>{property.type}</h3>
          <p>{property.location}</p>
          <p>Price: {property.price}</p>

          {isInFavorites ? (
            <button onClick={handleFavoriteButton}>Remove from Favorites</button>
          ) : (
            <button onClick={handleFavoriteButton}>Add to Favorites</button>
          )}

        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
