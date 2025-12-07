
const InputBox = ({ label, register, required , name }) => {

  return (

    <div className="flex flex-col mb-4 w-full max-w-xs">
    <label className="text-sm font-medium text-gray-700 mb-1">
      {label.split("_").join(" ").toUpperCase()}
    </label>
    <input
      {...register(name, { required })}
      className="px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      />
  </div>
    )
};


export default InputBox;
