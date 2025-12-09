import DataTable from 'react-data-table-component';
import React from 'react';
import { useFilter } from '../hooks/useFilter';
import { DataFilterComponent } from '../components/DataFilterComponent';
import { useTableExport } from '../hooks/useTableExport';
import TableExportControls from '../components/TableExportControls';
import ColumnSelectorModal from '../components/ColumnSelectorModal';


// note : this is the faculty table

// Define available columns for export with their keys
const exportableColumns = [
  { key: 'recipientId', label: 'ID' },
  { key: 'recipientName', label: 'Recipient Name' },
  { key: 'department', label: 'Department' },
  { key: 'awardName', label: 'Award Name' },
  { key: 'issuingOrganization', label: 'Issuing Organization' },
  { key: 'date', label: 'Date' },
  { key: 'category', label: 'Category' },
  { key: 'eventName', label: 'Event Name' },
  { key: 'description', label: 'Description/Purpose' },
  { key: 'titleOfAward', label: 'Title of Award' },
  { key: 'level', label: 'Level' },
];

// Columns Definition
const columns = [
  {
    name: 'ID',
    selector: row => row.recipientId || "N/A",
    sortable: true
  },
  {
    name: 'Recipient Name',
    selector: row => row.recipientName || "N/A",
    sortable: true
  },
  {
    name: 'Department',
    selector: row => row.department || "N/A",
    sortable: true
  },
  {
    name: 'Award Name',
    selector: row => row.awardName || "N/A",
    sortable: true
  },
  {
    name: 'Issuing Organization',
    selector: row => row.issuingOrganization || "N/A",
    sortable: true
  },
  {
    name: 'Date',
    selector: row => new Date(row.date).toLocaleDateString() || "N/A",
    sortable: true
  },
  {
    name: 'Category',
    selector: row => row.category || "N/A",
    sortable: true
  },
  {
    name: 'Event Name',
    selector: row => row.eventName || "N/A",
    sortable: true
  },
  {
    name: 'Description/Purpose',
    selector: row => row.description || "N/A",
    wrap: true
  },
  {
    name: 'Certificate PDF',
    cell: row => (
      <a
        href={`http://localhost:3000/file/${row.fileId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View
      </a>
    )
  },
  {
    name: 'Title of Award',
    selector: row => row.titleOfAward,
    sortable: true
  },
  {
    name: 'Level',
    selector: row => row.level,
    sortable: true
  },
];


// Sample Data



// Component
const AwardTable = ({ data }) => {
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
        onExport={() => downloadCSV(data, 'awards_export.csv')}
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
        title="Faculty Awards"
        columns={columns}
        actions={actionsMemo}
        data={filteredData}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
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

export default AwardTable;
