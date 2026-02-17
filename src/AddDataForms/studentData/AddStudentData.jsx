import React, { useEffect, useRef, useState } from 'react';
import StudentForm from '../../Forms/StudentForms/StudentForm';
import StudentTable from '../../table/StudentTable';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import UploadForm from '../../components/UploadForm';
import { API_STUDENT_FILE_UPLOAD, BASE_URL } from '../../../config/config';
import InputBox from '../../components/InputBox';
import SelectBox from '../../components/SelectBox';
import CalenderBox from '../../components/CalenderBox';
import FileBox from '../../components/FileBox';
import InputBox2 from '../../components/InputBox2';


function AddStudentData() {

  const { register, handleSubmit, reset, setValue } = useForm();
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const formRef = useRef(null);


  const genderOptions = ["Male", "Female", "Other"];
  const categoryOptions = ["General", "OBC", "SC", "ST", "Other"];
  const statusOptions = ["Pursuing", "Graduated"];
  const courseOptions = ["B.Tech", "M.Tech", "B.Sc", "M.Sc", "MBA"]; // Add more as needed


  const fetchData = async () => {
    if (loading == true) {
      try {
        const token = localStorage.getItem('token');
        const data = await axios.get(`${BASE_URL}/api/v1/students/profiles`, {
          headers: {
            Authorization: `${token}`
          }
        })
        console.log(data.data.profiles)
        setData(data.data.profiles)
        setError(null);
      } catch (err) {
        const message = err.response?.data?.message || err.message || 'Failed to fetch student data';
        setError(message);
        console.error('Fetch error:', err);
      }
    }
  }

  useEffect(() => {
    console.log("fetching data")
    fetchData()
    console.log(data)
  }, [loading])


  const onSubmit = async (data, e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    if (data.file && data.file[0]) {
      formData.append("file", data.file[0]);
    }

    try {
      const token = localStorage.getItem('token');
      let fileId = null;

      // Only upload file if a new file is selected
      if (data.file && data.file[0]) {
        const res = await axios.post(`${BASE_URL}/file`, formData);
        fileId = res.data.fileId;
      }

      const profileData = {
        studentId: data.studentId,
        name: data.name,
        enrollmentNumber: data.enrollmentNumber,
        organizingBody: data.organizingBody,
        branch: data.branch,
        batch: data.batch,
        email: data.email,
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
        address: data.address,
      };

      if (fileId) profileData.fileId = fileId;

      if (editingId) {
        // UPDATE existing profile
        await axios.put(`${BASE_URL}/api/v1/students/profile/${editingId}`, profileData, {
          headers: { Authorization: `${token}` }
        });
        setSuccess('Student profile updated successfully!');
        setEditingId(null);
      } else {
        // CREATE new profile
        if (!fileId) {
          const res = await axios.post(`${BASE_URL}/file`, formData);
          profileData.fileId = res.data.fileId;
        }
        await axios.post(`${BASE_URL}/api/v1/students/profile`, profileData, {
          headers: { Authorization: `${token}` }
        });
        setSuccess('Student profile saved successfully!');
      }

      reset();
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Something went wrong while saving the profile';
      setError(message);
      console.error('Submit error:', err);
      setTimeout(() => setError(null), 5000);
    }

    setLoading((p) => !p);
  }

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  // Delete a single student by _id
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    setError(null);
    setSuccess(null);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${BASE_URL}/api/v1/students/profile/${id}`, {
        headers: { Authorization: `${token}` }
      });
      setSuccess('Student deleted successfully!');
      setTimeout(() => setSuccess(null), 5000);
      setLoading((p) => !p);
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to delete student';
      setError(message);
      setTimeout(() => setError(null), 5000);
    }
  };

  // Delete all selected students
  const handleDeleteSelected = async () => {
    if (selectedRows.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedRows.length} selected student(s)?`)) return;
    setError(null);
    setSuccess(null);
    try {
      const token = localStorage.getItem('token');
      await Promise.all(
        selectedRows.map((row) =>
          axios.delete(`${BASE_URL}/api/v1/students/profile/${row._id}`, {
            headers: { Authorization: `${token}` }
          })
        )
      );
      setSuccess(`${selectedRows.length} student(s) deleted successfully!`);
      setSelectedRows([]);
      setToggleCleared((p) => !p);
      setTimeout(() => setSuccess(null), 5000);
      setLoading((p) => !p);
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to delete selected students';
      setError(message);
      setTimeout(() => setError(null), 5000);
    }
  };

  // Edit a student - pre-fill form and scroll to top
  const handleEdit = (row) => {
    setEditingId(row._id);
    reset({
      studentId: row.studentId || '',
      name: row.name || '',
      enrollmentNumber: row.enrollmentNumber || '',
      branch: row.branch || '',
      batch: row.batch || '',
      email: row.email || '',
      year: row.year || '',
      course: row.course || '',
      cgpa: row.cgpa || '',
      dateOfBirth: row.dateOfBirth || '',
      gender: row.gender || '',
      category: row.category || '',
      yearOfAdmission: row.yearOfAdmission || '',
      yearOfGraduationStatus: row.yearOfGraduationStatus || '',
      status: row.status || '',
      githubLink: row.githubLink || '',
      linkedinLink: row.linkedinProfileLink || '',
      guardianContactNumber: row.guardianContactNumber || '',
      guardianName: row.guardianName || '',
      address: row.address || '',
    });
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset();
  };

  // todo: add filter

  return (
    <div>
      <div ref={formRef} className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-2">
            {editingId ? '✏️ Edit Student Profile' : 'Student Profile Form'}
          </h2>
          <UploadForm url={`${API_STUDENT_FILE_UPLOAD}/profile`} />
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md flex justify-between items-center">
            <span>❌ {error}</span>
            <button onClick={() => setError(null)} className="text-red-700 font-bold text-lg leading-none">&times;</button>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md flex justify-between items-center">
            <span>✅ {success}</span>
            <button onClick={() => setSuccess(null)} className="text-green-700 font-bold text-lg leading-none">&times;</button>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputBox label="Student_id" name="studentId" register={register} required placeholder={"e.g: AL23-1249"} />
            <InputBox label="Name" name="name" register={register} required placeholder={"e.g: Rakesh Sharma"} />
            <InputBox label="Enrollment Number" name="enrollmentNumber" register={register} required placeholder={"e.g: 0822AL231018"} />
            <InputBox label="Branch" name="branch" register={register} required placeholder={"e.g: AIML"} />
            <InputBox label="Batch" name="batch" register={register} placeholder={"e.g: 2022"} />
            <InputBox label="Email" name="email" register={register} required placeholder={"e.g: ajay@gmail.com"} />
            <InputBox label="Year" name="year" register={register} required />
            <SelectBox label="Course" name="course" options={courseOptions} register={register} required />
            <InputBox2 label="C.G.P.A" name="cgpa" register={register} placeholder={"e.g: 8.3"} />
            <CalenderBox label="Date of Birth" name="dateOfBirth" register={register} required />
            <SelectBox label="Gender" name="gender" options={genderOptions} register={register} required />
            <SelectBox label="Category" name="category" options={categoryOptions} register={register} required />
            <InputBox label="Year of Admission" name="yearOfAdmission" register={register} required placeholder={"eg: 2022"} />
            <InputBox label="Year of Graduation" name="yearOfGraduationStatus" register={register} required placeholder={"eg: 2026"} />
            <SelectBox label="Status" name="status" options={statusOptions} register={register} required />
            <InputBox label="GitHub Link" name="githubLink" register={register} placeholder={"https://github.com/your-username"} />
            <InputBox label="LinkedIn Profile Link" name="linkedinLink" register={register} placeholder={"https://www.linkedin.com/in/your-name-942a07253/"} />
            <InputBox label="Parent/ _Guardian_Contact_No" name="guardianContactNumber" register={register} required placeholder={"e.g: 9876543210"} />
            <InputBox label="Parent / _Guardian_Name" name="guardianName" required register={register} />
            <InputBox label="Address" name="address" register={register} required placeholder={"e.g: 123 Subhash Nagar, Indore"} />
            <InputBox label="Certificate link (if any)" name="certificateLink" register={register} placeholder={"https://drive.google.your-file-name"} />

            <FileBox register={register} name="file" label="Certificate" required />
          </div>

          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              className={`px-6 py-3 text-white font-semibold text-base rounded-md shadow transition ${editingId ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
              {editingId ? 'Update' : 'Submit'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-6 py-3 bg-gray-400 text-white font-semibold text-base rounded-md shadow hover:bg-gray-500 transition"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>
      <StudentTable
        data={data}
        onDelete={handleDelete}
        onDeleteSelected={handleDeleteSelected}
        onEdit={handleEdit}
        selectedRows={selectedRows}
        onRowSelected={handleRowSelected}
        toggleCleared={toggleCleared}
      />
    </div>
  );
}

export default AddStudentData;
