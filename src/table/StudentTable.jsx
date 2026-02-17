import React from 'react';
import DataTable from 'react-data-table-component';
import { useFilter } from '../hooks/useFilter';
import { DataFilterComponent } from '../components/DataFilterComponent';
import { useTableExport } from '../hooks/useTableExport';
import TableExportControls from '../components/TableExportControls';
import ColumnSelectorModal from '../components/ColumnSelectorModal';
import { BASE_URL } from '../../config/config';

// Define available columns for export with their keys
const exportableColumns = [
  { key: 'studentId', label: 'Student Id' },
  { key: 'name', label: 'Student Name' },
  { key: 'enrollmentNumber', label: 'Enrollment No.' },
  { key: 'branch', label: 'Branch' },
  { key: 'batch', label: 'Batch' },
  { key: 'email', label: 'Email' },
  { key: 'year', label: 'Year' },
  { key: 'course', label: 'Course' },
  { key: 'cgpa', label: 'CGPA' },
  { key: 'dateOfBirth', label: 'Date of Birth' },
  { key: 'gender', label: 'Gender' },
  { key: 'catogory', label: 'Category' },
  { key: 'yearOfAdmission', label: 'Year of Admission' },
  { key: 'status', label: 'Status' },
  { key: 'githubLink', label: 'Github Link' },
  { key: 'linkinProfileLink', label: 'LinkedIn Profile Link' },
  { key: 'gaurdianContactNumber', label: 'Guardian Contact Number' },
  { key: 'gaurdianName', label: 'Guardian Name' },
  { key: 'address', label: 'Address' },
];

const columns = [
  { name: 'Student ID', selector: row => row.studentId || "N/A", sortable: true, width: '200px', wrap: false },
  { name: 'Student Name', selector: row => row.name || "N/A", sortable: true, width: '200px', wrap: false },
  { name: 'Enrollment No.', selector: row => row.enrollmentNumber || "N/A", width: '200px', wrap: false },
  { name: 'Branch', selector: row => row.branch || "N/A", width: '200px', wrap: false },
  { name: 'Batch', selector: row => row.batch || "N/A", width: '200px', wrap: false },
  { name: 'Email', selector: row => row.email || "N/A", width: '200px', wrap: false },
  { name: 'Year', selector: row => row.year || "N/A", width: '200px', wrap: false },
  { name: 'Course', selector: row => row.course || "N/A", width: '200px', wrap: false },
  { name: 'CGPA', selector: row => row.cgpa || "N/A", width: '200px', wrap: false },
  { name: 'Date Of Birth', selector: row => new Date(row.dateOfBirth).toLocaleDateString() || "N/A", width: '200px', wrap: false },
  { name: 'Gender', selector: row => row.gender || "N/A", width: '200px', wrap: false },
  { name: 'Category', selector: row => row.category || "N/A", width: '200px', wrap: false },
  { name: 'Year Of Admission', selector: row => row.yearOfAdmission || "N/A", width: '200px', wrap: false },
  { name: 'Status', selector: row => row.status || "N/A", width: '200px', wrap: false },
  {
    name: 'Github Link',
    selector: row => row.githubLink,
    width: '220px',
    wrap: false,
    cell: row => (
      row.githubLink ? (
        <a href={row.githubLink} target='_blank' rel="noopener noreferrer">
          {row.githubLink}
        </a>
      ) : "N/A"
    )
  },
  {
    name: 'LinkedIn Profile Link',
    selector: row => row.linkinProfileLink,
    width: '300px',
    wrap: false,
    cell: row => (
      row.linkinProfileLink ? (
        <a href={row.linkinProfileLink} target='_blank' rel="noopener noreferrer">
          {row.linkinProfileLink}
        </a>
      ) : "N/A"
    )
  },
  { name: 'Guardian Contact Number', selector: row => row.guardianContactNumber || "N/A", width: '340px', wrap: false },
  { name: 'Guardian Name', selector: row => row.guardianName || "N/A", width: '200px', wrap: false },
  { name: 'Address', selector: row => row.address || "N/A", width: '300px', wrap: false },

  {
    name: "Download PDF",
    width: '180px',
    wrap: false,
    cell: row =>
      row.fileId ? (
        <a
          href={`${BASE_URL}/file/${row.fileId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View PDF
        </a>
      ) : (
        "N/A"
      ),
    sortable: false,
  },
];




const StudentTable = ({ data, onDelete, onDeleteSelected, onEdit, selectedRows = [], onRowSelected, toggleCleared }) => {
  const { filterText, setFilterText, resetPaginationToggle, setResetPaginationToggle, filteredData } = useFilter(data);

  // Add action columns dynamically
  const allColumns = React.useMemo(() => [
    ...columns,
    {
      name: 'Actions',
      width: '220px',
      cell: row => (
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(row)}
            className="px-3 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(row._id)}
            className="px-3 py-1.5 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition"
          >
            Remove
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
    }
  ], [onDelete, onEdit]);

  // Use the reusable export hook
  const {
    showColumnSelector,
    selectedColumns,
    setShowColumnSelector,
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
        onExport={() => downloadCSV(data, 'students_export.csv')}
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

      <div className="sticky top-0 bg-white z-40 pb-3">
        <h2 className="text-xl font-semibold mb-2">Students</h2>
        <div className="flex justify-between items-center mb-2">
          {actionsMemo}
          {selectedRows.length > 0 && (
            <button
              onClick={onDeleteSelected}
              className="px-4 py-2 bg-red-600 text-white font-semibold text-sm rounded-md shadow hover:bg-red-700 transition flex items-center gap-2"
            >
              🗑️ Remove Selected ({selectedRows.length})
            </button>
          )}
        </div>
        {subHeaderComponentMemo}
      </div>

      <DataTable
        columns={allColumns}
        data={filteredData}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        selectableRows
        onSelectedRowsChange={onRowSelected}
        clearSelectedRows={toggleCleared}
        customStyles={{
          table: {
            style: {
              tableLayout: "fixed",
            },
          },
          headCells: {
            style: {
              whiteSpace: "nowrap",
              fontSize: "18px",
              fontWeight: "700",
            },
          },
          cells: {
            style: {
              whiteSpace: "nowrap",
              fontSize: "16px",
              paddingTop: "12px",
              paddingBottom: "12px",
            },
          },
        }}
      />
    </div>
  );
};

export default StudentTable;
