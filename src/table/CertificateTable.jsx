
import DataTable from 'react-data-table-component';
import '../components/scroll.css' // we'll define custom styles here
import axios from 'axios';
import React from 'react';
import { useFilter } from '../hooks/useFilter';
import { DataFilterComponent } from '../components/DataFilterComponent';
import { convertArrayOfObjectsToCSV } from '../utils/convertArrayOfObjectsToCSV';


const columns = [
  { name: 'ID', selector: row => row.certificateId, sortable: true, width: '100px' },
  { name: 'Student Name', selector: row => row.studentName, sortable: true },
  { name: 'Enrollment Number', selector: row => row.enrollmentNumber },
  { name: 'Certificate Name', selector: row => row.courseName },
  { name: 'Certificate Type', selector: row => row.certificateType || "N/A" },
  { name: 'Branch', selector: row => row.branch },
  { name: 'Batch', selector: row => row.batch },
  { name: 'Year', selector: row => row.year },
  { name: 'Course', selector: row => row.courseName },
  { name: 'Issuing Organization', selector: row => row.issuingOrganization, wrap: true },
  { name: 'issue Date', selector: row => row.issueDate },
  { name: 'Validity Period', selector: row => row.validityPeriod },
  { name: 'Graded of Score', selector: row => row.gradeOrScore },
  { name: 'Mode Of Learning', selector: row => row.modeOfLearning },
  { name: 'Course Duration', selector: row => row.courseDuration },
  { name: 'Rank or Position', selector: row => row.rankOrPosition },
  { name: 'Certificate Description', selector: row => row.certificateDescription },
  { name: 'relevance To Program Or Branch', selector: row => row.relevanceToProgramOrBranch },
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

// cascading i.e to delete the wohole relational table which follow the main table


const StudentCertificatesTable = ({ data }) => {

  const { filterText, setFilterText, resetPaginationToggle, setResetPaginationToggle, handleClear, filteredData } = useFilter(data);
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
  }, [filterText, resetPaginationToggle, handleClear]);

  

  function downloadCSV(data) {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(data);

    if (csv == null) return;
    const filename = 'export.csv';
    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }
  const Export = ({ onExport }) => <button className='px-4 py-1 bg-blue-500 hover:bg-blue-700 shadow-sm rounded-md text-white duration-150' onClick={e => onExport(e.target.value)}>Export Data</button>;
  const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, []);


  return (
    <div className="table-scroll-container">
      <DataTable
        title="Student Certificates"
        columns={columns}
        actions={actionsMemo}
        data={filteredData}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
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

export default StudentCertificatesTable;
