import React from "react";
import { useForm } from "react-hook-form";
import InputBox from "../../components/InputBox";
import SelectBox from "../../components/SelectBox";
import FileBox from "../../components/FileBox";
import CalenderBox from "../../components/CalenderBox";

const validityOptions = ["6 Months", "1 Year", "2 Years", "Lifetime"];
const modesOfLearning = ["Online", "Offline", "Hybrid"];
const relevanceOptions = ["Highly Relevant", "Somewhat Relevant", "Not Relevant"];

const StudentCertificateForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Certificate Data Submitted:", data);
    reset();
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Student Certificate Submission
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <InputBox label="ID" name="certificateId" register={register} required />
          <InputBox label="Student Name" name="studentName" register={register} required />
          <InputBox label="Enrollment Number" name="enrollmentNumber" register={register} required />
          <InputBox label="Branch" name="branch" register={register} required />
          <InputBox label="Batch" name="batch" register={register} />
          <InputBox label="Year" name="year" register={register} />
          <InputBox label="Course Name" name="courseName" register={register} />
          <InputBox label="Issuing Organization" name="issuingOrganization" register={register} />
          <CalenderBox label="Issue Date" name="issueDate" register={register} />
          <SelectBox label="Validity Period" name="validityPeriod" options={validityOptions} register={register} />
          <InputBox label="Grade or Score" name="gradeOrScore" register={register} />
          <InputBox label="Certificate Description" name="certificateDescription" register={register} />
          <SelectBox label="Mode of Learning" name="modeOfLearning" options={modesOfLearning} register={register} />
          <InputBox label="Course Duration" name="courseDuration" register={register} />
          <InputBox label="Rank / Position" name="rankOrPosition" register={register} />
          <SelectBox label="Relevance to Program / Branch" name="relevance" options={relevanceOptions} register={register} />
          <FileBox label="Certificate PDF" name="certificatePdf" register={register} />

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

export default StudentCertificateForm;
