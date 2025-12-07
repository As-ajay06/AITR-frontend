import React, { useEffect } from 'react'
import FacultyForm from '../../Forms/FacultyForms/FacultyForm'
import FacultyTable from '../../table/FacultyTable'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../utils/axiosInstance';
import { BASE_URL } from '../../../config/config';

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
    setMessage('');

    try {
      console.log(facultyData)
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
      reset(); // Clear form
      
      // Refresh data to show new profile in table
      await fetchData();

    } catch (err) {
      console.log("Error:", err)
      setMessage(err.response?.data?.message || 'Error saving profile. Please try again.');
    }
  }




  return (
    <div>
      {message && (
        <div className={`mb-4 p-3 rounded-md text-center ${
          message.includes('successfully') 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}
      <FacultyForm onSubmit={onSubmit} register={register} handleSubmit={handleSubmit} reset={reset} />
      {loading ? (
        <div className="text-center p-4">Loading...</div>
      ) : (
        <FacultyTable data={data} />
      )}
    </div>
  )
}
export default AddFaculty