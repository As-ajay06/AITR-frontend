import React from 'react';
import DataTable from 'react-data-table-component';
import { useFilter } from '../hooks/useFilter';
import { DataFilterComponent } from '../components/DataFilterComponent';
import { useTableExport } from '../hooks/useTableExport';
import TableExportControls from '../components/TableExportControls';
import ColumnSelectorModal from '../components/ColumnSelectorModal';

// Define available columns for export with their keys
const exportableColumns = [
  { key: 'facultyId', label: 'ID' },
  { key: 'facultyName', label: 'Faculty Name' },
  { key: 'department', label: 'Department' },
  { key: 'fdpTitle', label: 'FDP Title' },
  { key: 'programName', label: 'Program Name' },
  { key: 'organizingInstitute', label: 'Organising Institute' },
  { key: 'startDate', label: 'Start Date' },
  { key: 'endDate', label: 'End Date' },
  { key: 'programType', label: 'Program Type' },
  { key: 'mode', label: 'Mode' },
  { key: 'location', label: 'Location' },
  { key: 'numberOfDays', label: 'No of Days' },
];

// Columns
const columns = [
  { name: 'ID', selector: row => row.facultyId || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Faculty Name', selector: row => row.facultyName || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'department', selector: row => row.department || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'FDP title', selector: row => row.fdpTitle || "N/A" , sortable: true, width: '200px', wrap: true },
  { name: 'Program Name', selector: row => row.programName || "N/A" , sortable: true, width: '200px', wrap: true},
  { name: 'Organising Institute', selector: row => row.organizingInstitute || "N/A" , sortable: true, width: '200px', wrap: true },

  { name: 'Start Date', selector: row => new Date(row.startDate).toLocaleDateString() || "N/A" , sortable: true, width: '200px', wrap: true},
  { name: 'End Date', selector: row => new Date(row.endDate).toLocaleDateString() || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Program Type', selector: row => row.programType || "N/A" , sortable: true, width: '200px', wrap: true },
  { name: 'Mode', selector: row => row.mode || "N/A" , sortable: true, width: '200px', wrap: true},
  { name: 'Location', selector: row => row.location || "N/A" , sortable: true, width: '200px', wrap: true},
  { name: 'No of days', selector: row => row.numberOfDays || "N/A" , sortable: true, width: '200px', wrap: true},
  {
    name: 'Certificate PDF',
    cell: row => row.fileId ? (
      <a
        href={`http://localhost:3000/file/${row.fileId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View
      </a>
    ) : "N/A"
  },
];


const DevelopmentProgramTable = ({ data }) => {
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
        onExport={() => downloadCSV(data, 'development_program_export.csv')}
        onToggleColumnSelector={() => setShowColumnSelector(!showColumnSelector)}
        selectedColumnsCount={selectedColumns.length}
        selectedRowsCount={selectedRows.length}
      />
    ),
    [downloadCSV, data, showColumnSelector, setShowColumnSelector, selectedColumns.length, selectedRows.length]
  );

  return (
    <div className="p-4">
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

      <DataTable
        title={"Devlopment Program"}
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
  );
};

export default DevelopmentProgramTable;
