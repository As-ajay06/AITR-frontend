import React from "react";

const SelectBox = ({ label, name, options, register}) => {

  
  
  return (
    <>
  <div className="flex flex-col mb-4 w-full max-w-sm">
    <label className="text-sm font-medium text-gray-700 mb-1">{label.split("_").join(" ").toUpperCase()}</label>
    <select
      name={name}
      {...register(name)}
      className="px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">Select {label.split("_").join(" ")}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
  </>
);
} 

export default SelectBox;
