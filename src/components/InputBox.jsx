const InputBox = ({ label, register, required, name, type = "text", className = "", placeholder }) => {
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
        placeholder={placeholder}
        type={type}
        {...register(name, { required })}
        className="input-field"
      />
    </div>
  );
};


export default InputBox;
