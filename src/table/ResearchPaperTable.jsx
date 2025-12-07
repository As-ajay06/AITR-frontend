import React from 'react'
import DataTable from 'react-data-table-component';
import { useFilter } from '../hooks/useFilter';
import { DataFilterComponent } from '../components/DataFilterComponent';
import { useTableExport } from '../hooks/useTableExport';
import TableExportControls from '../components/TableExportControls';
import ColumnSelectorModal from '../components/ColumnSelectorModal';

// Define available columns for export with their keys
const exportableColumns = [
  { key: 'facultyId', label: 'ID' },
  { key: 'publicationDate', label: 'Publication Date' },
  { key: 'facultyName', label: 'Faculty Name' },
  { key: 'titleOfPaper', label: 'Title of Paper' },
  { key: 'journalOrConferenceName', label: 'Journal/Conference Name' },
  { key: 'coAuthors', label: 'Co-Author' },
  { key: 'indexing', label: 'Indexing' },
  { key: 'issnNumber', label: 'ISSN Number' },
  { key: 'authors', label: 'Authors' },
  { key: 'issnOrIsbn', label: 'ISSN/ISBN' },
  { key: 'department', label: 'Department' },
];

function ResearchPaperTable({ data: propData }) {
  // Use prop data if provided, otherwise use empty array
  const tableData = propData || [];
  const { filterText, setFilterText, resetPaginationToggle, setResetPaginationToggle, handleClear, filteredData } = useFilter(tableData);

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
  } = useTableExport(exportableColumns, tableData);

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
        onExport={() => downloadCSV(tableData, 'research_paper_export.csv')}
        onToggleColumnSelector={() => setShowColumnSelector(!showColumnSelector)}
        selectedColumnsCount={selectedColumns.length}
        selectedRowsCount={selectedRows.length}
      />
    ),
    [downloadCSV, tableData, showColumnSelector, setShowColumnSelector, selectedColumns.length, selectedRows.length]
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
      )}

      <DataTable
        title={"Faculty Reseach paper"}
        columns={researchPaperColumns}
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
  )
}

export default ResearchPaperTable

export const researchPaperColumns = [
  {
    name: 'ID',
    selector: row => row.facultyId,
    sortable: true,
    center: true
  },
  {
    name: 'Publication Date',
    selector: row => row.publicationDate,
    sortable: true,
    center: true
  },
  {
    name: 'Faculty Name',
    selector: row => row.facultyName,
    sortable: true
  },
  {
    name: 'Title of Paper',
    selector: row => row.titleOfPaper,
    sortable: true,
    wrap: true
  },
  {
    name: 'Publication Date',
    selector: row => row.publicationDate,
    format: row => new Date(row.publicationDate).toLocaleDateString()
  },
  {
    name: 'Journal/Conference Name',
    selector: row => row.journalOrConferenceName,
    wrap: true
  },
  {
    name: 'Co-Author',
    selector: row => row.coAuthors,
    wrap: true
  },
  {
    name: 'Indexing',
    selector: row => row.indexing,
    wrap: true
  },
  {
    name: 'Paper PDF',
    selector: row => row.paperPdf,
    cell: row => (
      <a
        href={row.paperPdf}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View PDF
      </a>
    )
  },
  {
    name: 'ISSN Number',
    selector: row => row.issnNumber
  },
  {
    name: 'DOI Link',
    selector: row => row.doiLink,
    cell: row => (
      <a
        href={row.doiLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        DOI
      </a>
    )
  },
  {
    name: 'Authors',
    selector: row => row.authors,
    cell: row =>
      Array.isArray(row.authors) ? row.authors.join(', ') : row.authors
  },
  {
    name: 'ISSN/ISBN',
    selector: row => row.issnOrIsbn
  },
  {
    name: 'Department',
    selector: row => row.department
  }
];


export const ResearchPaperPublication = [
  { name: 'Student Name', selector: row => row.studentName, sortable: true },
  { name: 'Enrollment Number', selector: row => row.enrollmentNumber, wrap: true },
  { name: 'Branch', selector: row => row.branch },
  { name: 'Batch', selector: row => row.batch },
  { name: 'doiOrIsbn', selector: row => row.doiOrIsbn, wrap: true },
  { name: 'title Of Paper', selector: row => row.titleOfPaper },
  { name: 'Publication Date', selector: row => row.publicationDate },
  { name: 'journal Or Conference Name', selector: row => row.journalOrConferenceName },
  { name: 'cCo Authors', selector: row => row.coAuthors },
  { name: 'indexing', selector: row => row.indexing },
  { name: 'Certificate PDF', selector: row => row.fileId },
  { name: 'Faculty Guide', selector: row => row.facultyGuide },
];

// todo : here we are deleting faculty reaseach paper
// this research paper belongs to faculty member