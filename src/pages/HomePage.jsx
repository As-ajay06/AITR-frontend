import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { PiGraduationCapDuotone } from "react-icons/pi";
import { MdOutlineSchool } from "react-icons/md";
import { LuLayoutGrid } from "react-icons/lu";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    studentCount: 0,
    facultyCount: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [studentRes, facultyRes] = await Promise.all([
          fetch("http://localhost:5000/api/students/count"),
          fetch("http://localhost:5000/api/faculty/count"),
        ]);

        const studentData = await studentRes.json();
        const facultyData = await facultyRes.json();

        setStats({
          studentCount: studentData.count || 0,
          facultyCount: facultyData.count || 0,
        });
      } catch (err) {
        console.error("Error fetching counts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
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
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-gray-200">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 font-semibold text-lg">Loading data...</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-10 mt-20 justify-center items-center transition-opacity duration-700">
          {/* Student */}
          <Card
            children={
              <div className="p-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                <PiGraduationCapDuotone size={60} />
              </div>
            }
            title={`Student (${stats.studentCount})`}
            link="/student"
            className="hover:scale-105 transition-transform duration-300"
          />

          {/* Faculty */}
          <Card
            children={
              <div className="p-4 bg-gradient-to-br from-violet-400 to-indigo-500 rounded-2xl shadow-[0_0_25px_rgba(139,92,246,0.4)]">
                <MdOutlineSchool size={60} />
              </div>
            }
            title={`Faculty (${stats.facultyCount})`}
            link="/faculty"
            className="hover:scale-105 transition-transform duration-300"
          />

          {/* Department */}
          <Card
            children={
              <div className="p-4 bg-gradient-to-br from-pink-400 to-fuchsia-500 rounded-2xl shadow-[0_0_25px_rgba(236,72,153,0.4)]">
                <LuLayoutGrid size={60} />
              </div>
            }
            title="Department"
            link="/department"
            className="hover:scale-105 transition-transform duration-300"
          />

          {/* Institute */}
          <Card
            children={
              <div className="p-4 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                <HiOutlineBuildingLibrary size={60} />
              </div>
            }
            title="Institute"
            link="/institute"
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
    </div>
  );
}

export default HomePage;
