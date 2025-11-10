import React from "react";
import InputBox from "../../components/InputBox";
import SelectBox from "../../components/SelectBox";
import CalenderBox from "../../components/CalenderBox";
import FileBox from "../../components/FileBox";
import DynamicSelectBox from "../../components/DynamicSelectBox";
import UploadForm from "../../components/UploadForm";
import Button from "../../components/Button";
import { API_STUDENT_FILE_UPLOAD } from "../../../config/config";

const genderOptions = ["Male", "Female", "Other"];
const categoryOptions = ["General", "OBC", "SC", "ST", "Other"];
const statusOptions = ["Pursuing", "Graduated"];
const courseOptions = ["B.Tech", "M.Tech", "B.Sc", "M.Sc", "MBA"]; // Add more as needed

const StudentForm = ({ onSubmit, register, handleSubmit, reset }) => {

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-2">
          Student Profile Form
        </h2>
        <UploadForm url={`${API_STUDENT_FILE_UPLOAD}/profile`} />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputBox label="ID" name="studentId" register={register} required />
          <InputBox label="Name" name="name" register={register} required />
          <InputBox label="Enrollment Number" name="enrollmentNumber" register={register} required />
          <InputBox label="Branch" name="branch" register={register} required />
          <InputBox label="Batch" name="batch" register={register} />
          <InputBox label="Email" name="email" register={register} required />
          <InputBox label="Year" name="year" register={register} required />
          <SelectBox label="Course" name="course" options={courseOptions} register={register} required />
          <InputBox label="CGPA" name="cgpa" register={register} />
          <CalenderBox label="Date of Birth" name="dateOfBirth" register={register} />
          <SelectBox label="Gender" name="gender" options={genderOptions} register={register} />
          <SelectBox label="Category" name="category" options={categoryOptions} register={register} />
          <InputBox label="Year of Admission" name="yearOfAdmission" register={register} />
          <InputBox label="Year of Graduation" name="yearOfGraduationStatus" register={register} />
          <SelectBox label="Status" name="status" options={statusOptions} register={register} />
          <InputBox label="GitHub Link" name="githubLink" register={register} />
          <InputBox label="LinkedIn Profile Link" name="linkedinLink" register={register} />
          <InputBox label="Parent/Guardian Contact No" name="guardianContactNumber" register={register} />
          <InputBox label="Parent/Guardian Name" name="guardianName" register={register} />
          <InputBox label="Address" name="address" register={register} />
          <FileBox register={register} name="file" label="Certificate" />
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold text-base rounded-md shadow hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
