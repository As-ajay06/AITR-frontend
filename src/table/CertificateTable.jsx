
import DataTable from 'react-data-table-component';
import '../components/scroll.css' // we'll define custom styles here
import axios from 'axios';
import React from 'react';
import { useFilter } from '../hooks/useFilter';
import { DataFilterComponent } from '../components/DataFilterComponent';
import { convertArrayOfObjectsToCSV } from '../utils/convertArrayOfObjectsToCSV';


const columns = [
  { name: 'ID', selector: row => row.certificateId || "N/A" , sortable: true, width: '200px', wrap: true },
  { name: 'Student Name', selector: row => row.studentName || "N/A" , sortable: true, width: '300px', wrap: true },
  { name: 'Enrollment Number', selector: row => row.enrollmentNumber || "N/A" , sortable: true, width: '260px', wrap: true },
  { name: 'Certificate Name', selector: row => row.courseName || "N/A" , sortable: true, width: '240px', wrap: true },
  { name: 'Branch', selector: row => row.branch || "N/A" , sortable: true, width: '200px', wrap: true },
  { name: 'Batch', selector: row => row.batch || "N/A" , sortable: true, width: '200px', wrap: true },
  { name: 'Year', selector: row => row.year || "N/A" , sortable: true, width: '200px', wrap: true },
  { name: 'Course', selector: row => row.courseName , sortable: true, width: '200px', wrap: true },
  { name: 'Issuing Organization', selector: row => row.issuingOrganization, sortable: true, width: '200px', wrap: false },
  { name: 'issue Date', selector: row => new Date(row.issueDate).toLocaleDateString() || "N/A" , sortable: true, width: '200px', wrap: false },
  {
    name: 'Validity Period', selector: row => row.validityPeriod ? (
      <p>{row.validityPeriod}</p>
    ) : "N/A"
  },
  { name: 'Graded of Score', selector: row => row.gradeOrScore , sortable: true, width: '200px', wrap: false },
  { name: 'Mode Of Learning', selector: row => row.modeOfLearning , sortable: true, width: '300px', wrap: false },
  { name: 'Course Duration', selector: row => row.courseDuration , sortable: true, width: '200px', wrap: false },
  {
    name: 'Rank or Position', selector: row => (row.rankOrPosition ? (
      <p>{row.rankOrPosition}</p>
    ) : "N/A"
    ),
    sortable: true , width: '300px'
  },
  { name: 'Certificate Description', selector: row => row.certificateDescription , sortable: true , width: '300px' },
  {
    name: 'Relevance To Program Or Branch', selector: row => (row.relevanceToProgramOrBranch ? (
      <p>{row.relevanceToProgramOrBranch}</p>
    ) : "N/A"
    ),
    sortable: true , width: '400px'
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
    ),
    sortable: true , width: '200px'
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

export default StudentCertificatesTable;
