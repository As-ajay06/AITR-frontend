import { useForm, FormProvider } from "react-hook-form";
import CalenderBox from "../../components/CalenderBox";
import InputBox from "../../components/InputBox";
import DynamicUserFields from "../../components/DynamicFieldsForm";
import UploadForm from "../../components/UploadForm";

const StudentHackathonForm = ({ onSubmit }) => {
  const methods = useForm({
    defaultValues: {
      hackathonName: "",
      organiser: "",
      teamDetails: [{ memberName: "", role: "" }], // 👈 default subform array
    },
  });

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-2">
          Student Hackathons Form
        </h2>
        <UploadForm url={"addHackathonData"} />
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputBox label="Hackathon Name" name="hackathonName" register={methods.register} />
            <InputBox label="Organiser" name="organizer" register={methods.register} />

            {/* 👇 Subform for team details */}
            <DynamicUserFields label="Team Details" fieldName={"Member Name"} role={"role"} name="teamDetails" />

            <InputBox label="Result" name="result" register={methods.register} />
            <CalenderBox label="Event Date" name="eventDate" register={methods.register} />
            <InputBox label="Team Name" name="teamName" register={methods.register} />
            <InputBox label="Team Size" name="teamSize" register={methods.register} />
            <InputBox label="Mentor Name" name="mentorName" register={methods.register} />
            <InputBox label="Venue" name="venue" register={methods.register} />
            <InputBox label="Problem Statement" name="problemStatement" register={methods.register} />
            <DynamicUserFields label="Technology Used" name="technologyUsed" fieldName={"Technologies"} register={methods.register} />
            <InputBox label="Prize Money" name="prizeMoney" register={methods.register} />
            <InputBox label="Position Secured" name="positionSecured" register={methods.register} />
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

export default StudentHackathonForm;
