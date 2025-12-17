import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputBox from "../../components/InputBox";
import FileBox from "../../components/FileBox";
import StudentResearchPaper from "../../table/StudentResearchPaper";
import CalenderBox from "../../components/CalenderBox";
import UploadForm from "../../components/UploadForm";
import { API_STUDENT_FILE_UPLOAD } from "../../../config/config";
import DynamicUserFields from "../../components/DynamicFieldsForm";

const ResearchForm = ({ onSubmit }) => {
  const methods = useForm({
    defaultValues: {
      facultyName: "",
      facultyId: "",
      coAuthors: [{ memberName: "", role: "" }], // 👈 default subform array
    },
  });

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-2">
          Student Research Form
        </h2>
        <UploadForm url={`${API_STUDENT_FILE_UPLOAD}/research_paper`} />
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputBox label="Student Id" name="studentId" register={methods.register} required />
            <InputBox label="Student Name" name="studentName" register={methods.register} required />
            <InputBox label="Enrollment Number" name="enrollmentNumber" register={methods.register} required />
            <InputBox label="Branch" name="branch" register={methods.register} required />
            <InputBox label="Batch" name="batch" register={methods.register} required />
            <InputBox label="DOI / ISBN" name="doiOrIsbn" register={methods.register} />
            <InputBox label="Title of Paper" name="titleOfPaper" register={methods.register} required />
            <CalenderBox label="Publication Date" name="publicationDate" register={methods.register} required />
            <InputBox label="Journal / Conference Name" name="journalOrConferenceName" register={methods.register} required />
            <DynamicUserFields label="Co-Authors" fieldName={"Faculty Name"} role={"Faculty Id"} name="coAuthors" />
            <InputBox label="Indexing (Scopus, SCI, etc.)" name="indexing" register={methods.register} />
            <FileBox label="Paper PDF" name="file" register={methods.register} />
            <InputBox label="Faculty Guide" name="facultyGuide" register={methods.register} />
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
      <div>
      </div>
    </div>
  );
};

export default ResearchForm;
