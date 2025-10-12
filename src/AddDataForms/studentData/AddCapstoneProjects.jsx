import React, { useEffect, useState } from 'react';
import CapstoneProjectForm from '../../Forms/StudentForms/CapstoneProjectForm';
import StudentTable from '../../table/StudentTable'; // Replace later if table differs
import { useForm } from 'react-hook-form';
import axios from 'axios';
import DataTable from 'react-data-table-component';

function AddCapstoneProjects() {
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/student/capstone');
      setData(res.data.projects); // Adjust key from backend
    } catch (err) {
      console.error("Error fetching capstone projects:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [loading]);

  const onSubmit = async (data, e) => {
    e.preventDefault();

    console.log(data)

    const formData = new FormData();
    const fileInput = document.querySelector("input[type='file']");
    if (fileInput?.files[0]) {
      formData.append("file", fileInput.files[0]);
    }
    try {

      const res = await axios.post("http://localhost:3000/file", formData)
      console.log(res.data)
      // todo: set the url
      const url = "http://localhost:3000/api/v1/students/extracurricular"
      const response = await axios.post(url
        , {
          projectTitle: data.projectTitle,
          teamMembers: data.teamMembers,
          guideName: data.guideName,
          semester: data.semester,
          industryMentor: data.industryMentor,
          outcome: data.outcome,
          fileId: res.data.fileId,
        }
      )
      console.log(response.data);
    } catch (error) {
      console.error("Error occurred:", error.message);
    }
  };

  return (
    <div>
      <CapstoneProjectForm
        onSubmit={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        reset={reset}
      />
      <DataTable columns={CapstoneprojectColumns} />
    </div>
  );
}

export default AddCapstoneProjects;

export const CapstoneprojectColumns = [
  {
    name: "Project Title",
    selector: row => row.projectTitle,
    sortable: true,
  },
  {
    name: "Team Members",
    selector: row => row.teamMembers?.join(", "),
    wrap: true,
  },
  {
    name: "Guide Name",
    selector: row => row.guideName,
  },
  {
    name: "Semester",
    selector: row => row.semester,
  },
  {
    name: "Industry Mentor",
    selector: row => row.industryMentor || "N/A",
  },
  {
    name: "Project Outcome",
    selector: row => row.outcome,
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
              const url = "api/v1/students/certificate"
              const response = await axios.delete(`${baseUrl}/${url}/${row._id}`);
              console.log(response.data.certificate);
            }
          } className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded">Delete</button>
      </div >
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  }
];

// todo: add file downloading schema

