import React from 'react'
import InputBox from '../../components/InputBox'
import SelectBox from '../../components/SelectBox'
import CalenderBox from '../../components/CalenderBox'
import FileBox from '../../components/FileBox'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import UploadForm from '../../components/UploadForm'
import DataTable from 'react-data-table-component'

function InvitedTalks() {


  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState(null)


  const fetchData = async () => {
    if (loading == true) {
      const data = await axios.get("http://localhost:3000/api/v1/faculty/invited-talks")
      console.log(data.data.talks)
      setData(data.data.talks)

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

      const url = "http://localhost:3000/api/v1/faculty/invited-talk"
      const response = await axios.post(url
        , {
          facultyName: data.facultyName,
          titleOfTalk: data.titleOfTalk,
          eventName: data.eventName,
          organizingBody: data.organizingBody,
          date: data.date,
          natureOfEngagement: data.natureOfEngagement,
          fileId: res.data.fileId
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
  const Export = ({ onExport }) => <button className='px-4 py-1 bg-blue-500 hover:bg-blue-700 shadow-sm rounded-md text-white duration-150' onClick={e => onExport(e.target.value)}>Export data</button>;
  const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, []);


  return (
    <div>
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-2">
            Invited Talks Form
          </h2>
          <UploadForm url={"addInvitedFormData"} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputBox
              label="faculty_Name"
              name="facultyName"
              register={register}
              required
            />

            <InputBox
              label="title_Of_Talk"
              name="titleOfTalk"
              register={register}
              required
            />

            <InputBox
              label="event_Name"
              name="eventName"
              register={register}
              required
            />

            <InputBox
              label="organizing_Body"
              name="organizingBody"
              register={register}
              required
            />

            <CalenderBox
              label="date"
              name="date"
              register={register}
              required
            />

            <SelectBox
              label="nature_Of_Engagement"
              name="natureOfEngagement"
              register={register}
              options={[
                "Keynote",
                "Panelist",
                "Speaker",
              ]}
              required
            />

            <FileBox
              label="certificate_Url"
              name="file"
              register={register}
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </div>
      <DataTable
        title={"Invited Talks"}
        columns={facultyTalkColumns}
        data={data}
        actions={actionsMemo}
      />
    </div>
  )
}


export default InvitedTalks

export const facultyTalkColumns = [
  {
    name: 'Faculty Name',
    selector: row => row.facultyName,
    sortable: true
  },
  {
    name: 'Title of Talk/Session',
    selector: row => row.titleOfTalk,
    wrap: true
  },
  {
    name: 'Event Name',
    selector: row => row.eventName,
    wrap: true
  },
  {
    name: 'Organizing Body',
    selector: row => row.organizingBody
  },
  {
    name: 'Date',
    selector: row => row.date,
    format: row => new Date(row.date).toLocaleDateString()
  },
  {
    name: 'Nature of Engagement',
    selector: row => row.natureOfEngagement // Keynote / Panelist / Speaker
  },
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
              alert(`Deleting this ${row._id}`)
              const baseUrl = "http://localhost:3000";
              const url = "api/v1/faculty/invited-talk"
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
