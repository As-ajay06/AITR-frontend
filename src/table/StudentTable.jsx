import React from 'react';
import DataTable from 'react-data-table-component';
import { useFilter } from '../hooks/useFilter';
import { DataFilterComponent } from '../components/DataFilterComponent';
import { useTableExport } from '../hooks/useTableExport';
import TableExportControls from '../components/TableExportControls';
import ColumnSelectorModal from '../components/ColumnSelectorModal';

// Define available columns for export with their keys
const exportableColumns = [
  { key: 'studentId', label: 'ID' },
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
  { name: 'ID', selector: row => row.studentId, sortable: true, width: '70px' },
  { name: 'Student Name', selector: row => row.name, sortable: true },
  { name: 'Enrollment No.', selector: row => row.enrollmentNumber },
  { name: 'Branch', selector: row => row.branch },
  { name: 'Batch', selector: row => row.batch, wrap: true },
  { name: 'Email', selector: row => row.email },
  { name: 'Year', selector: row => row.year },
  { name: 'Course', selector: row => row.course, wrap: true },
  { name: 'CGPA', selector: row => row.cgpa, wrap: true },
  { name: 'Date Of Birth', selector: row => row.dateOfBirth, wrap: true },
  { name: 'Gender', selector: row => row.gender, wrap: true },
  { name: 'Category', selector: row => row.catogory, wrap: true },
  { name: 'Year Of Admission', selector: row => row.yearOfAdmission, wrap: true },
  { name: 'Status', selector: row => row.status, wrap: true },
  { name: 'Github Link', selector: row => (<a href={row.githubLink} target='_blank'>{row.githubLink}</a>), wrap: true },
  { name: 'LinkedIn Profile Link', selector: row => (<a href={row.linkinProfileLink} target='_blank'>Link</a>) || "N/A", wrap: true },
  { name: 'Guardian Contact Number', selector: row => row.gaurdianContactNumber, wrap: true },
  { name: 'Guardian Name', selector: row => row.gaurdianName, wrap: true },
  { name: 'Address', selector: row => row.address, wrap: true },
  {
    name: "Download PDF",
    selector: row => row.fileId,
    cell: row =>
      row.fileId ? (
        <a
          href={`http://localhost:3000/file/${row.fileId}`}
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




const StudentTable = ({ data }) => {
  const { filterText, setFilterText, resetPaginationToggle, setResetPaginationToggle, filteredData } = useFilter(data);

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
        </div>
        {subHeaderComponentMemo}
      </div>

      <DataTable
        // title="Students"
        columns={columns}
        data={filteredData}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        // subHeaderComponent={subHeaderComponentMemo}
        // actions={actionsMemo}
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

export default StudentTable;
