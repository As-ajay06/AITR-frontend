import React, { useEffect, useState } from 'react';
import SportForm from '../../Forms/StudentForms/SportsForm';
import StudentTable from '../../table/StudentTable'; // Rename to `SportsTable` if it's specific
import { useForm } from 'react-hook-form';
import axios from 'axios';
import DataTable from 'react-data-table-component';

function AddSportsData() {

  const { register, handleSubmit, reset } = useForm()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [submit, setSubmit] = useState(false)


  const fetchData = async () => {
    if (loading == true) {
      const data = await axios.get("http://localhost:3000/api/v1/students/sports")
      console.log(data.data)
      setData(data.data.sportsData)
    }

  }

  useEffect(() => {
    console.log("fetching data")
    fetchData()
    console.log(data)
  }, [loading])

  const onSubmit = async (data, e) => {
    e.preventDefault();

    const formData = new FormData();
    const fileInput = document.querySelector("input[type='file']");
    if (fileInput?.files[0]) {
      formData.append("file", fileInput.files[0]);
    }
    try {
      const res = await axios.post("http://localhost:3000/file", formData)
      console.log(res.data)

      const url = "http://localhost:3000/api/v1/students/sports"
      const response = await axios.post(url
        , {
          sportsEventId: data.sportsEventId,
          studentName: data.studentName,
          enrollmentNumber: data.enrollmentNumber,
          batch: data.batch,
          branch: data.branch,
          year: data.year,
          sportsName: data.sportsName,
          eventDate: data.eventDate,
          eventName: data.eventName,
          eventLevel: data.eventLevel,
          eventLocation: data.eventLocation,
          position: data.position,
          coachName: data.coachName,
          organizer: data.organizer,

          fileId: res.data.fileId,
        }
      )
      console.log(response.data)
    }
    catch (error) {
      console.error("Error occurred:", error.message);
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
      <SportForm
        onSubmit={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        reset={reset}
      />
      <DataTable
        columns={studentSportsEventColumns}
        data={data}
        actions={actionsMemo}
      />
    </div>
  );
}

export default AddSportsData;

export const studentSportsEventColumns = [
  {
    name: "ID",
    selector: row => row.sportsEventId,
    sortable: true
  },
  {
    name: "Student Name",
    selector: row => row.studentName,
    sortable: true
  },
  {
    name: "Enrollment Number",
    selector: row => row.enrollmentNumber
  },
  {
    name: "Branch",
    selector: row => row.branch
  },
  {
    name: "Batch",
    selector: row => row.batch
  },
  {
    name: "Year",
    selector: row => row.year
  },
  {
    name: "Sports Name",
    selector: row => row.sportsName
  },
  {
    name: "Event Date",
    selector: row => new Date(row.eventDate).toLocaleDateString()
  },
  {
    name: "Event Name",
    selector: row => row.eventName
  },
  {
    name: "Event Level",
    selector: row => row.eventLevel
  },
  {
    name: "Event Location",
    selector: row => row.eventLocation
  },
  {
    name: "Position",
    selector: row => row.position
  },
  {
    name: "Certificate PDF",
    cell: row =>
      row.fileId ? (
        <a href={row.certificatePDF} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          View Certificate
        </a>
      ) : (
        "N/A"
      )
  },
  {
    name: "Coach Name",
    selector: row => row.coachName
  },
  {
    name: "Organizer",
    selector: row => row.organizer
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
              alert(`Deleting Sports Event ID ${row.sportsEventId}`)
              const baseUrl = "http://localhost:3000";
              const url = "api/v1/students/sports"
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

