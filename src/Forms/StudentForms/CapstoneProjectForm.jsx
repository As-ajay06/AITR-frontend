import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputBox from "../../components/InputBox";
import SelectBox from "../../components/SelectBox";
import FileBox from "../../components/FileBox";
import DynamicUserFields from "../../components/DynamicFieldsForm";

const outcomes = ["Prototype", "Patent", "Paper"];

const CapstoneProjectForm = ({ onSubmit, register, handleSubmit, reset }) => {

    const methods = useForm({
      defaultValues: {
        teamDetails: [{ memberName: "", role: "" }], // 👈 default subform array
      },
    });

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Capstone Project Submission Form
      </h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputBox label="Project Title" name="projectTitle" register={methods.register} required />
            <DynamicUserFields label="Team Members" name="teamMembers" register={methods.register} />
            <InputBox label="Guide Name" name="guideName" register={methods.register} required />
            <InputBox label="Semester" name="semester" register={methods.register} required />
            <InputBox label="Industry Mentor" name="industryMentor" register={methods.register} placeholder="If any" />
            <FileBox label="Project Report (PDF)" name="projectPdf" register={methods.register} />
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
      </FormProvider>
    </div>
  );
};

export default CapstoneProjectForm;
