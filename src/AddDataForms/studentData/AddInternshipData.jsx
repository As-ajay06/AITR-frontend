import React, { useEffect, useState } from 'react';
import StudentInternshipForm from '../../Forms/StudentForms/Internship';
import { InternshipTable } from '../../table/InternshipTable';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function AddInternshipData() {

  const { register, handleSubmit, reset } = useForm()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [submit, setSubmit] = useState(false)


  const fetchData = async () => {
    if (loading == true) {
      const data = await axios.get("http://localhost:3000/api/v1/students/placements")
      console.log(data.data)
      setData(data.data.placements)
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
    if (data.file && data.file[0]) {
      formData.append("file", data.file[0]);
    }

    try {

      const res = await axios.post("http://localhost:3000/file", formData)
      console.log(res.data)
    

      //  todo: chage placement with internship 
      if (res.status === 200 && res.data?.fileId) {

        const url = "http://localhost:3000/api/v1/students/placement"
        const response = await axios.post(url
          , {
            internshipId: data.internshipId,
            studentName: data.studentName,
            enrollmentNumber: data.enrollmentNumber,
            branch: data.branch,
            batch: data.batch,
            year: data.year,
            venue: data.venue,
            companyName: data.companyName,
            insternshipRole: data.insternshipRole,
            modeOfInternship: data.modeOfInternship,
            stipend: data.stipend,
            startDate: data.startDate,
            endDate: data.endDate,
            technologyUsed: data.technologyUsed,
            projectName: data.projectName,
            projectDescription: data.projectDescription,
            companyLocation: data.companyLocation,
            areaOfWork: data.areaOfWork,

            fileId: res.data.fileId,
          }
        )
        console.log(response.data)
      } else {
        console.error("File upload failed, skipping Profile creation.");
      }
    } catch (error) {
      console.error("Error occurred:", error.message);
    }
    console.log(data)

    setLoading((p) => !p)
  }

  return (
    <div>
      <StudentInternshipForm
        onSubmit={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        reset={reset}
      />
      <InternshipTable data={data} />
    </div>
  );
}

export default AddInternshipData;
