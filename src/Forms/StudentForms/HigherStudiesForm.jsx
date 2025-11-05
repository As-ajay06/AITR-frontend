import React from 'react';
import { useForm } from 'react-hook-form';
import InputBox from '../../components/InputBox';
import CalenderBox from '../../components/CalenderBox';
import UploadForm from '../../components/UploadForm';

const HigherStudies = ({ register, handleSubmit, reset, onSubmit }) => {


  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-2">
          Student Higher Studies Form
        </h2>
        <UploadForm url={"addHigherStudiesData"} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputBox label="Student Name" name="studentName" register={register} required />
          <InputBox label="Enrollment Number" name="enrollmentNumber" register={register} required />
          <InputBox label="Name of the Course" name="courseName" register={register} required />
          <InputBox label="Scholarship (if any)" name="scholarship" register={register} />
          <InputBox label="Institute Name" name="instituteName" register={register} required />
          <InputBox label="City" name="city" register={register} />
          <InputBox label="Country" name="country" register={register} />
          <InputBox label="Duration of Program (in months)" name="duration" register={register} />
          <InputBox label="Admission Year" name="admissionYear" register={register} />
          <CalenderBox label="Date of Admission" name="admissionDate" register={register} />
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

export default HigherStudies;
