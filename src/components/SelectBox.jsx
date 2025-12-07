import React from "react";

const SelectBox = ({ label, name, options, register, required, className = "" }) => {
  const formattedLabel = label.split("_").map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(" ");

  return (
    <div className={`flex flex-col mb-6 w-full ${className}`}>
      <label className="text-sm font-semibold text-slate-700 mb-2">
        {formattedLabel}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        name={name}
        {...register(name, { required })}
        className="input-field"
      >
        <option value="">Select {formattedLabel}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
} 

export default SelectBox;
