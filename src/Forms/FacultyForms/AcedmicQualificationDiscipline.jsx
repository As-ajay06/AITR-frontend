import React from 'react'
import InputBox from '../../components/InputBox'
import FileBox from '../../components/FileBox'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import UploadForm from '../../components/UploadForm'
import { useFilter } from '../../hooks/useFilter'
import { DataFilterComponent } from '../../components/DataFilterComponent'
import { convertArrayOfObjectsToCSV } from '../../utils/convertArrayOfObjectsToCSV'

// Define available columns for export
const exportableColumns = [
  { key: 'facultyName', label: 'Faculty Name' },
  { key: 'highestDegree', label: 'Highest Degree' },
  { key: 'universityOrInstitute', label: 'University/Institute' },
  { key: 'specialization', label: 'Specialization' },
  { key: 'yearOfCompletion', label: 'Year of Completion' },
];

function AcedmicQualificationDiscipline() {

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
      <DataFilterComponent placeholder={"Filter by Faculty Name"} onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
    );
  }, [filterText, resetPaginationToggle, handleClear]);


  const fetchData = async () => {
    if (loading == true) {
      const data = await axios.get("http://localhost:3000/api/v1/faculty/academic-qualifications")
      console.log(data.data.qualifications)
      setData(data.data.qualifications)

    }

  }

  useEffect(() => {
    console.log("fetching data")
    fetchData()
    console.log(data)
  }, [loading])

  const onSubmit = async (data, e) => {
    e.preventDefault();

    const formData = new FormData();
    const fileInput = document.querySelector("input[type='file']");
    if (fileInput?.files[0]) {
      formData.append("file", fileInput.files[0]);
    }
    try {

      const res = await axios.post("http://localhost:3000/file", formData)
      console.log(res.data)

      const url = "http://localhost:3000/api/v1/faculty/academic-qualification"
      const response = await axios.post(url
        , {
          facultyName: data.facultyName,
          highestDegree: data.highestDegree,
          universityOrInstitute: data.universityOrInstitute,
          specialization: data.specialization,
          yearOfCompletion: data.yearOfCompletion,
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
    const filename = 'academic_qualifications_export.csv';
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
            Faculty Academic Qualification Discipline Form
          </h2>
          <UploadForm url={"addAcedmicQualificationDisciplineData"} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" >
            <InputBox label={"faculty_name"} name="facultyName" register={register} required />
            <InputBox label="highest_Degree" name="highestDegree" register={register} required />

            <InputBox label="universityOrInstitute" name="universityOrInstitute" register={register} required />

            <InputBox label="specialization" name="specialization" register={register} required />

            <InputBox
              label="year_Of_Completion"
              name="yearOfCompletion"
              register={register}
              type="number"
              required
            />
            <FileBox label="certificateUrl" name="certificateUrl" register={register} />

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
          </div>
        </form>
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
          title={"Academic Qualification Data"}
          columns={academicQualificationColumns} 
          data={filteredData}
          actions={actionsMemo}
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

export default AcedmicQualificationDiscipline

export const academicQualificationColumns = [
  {
    name: 'Faculty Name',
    selector: row => row.facultyName,
    cell: row => {
      if (!row.facultyName) return 'N/A';
      if (typeof row.facultyName === 'object' && !Array.isArray(row.facultyName)) {
        return Object.values(row.facultyName).filter(v => v && typeof v === 'string').join('');
      }
      return String(row.facultyName);
    },
    sortable: true,
    wrap: true,
  },
  {
    name: 'Highest Degree',
    selector: row => row.highestDegree,
    cell: row => {
      if (!row.highestDegree) return 'N/A';
      if (typeof row.highestDegree === 'object' && !Array.isArray(row.highestDegree)) {
        return Object.values(row.highestDegree).filter(v => v && typeof v === 'string').join('');
      }
      return String(row.highestDegree);
    },
    sortable: true,
    wrap: true,
  },
  {
    name: 'University/Institute',
    selector: row => row.universityOrInstitute,
    cell: row => {
      if (!row.universityOrInstitute) return 'N/A';
      if (typeof row.universityOrInstitute === 'object' && !Array.isArray(row.universityOrInstitute)) {
        return Object.values(row.universityOrInstitute).filter(v => v && typeof v === 'string').join('');
      }
      return String(row.universityOrInstitute);
    },
    sortable: true,
    wrap: true,
  },
  {
    name: 'Specialization',
    selector: row => row.specialization,
    cell: row => {
      if (!row.specialization) return 'N/A';
      if (typeof row.specialization === 'object' && !Array.isArray(row.specialization)) {
        return Object.values(row.specialization).filter(v => v && typeof v === 'string').join('');
      }
      return String(row.specialization);
    },
    sortable: true,
  },
  {
    name: 'Year of Completion',
    selector: row => row.yearOfCompletion,
    cell: row => {
      if (!row.yearOfCompletion) return 'N/A';
      if (typeof row.yearOfCompletion === 'object' && !Array.isArray(row.yearOfCompletion)) {
        return Object.values(row.yearOfCompletion).filter(v => v && typeof v === 'string').join('');
      }
      return String(row.yearOfCompletion);
    },
    sortable: true,
  },
  {
    name: 'Certificate',
    cell: row => (
      row.fileId ? (
        <a
          href={`http://localhost:3000/file/${row.fileId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View PDF
        </a>
      ) : "N/A"
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
  {
    name: 'Actions',
    cell: row => (
      <div className="flex flex-col items-center justify-center gap-0.5">
        {/* <button onClick={() => alert(`Viewing certificate ${row.Id}`)} className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-4 py-1 rounded">View</button> */}
        <button onClick={() => alert(`Editing certificate ${row._Id}`)} className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-5 py-1 rounded">Edit</button>
        <button
          onClick={
            async () => {
              console.log(row._id)
              alert(`Deleting this ${row._id}`)
              const baseUrl = "http://localhost:3000";
              const url = "api/v1/faculty/academic-qualification"
              const response = await axios.delete(`${baseUrl}/${url}/${row._id}`);
              console.log(response.data);
            }
          } className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded">Delete</button>
      </div >
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];


