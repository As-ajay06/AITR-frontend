import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

const DynamicUserFields = ({ label, name, fieldName, role }) => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <div className="col-span-2 w-fit bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-gray-800 mb-4">{label}</h3>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start"
          >
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                {fieldName}
              </label>
              <input
                {...register(`${name}.${index}.memberName`)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col">
              {name === "technologyUsed" ? <div>
                
              </div>
                :
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    {role}
                  </label>
                  <input
                    {...register(`${name}.${index}.role`)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              }
            </div>

            <div className="flex md:col-span-2">
              <button
                type="button"
                onClick={() => remove(index)}
                className="mt-2 px-3 py-2 bg-red-500 text-white text-sm font-medium rounded-lg shadow hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        {name === "technolgyUsed" ? <div>
          <button
            type="button"
            onClick={() => append({ memberName: "", role: "" })}
            className="px-4 py-2 bg-green-600 text-white font-medium text-sm rounded-lg shadow hover:bg-green-700 transition"
          >
            + Add More
          </button>
        </div>
          :
          <div>
            <button
              type="button"
              onClick={() => append({ memberName: "", role: "N/A" })}
              className="px-4 py-2 bg-green-600 text-white font-medium text-sm rounded-lg shadow hover:bg-green-700 transition"
            >
              + Add More
            </button>
          </div>}

      </div>
    </div>
  );
};

export default DynamicUserFields;
