import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ value, onChange, placeholder}) => {
  return (
    <div className="w-full">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="
            w-full
            pl-12 pr-4 py-3.5
            rounded-xl
            bg-white
            border-2 border-slate-300
            text-slate-800
            placeholder-slate-400
            shadow-sm
            transition-all duration-300
            focus:outline-none
            focus:ring-2 focus:ring-blue-500/50
            focus:border-blue-500
            focus:shadow-lg
            hover:border-slate-400
          "
        />
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
          size={20}
        />
      </div>
    </div>
  );
};

export default SearchBar;
