import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import InputBox from '../../components/InputBox';
import CalenderBox from '../../components/CalenderBox';
import FileBox from '../../components/FileBox';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import DynamicUserFields from '../../components/DynamicFieldsForm';

const EventOrganized = () => {


  const { register, handleSubmit, reset } = useForm()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [submit, setSubmit] = useState(false)




  const fetchData = async () => {
    if (loading == true) {
      const data = await axios.get("http://localhost:3000/api/v1/institute/events-organised")
      console.log(data.data)
      setData(data.data.eventOrganised)
    }

  }

  useEffect(() => {
    console.log("fetching data")
    fetchData()
    console.log(data)
  }, [loading])

    const methods = useForm({
      defaultValues: {
        numberOfParticipants: [{ memberName: "", role: "" }], // 👈 default subform array
      },
    });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", file);

    try {

      const res = await axios.post("http://localhost:3000/file", formData)
      console.log(res.data)
      if(res.data.status == 200 && res?.data.fileId){

        console.log(data)
        const url = "http://localhost:3000/api/v1/institute/event-organised"
        const response = await axios.post(url
          , {
          eventName: data.eventName,
          eventType: data.eventType,
          agencyName: data.agencyName,
          category: data.category,
          numberOfParticipants: data.numberOfParticipants,
          date: data.date,
          duration: data.duration,
          description: data.description,
          funding: data.funding,
          
          // using fileId without middleware 
          // TODO : create middleware and send the fileId with using middleware
          fileId: res.data.fileId
        }
      )
      console.log(response)
    }  
    } catch (err) {
      console.log("Error:", err)
    }
    console.log(data)

    setLoading((p) => !p)
  }
  
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Event Organized Form
      </h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputBox label="Event Name" name="eventName" register={register} required />
          <InputBox label="Type of the Event" name="typeOfTheEvent" register={register} required />
          <InputBox label="Agency Name" name="agencyName" register={register} required />
          <InputBox label="Category" name="category" register={register} required />
          <DynamicUserFields label="Participants" name="numberOfParticipants" register={register} required />
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
      </FormProvider>
      <DataTable columns={eventOrganisedColumns} data={data} />
    </div>
  );
};

export default EventOrganized;

export const eventOrganisedColumns = [
  {
    name: "Event Name",
    selector: row => row.eventName,
    sortable: true,
  },
  {
    name: "Type",
    selector: row => row.typeOfEvent,
    sortable: true,
  },
  {
    name: "Agency",
    selector: row => row.agencyName,
  },
  {
    name: "Category",
    selector: row => row.category,
  },
  {
    name: "Participants",
    selector: row => row.numberOfParticipants,
    sortable: true,
    right: true,
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
        <a
          href={row.fileId}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View PDF
        </a>
      ) : (
        "Not Uploaded"
      ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];
