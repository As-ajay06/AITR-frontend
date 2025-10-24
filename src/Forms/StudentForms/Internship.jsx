import React from "react";
import FileBox from "../../components/FileBox";
import SelectBox from "../../components/SelectBox";
import CalenderBox from "../../components/CalenderBox";
import InputBox from "../../components/InputBox";
import DynamicUserFields from "../../components/DynamicFieldsForm";
import { FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";

const internshipModes = ["Online", "Offline", "Hybrid"];
const stipends = ["Unpaid", "₹5,000", "₹10,000", "₹20,000"];
const branches = ["CSE", "IT", "ECE", "Mechanical"];
const technologies = ["React", "Node.js", "MongoDB", "Python", "Java"];
const companyLocations = ["Delhi", "Bangalore", "Remote"];
const internshipStatuses = ["Completed", "Ongoing", "Dropped"];

const StudentInternshipForm = ({ register, handleSubmit, reset, onSubmit }) => {

  const methods = useForm({
    defaultValues: {
      hackathonName: "",
      organiser: "",
      teamDetails: [{ memberName: "", role: "" }], // 👈 default subform array
    },
  });


  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Student Internship Form
      </h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputBox label="ID" name="internshipId" register={methods.register} required />
            <InputBox label="Student Name" name="studentName" register={methods.register} required />
            <InputBox label="Enrollment Number" name="enrollmentNumber" register={methods.register} required />
            <SelectBox label="Branch" name="branch" options={branches} register={methods.register} />
            <InputBox label="Batch" name="batch" register={methods.register} />
            <InputBox label="Year" name="year" register={methods.register} />
            <InputBox label="Company Name" name="companyName" register={methods.register} required />
            <InputBox label="Internship Role" name="internshipRole" register={methods.register} />
            <SelectBox label="Mode of Internship" name="internshipMode" options={internshipModes} register={methods.register} />
            <SelectBox label="Stipend" name="stipend" options={stipends} register={methods.register} />
            <CalenderBox label="Start Date" name="startDate" register={methods.register} />
            <CalenderBox label="End Date" name="endDate" register={methods.register} />
            <InputBox label="Project Name" name="projectName" register={methods.register} />
            <InputBox label="Project Description" name="projectDescription" register={methods.register} />
            <SelectBox label="Company Location" name="companyLocation" options={companyLocations} register={methods.register} />
            <InputBox label="Area of Work" name="areaOfWork" register={methods.register} />
            <FileBox label="Certificate / Report Upload" name="certificatePdf" register={methods.register} />
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

export default StudentInternshipForm;
