import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// state  to manage the form input for advanced search
const AdvancedSearchForm = ({ onAdvancedSearch }) => {
  const [advancedSearch, setAdvancedSearch] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcodeArea: '',
  });

  // function to handle input changes in the form field
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdvancedSearch((prevCriteria) => ({
      ...prevCriteria,
      [name]: value,
    }));
  };

  // function to handle the form submission and trigger the advance search
  const handleSearch = (e) => {
    e.preventDefault();
    // advancedSearch callback with the current state
    onAdvancedSearch(advancedSearch);
  };

  return (
    // call handleSearch function on submission
    <form onSubmit={handleSearch} className="advanced-search-form">

      {/* Text field for entering property type */}
      <TextField
          label="Property Type"
          type="text"
          name="type"
          value={advancedSearch.type}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />

      {/* Text field for entering minimum price */}
      <TextField
        label="Min Price"
        variant="outlined"
        type="number"
        name="minPrice"
        value={advancedSearch.minPrice}
        onChange={handleInputChange}
      />
      {/* Text field for entering maximum price */}
      <TextField
        label="Max Price"
        variant="outlined"
        type="number"
        name="maxPrice"
        value={advancedSearch.maxPrice}
        onChange={handleInputChange}
      />

      {/* Text field for entering minimum bedrooms */}
      <TextField
        label="Min Bedrooms"
        variant="outlined"
        type="number"
        name="minBedrooms"
        value={advancedSearch.minBedrooms}
        onChange={handleInputChange}
      />

      {/* Text field for entering maximum price */}
      <TextField
        label="Max Bedrooms"
        variant="outlined"
        type="number"
        name="maxBedrooms"
        value={advancedSearch.maxBedrooms}
        onChange={handleInputChange}
      />

      {/* Text field for entering postalcode area */}
      <TextField
        label="Postalcode Area"
        variant="outlined"
        type="text"
        name="postcodeArea"
        value={advancedSearch.postcodeArea}
        onChange={handleInputChange}
      />

       {/* triggers the handleSearch */}
      <Button variant="contained" type="submit" onClick={handleSearch}>
        Search
      </Button>
    </form>
  );
};

export default AdvancedSearchForm;
