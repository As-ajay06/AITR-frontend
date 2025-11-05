import React from "react";
import { useForm } from "react-hook-form";
import InputBox from "../../components/InputBox";
import SelectBox from "../../components/SelectBox";
import CalenderBox from "../../components/CalenderBox";
import FileBox from "../../components/FileBox";
import UploadForm from "../../components/UploadForm";

const eventNames = [
  "Annual Sports Meet",
  "District Championship",
  "State Tournament",
  "National Games"
];
const eventLevels = ["School", "District", "State", "National"];
const eventLocations = ["Delhi", "Mumbai", "Chennai", "Kolkata"];
const positions = ["1st", "2nd", "3rd", "Participation"];

const SportForm = ( {register, handleSubmit, reset, onSubmit } ) => {

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
       <div className="flex justify-between">
         <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-2">
           Student Sports Form
         </h2>
         <UploadForm url={"addSportsData"} />
       </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InputBox label="ID" name="sportsEventId" register={register} required />
          <InputBox label="Student Name" name="studentName" register={register} required />
          <InputBox label="Enrollment Number" name="enrollmentNumber" register={register} required />
          <InputBox label="Branch" name="branch" register={register} required />
          <InputBox label="Batch" name="batch" register={register} required />
          <InputBox label="Year" name="year" register={register} required />
          <InputBox label="Sports Name" name="sportsName" register={register} required />
          <CalenderBox label="Event Date" name="eventDate" register={register} />
          <SelectBox label="Event Name" name="eventName" options={eventNames} register={register} />
          <SelectBox label="Event Level" name="eventLevel" options={eventLevels} register={register} />
          <SelectBox label="Event Location" name="eventLocation" options={eventLocations} register={register} />
          <SelectBox label="Position" name="position" options={positions} register={register} />
          <InputBox label="Organizer" name="organizer" register={register} />
          <InputBox label="Coach Name" name="coachName" register={register} required />
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

export default SportForm;
