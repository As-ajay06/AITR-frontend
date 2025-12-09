import React from 'react'

// function CalenderBox({ register , label, name}) {
//   return (
//     <div className="flex flex-col mb-4 w-full max-w-xs">
//       <label className="block text-sm font-medium text-gray-700 mb-2">
//         {label}
//       </label>
//       <input
//         type="date"
//         {...register(name)}
//         className="w-full max-w-xs px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//       />
//     </div>
//   );
// }


const CalenderBox = ({ label, register, required, name, type = "date", className = "" }) => {
  const formattedLabel = label.split("_").map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(" ");

  return (
    <div className={`flex flex-col mb-6 w-full ${className}`}>
      <label className="text-sm font-semibold text-slate-700 mb-2">
        {formattedLabel}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        {...register(name, { required })}
        className="input-field"
      />
    </div>
  );
};


export default CalenderBox;
