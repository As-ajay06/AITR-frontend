import React, { useEffect } from 'react'
import FacultyForm from '../../Forms/FacultyForms/FacultyForm'
import FacultyTable from '../../table/FacultyTable'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Button from '../../components/Button';
import { convertArrayOfObjectsToCSV } from '../../utils/convertArrayOfObjectsToCSV';

// Define available columns for export
const exportableColumns = [
  { key: 'facultyId', label: 'Faculty ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'qualification', label: 'Qualification' },
  { key: 'department', label: 'Department' },
  { key: 'mobileNumber', label: 'Mobile Number' },
  { key: 'category', label: 'Category' },
  { key: 'teachingExperience', label: 'Teaching Experience' },
  { key: 'designation', label: 'Designation' },
];

function AddFaculty() {

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
      const token = localStorage.getItem('token');
      const data = await axios.get("http://localhost:3000/api/v1/faculty/profiles" , {
        headers:{
          Authorization: `${token}`
        }
      } )
      console.log(data.data.profiles)
      setData(data.data.profiles)
      setLoading(false)
    }

  }

  useEffect(() => {
    console.log("fetching data")
    fetchData()
    console.log(data)
  }, [loading])

  const onSubmit = async (facultyData) => {

    try {

      console.log(facultyData)
      const url = "http://localhost:3000/api/v1/faculty/profile"
      const response = await axios.post(url
        , {
          facultyId: facultyData.facultyId,
          name: facultyData.name,
          email: facultyData.email,
          qualification: facultyData.qualification,
          department: facultyData.department,
          mobileNumber: facultyData.mobileNumber,
          category: facultyData.category,
          teachingExperience: facultyData.teachingExperience,
          designation: facultyData.designation,
        }
      )

      if (response.ok) {
        console.log("hi there")
      }

      console.log(response)

    } catch (err) {
      console.log("Error:", err)
    }
    console.log(facultyData)

    setLoading((p) => !p)
  }

  let index = 1

  const columns = [
    {
      name: 's.no',
      selector: row => row.id,
      sortable: true,
      width: '80px',
      cell: (row, index) => index + 1
    },
    {
      name: 'faculty ID',
      selector: row => row.facultyId,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'qualification',
      selector: row => row.qualification,
      sortable: true,
    },
    {
      name: 'Department',
      selector: row => row.department,
      sortable: true,
    },
    {
      name: 'Mobile No',
      selector: row => row.mobileNumber,
      sortable: true,
    },
    {
      name: 'Experience (Years)',
      selector: row => row.teachingExperience,
      sortable: true,

    },
    {
      name: 'Designation',
      selector: row => row.designation,
      sortable: true,
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
                alert(`Deleting This ${row._id}`)
                const baseUrl = "http://localhost:3000";
                const url = "api/v1/faculty/profile";
                const response = await axios.delete(`${baseUrl}/${url}/${row._id}`);
                console.log(response.data);
              }
            } className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded">Delete</button>
        </div >
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

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
    const filename = 'faculty_export.csv';
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
      <FacultyForm onSubmit={onSubmit} register={register} handleSubmit={handleSubmit} reset={reset} />
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
          title={"Faculty Data"}
          columns={columns}
          data={data}
          actions={actionsMemo}
          selectableRows
          onSelectedRowsChange={handleRowSelected}
        />
      </div>
    </div>
  )
}
export default AddFaculty