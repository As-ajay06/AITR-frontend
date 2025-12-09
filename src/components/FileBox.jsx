import React from 'react'

// function FileBox({ register, label, name }) {
//   return (
//     <div className="flex flex-col mb-4 w-full max-w-xs">
//       <label className="text-sm font-medium text-gray-700 mb-1">
//         {label.toUpperCase().split("_").join(" ")}
//       </label>
//       <input
//         type="file"
//         {...register(name)}
//         className="block w-full text-sm text-gray-700 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//       />
//     </div>
//   );
// }


const FileBox = ({ label, register, required, name, type = "file", className = "" }) => {
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
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"   
      />
    </div>
  );
};


export default FileBox;
