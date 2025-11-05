import React from 'react'
import InputBox from '../../components/InputBox'
import FileBox from '../../components/FileBox'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import UploadForm from '../../components/UploadForm'

function AcedmicQualificationDiscipline() {


  const { register, handleSubmit, reset } = useForm()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState(null)


  const fetchData = async () => {
    if (loading == true) {
      const data = await axios.get("http://localhost:3000/api/v1/faculty/academic-qualifications")
      console.log(data.data.qualifications)
      setData(data.data.qualifications)

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

      const url = "http://localhost:3000/api/v1/faculty/academic-qualification"
      const response = await axios.post(url
        , {
          facultyName: data.facultyName,
          highestDegree: data.highestDegree,
          universityOrInstitute: data.universityOrInstitute,
          specialization: data.specialization,
          yearOfCompletion: data.yearOfCompletion,
          // using fileId without middleware 
          // TODO : create middleware and send the fileId with using middleware
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
  return (
    <div>
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-2">
            Faculty Academic Qualification Discipline Form
          </h2>
          <UploadForm url={"addAcedmicQualificationDisciplineData"} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" >
            <InputBox label={"faculty_name"} name="facultyName" register={register} required />
            <InputBox label="highest_Degree" name="highestDegree" register={register} required />

            <InputBox label="universityOrInstitute" name="universityOrInstitute" register={register} required />

            <InputBox label="specialization" name="specialization" register={register} required />

            <InputBox
              label="year_Of_Completion"
              name="yearOfCompletion"
              register={register}
              type="number"
              required
            />
            <FileBox label="certificateUrl" name="certificateUrl" register={register} />

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
          </div>
        </form>
      </div>
      <DataTable columns={academicQualificationColumns} data={data} />
    </div>
  )
}

export default AcedmicQualificationDiscipline

export const academicQualificationColumns = [
  {
    name: 'Faculty Name',
    selector: row => row.facultyName,
    sortable: true,
    wrap: true,
  },
  {
    name: 'Highest Degree',
    selector: row => row.highestDegree,
    sortable: true,
    wrap: true,
  },
  {
    name: 'University/Institute',
    selector: row => row.universityOrInstitute,
    sortable: true,
    wrap: true,
  },
  {
    name: 'Specialization',
    selector: row => row.specialization,
    sortable: true,
  },
  {
    name: 'Year of Completion',
    selector: row => row.yearOfCompletion,
    sortable: true,
  },
  {
    name: 'Certificate',
    cell: row => (
      row.fileId ? (
        <a
          href={`http://localhost:3000/file/${row.fileId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View PDF
        </a>
      ) : "N/A"
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
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
              const url = "api/v1/faculty/academic-qualification"
              const response = await axios.delete(`${baseUrl}/${url}/${row._id}`);
              console.log(response.data);
            }
          } className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded">Delete</button>
      </div >
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];


