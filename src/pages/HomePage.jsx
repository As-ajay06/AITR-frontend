import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { FcDepartment } from "react-icons/fc";
import { FcBusiness } from "react-icons/fc";
import { PiStudentDuotone } from "react-icons/pi";
import { BiSolidInstitution } from "react-icons/bi";

function HomePage() {
  return (
<<<<<<< Updated upstream
    <div className="homepage min-h-screen bg-[#002147] overflow-hidden">
      <div className="flex flex-col text-white  items-center justify-center ">
      <h1 className="text-3xl font-bold pt-16">Categories</h1>
      <p className="w-1/2 text-center pt-3 font-semibold">
        Discourse assurance estimable applauded to so. Him everything melancholy
        uncommonly but solicitude inhabiting projection off. Connection
        stimulated estimating excellence an to impression.
      </p></div>
      <div className="flex mt-24  gap-16  justify-center items-center">                
        <Card children={<PiStudentDuotone />} title={"Student"} link="/student"/>
        <Card children={<FcBusiness />} title={"Faculty"} link="/faculty"/>
        <Card  children={<FcDepartment />} title={"Department"} link="/department"/>
        <Card children={<BiSolidInstitution />} title={"Institute"} link="/institute"/>
=======
  <div className="homepage min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#3b82f6] overflow-hidden text-white">

      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold pt-16 tracking-tight bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
          Explore Categories
        </h1>
        <p className="w-full max-w-2xl pt-3 font-medium text-gray-300">
          Navigate through essential sections of the university management
          system. Access and manage data for students, faculty, departments, and institutes
          — all in one elegant dashboard.
        </p>
>>>>>>> Stashed changes
      </div>
    </div>
  );
}

export default HomePage;
