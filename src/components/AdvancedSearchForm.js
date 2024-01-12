import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

const propertyTypes = ['House', 'Flat', 'Any'];

const AdvancedSearchForm = ({ onAdvancedSearch }) => {
  const [advancedSearch, setAdvancedSearch] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcodeArea: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdvancedSearch({ ...advancedSearch, [name]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onAdvancedSearch(advancedSearch);
  };

  return (
    <form onSubmit={handleSearch} className="advanced-search-form">
      <Autocomplete
        options={propertyTypes}
        renderInput={(params) => <TextField {...params} label="Type" variant="outlined" />}
        value={advancedSearch.type}
        onChange={(e, value) => setAdvancedSearch({ ...advancedSearch, type: value })}
      />

      <TextField
        label="Min Price"
        variant="outlined"
        type="number"
        name="minPrice"
        value={advancedSearch.minPrice}
        onChange={handleInputChange}
      />

      <TextField
        label="Max Price"
        variant="outlined"
        type="number"
        name="maxPrice"
        value={advancedSearch.maxPrice}
        onChange={handleInputChange}
      />

      <TextField
        label="Min Bedrooms"
        variant="outlined"
        type="number"
        name="minBedrooms"
        value={advancedSearch.minBedrooms}
        onChange={handleInputChange}
      />

      <TextField
        label="Max Bedrooms"
        variant="outlined"
        type="number"
        name="maxBedrooms"
        value={advancedSearch.maxBedrooms}
        onChange={handleInputChange}
      />

      <Button variant="contained" type="submit" onClick={handleSearch}>
        Search
      </Button>
    </form>
  );
};

export default AdvancedSearchForm;
