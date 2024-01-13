import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDrag } from 'react-dnd';

const PropertyCard = ({ property, addToFavorites, isInFavoritesList, removeFromFavorites }) => {
  const [isInFavorites, setIsInFavorites] = useState(isInFavoritesList);
  const navigate = useNavigate();

  // navigate to property page when the image is clicked

  const navigateToPropertyPage = () => {
    navigate(`/property/${property.id}`);
  };

  //drag and drop hook to make the draggable property card
  const [{ isDragging }, drag] = useDrag({
    type: 'PROPERTY_CARD',
    item: { property },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // function to handle adding and removing to adn from favorites
  const handleFavoriteButton = () => {
    if (isInFavorites && removeFromFavorites) {
      // If removeFromFavorites is provided and property is in favorites, remove it
      removeFromFavorites(property);
  
      // and update the state to reflect the removal from array
      setIsInFavorites(false);
    } else {
      // Otherwise, toggle the isInFavorites state
      setIsInFavorites(!isInFavorites);
  
      // If addToFavorites is provided and property is not in favorites
      if (!isInFavorites && addToFavorites) {
        // add the property to favorites using addToFavorite callback
        addToFavorites(property);
      }
    }
  };
  

  return (
    // conditional class dragging adds styling specific to the drag-and-drop functionality
    <div className = {`property-card ${isDragging ? 'dragging' : ''}`} ref={drag}>
      <div>
         {/* Image with a click event to navigate to the property page */}
        <img src={property.picture} alt={property.description} onClick={navigateToPropertyPage} />
        
         {/* property information*/}
        <div className="property-info">
          <h3>{property.type}</h3>
          <p>{property.location}</p>
          <p>Price: {property.price}</p>

           {/* favorite button */}
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
