import React from "react";
import FileBox from "../../components/FileBox";
import InputBox from "../../components/InputBox";
import SelectBox from "../../components/SelectBox";
import CalenderBox from "../../components/CalenderBox";
import DynamicUserFields from "../../components/DynamicFieldsForm";
import { FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";

const statusOptions = ["Filed", "Published", "Granted", "Expired"];
const patentTypes = ["Utility", "Design", "Plant"];
const patentCategories = ["National", "International"];

const FacultyPatentForm = ({ register, handleSubmit, reset, onSubmit } ) => {

  const methods = useForm({
        defaultValues: {
          inventors: [{ memberName: "", role: "" }], // 👈 default subform array
        },
      });

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Faculty Patent Published Form
      </h2>
      <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InputBox label="ID" register={methods.register} name="facultyId" required />
        <InputBox label="Faculty Name" register={methods.register} name="facultyName" required />
        <InputBox label="Department" register={methods.register} name="department" required />
        <InputBox label="Title" register={methods.register} name="title" required />
        <InputBox label="Applicant" register={methods.register} name="applicant" required />
        <InputBox label="Application Number" register={methods.register} name="applicationNumber" required />
        <CalenderBox label="Application Date" register={methods.register} name="applicationDate" />
        <SelectBox label="Status" options={statusOptions} register={methods.register} name="status" />
        <DynamicUserFields label="Co-Inventors" register={methods.register} name="coInventors" />
        <InputBox label="Country" register={methods.register} name="country" />
        <InputBox label="Category" register={methods.register} name="category" />
        <FileBox label="Certificate PDF" register={methods.register} name="file" />
        <InputBox label="Patent Title" register={methods.register} name="patentTitle" required />
        <DynamicUserFields label="Inventors" register={methods.register} name="inventors" required />
        <CalenderBox label="Publication Date" register={methods.register} name="publicationDate" />
        <InputBox label="Abstract" register={methods.register} name="abstract" multiline />
      </div>
      <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
      </button>
    </form>
    </FormProvider>
    </div>
  );
};

export default FacultyPatentForm;
