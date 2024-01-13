import React from 'react';

const Navbar = ({ onToggleAdvancedSearch }) => {
  return (
    <div className="navbar">
       {/* Site name section */}
      <div className="site-name">Estate Agent</div>
       {/* Advanced Search button with a click event handler which executes onToggleAdvancedSearch function*/}
      <div className="advanced-search" onClick={onToggleAdvancedSearch}>
        Advanced Search
      </div>
    </div>
  );
};

export default Navbar;
