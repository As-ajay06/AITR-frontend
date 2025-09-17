import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputBox from '../../components/InputBox';
import CalenderBox from '../../components/CalenderBox';
import FileBox from '../../components/FileBox';
import axios from 'axios';
import DataTable from 'react-data-table-component';


function InstituteEventGrant() {
  const { register, handleSubmit, reset } = useForm()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [submit, setSubmit] = useState(false)




  const fetchData = async () => {
    if (loading == true) {
      const data = await axios.get("http://localhost:3000/api/v1/institute/event-grants")
      console.log(data.data)
      setData(data.data.eventGrants)
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
      const res = await axios.post("http://localhost:3000/file", formData);
      console.log(res.data);

        const url = "http://localhost:3000/api/v1/institute/event-grant";
        const response = await axios.post(url, {
          eventName: data.eventName,
          eventType: data.eventType,
          agencyName: data.agencyName,
          date: data.date,
          duration: data.duration,
          description: data.description,
          funding: data.funding,
          fileId: res.data.fileId,
        });
        console.log(response.data);
    } catch (err) {
      console.log("Error:", err);
    }

    setLoading((p) => !p);
  };
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Institute Event Grant Form
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <InputBox label="Event Name" name="eventName" register={register} required />
          <InputBox label="Type of the Event" name="eventType" register={register} required />
          <InputBox label="Agency Name" name="agencyName" register={register} required />
          <CalenderBox label="Date" name="date" register={register} required type="date" />
          <InputBox label="Duration" name="duration" register={register} required />
          <InputBox label="Description" name="description" register={register} required />
          <InputBox label="Funding" name="funding" register={register} required />
          <FileBox label="PDF" name="pdf" register={register} />

          <button
            type="submit"
            className="col-span-2 mt-6 px-6 py-3 bg-blue-600 text-white font-semibold text-base rounded-md shadow hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
      <DataTable columns={eventGrantColumns} data={data} />
    </div>
  );
}

export default InstituteEventGrant;

export const eventGrantColumns = [
  {
    name: "Event Name",
    selector: row => row.eventName,
    sortable: true,
  },
  {
    name: "Type of Event",
    selector: row => row.typeOfEvent,
    sortable: true,
  },
  {
    name: "Agency Name",
    selector: row => row.agencyName,
    sortable: true,
  },
  {
    name: "Date",
    selector: row => new Date(row.date).toLocaleDateString(),
    sortable: true,
  },
  {
    name: "Duration",
    selector: row => row.duration,
  },
  {
    name: "Description",
    selector: row => row.description,
    wrap: true,
  },
  {
    name: "Funding",
    selector: row => row.funding ? `₹${row.funding}` : "N/A",
    right: true,
  },
  {
    name: "PDF",
    cell: row =>
      row.fileId ? (
        <a href={`http://localhost:3000/file/${row.fileId}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          View PDF
        </a>
      ) : (
        "Not Uploaded"
      ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  }
];

