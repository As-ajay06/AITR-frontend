import React, { useEffect, useState } from 'react';
import StudentHackathonForm from '../../Forms/StudentForms/Hackathons';
import HackathonTable from '../../table/HackathonTable';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import UploadForm from '../../components/UploadForm';

function AddHackathonsData() {
  const { register, handleSubmit, reset } = useForm()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [submit, setSubmit] = useState(false)


  const fetchData = async () => {
    if (loading == true) {
      const data = await axios.get("http://localhost:3000/api/v1/students/hackathons")
      console.log(data.data)
      setData(data.data.hackathons)
    }

  }

  useEffect(() => {
    console.log("fetching data")
    fetchData()
    console.log(data)
  }, [loading])

  const onSubmit = async (data) => {

    try {
      const url = "http://localhost:3000/api/v1/students/hackathon"
      const response = await axios.post(url
        , {
          hackathonName: data.hackathonName,
          organizer: data.organizer,
          teamDetails: data.teamDetails,
          result: data.result,
          eventDate: data.eventDate,
          teamName: data.teamName,
          teamSize: data.teamSize,
          mentorName: data.mentorName,
          venue: data.venue,
          prolemStatement: data.prolemStatement,
          technologyUsed: data.technologyUsed,
          prizeMoney: data.prizeMoney,
          positionSecured: data.positionSecured,
        }
      )
      console.log(response)


    } catch (err) {
      console.log("Error:", err)
    }
    console.log(data)

    setLoading((p) => !p)
    reset();
  }


  return (
    <div>
      <StudentHackathonForm
        onSubmit={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        reset={reset}
      />
      <HackathonTable data={data} />
    </div>
  );
}

export default AddHackathonsData;
