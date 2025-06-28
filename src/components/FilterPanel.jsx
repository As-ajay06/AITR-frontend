import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterPanel = ({ columns, filters, setFilters }) => {
  const [tempFilters, setTempFilters] = useState(filters);

  useEffect(() => {
    setTempFilters(filters); 
  }, [filters]);

  const handleApply = () => {
    setFilters(tempFilters);
  };

  return (
    <div className="flex items-end gap-2 flex-wrap">
      {columns
        .filter((col) => col.toLowerCase().includes("date"))
        .map((col) => (
          <div key={col} className="flex flex-col sm:flex-row items-center gap-2">
            <DatePicker
              selected={tempFilters[`${col}_from`] || null}
              onChange={(date) =>
                setTempFilters((prev) => ({ ...prev, [`${col}_from`]: date }))
              }
              className="border px-2 py-1 rounded text-sm"
              placeholderText="From (dd-mm-yyyy)"
              dateFormat="dd-MM-yyyy"
              showMonthDropdown
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={50}
            />
            <DatePicker
              selected={tempFilters[`${col}_to`] || null}
              onChange={(date) =>
                setTempFilters((prev) => ({ ...prev, [`${col}_to`]: date }))
              }
              className="border px-2 py-1 rounded text-sm"
              placeholderText="To (dd-mm-yyyy)"
              dateFormat="dd-MM-yyyy"
              showMonthDropdown
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={50}
            />
          </div>
        ))}

      <button
        onClick={handleApply}
        className="bg-blue-500 text-white text-sm px-3 py-[6px] rounded hover:bg-blue-600 transition-all shadow"
      >
        Apply
      </button>
    </div>
  );
};

export default FilterPanel;
