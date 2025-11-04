import React, { useEffect, useState } from 'react';
import StartupForm from '../../Forms/StudentForms/StartupForm';
import StudentTable from '../../table/StudentTable'; // Can rename to StartupTable if needed
import { useForm } from 'react-hook-form';
import axios from 'axios';
import DataTable from 'react-data-table-component';

function AddStartups() {
  const { register, handleSubmit, reset } = useForm()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [submit, setSubmit] = useState(false)


  const fetchData = async () => {
    if (loading == true) {
      const data = await axios.get("http://localhost:3000/api/v1/students/startups")
      console.log(data.data)
      setData(data.data.startupsData)
    }

  }

  useEffect(() => {
    console.log("fetching data")
    fetchData()
    console.log(data)
  }, [loading])

  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {

      const url = "http://localhost:3000/api/v1/students/startup"
      const response = await axios.post(url
        , {
          startupName: data.startupName,
          domain: data.domain,
          incubationSupport: data.incubationSupport,
          currentStatus: data.currentStatus,
          wesiteLink: data.wesiteLink,
        }
      )
      console.log(response)


    } catch (err) {
      console.log("Error:", err)
    }
    console.log(data)

    setLoading((p) => !p)
  }

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
    <div>
      <StartupForm
        onSubmit={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        reset={reset}
      />
      <DataTable
        title={"Startups"}
        data={data}
        columns={startupColumns}
        actions={actionsMemo}
      />
    </div>
  );
}

export default AddStartups;

export const startupColumns = [
  {
    name: "Startup Name",
    selector: row => row.startupName,
    sortable: true,
  },
  {
    name: "Domain",
    selector: row => row.domain,
    sortable: true,
  },
  {
    name: "Incubation Support",
    selector: row => row.incubationSupport || "None",
    wrap: true,
  },
  {
    name: "Current Status",
    selector: row => row.currentStatus,
    sortable: true,
  },
  {
    name: "Website/Link",
    selector: row => row.websiteOrLink,
    cell: row =>
      row.websiteOrLink ? (
        <a
          href={row.websiteOrLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Visit
        </a>
      ) : (
        "N/A"
      ),
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
              alert(`Deleting this ${row._id}`)
              const baseUrl = "http://localhost:3000";
              const url = "api/v1/students/startup"
              const response = await axios.delete(`${baseUrl}/${url}/${row._id}`);
              console.log(response.data);
            }
          } className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded">Delete</button>
      </div >
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  }
];
