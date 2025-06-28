import React from "react";

const DataTable = ({ data, filters, setFilters }) => {
  const keys = Object.keys(data[0] || {});

  const filteredData = data.filter((item) =>
    keys.every((key) =>
      filters[key]
        ? item[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
        : true
    )
  );

  return (
    <div className="overflow-x-auto px-12">
      <table className="min-w-full border border-gray-800 text-left">
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key} className="border border-gray-800 px-2 py-1">
                {key}
                
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, idx) => (
            <tr key={idx}>
              {keys.map((key) => (
                <td key={key} className="border border-gray-800 px-2 py-1">
                  {row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
