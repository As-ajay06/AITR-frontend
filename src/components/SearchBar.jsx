import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ value, onChange, placeholder}) => {
  return (
    <div className="w-full px-4 pt-10">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="
            w-full
            pl-12 pr-4 py-3
            rounded-full
            bg-blue-50
            border border-blue-200
            text-gray-800
            placeholder-gray-500
            shadow
            transition-all duration-300
            focus:outline-none
            focus:ring-2 focus:ring-blue-500
            focus:bg-white focus:shadow-lg
          "
        />
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400"
          size={20}
        />
      </div>
    </div>
  );
};

export default SearchBar;
