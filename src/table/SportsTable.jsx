import React from 'react';
import DataTable from 'react-data-table-component';
import { useFilter } from '../hooks/useFilter';
import { DataFilterComponent } from '../components/DataFilterComponent';
import { useTableExport } from '../hooks/useTableExport';
import TableExportControls from '../components/TableExportControls';
import ColumnSelectorModal from '../components/ColumnSelectorModal';

// Define available columns for export with their keys
const exportableColumns = [
  { key: 'Id', label: 'ID' },
  { key: 'Student_Name', label: 'Student Name' },
  { key: 'Sport_Name', label: 'Sport Name' },
  { key: 'Achievement', label: 'Achievement' },
  { key: 'Event_Date', label: 'Event Date' },
  { key: 'Event_Name', label: 'Event Name' },
  { key: 'Event_Level', label: 'Event Level' },
  { key: 'Event_Location', label: 'Event Location' },
  { key: 'Position', label: 'Position' },
  { key: 'Coach_Name', label: 'Coach Name' },
];

const columns = [
  { name: 'ID', selector: row => row.Id, sortable: true, width: '200px', wrap: true },
  { name: 'Student Name', selector: row => row.Student_Name , sortable: true, width: '200px', wrap: true },
  { name: 'Sport Name', selector: row => row.Sport_Name , sortable: true, width: '200px', wrap: true },
  { name: 'Achievement', selector: row => row.Achievement , sortable: true, width: '200px', wrap: true },
  { name: 'Event Date', selector: row => row.Event_Date , sortable: true, width: '200px', wrap: true },
  { name: 'Event Name', selector: row => row.Event_Name , sortable: true, width: '200px', wrap: true },
  { name: 'Event Level', selector: row => row.Event_Level , sortable: true, width: '200px', wrap: true },
  { name: 'Event Location', selector: row => row.Event_Location , sortable: true, width: '200px', wrap: true },
  { name: 'Position', selector: row => row.Position , sortable: true, width: '200px', wrap: true },
  {
    name: 'Certificate',
    cell: row => (
      <a href={row.Certificate} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">
        View
      </a>
    ),
    sortable: true, width: '200px', wrap: true
  },
  { name: 'Coach Name', selector: row => row.Coach_Name , sortable: true, width: '200px', wrap: true },
];

const SportsTable = ({ data }) => {
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
        onExport={() => downloadCSV(data, 'sports_export.csv')}
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

      <DataTable
        title="Student Sports Achievements"
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

export default SportsTable;
