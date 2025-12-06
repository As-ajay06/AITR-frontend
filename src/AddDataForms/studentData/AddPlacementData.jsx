import React, { useEffect, useState } from 'react';
import StudentPlacementForm from '../../Forms/StudentForms/Placement';
import PlacementTable from '../../table/Placement';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function AddPlacementData() {

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
    

        const url = "http://localhost:3000/api/v1/students/placement"
        const response = await axios.post(url
          , {
            placementId: data.placementId,
            studentName: data.studentName,
            companyName: data.companyName,
            companyLocation: data.companyLocation,
            roleOffered: data.roleOffered,
            branch: data.branch,
            batch: data.batch,
            year: data.year,
            venue: data.venue,
            placementType: data.placementType,
            package: data.package,
            joiningDate: data.joiningDate,
            fileId: res.data.fileId,
          })
        console.log(response)
      
    } catch (err) {
      console.log("Error:", err)
    }
    console.log(data)

    setLoading((p) => !p)
  }

  return (
    <div>
      <StudentPlacementForm
        onSubmit={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        reset={reset}
      />
      <PlacementTable data={data} />
    </div>
  );
}

export default AddPlacementData;
