import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputBox from '../../components/InputBox'
import SelectBox from '../../components/SelectBox'
import UploadForm from '../../components/UploadForm'
import { API_FACULTY_FILE_UPLOAD } from '../../../config/config'


function FacultyForm({ register, handleSubmit, reset, onSubmit }) {

  const departments = ["Computer Science", "Mechanical", "Electrical", "Civil"];
  const experienceYears = ["0-1", "2-4", "5-7", "8+"];
  const designations = ["Assistant Professor", "Associate Professor", "Professor"];


  return (
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
          <InputBox label="facultyId" name="facultyId" register={register} required />
          <InputBox label="name" name="name" register={register} required />
          <InputBox label="email" name="email" register={register} required type="email" />
          <InputBox label="Highest qualification" name="highestQualification" register={register} required />
          <SelectBox label="department" name={"department"} options={departments} register={register} />
          <InputBox label="mobile_Number" name={"mobileNumber"} register={register} required type="tel" />
          <InputBox label="category" name={"category"} register={register} required />
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
  );
};

export default FacultyForm;



