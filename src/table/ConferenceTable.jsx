import React from 'react';
import DataTable from 'react-data-table-component';


// todo: why conference table is there
// Columns
const columns = [
  { name: 'ID', selector: row => row.Id, sortable: true, width: '70px' },
  { name: 'Faculty Name', selector: row => row.Faculty_Name, sortable: true },
  { name: 'Conference Name', selector: row => row.Conference_Name },
  { name: 'Paper Title', selector: row => row.Paper_Title, wrap: true },
  { name: 'Presentation Date', selector: row => row.Presentation_Date },
  { name: 'Conference Type', selector: row => row.Conference_Type },
  { name: 'Location', selector: row => row.Conference_Location },
  { name: 'Mode', selector: row => row.Conference_Mode },
  { name: 'Publication Status', selector: row => row.Publication_Status },
  { name: 'Journal Name', selector: row => row.Journal_Name },
  { name: 'ISSN Number', selector: row => row.Issn_Number },
  { name: 'Indexing', selector: row => row.Indexing },
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
              alert(`Deleting certificate ${row._Id}`)
              const baseUrl = "http://localhost:3000";
              const url = "api/v1/students/certificate"
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

// Data

const ConferenceTable = ({data}) => {
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
    <div className="p-4">
      <DataTable
        title="Faculty Conference Presentations"
        columns={columns}
        data={data}
        pagination
        striped
        highlightOnHover
        responsive
        actions={actionsMemo}
      />
    </div>
  );
};

export default ConferenceTable;
