import React from "react";
import { useForm } from "react-hook-form";
import InputBox from "../../components/InputBox";
import SelectBox from "../../components/SelectBox";
import UploadForm from "../../components/UploadForm";

const statusOptions = ["Idea", "Prototype", "Registered"];

const StartupForm = ({ onSubmit, register, handleSubmit, reset }) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-2">
          Student Startups Form
        </h2>
        <UploadForm url={"addStartupsData"} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputBox label="Startup Name" name="startupName" register={register} required />
          <InputBox label="Domain" name="domain" register={register} required />
          <InputBox label="Incubation Support" name="incubationSupport" register={register} placeholder="If any" />
          <SelectBox label="Current Status" name="currentStatus" options={statusOptions} register={register} />
          <InputBox label="Website or Link" name="websiteOrLink" register={register} placeholder="https://example.com" />
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

export default StartupForm;
