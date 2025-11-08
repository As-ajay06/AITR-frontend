import React from 'react';
import DataTable from 'react-data-table-component';
import { useFilter } from '../hooks/useFilter';
import { DataFilterComponent } from '../components/DataFilterComponent';

const columns = [
  { name: 'ID', selector: row => row.studentId, sortable: true, width: '70px' },
  { name: 'Student Name', selector: row => row.name, sortable: true },
  { name: 'Enrollment No.', selector: row => row.enrollmentNumber },
  { name: 'Branch', selector: row => row.branch },
  { name: 'batch', selector: row => row.batch, wrap: true },
  { name: 'email', selector: row => row.email },
  { name: 'year', selector: row => row.year },
  { name: 'course', selector: row => row.course, wrap: true },
  { name: 'cgpa', selector: row => row.cgpa, wrap: true },
  { name: 'dateOfBirth', selector: row => row.dateOfBirth, wrap: true },
  { name: 'gender', selector: row => row.gender, wrap: true },
  { name: 'catogory', selector: row => row.catogory, wrap: true },
  { name: 'yearOfAdmission', selector: row => row.yearOfAdmission, wrap: true },
  { name: 'status', selector: row => row.status, wrap: true },
  { name: 'githubLink', selector: row => (<a href={row.githubLink} target='_blank'>{row.githubLink}</a>), wrap: true },
  { name: 'linkinProfileLink', selector: row => (<a href={row.linkinProfileLink} target='_blank'>Link</a>) || "N/A", wrap: true },
  { name: 'gaurdianContactNumber', selector: row => row.gaurdianContactNumber, wrap: true },
  { name: 'gaurdianName', selector: row => row.gaurdianName, wrap: true },
  { name: 'address', selector: row => row.address, wrap: true },
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
              const url = "api/v1/students/profile";
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




const StudentTable = ({ data }) => {

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
    <div className="p-4 overflow-x-auto">
      <DataTable
        title="Students"
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

export default StudentTable;
