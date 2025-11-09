import React from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useFilter } from '../hooks/useFilter';
import { DataFilterComponent } from '../components/DataFilterComponent';
import { convertArrayOfObjectsToCSV } from '../utils/convertArrayOfObjectsToCSV';

// Define available columns for export with their keys
const exportableColumns = [
  { key: 'studentId', label: 'ID' },
  { key: 'name', label: 'Student Name' },
  { key: 'enrollmentNumber', label: 'Enrollment No.' },
  { key: 'branch', label: 'Branch' },
  { key: 'batch', label: 'Batch' },
  { key: 'email', label: 'Email' },
  { key: 'year', label: 'Year' },
  { key: 'course', label: 'Course' },
  { key: 'cgpa', label: 'CGPA' },
  { key: 'dateOfBirth', label: 'Date of Birth' },
  { key: 'gender', label: 'Gender' },
  { key: 'catogory', label: 'Category' },
  { key: 'yearOfAdmission', label: 'Year of Admission' },
  { key: 'status', label: 'Status' },
  { key: 'githubLink', label: 'Github Link' },
  { key: 'linkinProfileLink', label: 'LinkedIn Profile Link' },
  { key: 'gaurdianContactNumber', label: 'Guardian Contact Number' },
  { key: 'gaurdianName', label: 'Guardian Name' },
  { key: 'address', label: 'Address' },
];

const columns = [
  { name: 'ID', selector: row => row.studentId, sortable: true, width: '70px' },
  { name: 'Student Name', selector: row => row.name, sortable: true },
  { name: 'Enrollment No.', selector: row => row.enrollmentNumber },
  { name: 'Branch', selector: row => row.branch },
  { name: 'batch', selector: row => row.batch, wrap: true },
  { name: 'email', selector: row => row.email },
  { name: 'year', selector: row => row.year },
  { name: 'course', selector: row => row.course, wrap: true },
  { name: 'cgpa', selector: row => row.cgpa, wrap: true },
  { name: 'dateOfBirth', selector: row => row.dateOfBirth, wrap: true },
  { name: 'gender', selector: row => row.gender, wrap: true },
  { name: 'catogory', selector: row => row.catogory, wrap: true },
  { name: 'yearOfAdmission', selector: row => row.yearOfAdmission, wrap: true },
  { name: 'status', selector: row => row.status, wrap: true },
  { name: 'githubLink', selector: row => (<a href={row.githubLink} target='_blank'>{row.githubLink}</a>), wrap: true },
  { name: 'linkinProfileLink', selector: row => (<a href={row.linkinProfileLink} target='_blank'>Link</a>) || "N/A", wrap: true },
  { name: 'gaurdianContactNumber', selector: row => row.gaurdianContactNumber, wrap: true },
  { name: 'gaurdianName', selector: row => row.gaurdianName, wrap: true },
  { name: 'address', selector: row => row.address, wrap: true },
  {
    name: "Download PDF",
    selector: row => row.fileId,
    cell: row =>
      row.fileId ? (
        <a
          href={`http://localhost:3000/file/${row.fileId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View PDF
        </a>
      ) : (
        "N/A"
      ),
    sortable: false,
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
              alert(`Deleting certificate ${row._Id}`)
              const baseUrl = "http://localhost:3000";
              const url = "api/v1/students/profile";
              const response = await axios.delete(`${baseUrl}/${url}/${row._id}`);
              console.log(response.data.certificate);
            }
          } className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded">Delete</button>
      </div >
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];




const StudentTable = ({ data }) => {

  const { filterText, setFilterText, resetPaginationToggle, setResetPaginationToggle, filteredData } = useFilter(data);

  // State for selected rows and columns
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [showColumnSelector, setShowColumnSelector] = React.useState(false);
  const [selectedColumns, setSelectedColumns] = React.useState(
    exportableColumns.map(col => col.key) // All columns selected by default
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
  }, [filterText, resetPaginationToggle, setResetPaginationToggle, setFilterText]);

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
    // Determine which data to export
    let dataToExport = array;
    
    // If rows are selected, only export selected rows
    if (selectedRows.length > 0) {
      dataToExport = selectedRows;
    }

    // Filter by selected columns
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
    const filename = 'export.csv';
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
    <div className="p-4 overflow-x-auto">
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
        title="Students"
        columns={columns}
        data={filteredData}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        actions={actionsMemo}
        selectableRows
        onSelectedRowsChange={handleRowSelected}
      />
    </div>
  );
};

export default StudentTable;
