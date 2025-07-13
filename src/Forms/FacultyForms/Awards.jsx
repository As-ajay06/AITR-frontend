import React from "react";
import { useForm } from "react-hook-form";
import InputBox from "../../components/InputBox";
import CalenderBox from "../../components/CalenderBox";
import FileBox from "../../components/FileBox";
import SelectBox from "../../components/SelectBox";


const AwardForm = ({register, handleSubmit, reset , onSubmit}) => {

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Faculty Award Submission Form
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" >
        <InputBox label="id" name={"recipientId"} register={register} required />
        <InputBox label="recipient_Name" name={"recipientName"} register={register} required />
        <SelectBox label="department" name={"department"} options={["Mechanical", "CS", "Civil"]} register={register} required />
        <InputBox label="award_Name" name={"awardName"} register={register} required />
        <InputBox label="issuing Organization" name="issuingOrganization" register={register} required />
        <CalenderBox label="date" name={"date"} register={register} required />
        <InputBox label="category" name={"category"} register={register} required />
        <InputBox label="event_Name" name={"eventName"} register={register} required />
        <InputBox label="description" name={"description"} register={register} required />
        <FileBox label="certificate_Pdf" name={"file"} register={register} />
        <InputBox label="title_Of_Award" name={"titleOfAward"} register={register} required />
        
        <SelectBox
          label="level"
          name={"level"}
          register={register}
          required
          options={["Institute", "State", "National", "International"]}
        />
      <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-semibold text-base rounded-md shadow hover:bg-blue-700 transition">
        Submit
      </button>
    </div>
    </form>
    </div>
    
  );
};

export default AwardForm;
