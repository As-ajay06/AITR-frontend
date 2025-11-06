import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputBox from '../../components/InputBox';
import CalenderBox from '../../components/CalenderBox';
import FileBox from '../../components/FileBox';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Rss } from 'lucide-react';
import UploadForm from '../../components/UploadForm';

const EventGrantReceived = () => {


  const { register, handleSubmit, reset } = useForm()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [submit, setSubmit] = useState(false)

  const fetchData = async () => {
    if (loading == true) {
      const data = await axios.get("http://localhost:3000/api/v1/department/event-grants-received")
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

      const res = await axios.post("http://localhost:3000/file", formData)
      console.log(res.data)

      console.log(data)
      const url = "http://localhost:3000/api/v1/department/event-grant-received"
      const response = await axios.post(url
        , {
          typesOfEvent: data.typesOfEvent,
          departmentName: data.departmentName,
          grantingAgency: data.grantingAgency,
          category: data.category,
          numberOfParticipants: data.numberOfParticipants,
          dateOfApproval: data.dateOfApproval,
          duration: data.duration,
          description: data.description,
          funding: data.funding,
          eventTitle: data.eventTitle,
          grantAmount: data.grantAmount,
          facultyCoordinator: data.facultyCoordinator,
          purpose: data.purpose,
          utilizationSummary: data.utilizationSummary,
          // using fileId without middleware 
          // TODO : create middleware and send the fileId with using middleware
          fileId: res.data.fileId
        }
      )
      console.log(response.data);
    } catch (error) {
      console.error("Error occurred:", error.message);
    }
    console.log(data)

    setLoading((p) => !p)
  };

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
    <div>
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-2">
            Event Grant Form
          </h2>
          <UploadForm url={"addEventGrantData"} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <InputBox label="Event Title" name="eventTitle" register={register} required />
            <InputBox label="Event Type" name="eventType" register={register} required />
            <InputBox label="Department Name" name="departmentName" register={register} required />
            <InputBox label="Granting Agency" name="grantingAgency" register={register} required />
            <InputBox label="Category" name="category" register={register} required />
            <InputBox label="Number of Participants" name="numberOfParticipants" register={register} required />
            <CalenderBox label="Date of Approval" name="dateOfApproval" register={register} required type="date" />
            <InputBox label="Duration" name="duration" register={register} required />
            <InputBox label="Description" name="description" register={register} required />
            <InputBox label="Funding" name="funding" register={register} required />
            <FileBox label="PDF" name="pdf" register={register} />
            <InputBox label="Grant Amount" name="grantAmount" register={register} required />
            <InputBox label="Faculty Coordinator" name="facultyCoordinator" register={register} required />
            <InputBox label="Purpose" name="purpose" register={register} required />
            <InputBox label="Utilization Summary" name="utilizationSummary" register={register} required />

            <button
              type="submit"
              className="col-span-2 mt-6 px-6 py-3 bg-blue-600 text-white font-semibold text-base rounded-md shadow hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <DataTable title={"Event grant data"} columns={eventGrantColumns} data={data} actions={actionsMemo} />
    </div>
  );
};

export default EventGrantReceived;

export const eventGrantColumns = [
  {
    name: "Event Title",
    selector: row => row.eventTitle,
    sortable: true,
  },
  {
    name: "Department Name",
    selector: row => row.departmentName,
    sortable: true,
  },
  {
    name: "Granting Agency",
    selector: row => row.grantingAgency,
  },
  {
    name: "Date of Approval",
    selector: row => new Date(row.dateOfApproval).toLocaleDateString(),
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
    selector: row => row.funding || "N/A",
  },
  {
    name: "Proposal PDF",
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
    button: true,
  },
  {
    name: "Grant Amount",
    selector: row => row.grantAmount,
  },
  {
    name: "Faculty Coordinator",
    selector: row => row.facultyCoordinator,
  },
  {
    name: "Purpose",
    selector: row => row.purpose,
  },
  {
    name: "Utilization Summary",
    selector: row => row.utilizationSummary || "N/A",
    wrap: true,
  },
];
