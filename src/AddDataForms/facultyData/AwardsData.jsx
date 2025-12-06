import React from 'react'
import AwardForm from "../../Forms/FacultyForms/Awards"
import AwardTable from '../../table/AwardsTable'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AddAwards = () => {

  const { register, handleSubmit, reset } = useForm()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState(null)


  const fetchData = async () => {
    if (loading == true) {
      const response = await axios.get("http://localhost:3000/api/v1/faculty/award-recognitions")
      console.log(response.data)
      setData(response.data.data)
      setLoading(false)
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
      // post : file
      const res = await axios.post("http://localhost:3000/file", formData);
      // post: date
      if (res.status === 200 && res.data?.fileId) {
        const url = "http://localhost:3000/api/v1/faculty/award-recognition";
        const response = await axios.post(url, {
          recipientId: data.recipientId,
          recipientName: data.recipientName,
          department: data.department,
          awardName: data.awardName,
          issuingOrganization: data.issuingOrganization,
          date: data.date,
          category: data.category,
          eventName: data.eventName,
          description: data.description,
          certificatePdfUrl: data.certificatePdfUrl,
          titleOfAward: data.titleOfAward,
          level: data.level,
          supportingDocumentUrl: data.supportingDocumentUrl,
          fileId: res.data.fileId, // use fileId from upload response
        });

        console.log("Award saved:", response.data);
      } else {
        console.error("File upload failed, skipping award creation.");
      }
    } catch (error) {
      console.error("Error occurred:", error.message);
    }

    console.log(data)

    setLoading((p) => !p)
  }


  const index = 1

  return (
    <>
      <AwardForm onSubmit={onSubmit} register={register} handleSubmit={handleSubmit} reset={reset} />
      <AwardTable data={data} />
    </>
  )

}

export default AddAwards;