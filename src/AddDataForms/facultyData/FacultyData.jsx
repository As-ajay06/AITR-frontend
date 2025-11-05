import React, { useEffect } from 'react'
import FacultyForm from '../../Forms/FacultyForms/FacultyForm'
import FacultyTable from '../../table/FacultyTable'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Button from '../../components/Button';


function AddFaculty() {

  const { register, handleSubmit, reset } = useForm()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [submit, setSubmit] = useState(false)

  const fetchData = async () => {
    if (loading == true) {
      const data = await axios.get("http://localhost:3000/api/v1/faculty/profiles")
      console.log(data.data.profiles)
      setData(data.data.profiles)
      setLoading(false)
    }

  }

  useEffect(() => {
    console.log("fetching data")
    fetchData()
    console.log(data)
  }, [loading])

  const onSubmit = async (facultyData) => {

    try {

      console.log(facultyData)
      const url = "http://localhost:3000/api/v1/faculty/profile"
      const response = await axios.post(url
        , {
          facultyId: facultyData.facultyId,
          name: facultyData.name,
          email: facultyData.email,
          qualification: facultyData.qualification,
          department: facultyData.department,
          mobileNumber: facultyData.mobileNumber,
          category: facultyData.category,
          teachingExperience: facultyData.teachingExperience,
          designation: facultyData.designation,

        }
      )

      if (response.ok) {
        console.log("hi there")
      }

      console.log(response)

    } catch (err) {
      console.log("Error:", err)
    }
    console.log(facultyData)

    setLoading((p) => !p)
  }

  let index = 1

  const columns = [
    {
      name: 's.no',
      selector: row => row.id,
      sortable: true,
      width: '80px',
      cell: (row, index) => index + 1
    },
    {
      name: 'faculty ID',
      selector: row => row.facultyId,
      sortable: true,
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
      name: 'qualification',
      selector: row => row.qualification,
      sortable: true,
    },
    {
      name: 'Department',
      selector: row => row.department,
      sortable: true,
    },
    {
      name: 'Mobile No',
      selector: row => row.mobileNumber,
      sortable: true,
    },
    {
      name: 'Experience (Years)',
      selector: row => row.teachingExperience,
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
                alert(`Deleting This ${row._id}`)
                const baseUrl = "http://localhost:3000";
                const url = "api/v1/faculty/profile";
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
      <FacultyForm onSubmit={onSubmit} register={register} handleSubmit={handleSubmit} reset={reset} />
      <DataTable
        title={"Faculty Data"}
        columns={columns}
        data={data}
        actions={actionsMemo}
      />
    </div>
  )
}
export default AddFaculty