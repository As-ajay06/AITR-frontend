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
  { name: 'ID', selector: row => row.Id, sortable: true, width: '60px' },
  { name: 'Student Name', selector: row => row.Student_Name },
  { name: 'Enrollment Number', selector: row => row.Enrollment_Number },
  { name: 'Company Name', selector: row => row.Company_Name },
  { name: 'Role', selector: row => row.Role },
  { name: 'Internship Type', selector: row => row.Internship_Type },
  { name: 'Stipend', selector: row => row.Stipend },
  { name: 'Duration', selector: row => row.Duration },
  { name: 'Department', selector: row => row.Department },
  { name: 'Mentor Name', selector: row => row.Mentor_Name },
  { name: 'Mentor Email', selector: row => row.Mentor_Email },
  { name: 'Technologies Used', selector: row => row.Technologies_Used },
  { name: 'Project Name', selector: row => row.Project_Name },
  { name: 'Project Description', selector: row => row.Project_Description, wrap: true },
  { name: 'Skills Gained', selector: row => row.Skills_Gained },
  { name: 'Company Location', selector: row => row.Company_Location },
  { name: 'Internship Status', selector: row => row.Internship_Status },
  { name: 'Start Date', selector: row => row.Start_Date },
  { name: 'End Date', selector: row => row.End_Date },
  {
    name: 'Offer Letter',
    cell: row => (
      <a href={row.Offer_Letter_Link} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">
        View
      </a>
    ),
  },
  {
    name: 'Experience Letter',
    cell: row => (
      <a href={`http://localhost:3000/file/${row.fileId}`} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">
        View
      </a>
    ),
  },
  {
    name: 'Certificate',
    cell: row => (
      <a href={`http://localhost:3000/file/${row.fileId}`} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">
        View
      </a>
    ),
  },
];

const data = [
  {
    Id: 1,
    Student_Name: 'Ananya Gupta',
    Enrollment_Number: 'ENR2023CS101',
    Company_Name: 'Tata Consultancy Services',
    Role: 'Frontend Developer Intern',
    Internship_Type: 'Full-Time',
    Stipend: '₹10,000',
    Duration: '2 Months',
    Department: 'CSE',
    Mentor_Name: 'Mr. Rajeev Mehta',
    Mentor_Email: 'rajeev.mehta@tcs.com',
    Technologies_Used: 'React, Tailwind, Git',
    Project_Name: 'TCS Client Dashboard',
    Project_Description: 'Built a responsive dashboard for internal use with live APIs.',
    Skills_Gained: 'React, Git, Responsive Design',
    Company_Location: 'Mumbai',
    Internship_Status: 'Completed',
    Start_Date: '2024-05-01',
    End_Date: '2024-06-30',
    Offer_Letter_Link: 'https://example.com/internship/ananya-offer.pdf',
    Experience_Letter_Link: 'https://example.com/internship/ananya-experience.pdf',
    Certificate_Link: 'https://example.com/internship/ananya-certificate.pdf',
  },
  {
    Id: 2,
    Student_Name: 'Rohit Sharma',
    Enrollment_Number: 'ENR2023IT222',
    Company_Name: 'Microsoft India',
    Role: 'Cloud Intern',
    Internship_Type: 'Remote',
    Stipend: '₹15,000',
    Duration: '3 Months',
    Department: 'IT',
    Mentor_Name: 'Ms. Sneha Verma',
    Mentor_Email: 'sneha.verma@microsoft.com',
    Technologies_Used: 'Azure, Python, APIs',
    Project_Name: 'Azure Automation Bot',
    Project_Description: 'Created bots to automate deployment pipelines using Azure DevOps.',
    Skills_Gained: 'Cloud Deployment, Automation',
    Company_Location: 'Bangalore',
    Internship_Status: 'Completed',
    Start_Date: '2024-04-01',
    End_Date: '2024-06-30',
    Offer_Letter_Link: 'https://example.com/internship/rohit-offer.pdf',
    Experience_Letter_Link: 'https://example.com/internship/rohit-experience.pdf',
    Certificate_Link: 'https://example.com/internship/rohit-certificate.pdf',
  },
  {
    Id: 3,
    Student_Name: 'Kavya Rathi',
    Enrollment_Number: 'ENR2023ECE056',
    Company_Name: 'DRDO',
    Role: 'Hardware Design Intern',
    Internship_Type: 'Offline',
    Stipend: 'Unpaid',
    Duration: '1.5 Months',
    Department: 'ECE',
    Mentor_Name: 'Dr. Vikram Patel',
    Mentor_Email: 'vikram.patel@drdo.gov.in',
    Technologies_Used: 'VHDL, FPGA, PCB Design',
    Project_Name: 'Missile Tracking Hardware',
    Project_Description: 'Worked on PCB layout for low-latency tracking system.',
    Skills_Gained: 'Hardware Design, PCB, Defense Projects',
    Company_Location: 'Hyderabad',
    Internship_Status: 'Ongoing',
    Start_Date: '2024-06-10',
    End_Date: '2024-07-25',
    Offer_Letter_Link: 'https://example.com/internship/kavya-offer.pdf',
    Experience_Letter_Link: '',
    Certificate_Link: '',
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
      )}

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


