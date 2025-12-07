import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { DataFilterComponent } from '../components/DataFilterComponent';
import { useFilter } from '../hooks/useFilter';
import { useTableExport } from '../hooks/useTableExport';
import TableExportControls from '../components/TableExportControls';
import ColumnSelectorModal from '../components/ColumnSelectorModal';

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
];



export const HackathonTable = ({ data }) => {
  const { filterText, setFilterText, resetPaginationToggle, setResetPaginationToggle, handleClear, filteredData } = useFilter(data);

  // Use the reusable export hook
  const {
    selectedRows,
    showColumnSelector,
    selectedColumns,
    setShowColumnSelector,
    handleRowSelected,
    toggleColumnSelection,
    selectAllColumns,
    deselectAllColumns,
    downloadCSV,
  } = useTableExport(exportableColumns, data);

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

  const actionsMemo = React.useMemo(
    () => (
      <TableExportControls
        onExport={() => downloadCSV(data, 'hackathon_export.csv')}
        onToggleColumnSelector={() => setShowColumnSelector(!showColumnSelector)}
        selectedColumnsCount={selectedColumns.length}
        selectedRowsCount={selectedRows.length}
      />
    ),
    [downloadCSV, data, showColumnSelector, setShowColumnSelector, selectedColumns.length, selectedRows.length]
  );

  return (
    <div className="p-4 overflow-x-auto">
      <ColumnSelectorModal
        isOpen={showColumnSelector}
        onClose={() => setShowColumnSelector(false)}
        exportableColumns={exportableColumns}
        selectedColumns={selectedColumns}
        onToggleColumn={toggleColumnSelection}
        onSelectAll={selectAllColumns}
        onDeselectAll={deselectAllColumns}
      />
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
        customStyles={{
          headCells: {
            style: {
              fontSize: '16px',
              fontWeight: '600',
            },
          },
        }}
      />
    </div>
  );
};

export default HackathonTable;
