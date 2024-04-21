import React from "react";

const SearchData = ({handleSearch}) => {
  return (
    <div>
      <input type="search" style={{ width: "100%" }} onChange={(e) => handleSearch(e.target.value)} />
    </div>
  );
};

export default SearchData;
