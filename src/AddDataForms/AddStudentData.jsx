import React, { useEffect, useState } from 'react';
import StudentForm from '../Forms/StudentForms/StudentForm';
import StudentTable from '../table/StudentTable';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function AddStudentData() {

  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState(null)


  const fetchData = async () => {
    if (loading == true) {
      const data = await axios.get("http://localhost:3000/api/v1/students/profiles")
      console.log(data.data.profiles)
      setData(data.data.profiles)

    }

  }

  useEffect(() => {
    console.log("fetching data")
    fetchData()
    console.log(data)
  }, [loading])

  const onSubmit = async (data) => {

    console.log(data)
    console.log(data.file[0])
    setFile(data.file[0])
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("http://localhost:3000/file", formData)
      console.log(res.data)

      const url = "http://localhost:3000/api/v1/students/profile"
      const response = await axios.post(url
        , {
          studentId: data.studentId,
          name: data.name,
          enrollmentNumber: data.enrollmentNumber,
          organizingBody: data.organizingBody,
          branch: data.branch,
          batch: data.batch,
          email:data.email,
          year: data.year,
          course: data.course,
          cgpa: data.cgpa,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          category: data.category,
          yearOfAdmission: data.yearOfAdmission,
          yearOfGraduationStatus: data.yearOfGraduationStatus,
          status: data.status,
          githubLink: data.githubLink,
          linkedinProfileLink: data.linkedinProfileLink,
          guardianContactNumber: data.guardianContactNumber,
          guardianName: data.guardianName,
          address: data.address
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
      <StudentForm
        onSubmit={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        reset={reset}
      />
      <StudentTable data={data} />
    </div>
  );
}

export default AddStudentData;
