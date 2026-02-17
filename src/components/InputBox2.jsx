const InputBox2 = ({ label, register, required, name, type = "text", className = "", placeholder }) => {
    return (
        <div className={`flex flex-col mb-6 w-full ${className}`}>
            <label className="text-sm font-semibold text-slate-700 mb-2">
                {label}
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


export default InputBox2;
