import React from "react";

const SearchForm = ({ onInputChange, handleSearch, searchMethod, setSearchMethod }) => { 

  return (
    <div className="search-container">
      <div className="top-section">
        <h2>Believe in finding it</h2>
        <p>Search properties for sale and to rent in the UK</p>
      </div>
      {/* Search Bar and Buttons */}
      <div className="bottom-section">
        <input
          type="text"
          placeholder="Search by location..."
          value={searchMethod.location}
          onChange={(e) => onInputChange('location', e.target.value)}
        />
        {/* Buttons for For Sale and For Rent */}
        <button className="for-sale" onClick={() => { setSearchMethod({ ...searchMethod, tenure: 'Freehold' }); handleSearch(); }}>
          For Sale
        </button>
        <button className="for-rent" onClick={() => { setSearchMethod({ ...searchMethod, tenure: 'Leasehold' }); handleSearch(); }}>
          For Rent
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
