import StudentCertificateForm from '../Forms/StudentForms/Certificate';
import StudentCertificatesTable from '../table/CertificateTable';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState, useEffect } from 'react';

function AddStudentCertificateData() {
  const {register, handleSubmit, reset} = useForm()
  const [data, setData] = useState([])
  const [loading , setLoading ] = useState(true)
  const [submit, setSubmit ] = useState(false)


  const fetchData = async () => {
    if(loading == true ){
      const data = await axios.get("http://localhost:3000/api/v1/students/certificates")
      console.log(data.data.certificates)
      setData(data.data.certificates)
    }
 
  }

  useEffect(() => {
    console.log("fetching data")
    fetchData()
    console.log(data)
  },[loading])

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
          certificateId: data.certificateId,
          studentName: data.studentName,
          enrollmentNumber: data.enrollmentNumber,
          branch: data.branch,
          batch: data.batch,
          year: data.year,
          courseName: data.courseName,
          issueDate: data.issueDate,
          validityPeriod: data.validityPeriod,
          gradeOrScore: data.gradeOrScore,
          modeOfLearning: data.modeOfLearning,
          courseDuration: data.courseDuration,
          rankOrPosition: data.rankOrPosition,
          certificateDescription: data.certificateDescription,
          relevanceToProgramOrBranch: data.relevanceToProgramOrBranch,
          fileId: data.fileId,
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
      <StudentCertificateForm
        onSubmit={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        reset={reset}
      />
      <StudentCertificatesTable data={data} />
    </div>
  );
}

export default AddStudentCertificateData;
