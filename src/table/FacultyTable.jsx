import axios from 'axios';
import DataTable from 'react-data-table-component';
import { useFilter } from '../hooks/useFilter';
import { DataFilterComponent } from '../components/DataFilterComponent';

// const responce = await axios.get("http://localhost:3000/facultydata")
// console.log(responce.data.response)

const columns = [
  {
    name: 's.no',
    selector: row => row.id,
    sortable: true,
    width: '80px',
    cell: (row, index) => index + 1
  },
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'Email',
    selector: row => row.email,
    sortable: true,
  },
  {
    name: 'Department',
    selector: row => row.department,
    sortable: true,
  },
  {
    name: 'Mobile No',
    selector: row => row.mobile_no,
    sortable: true,
  },
  {
    name: 'Experience (Years)',
    selector: row => row.years_Of_Experience,
    sortable: true,

  },
  {
    name: 'Designation',
    selector: row => row.designation,
    sortable: true,
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
              alert(`Deleting ${row._id}`)
              const baseUrl = "http://localhost:3000";
              const url = "api/v1/faculty/profile"
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


function FacultyTable({ data }) {


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
      columns={columns}
      title={"Faculty Data"}
      data={filteredData}
      pagination
      paginationResetDefaultPage={resetPaginationToggle}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      actions={actionsMemo}
    />

  );
};

export default FacultyTable;