import axios from 'axios';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { convertArrayOfObjectsToCSV } from '../utils/convertArrayOfObjectsToCSV';
import { DataFilterComponent } from '../components/DataFilterComponent';
import { useFilter } from '../hooks/useFilter';



const columns = [
  { name: 'Hackathon Name', selector: row => row.hackathonName },
  { name: 'Organiser', selector: row => row.organizer },
  {
    name: 'Team Details', selector: row =>
    (row.teamDetails.map(
      (item, index) =>
      (<div
        key={index}>
        <p>{item.memberName}</p>
        <p>{item.role}</p>
      </div>)
    )
    ), wrap: true
  },
  { name: 'Result', selector: row => row.result },
  { name: 'Event Date', selector: row => row.eventDate },
  { name: 'Team Name', selector: row => row.teamName },
  { name: 'Team Size', selector: row => row.teamSize },
  { name: 'Mentor Name', selector: row => row.mentorName },
  { name: 'Venue', selector: row => row.venue },
  { name: 'Problem Statement', selector: row => row.problemStatement, wrap: true },
  {
    name: 'Technolgy used', selector: row =>
    (row.technologyUsed.map(
      (item, index) =>
      (<div
        key={index}>
        <p>{item.memberName}</p>
        <p>{item.role}</p>
      </div>)
    )
    ), wrap: true
  },
  { name: 'Prize Money', selector: row => row.prizeMoney },
  { name: 'Position Secured', selector: row => row.positionSecured },
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
              const url = "api/v1/students/hackathon"
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



export const HackathonTable = ({ data }) => {


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
  const Export = ({ onExport }) => <button className='px-4 py-1 bg-blue-500 hover:bg-blue-700 shadow-sm rounded-md text-white duration-150' onClick={e => onExport(e.target.value)}>Export</button>;
  const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, []);

  return (
    <div className="p-4 overflow-x-auto">

      <DataTable
        title="Student Hackathon Participation"
        columns={columns}
        data={filteredData}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        actions={actionsMemo}
      />
    </div>
  );
};

export default HackathonTable;
