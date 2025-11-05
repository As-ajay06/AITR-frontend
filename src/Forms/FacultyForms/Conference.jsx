import React from "react";
import { useForm } from "react-hook-form";
import InputBox from "../../components/InputBox";
import FileBox from "../../components/FileBox";
import SelectBox from "../../components/SelectBox";
import CalenderBox from "../../components/CalenderBox";
import UploadForm from "../../components/UploadForm";


const conferenceTypes = ["National", "International"];
const modes = ["Online", "Offline", "Hybrid"];
const publicationStatuses = ["Published", "Accepted", "Submitted"];
const indexingOptions = ["SCI", "Scopus", "UGC", "None"];

const FacultyConferenceForm = () => {
  const { register, handleSubmit, reset } = useForm();
  // todo: complete this
  const onSubmit = (data) => {
    console.log("Conference Form Submitted:", data);
    reset();
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-2">
          Faculty Conference Form
        </h2>
        <UploadForm url={"addConferenceData"} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <InputBox label="faculty_Name" register={register} required />
          <InputBox label="conference_Name" register={register} required />
          <InputBox label="paper_Title" register={register} required />
          <CalenderBox label="presentation_Date" register={register} />
          <SelectBox label="conference_Type" options={conferenceTypes} register={register} />
          <InputBox label="conference_Location" register={register} />
          <SelectBox label="conference_Mode" options={modes} register={register} />
          <SelectBox label="publication_Status" options={publicationStatuses} register={register} />
          <InputBox label="journal_Name" register={register} />
          <InputBox label="issue_Number" register={register} />
          <SelectBox label="indexing" options={indexingOptions} register={register} />
          <FileBox label="certificatePdf" register={register} />

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

export default FacultyConferenceForm;
