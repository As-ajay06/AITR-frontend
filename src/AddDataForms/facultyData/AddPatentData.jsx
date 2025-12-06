
import FacultyPatentForm from '../../Forms/FacultyForms/Patent'
import PatentTable from '../../table/PatentsTable'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';

function AddPatentData() {

  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (loading == true) {
      const data = await axios.get("http://localhost:3000/api/v1/faculty/patents-published")
      console.log(data.data.patents)
      setData(data.data.patents)
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
      console.log("this is file", data.file[0])
      formData.append("file", data.file[0]);
    }
    try {
      const res = await axios.post('http://localhost:3000/file', formData);
      console.log(res);
      
        const url = "http://localhost:3000/api/v1/faculty/patent-published"
        const response = await axios.post(url, {
          facultyId: data.facultyId,
          facultyName: data.facultyName,
          department: data.department,
          title: data.title,
          applicant: data.applicant,
          applicationNumber: data.applicationNumber,
          applicationDate: data.applicationDate,
          status: data.status,
          coInventors: data.coInventors,
          country: data.country,
          category: data.category,
          fileId: res.data.fileId,
          patentTitle: data.patentTitle,
          patentType: data.patentType,
          inventors: data.inventors,
          publicationDate: data.publicationDate,
          abstract: data.abstract
        }
        )
        console.log(response.data);
    } catch (error) {
      console.error("Error occurred:", error.message);
    }
    console.log(data)

    setLoading((p) => !p)
  }



  return (
    <div>
      <FacultyPatentForm handleSubmit={handleSubmit} register={register} reset={reset} onSubmit={onSubmit} />
      <PatentTable data={data} />
    </div>
  );
}

export default AddPatentData;
