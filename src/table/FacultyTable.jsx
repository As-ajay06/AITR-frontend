import React from 'react';
import DataTable from 'react-data-table-component';
import { useFilter } from '../hooks/useFilter';
import { DataFilterComponent } from '../components/DataFilterComponent';
import { useTableExport } from '../hooks/useTableExport';
import TableExportControls from '../components/TableExportControls';
import ColumnSelectorModal from '../components/ColumnSelectorModal';

// const responce = await axios.get("http://localhost:3000/facultydata")
// console.log(responce.data.response)

// Define available columns for export with their keys
const exportableColumns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'department', label: 'Department' },
  { key: 'mobileNumber', label: 'Mobile No' },
  { key: 'teachingExperience', label: 'Experience (Years)' },
  { key: 'designation', label: 'Designation' },
];

const columns = [
  {
    name: 'S.No',
    selector: row => row.id,
    sortable: true,
    width: '150px',
    cell: (row, index) => index + 1
  },
  {
    name: 'Faculty Id',
    selector: row => row.facultyId || "N/A",
    sortable: true, width: '200px', wrap: true
  },
  {
    name: 'Name',
    selector: row => row.name || "N/A",
    sortable: true, width: '200px', wrap: true
  },
  {
    name: 'Email',
    selector: row => row.email || "N/A",
    sortable: true, width: '200px', wrap: true
  },
  {
    name: 'Department',
    selector: row => row.department || "N/A",
    sortable: true, width: '200px', wrap: true
  },
  {
    name: 'Mobile No',
    selector: row => row.mobileNumber || "N/A",
    sortable: true, width: '200px', wrap: true
  },
  {
    name: 'Highest Qualification',
    selector: row => row.qualification || "N/A",
    sortable: true, width: '300px', wrap: true

  },
  {
    name: 'Experience (Years)',
    selector: row => row.teachingExperience || "N/A",
    sortable: true, width: '240px', wrap: true

  },
  {
    name: 'Department',
    selector: row => row.department || "N/A",
    sortable: true, width: '200px', wrap: true
  },
  {
    name: 'Designation',
    selector: row => row.designation || "N/A",
    sortable: true, width: '200px', wrap: true
  },
];


function FacultyTable({ data }) {
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
        onExport={() => downloadCSV(data, 'faculty_export.csv')}
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
        columns={columns}
        title={"Faculty Data"}
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

export default FacultyTable;