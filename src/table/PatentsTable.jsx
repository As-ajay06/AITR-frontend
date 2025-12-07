import React from 'react';
import DataTable from 'react-data-table-component';
import { useFilter } from '../hooks/useFilter';
import { DataFilterComponent } from '../components/DataFilterComponent';
import { useTableExport } from '../hooks/useTableExport';
import TableExportControls from '../components/TableExportControls';
import ColumnSelectorModal from '../components/ColumnSelectorModal';

// Define available columns for export with their keys
const exportableColumns = [
  { key: 'facultyId', label: 'Faculty Id' },
  { key: 'facultyName', label: 'Faculty Name' },
  { key: 'department', label: 'Department' },
  { key: 'title', label: 'Title' },
  { key: 'applicant', label: 'Applicant' },
  { key: 'applicationNumber', label: 'Application Number' },
  { key: 'applicationDate', label: 'Application Date' },
  { key: 'status', label: 'Status' },
  { key: 'coInventors', label: 'Co-Inventors' },
  { key: 'country', label: 'Country' },
  { key: 'category', label: 'Category' },
  { key: 'patentTitle', label: 'Patent Title' },
  { key: 'inventors', label: 'Inventors' },
  { key: 'publicationDate', label: 'Publication Date' },
  { key: 'abstract', label: 'Abstract' },
];

// Column Definitions
const columns = [
  { name: 'Faculty Id', selector: row => row.facultyId, sortable: true, width: '70px' },
  { name: 'Faculty Name', selector: row => row.facultyName, sortable: true },
  { name: 'Department', selector: row => row.department, wrap: true },
  { name: 'Title', selector: row => row.title },
  { name: 'Applicant', selector: row => row.applicant },
  { name: 'Application Number', selector: row => row.applicationNumber, wrap: true },
  { name: 'Application Date', selector: row => row.applicationDate },
  { name: 'Status', selector: row => row.status },
  { 
    name: 'Co-Inventors', 
    selector: row => row.coInventors,
    cell: row => {
      if (!row.coInventors) return 'N/A';
      if (Array.isArray(row.coInventors)) return row.coInventors.join(', ');
      if (typeof row.coInventors === 'object') return Object.values(row.coInventors).filter(v => v).join(', ');
      return String(row.coInventors);
    },
    wrap: true
  },
  { name: 'Country', selector: row => row.country },
  { name: 'Category', selector: row => row.category },
  {
    name: 'Certificate PDF',
    cell: row => (
      row.fileId || row.Certificate_Link || row.certificateLink ? (
        <a
          href={row.Certificate_Link || row.certificateLink || `http://localhost:3000/file/${row.fileId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View
        </a>
      ) : 'N/A'
    )
  },
  { name: 'Patent Title', selector: row => row.patentTitle, wrap: true },
  { 
    name: 'Inventors', 
    selector: row => row.inventors,
    cell: row => {
      if (!row.inventors) return 'N/A';
      if (Array.isArray(row.inventors)) return row.inventors.join(', ');
      if (typeof row.inventors === 'object') return Object.values(row.inventors).filter(v => v).join(', ');
      return String(row.inventors);
    },
    wrap: true
  },
  { name: 'Publication Date', selector: row => row.publicationDate },
  { name: 'Abstract', selector: row => row.abstract, wrap: true },


];


const PatentTable = ({ data }) => {
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
        onExport={() => downloadCSV(data, 'patents_export.csv')}
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

      <DataTable
        title="Faculty Patents"
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

export default PatentTable;
