
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
