import React from 'react'
import InputBox from '../../components/InputBox'
import FileBox from '../../components/FileBox'
import CalenderBox from '../../components/CalenderBox'
import { FormProvider, useForm } from 'react-hook-form'
import DataTable from 'react-data-table-component'
import { useEffect, useState } from 'react'
import UploadForm from '../../components/UploadForm'
import { API_FACULTY_FILE_UPLOAD } from '../../../config/config'

import axios from 'axios'
import DynamicUserFields from '../../components/DynamicFieldsForm'

import { useFilter } from '../../hooks/useFilter'
import { DataFilterComponent } from '../../components/DataFilterComponent'
import { convertArrayOfObjectsToCSV } from '../../utils/convertArrayOfObjectsToCSV'

// Define available columns for export
const exportableColumns = [
  { key: 'patentTitle', label: 'Patent Title' },
  { key: 'inventors', label: 'Inventors' },
  { key: 'grantNumber', label: 'Grant Number' },
  { key: 'dateOfGrant', label: 'Date of Grant' },
  { key: 'countryOfGrant', label: 'Country of Grant' },
  { key: 'applicationNumber', label: 'Application Number' },
];

function PatentGrantedForm() {

  const { register, handleSubmit, reset } = useForm()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState(null)

  const { filterText, setFilterText, resetPaginationToggle, setResetPaginationToggle, handleClear, filteredData } = useFilter(data);
  
  // State for selected rows and columns
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [showColumnSelector, setShowColumnSelector] = React.useState(false);
  const [selectedColumns, setSelectedColumns] = React.useState(
    exportableColumns.map(col => col.key)
  );

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
      const data = await axios.get("http://localhost:3000/api/v1/faculty/patents-granted")
      console.log(data.data.patents)
      setData(data.data.patents)
    }

  }

  useEffect(() => {
    console.log("fetching data")
    fetchData()
    console.log(data)
  }, [loading])

  const methods = useForm({
    defaultValues: {
      inventors: [{ memberName: "", role: "" }], // 👈 default subform array
    },
  });

  const onSubmit = async (data) => {


    console.log(data)
    console.log(data.file[0])
    setFile(data.file[0])
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("http://localhost:3000/file", formData)
      console.log(res.data)

      const url = "http://localhost:3000/api/v1/faculty/patent-granted"
      const response = await axios.post(url
        , {
          patentTitle: data.patentTitle,
          inventors: data.inventorse,
          grantNumber: data.grantNumber,
          dateOfGrant: data.dateOfGrant,
          countryOfGrant: data.countryOfGrant,
          applicationNumber: data.applicationNumber,
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
    const filename = 'patent_granted_export.csv';
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
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-2">
            Patent Granted Form
          </h2>
          <UploadForm url={`${API_FACULTY_FILE_UPLOAD}/patent_granted`} />
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputBox label="patent_Title" name="patentTitle" register={methods.register} required />
              <DynamicUserFields label="investors" name="inventors" register={methods.register} required />
              <InputBox label="grant_Number" name="grantNumber" register={methods.register} required />
              <CalenderBox label="date_Of_Grant" name="dateOfGrant" register={methods.register} required />
              <InputBox label="country_Of_Grant" name="countryOfGrant" register={methods.register} required />
              <InputBox label="application_Number" name="applicationNumber" register={methods.register} required />
              <FileBox label="patent_Certificate_Upload" name="file" register={methods.register} />

              <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Submit</button>
            </div>
          </form>
        </FormProvider>
      </div>
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
          title={"Patent Granted Data"}
          columns={patentColumn}
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
  )
}

export default PatentGrantedForm


export const patentColumn = [
  {
    name: 'Patent Title',
    selector: row => row.patentTitle,
    sortable: true,
    wrap: true,
  },
  {
    name: 'Inventors',
    selector: row => row.inventors,
    cell: row => {
      if (!row.inventors) return 'N/A';
      if (Array.isArray(row.inventors)) return row.inventors.join(', ');
      if (typeof row.inventors === 'object') return Object.values(row.inventors).filter(v => v).join(', ');
      return String(row.inventors);
    },
    sortable: true,
    wrap: true,
  },
  {
    name: 'Grant Number',
    selector: row => row.grantNumber,
    sortable: true,
  },
  {
    name: 'Date of Grant',
    selector: row => (row.dateOfGrant),
    sortable: true,
  },
  {
    name: 'Country of Grant',
    selector: row => row.countryOfGrant,
    sortable: true,
  },
  {
    name: 'Application Number',
    selector: row => row.applicationNumber,
    sortable: true,
  }
]


