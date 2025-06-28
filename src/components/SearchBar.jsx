import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <div className="flex justify-center items-center">
  <input
    type="text"
    placeholder="Search..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-[90vw]  p-2 border border-gray-600 rounded mb-4"
  />
  </div>
);

export default SearchBar;
