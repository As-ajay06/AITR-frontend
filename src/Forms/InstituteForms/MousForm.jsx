import React from "react";
import { useForm } from "react-hook-form";
import InputBox from "../../components/InputBox";
import CalenderBox from "../../components/CalenderBox";
import FileBox from "../../components/FileBox";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import axios from "axios";
import UploadForm from "../../components/UploadForm";
import { convertArrayOfObjectsToCSV } from "../../utils/convertArrayOfObjectsToCSV";
import { useFilter } from "../../hooks/useFilter";
import { DataFilterComponent } from "../../components/DataFilterComponent";

// Define available columns for export
const exportableColumns = [
  { key: 'agencyName', label: 'Agency Name' },
  { key: 'date', label: 'Date' },
  { key: 'duration', label: 'Duration' },
  { key: 'description', label: 'Description' },
  { key: 'funding', label: 'Funding' },
];

const MouForm = () => {

  const { register, handleSubmit, reset } = useForm()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [submit, setSubmit] = useState(false)

  const { filterText, setFilterText, resetPaginationToggle, setResetPaginationToggle, handleClear, filteredData } = useFilter(data);
  
  // State for selected rows and columns
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [showColumnSelector, setShowColumnSelector] = React.useState(false);
  const [selectedColumns, setSelectedColumns] = React.useState(
    exportableColumns.map(col => col.key)
  );
  
  const [file, setFile] = useState(null);

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <DataFilterComponent placeholder={"Filter by Department Name"} onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
    );
  }, [filterText, resetPaginationToggle, handleClear]);

  const fetchData = async () => {
    if (loading == true) {
      const data = await axios.get("http://localhost:3000/api/v1/institute/mous")
      console.log(data.data)
      setData(data.data.mous)
    }

  }

  useEffect(() => {
    console.log("fetching data")
    fetchData()
    console.log(data)
  }, [loading])

  const onSubmit = async (data) => {

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("http://localhost:3000/file", formData)
      console.log(res.data)

      console.log(data)
      const url = "http://localhost:3000/api/v1/institute/mou"
      const response = await axios.post(url
        , {
          agencyName: data.agencyName,
          date: data.date,
          duration: data.duration,
          description: data.description,
          fundind: data.fundind,

          // using fileId without middleware 
          // TODO : create middleware and send the fileId with using middleware
          fileId: res.data.fileId
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
    const filename = 'institute_mou_export.csv';
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
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-2">
          Memorandum of Understanding (MoU) Submission Form
        </h2>
        <UploadForm url={"addInstituteMouData"} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputBox
            label="Agency Name"
            name="agencyName"
            register={register}
            required
          />

          <CalenderBox
            label="Date"
            name="date"
            register={register}
            required
            type="date"
          />

          <InputBox
            label="Duration"
            name="duration"
            register={register}
            placeholder="e.g., 2 years"
            required
          />

          <InputBox
            label="Funding"
            name="funding"
            register={register}
            required
          />

          <InputBox
            label="Description"
            name="description"
            register={register}
            textarea
            required
            className="md:col-span-2"
          />

          <FileBox
            label="MoU PDF"
            name="mouPdf"
            register={register}
            accept=".pdf"
            className="md:col-span-2"
          />

          <button
            type="submit"
            className="col-span-2 mt-6 px-6 py-3 bg-blue-600 text-white font-semibold text-base rounded-md shadow hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>

      </form>
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
          title={"Institute MoUs Data"}
          columns={MouFormColumn}
          actions={actionsMemo}
          data={filteredData}
          pagination
          paginationResetDefaultPage={resetPaginationToggle}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          selectableRows
          onSelectedRowsChange={handleRowSelected}
        />
      </div>
    </div>
  );
};

export default MouForm;

export const MouFormColumn = [
  {
    name: "Agency Name",
    selector: row => row.agencyName,
    cell: row => {
      if (!row.agencyName) return 'N/A';
      if (typeof row.agencyName === 'object' && !Array.isArray(row.agencyName)) {
        return Object.values(row.agencyName).filter(v => v && typeof v === 'string').join('');
      }
      return String(row.agencyName);
    },
    sortable: true,
  },
  {
    name: "Date",
    selector: row => row.date,
    cell: row => row.date ? new Date(row.date).toLocaleDateString() : 'N/A',
    sortable: true,
  },
  {
    name: "Duration",
    selector: row => row.duration,
    cell: row => {
      if (!row.duration) return 'N/A';
      if (typeof row.duration === 'object' && !Array.isArray(row.duration)) {
        return Object.values(row.duration).filter(v => v && typeof v === 'string').join('');
      }
      return String(row.duration);
    },
  },
  {
    name: "Description",
    selector: row => row.description,
    cell: row => {
      if (!row.description) return 'N/A';
      if (typeof row.description === 'object' && !Array.isArray(row.description)) {
        return Object.values(row.description).filter(v => v && typeof v === 'string').join('');
      }
      return String(row.description);
    },
    wrap: true,
  },
  {
    name: "Funding",
    selector: row => row.funding,
    cell: row => {
      if (!row.funding) return 'N/A';
      if (typeof row.funding === 'object' && !Array.isArray(row.funding)) {
        const val = Object.values(row.funding).filter(v => v && typeof v === 'string').join('');
        return val ? `₹${val}` : 'N/A';
      }
      return `₹${row.funding}`;
    },
    right: true,
  },
  {
    name: "MOU PDF",
    cell: row =>
      row.fileId ? (
        <a href={row.fileId} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          View
        </a>
      ) : (
        "Not Uploaded"
      ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

