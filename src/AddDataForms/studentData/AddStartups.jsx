import React, { useEffect, useState } from 'react';
import StartupForm from '../../Forms/StudentForms/StartupForm';
import StudentTable from '../../table/StudentTable'; // Can rename to StartupTable if needed
import { useForm } from 'react-hook-form';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { convertArrayOfObjectsToCSV } from '../../utils/convertArrayOfObjectsToCSV';

// Define available columns for export
const exportableColumns = [
  { key: 'startupName', label: 'Startup Name' },
  { key: 'domain', label: 'Domain' },
  { key: 'incubationSupport', label: 'Incubation Support' },
  { key: 'currentStatus', label: 'Current Status' },
  { key: 'websiteOrLink', label: 'Website/Link' },
];

function AddStartups() {
  const { register, handleSubmit, reset } = useForm()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [submit, setSubmit] = useState(false)
  
  // State for selected rows and columns
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [showColumnSelector, setShowColumnSelector] = React.useState(false);
  const [selectedColumns, setSelectedColumns] = React.useState(
    exportableColumns.map(col => col.key)
  );


  const fetchData = async () => {
    if (loading == true) {
      const data = await axios.get("http://localhost:3000/api/v1/students/startups")
      console.log(data.data)
      setData(data.data.startupsData)
    }

  }

  useEffect(() => {
    console.log("fetching data")
    fetchData()
    console.log(data)
  }, [loading])

  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {

      const url = "http://localhost:3000/api/v1/students/startup"
      const response = await axios.post(url
        , {
          startupName: data.startupName,
          domain: data.domain,
          incubationSupport: data.incubationSupport,
          currentStatus: data.currentStatus,
          wesiteLink: data.wesiteLink,
        }
      )
      console.log(response)


    } catch (err) {
      console.log("Error:", err)
    }
    console.log(data)

    setLoading((p) => !p)
  }

  // Handle row selection
  const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);

  // Toggle column selection
  const toggleColumnSelection = (columnKey) => {
    setSelectedColumns(prev => {
      if (prev.includes(columnKey)) {
        return prev.filter(key => key !== columnKey);
      } else {
        return [...prev, columnKey];
      }
    });
  };

  // Select all columns
  const selectAllColumns = () => {
    setSelectedColumns(exportableColumns.map(col => col.key));
  };

  // Deselect all columns
  const deselectAllColumns = () => {
    setSelectedColumns([]);
  };

  // Filter data to only include selected columns
  const filterDataByColumns = React.useCallback((dataArray) => {
    return dataArray.map(row => {
      const filteredRow = {};
      selectedColumns.forEach(colKey => {
        if (Object.prototype.hasOwnProperty.call(row, colKey)) {
          filteredRow[colKey] = row[colKey];
        }
      });
      return filteredRow;
    });
  }, [selectedColumns]);

  const downloadCSV = React.useCallback((array) => {
    let dataToExport = array;
    
    if (selectedRows.length > 0) {
      dataToExport = selectedRows;
    }

    if (selectedColumns.length > 0) {
      dataToExport = filterDataByColumns(dataToExport);
    }

    if (dataToExport.length === 0) {
      alert('No data to export. Please select rows and/or columns.');
      return;
    }

    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(dataToExport);

    if (csv == null) return;
    const filename = 'startups_export.csv';
    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }, [selectedRows, selectedColumns, filterDataByColumns]);

  const Export = ({ onExport }) => (
    <div className="flex gap-2 items-center">
      <button 
        className='px-4 py-1 bg-green-500 hover:bg-green-700 shadow-sm rounded-md text-white duration-150' 
        onClick={() => setShowColumnSelector(!showColumnSelector)}
      >
        Select Columns ({selectedColumns.length})
      </button>
      <button 
        className='px-4 py-1 bg-blue-500 hover:bg-blue-700 shadow-sm rounded-md text-white duration-150' 
        onClick={e => onExport(e.target.value)}
      >
        Export Data {selectedRows.length > 0 ? `(${selectedRows.length} rows)` : '(All)'}
      </button>
    </div>
  );

  const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, [downloadCSV, data]);




  return (
    <div>
      <StartupForm
        onSubmit={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        reset={reset}
      />
      <div className="p-4">
        {/* Column Selector Modal */}
        {showColumnSelector && (
          <div className="mb-4 p-4 bg-gray-100 rounded-lg border border-gray-300">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Select Columns to Export</h3>
              <button 
                onClick={() => setShowColumnSelector(false)}
                className="text-gray-600 hover:text-gray-900 font-bold text-xl"
              >
                ×
              </button>
            </div>
            <div className="flex gap-2 mb-3">
              <button 
                onClick={selectAllColumns}
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded"
              >
                Select All
              </button>
              <button 
                onClick={deselectAllColumns}
                className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded"
              >
                Deselect All
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-60 overflow-y-auto">
              {exportableColumns.map(column => (
                <label key={column.key} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(column.key)}
                    onChange={() => toggleColumnSelection(column.key)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="text-sm">{column.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        
        <DataTable
          title={"Startups"}
          data={data}
          columns={startupColumns}
          actions={actionsMemo}
          selectableRows
          onSelectedRowsChange={handleRowSelected}
          customStyles={{
            table: {
              style: {
                tableLayout: "fixed",
              },
            },
            headCells: {
              style: {
                whiteSpace: "nowrap",
                fontSize: "18px",     // ⬆ Bigger header font
                fontWeight: "700",
              },
            },
            cells: {
              style: {
                whiteSpace: "nowrap",
                fontSize: "16px",     // ⬆ Bigger row font
                paddingTop: "12px",
                paddingBottom: "12px",
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default AddStartups;

export const startupColumns = [
  {
    name: "Startup Name",
    selector: row => row.startupName,
    width: '300px', wrap: false
  },
  {
    name: "Domain",
    selector: row => row.domain,
    width: '300px', wrap: false
  },
  {
    name: "Incubation Support",
    selector: row => row.incubationSupport || "None",
    width: '300px', wrap: false
  },
  {
    name: "Current Status",
    selector: row => row.currentStatus,
    width: '300px', wrap: false
  },
  {
    name: "Website/Link",
    selector: row => row.websiteOrLink,
    cell: row =>
      row.websiteOrLink ? (
        <a
          href={row.websiteOrLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Visit
        </a>
      ) : (
        "N/A"
      ),
      width: '300px', wrap: false
  },
];
