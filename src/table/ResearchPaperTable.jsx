import React from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useFilter } from '../hooks/useFilter';
import { DataFilterComponent } from '../components/DataFilterComponent';

function ResearchPaperTable() {

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
  const Export = ({ onExport }) => <button className='px-4 py-1 bg-blue-500 hover:bg-blue-700 shadow-sm rounded-md text-white duration-150' onClick={e => onExport(e.target.value)}>Export data</button>;
  const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, []);


  return (
    <DataTable
      title={"Faculty Reseach paper"}
      columns={researchPaperColumns}
      data={filteredData}
      pagination
      paginationResetDefaultPage={resetPaginationToggle}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      actions={actionsMemo}
    />
  )
}

export default ResearchPaperTable

export const researchPaperColumns = [
  {
    name: 'ID',
    selector: row => row.facultyId,
    sortable: true,
    center: true
  },
  {
    name: 'Publication Date',
    selector: row => row.publicationDate,
    sortable: true,
    center: true
  },
  {
    name: 'Faculty Name',
    selector: row => row.facultyName,
    sortable: true
  },
  {
    name: 'Title of Paper',
    selector: row => row.titleOfPaper,
    sortable: true,
    wrap: true
  },
  {
    name: 'Publication Date',
    selector: row => row.publicationDate,
    format: row => new Date(row.publicationDate).toLocaleDateString()
  },
  {
    name: 'Journal/Conference Name',
    selector: row => row.journalOrConferenceName,
    wrap: true
  },
  {
    name: 'Co-Author',
    selector: row => row.coAuthors,
    wrap: true
  },
  {
    name: 'Indexing',
    selector: row => row.indexing,
    wrap: true
  },
  {
    name: 'Paper PDF',
    selector: row => row.paperPdf,
    cell: row => (
      <a
        href={row.paperPdf}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View PDF
      </a>
    )
  },
  {
    name: 'ISSN Number',
    selector: row => row.issnNumber
  },
  {
    name: 'DOI Link',
    selector: row => row.doiLink,
    cell: row => (
      <a
        href={row.doiLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        DOI
      </a>
    )
  },
  {
    name: 'Authors',
    selector: row => row.authors,
    cell: row =>
      Array.isArray(row.authors) ? row.authors.join(', ') : row.authors
  },
  {
    name: 'ISSN/ISBN',
    selector: row => row.issnOrIsbn
  },
  {
    name: 'Department',
    selector: row => row.department
  }
];


export const ResearchPaperPublication = [
  { name: 'Student Name', selector: row => row.studentName, sortable: true },
  { name: 'Enrollment Number', selector: row => row.enrollmentNumber, wrap: true },
  { name: 'Branch', selector: row => row.branch },
  { name: 'Batch', selector: row => row.batch },
  { name: 'doiOrIsbn', selector: row => row.doiOrIsbn, wrap: true },
  { name: 'title Of Paper', selector: row => row.titleOfPaper },
  { name: 'Publication Date', selector: row => row.publicationDate },
  { name: 'journal Or Conference Name', selector: row => row.journalOrConferenceName },
  { name: 'cCo Authors', selector: row => row.coAuthors },
  { name: 'indexing', selector: row => row.indexing },
  { name: 'Certificate PDF', selector: row => row.fileId },
  { name: 'Faculty Guide', selector: row => row.facultyGuide },
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
              alert(`Deleting certificate ${row.facultyId}`)
              const baseUrl = "http://localhost:3000";
              const url = "api/v1/faculty/research-paper"
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

// todo : here we are deleting faculty reaseach paper
// this research paper belongs to faculty member