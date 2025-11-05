import axios from 'axios';
import React from 'react';
import DataTable from 'react-data-table-component';

// Columns
const columns = [
  { name: 'ID', selector: row => row.facultyId, sortable: true, width: '70px' },
  { name: 'Faculty Name', selector: row => row.facultyName, sortable: true },
  { name: 'department', selector: row => row.department, wrap: true },
  { name: 'FDP title', selector: row => row.fdpTitle },
  { name: 'Program Name', selector: row => row.programName },
  { name: 'Organising Institute', selector: row => row.organizingInstitute },

  { name: 'Start Date', selector: row => row.startDate },
  { name: 'End Date', selector: row => row.endDate },
  { name: 'Program Type', selector: row => row.programType },
  { name: 'Mode', selector: row => row.mode },
  { name: 'Location', selector: row => row.location },
  { name: 'No of days', selector: row => row.numberOfDays },
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
              const url = "api/v1/faculty/development-programme"  //devlopment-programme
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


const DevelopmentProgramTable = ({ data }) => {
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

  console.log(data)
  return (
    <div className="p-4">
      <DataTable
        title={"Devlopment Program"}
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

export default DevelopmentProgramTable;
