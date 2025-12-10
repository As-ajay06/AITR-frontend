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
  { key: 'Enrollment_Number', label: 'Enrollment Number' },
  { key: 'Company_Name', label: 'Company Name' },
  { key: 'Role', label: 'Role' },
  { key: 'Internship_Type', label: 'Internship Type' },
  { key: 'Stipend', label: 'Stipend' },
  { key: 'Duration', label: 'Duration' },
  { key: 'Department', label: 'Department' },
  { key: 'Mentor_Name', label: 'Mentor Name' },
  { key: 'Mentor_Email', label: 'Mentor Email' },
  { key: 'Technologies_Used', label: 'Technologies Used' },
  { key: 'Project_Name', label: 'Project Name' },
  { key: 'Project_Description', label: 'Project Description' },
  { key: 'Skills_Gained', label: 'Skills Gained' },
  { key: 'Company_Location', label: 'Company Location' },
  { key: 'Internship_Status', label: 'Internship Status' },
  { key: 'Start_Date', label: 'Start Date' },
  { key: 'End_Date', label: 'End Date' },
];

const columns = [
  { name: 'ID', selector: row => row._id || "N/A" , sortable: true, width: '200px', wrap: true },
  { name: 'Student Name', selector: row => row.studentName || "N/A" , sortable: true, width: '200px', wrap: true },
  { name: 'Enrollment Number', selector: row => row.enrollmentNumber || "N/A" , sortable: true, width: '200px', wrap: true },
  { name: 'Company Name', selector: row => row.companyName || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Role', selector: row => row.internshipRole || "N/A" , sortable: true, width: '200px', wrap: true },
  { name: 'Internship Type', selector: row => row.internshipType || "N/A" , sortable: true, width: '200px', wrap: true },
  { name: 'Stipend', selector: row => row.stipend || "N/A" , sortable: true, width: '200px', wrap: true },
  { name: 'Duration', selector: row => row.duration || "N/A" , sortable: true, width: '200px', wrap: true },
  { name: 'Department', selector: row => row.department || "N/A" , sortable: true, width: '200px', wrap: true },
  { name: 'Mentor Name', selector: row => row.mentorName || "N/A" , sortable: true, width: '200px', wrap: true },
  { name: 'Mentor Email', selector: row => row.mentorEmail || "N/A" , sortable: true, width: '200px', wrap: true },
  { name: 'Technologies Used', selector: row => row.technologyUsed || "N/A" , sortable: true, width: '200px', wrap: true },
  { name: 'Project Name', selector: row => row.projectName || "N/A" , sortable: true, width: '200px', wrap: true },
  { name: 'Project Description', selector: row => row.projectDescription || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Skills Gained', selector: row => row.skillsGained || "N/A" , sortable: true, width: '200px', wrap: true },
  { name: 'Company Location', selector: row => row.companyLocation || "N/A" , sortable: true, width: '200px', wrap: true },
  { name: 'Internship Status', selector: row => row.internshipStatus || "N/A" , sortable: true, width: '200px', wrap: true },
  { name: 'Start Date', selector: row => new Date(row.startDate).toLocaleDateString() || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'End Date', selector: row => new Date(row.endDate).toLocaleDateString() || "N/A" , sortable: true, width: '200px', wrap: true },
  {
    name: 'Offer Letter',
    cell: row => (
      <a href={`http://localhost:3000/file/${row.fileId}`} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">
        View
      </a>
    ),
    sortable: true, width: '200px', wrap: true
  },
];


export const InternshipTable = ({ data: propData }) => {
  // Use prop data if provided, otherwise use hardcoded data
  const tableData = propData || data;
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
        onExport={() => downloadCSV(tableData, 'internship_export.csv')}
        onToggleColumnSelector={() => setShowColumnSelector(!showColumnSelector)}
        selectedColumnsCount={selectedColumns.length}
        selectedRowsCount={selectedRows.length}
      />
    ),
    [downloadCSV, tableData, showColumnSelector, setShowColumnSelector, selectedColumns.length, selectedRows.length]
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
        title="Student Internship Records"
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


