import InputBox from "../../components/InputBox";
import SelectBox from "../../components/SelectBox";
import FileBox from "../../components/FileBox";
import CalenderBox from "../../components/CalenderBox";
import UploadForm from "../../components/UploadForm";
import { API_STUDENT_FILE_UPLOAD } from "../../../config/config";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../components/dashboardUI/Dashboard";

const validityOptions = ["6 Months", "1 Year", "2 Years", "Lifetime"];
const modesOfLearning = ["Online", "Offline", "Hybrid"];
const relevanceOptions = ["Highly Relevant", "Somewhat Relevant", "Not Relevant"];

const StudentCertificateForm = ({ handleSubmit, onSubmit, register, reset }) => {
  const auth = useContext(AuthContext);

  if (!auth || !auth.user) {
    return null;
  }

  const isAdmin = localStorage.getItem('role') == 'admin';
  const adminBranch = auth?.user.department;

  useEffect(() => {
    console.log('this is auth data', auth)
    if (isAdmin && adminBranch) {
      register("branch");
      console.log('branch default value', adminBranch)
    }
  }, [isAdmin, adminBranch, register])



  const branchOptions = ['cse', 'aiml']

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-2">
          Student Certificate Form
        </h2>
        <UploadForm url={`${API_STUDENT_FILE_UPLOAD}/certification`} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <InputBox label="Certificate ID" name="certificateId" register={register} required />
          <InputBox label="Student Name" name="studentName" register={register} required />
          <InputBox label="Enrollment Number" name="enrollmentNumber" register={register} required />
          {isAdmin ? (
            <div className="flex flex-col mb-6 w-full">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Branch
              </label>

              <input
                type="text"
                value={adminBranch}
                disabled
                className="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
              />

              {/* Hidden field so value is submitted */}
              <input
                type="hidden"
                name="branch"
                value={adminBranch}
                {...register("branch")}
              />
            </div>

          ) : (
            <SelectBox
              label="Branch"
              name="branch"
              register={register}
              options={branchOptions}
              required
            />
          )}
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
          <FileBox label="Certificate PDF" name="file" register={register} />

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
