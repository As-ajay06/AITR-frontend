import React from 'react';
import DataTable from 'react-data-table-component';
import { DataFilterComponent } from '../components/DataFilterComponent';
import { useFilter } from '../hooks/useFilter';
import { useTableExport } from '../hooks/useTableExport';
import TableExportControls from '../components/TableExportControls';
import ColumnSelectorModal from '../components/ColumnSelectorModal';

// todo: why conference table is there

// Define available columns for export with their keys
const exportableColumns = [
  { key: 'Id', label: 'ID' },
  { key: 'Faculty_Name', label: 'Faculty Name' },
  { key: 'Conference_Name', label: 'Conference Name' },
  { key: 'Paper_Title', label: 'Paper Title' },
  { key: 'Presentation_Date', label: 'Presentation Date' },
  { key: 'Conference_Type', label: 'Conference Type' },
  { key: 'Conference_Location', label: 'Location' },
  { key: 'Conference_Mode', label: 'Mode' },
  { key: 'Publication_Status', label: 'Publication Status' },
  { key: 'Journal_Name', label: 'Journal Name' },
  { key: 'Issn_Number', label: 'ISSN Number' },
  { key: 'Indexing', label: 'Indexing' },
];

// Columns
const columns = [
  { name: 'ID', selector: row => row.Id, sortable: true, width: '70px' },
  { name: 'Faculty Name', selector: row => row.Faculty_Name, sortable: true },
  { name: 'Conference Name', selector: row => row.Conference_Name },
  { name: 'Paper Title', selector: row => row.Paper_Title, wrap: true },
  { name: 'Presentation Date', selector: row => row.Presentation_Date },
  { name: 'Conference Type', selector: row => row.Conference_Type },
  { name: 'Location', selector: row => row.Conference_Location },
  { name: 'Mode', selector: row => row.Conference_Mode },
  { name: 'Publication Status', selector: row => row.Publication_Status },
  { name: 'Journal Name', selector: row => row.Journal_Name },
  { name: 'ISSN Number', selector: row => row.Issn_Number },
  { name: 'Indexing', selector: row => row.Indexing },
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
];

// Data

const ConferenceTable = ({ data }) => {
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
        onExport={() => downloadCSV(data, 'conference_export.csv')}
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
        title="Faculty Conference Presentations"
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

export default ConferenceTable;
