import axios from 'axios';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { convertArrayOfObjectsToCSV } from '../utils/convertArrayOfObjectsToCSV';
import { DataFilterComponent } from '../components/DataFilterComponent';
import { useFilter } from '../hooks/useFilter';

// Define available columns for export with their keys
const exportableColumns = [
  { key: 'hackathonName', label: 'Hackathon Name' },
  { key: 'organizer', label: 'Organiser' },
  { key: 'result', label: 'Result' },
  { key: 'eventDate', label: 'Event Date' },
  { key: 'teamName', label: 'Team Name' },
  { key: 'teamSize', label: 'Team Size' },
  { key: 'mentorName', label: 'Mentor Name' },
  { key: 'venue', label: 'Venue' },
  { key: 'problemStatement', label: 'Problem Statement' },
  { key: 'prizeMoney', label: 'Prize Money' },
  { key: 'positionSecured', label: 'Position Secured' },
];

const columns = [
  { name: 'Hackathon Name', selector: row => row.hackathonName },
  { name: 'Organiser', selector: row => row.organizer },
  {
    name: 'Team Details', selector: row =>
    (row.teamDetails.map(
      (item, index) =>
      (<div
        key={index}>
        <p>{item.memberName}</p>
        <p>{item.role}</p>
      </div>)
    )
    ), wrap: true
  },
  { name: 'Result', selector: row => row.result },
  { name: 'Event Date', selector: row => row.eventDate },
  { name: 'Team Name', selector: row => row.teamName },
  { name: 'Team Size', selector: row => row.teamSize },
  { name: 'Mentor Name', selector: row => row.mentorName },
  { name: 'Venue', selector: row => row.venue },
  { name: 'Problem Statement', selector: row => row.problemStatement, wrap: true },
  {
    name: 'Technolgy used', selector: row =>
    (row.technologyUsed.map(
      (item, index) =>
      (<div
        key={index}>
        <p>{item.memberName}</p>
        <p>{item.role}</p>
      </div>)
    )
    ), wrap: true
  },
  { name: 'Prize Money', selector: row => row.prizeMoney },
  { name: 'Position Secured', selector: row => row.positionSecured },
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
              alert(`Deleting certificate ${row._id}`)
              const baseUrl = "http://localhost:3000";
              const url = "api/v1/students/hackathon"
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



export const HackathonTable = ({ data }) => {

  const { filterText, setFilterText, resetPaginationToggle, setResetPaginationToggle, handleClear, filteredData } = useFilter(data);

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
    const filename = 'hackathon_export.csv';
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
        title="Student Hackathon Participation"
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

export default HackathonTable;
