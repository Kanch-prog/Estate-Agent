import React from 'react';

const Navbar = ({ onToggleAdvancedSearch }) => {
  return (
    <div className="navbar">
      <div className="site-name">Estate Agent</div>
      <div className="advanced-search" onClick={onToggleAdvancedSearch}>
        Advanced Search
      </div>
    </div>
  );
};

export default Navbar;
