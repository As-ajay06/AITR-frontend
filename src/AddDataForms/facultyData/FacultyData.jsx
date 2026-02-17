import React, { useEffect } from 'react'
import FacultyForm from '../../Forms/FacultyForms/FacultyForm'
import FacultyTable from '../../table/FacultyTable'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../utils/axiosInstance';
import { API_FACULTY_FILE_UPLOAD, BASE_URL } from '../../../config/config';
import UploadForm from '../../components/UploadForm';
import InputBox from '../../components/InputBox';
import SelectBox from '../../components/SelectBox';



// Define available columns for export
const exportableColumns = [
  { key: 'facultyId', label: 'Faculty ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'qualification', label: 'Qualification' },
  { key: 'department', label: 'Department' },
  { key: 'mobileNumber', label: 'Mobile Number' },
  { key: 'category', label: 'Category' },
  { key: 'teachingExperience', label: 'Teaching Experience' },
  { key: 'designation', label: 'Designation' },
];


function AddFaculty() {


  const [showSuccess, setShowSuccess] = useState(false);
  const { register, handleSubmit, reset } = useForm()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const fetchData = async () => {
    try {
      setLoading(true);
      // Using axios instance with automatic token handling
      const response = await api.get(`${BASE_URL}/api/v1/faculty/profiles`);
      console.log(response.data.profiles)
      setData(response.data.profiles || [])
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setMessage('Error loading data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onSubmit = async (facultyData) => {

    console.log(facultyData)

    try {
      const response = await api.post(`${BASE_URL}/api/v1/faculty/profile`, {
        facultyId: facultyData.facultyId,
        name: facultyData.name,
        email: facultyData.email,
        qualification: facultyData.qualification,
        department: facultyData.department,
        mobileNumber: facultyData.mobileNumber,
        category: facultyData.category,
        teachingExperience: facultyData.teachingExperience,
        designation: facultyData.designation,
      })

      console.log("Profile saved:", response.data);
      setMessage('Profile added successfully!');

      setShowSuccess(true);

      reset(); // Clear form
      // Refresh data to show new profile in table
      await fetchData();
    } catch (err) {
      console.log("Error:", err)
      setMessage(err.response?.data?.message || 'Error saving profile. Please try again.');
    }
  }

  // function FacultyForm({ register, handleSubmit, reset, onSubmit }) {


  // Institute departments can be updated later
  const departments = [
    "Computer Science & Engg. (Core)",
    "Computer Science & Information Technology(CSIT)",
    "Information Technology(IT)",
    "Civil Engineering (CE)",
    "Electronics & Communication Engg.(EC)",
    "Mechanical Engineering",
    "Computer Science & Engg. In Data Science",
    "Computer Science & Engg. In Internet of Things",
    "Computer Science & Engg. In Cyber Security",
    "Computer Science & Engineering in Artificial Intelligence & Machine Learning",
    "Electronics Engineering(Advanced Communication Technology)",
    "Electronics Engineering(VLSI Design And Technology)",
  ];

  const category = [
    "General",
    "OBC",
    "SC",
    "ST",
    "EWS",
  ]
  const experienceYears = ["0-1", "2-4", "5-7", "8+"];

  const designations = [
    "Assistant Professor",
    "Associate Professor",
    "Professor",
    "Lecturer",
    "Head of Department (HOD)",
    "Dean",
  ];


  return (
    <div>
      {message && (
        <div
          className={`mb-4 p-3 rounded-md text-center font-medium transition-all duration-300 ${showSuccess
            ? 'bg-green-100 text-green-700 border border-green-300'
            : 'bg-red-100 text-red-700 border border-red-300'
            }`}
        >
          {message}
        </div>
      )}
      <div className="w-full bg-white rounded-2xl shadow-lg border border-slate-200 p-8 lg:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Faculty Profile Form
            </h2>
            <p className="text-slate-600">Fill in the details to add a new faculty member</p>
          </div>
          <div className="mt-4 md:mt-0">
            <UploadForm url={`${API_FACULTY_FILE_UPLOAD}/profile`} />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputBox label="Faculty_Id" name="facultyId" register={register} required />
            <InputBox label="name" name="name" register={register} required />
            <InputBox label="email" name="email" register={register} required type="email" />
            <InputBox label="Highest_qualification" name="qualification" register={register} required />
            <SelectBox label="department" name={"department"} options={departments} register={register} />
            <InputBox placeholder="e.g. 8789975443" label="mobile_Number" name={"mobileNumber"} register={register} required />
            <SelectBox placeholder="e.g OBC, GENERAL" label="category" name={"category"} options={category} register={register} required />
            <SelectBox label="teaching_Experience" name={"teachingExperience"} options={experienceYears} register={register} />
            <SelectBox label="designation" name={"designation"} options={designations} register={register} />
          </div>

          <div className="mt-10 flex gap-4">
            <button
              type="submit"
              className="btn-primary"
            >
              Submit Form
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="btn-secondary"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      {loading ? (
        <div className="text-center p-4">Loading...</div>
      ) : (
        <FacultyTable data={data} />
      )}
    </div>
  )
}
export default AddFaculty;