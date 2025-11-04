
import axios from 'axios';
import DataTable from 'react-data-table-component';
import React from 'react';

const columns = [
  { name: 'Batch', selector: row => row.batch },
  { name: 'Branch', selector: row => row.branch },
  { name: 'Co-Authors', selector: row => row.coAuthors },
  { name: 'doi Or Isbn', selector: row => row.doiOrIsbn, wrap: true },
  { name: 'Enrollment Number', selector: row => row.enrollmentNumber, wrap: true },
  { name: 'Faculty Guide', selector: row => row.facultyGuide },
  { name: 'indexing', selector: row => row.indexing[0] },
  { name: 'journal Or Conference Name', selector: row => row.journalOrConferenceName },
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
  { name: 'Publication Date', selector: row => row.publicationDate },
  { name: 'Student Name', selector: row => row.studentName, sortable: true },
  { name: 'title Of Paper', selector: row => row.titleOfPaper },
  {
    name: 'Actions',
    cell: row => (
      <div className="flex flex-col items-center justify-center gap-0.5">
        {/* <button onClick={() => alert(`Viewing certificate ${row.Id}`)} className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-4 py-1 rounded">View</button> */}
        <button onClick={() => alert(`Editing certificate ${row._Id}`)} className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-5 py-1 rounded">Edit</button>
        <button
          onClick={
            async () => {
              console.log(row._id)
              alert(`Deleting certificate ${row._id}`)
              const baseUrl = "http://localhost:3000";
              const url = "api/v1/students/research-paper"
              const response = await axios.delete(`${baseUrl}/${url}/${row._id}`);
              console.log(response.data.certificate);
            }
          } className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded">Delete</button>
      </div >
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];


const StudentResearchPaper = ({ data }) => {

  function downloadCSV(array) {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);

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
    <div className="p-4 overflow-x-auto">
      <DataTable
        title="Student Research Publications"
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        striped
        responsive
        fixedHeader
        fixedHeaderScrollHeight="600px"
        actions={actionsMemo}
      />
    </div>
  );
};

export default StudentResearchPaper;
