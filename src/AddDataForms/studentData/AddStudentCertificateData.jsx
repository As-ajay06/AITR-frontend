import StudentCertificateForm from '../../Forms/StudentForms/Certificate';
import StudentCertificatesTable from '../../table/CertificateTable';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState, useEffect } from 'react';

function AddStudentCertificateData() {
  const { register, handleSubmit, reset } = useForm()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState();


  const fetchData = async () => {
    if (loading == true) {
      const data = await axios.get("http://localhost:3000/api/v1/students/certificates")
      console.log(data.data.certificates)
      setData(data.data.certificates)
    }

  }

  useEffect(() => {
    console.log("fetching data")
    fetchData()
    console.log(data)
  }, [loading])

 const onSubmit = async (data) => {

  const formData = new FormData();
  if (data.file && data.file[0]) {
    formData.append("file", data.file[0]);
  }

  try {
    // 1️⃣ Upload file
    const res = await axios.post(
      "http://localhost:3000/file",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    console.log("Uploaded:", res.data);
    const fileId = res.data.fileId;  // <-- FIXED

    // 2️⃣ Save certificate with returned fileId
    const response = await axios.post(
      "http://localhost:3000/api/v1/students/certificate",
      {
        certificateId: data.certificateId,
        studentName: data.studentName,
        enrollmentNumber: data.enrollmentNumber,
        branch: data.branch,
        batch: data.batch,
        year: data.year,
        courseName: data.courseName,
        issuingOrganization: data.issuingOrganization,
        issueDate: data.issueDate,
        validityPeriod: data.validityPeriod,
        gradeOrScore: data.gradeOrScore,
        modeOfLearning: data.modeOfLearning,
        courseDuration: data.courseDuration,
        rankOrPosition: data.rankOrPosition,
        certificateDescription: data.certificateDescription,
        relevanceToProgramOrBranch: data.relevanceToProgramOrBranch,

        // 🟢 FINAL FIX
        fileId: fileId,
      }
    );

    console.log("Certificate saved:", response.data);

    setLoading(prev => !prev);

  } catch (error) {
    console.error("Error occurred:", error.message);
  }
};

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
