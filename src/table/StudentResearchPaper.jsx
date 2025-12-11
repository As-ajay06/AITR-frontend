import DataTable from 'react-data-table-component';
import React from 'react';
import { useFilter } from '../hooks/useFilter';
import { DataFilterComponent } from '../components/DataFilterComponent';
import { useTableExport } from '../hooks/useTableExport';
import TableExportControls from '../components/TableExportControls';
import ColumnSelectorModal from '../components/ColumnSelectorModal';

// Define available columns for export with their keys
const exportableColumns = [
  { key: 'batch', label: 'Batch' },
  { key: 'branch', label: 'Branch' },
  { key: 'coAuthors', label: 'Co-Authors' },
  { key: 'doiOrIsbn', label: 'DOI or ISBN' },
  { key: 'enrollmentNumber', label: 'Enrollment Number' },
  { key: 'facultyGuide', label: 'Faculty Guide' },
  { key: 'journalOrConferenceName', label: 'Journal or Conference Name' },
  { key: 'publicationDate', label: 'Publication Date' },
  { key: 'studentName', label: 'Student Name' },
  { key: 'titleOfPaper', label: 'Title of Paper' },
];

const columns = [
  { name: 'Batch', selector: row => row.batch || "N/A", sortable: true, width: '200px', wrap: false },
  { name: 'Branch', selector: row => row.branch || "N/A", sortable: true, width: '200px', wrap: false },
  { name: 'Co-Authors', selector: row => row.coAuthors || "N/A", sortable: true, width: '300px', wrap: false},
  { name: 'doi Or Isbn', selector: row => row.doiOrIsbn || "N/A", sortable: true, width: '300px', wrap: false },
  { name: 'Enrollment Number', selector: row => row.enrollmentNumber || "N/A", sortable: true, width: '300px', wrap: false },
  { name: 'Faculty Guide', selector: row => row.facultyGuide || "N/A" , sortable: true, width: '300px', wrap: false },
  { name: 'Indexing', selector: row => row.indexing[0] || "N/A" , sortable: true, width: '200px', wrap: false },
  { name: 'Journal Or Conference Name', selector: row => row.journalOrConferenceName || "N/A", sortable: true, width: '400px', wrap: false },
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
    ) : "N/A", sortable: true, width: '400px', wrap: false
  },
  { name: 'Publication Date', selector: row => new Date(row.publicationDate).toLocaleDateString() , sortable: true, width: '400px', wrap: false },
  { name: 'Student Name', selector: row => row.studentName, sortable: true, width: '400px', wrap: false },
  { name: 'Title Of Paper', selector: row => row.titleOfPaper , sortable: true, width: '400px', wrap: false },
];


const StudentResearchPaper = ({ data }) => {
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
        onExport={() => downloadCSV(data, 'student_research_export.csv')}
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

      <DataTable
        title="Student Research Publications"
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

export default StudentResearchPaper;
