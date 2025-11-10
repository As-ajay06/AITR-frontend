import React from "react";
import { useForm } from "react-hook-form";
import InputBox from "../../components/InputBox";
import CalenderBox from "../../components/CalenderBox";
import SelectBox from "../../components/SelectBox";
import FileBox from "../../components/FileBox";
import UploadForm from "../../components/UploadForm";
import { API_STUDENT_FILE_UPLOAD } from "../../../config/config";

const eventLevels = ["Institute", "District", "State", "National", "International"];
const eventLocations = ["Delhi", "Mumbai", "Indore", "Bangalore"];
const positions = ["1st", "2nd", "3rd", "Participation"];

const ExtraCurricularForm = ({ onSubmit, register, handleSubmit, reset }) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
            <div className="flex justify-between">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-2">
                Student Research Form
              </h2>
              <UploadForm url={`${API_STUDENT_FILE_UPLOAD}/extra_curricular`} />
            </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InputBox label="Event participation ID" name="eventParticipationId" register={register} required />
          <InputBox label="student_name" name="studentName" register={register} required />
          <InputBox label="enrollment_number" name="enrollmentNumber" register={register} required />
          <InputBox label="branch" name="branch" register={register} required />
          <InputBox label="batch" name="batch" register={register} required />
          <InputBox label="year" name="year" register={register} required />
          <InputBox label="event_name" name="eventName" register={register} required />
          <CalenderBox label="event_date" name="eventDate" register={register} />
          <SelectBox label="event_level" name="eventLevel" options={eventLevels} register={register} />
          <SelectBox label="event_location" name="eventLocation" options={eventLocations} register={register} />
          <SelectBox label="position" name="position" options={positions} register={register} />
          <InputBox label="organizer" name="organizer" register={register} />
          <InputBox label="coach_name" name="coachName" register={register} />
          <FileBox label="certificate_pdf" name="certificatePdf" register={register} />
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

export default ExtraCurricularForm;
