import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDrag } from 'react-dnd';

const PropertyCard = ({ property, addToFavorites, isInFavoritesList }) => {
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
    if (addToFavorites) {
      addToFavorites(property);
    } else {
      setIsInFavorites(!isInFavorites);
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

          {!isInFavoritesList && (
            <button onClick={handleFavoriteButton}>
              {isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
