import React from "react";

const SearchBar = ({ query, onQueryChange, placeholder = "Cari Notes..." }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
    </div>
  );
};

export default SearchBar;
