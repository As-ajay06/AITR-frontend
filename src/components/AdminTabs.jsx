import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Accordion from "./Accordian";
import { GraduationCap, Users, LayoutGrid, Building2, ChevronRight } from "lucide-react";

const AdminTabs = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  const tabs = [
    { label: "Student", icon: GraduationCap, color: "from-cyan-500 to-blue-500" },
    { label: "Faculty", icon: Users, color: "from-violet-500 to-indigo-500" }, 
    { label: "Department", icon: LayoutGrid, color: "from-pink-500 to-fuchsia-500" },
    { label: "Institute", icon: Building2, color: "from-emerald-500 to-teal-500" },
  ];

  return (
    <nav className="p-6">
      {/* Top Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {tabs.map(({ label, icon: Icon, color }) => (
          <button
            key={label}
            onClick={() => setTab(tab === label ? "" : label)}
            className="group"
          >
            <div
              className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 transform ${
                tab === label
                  ? `bg-gradient-to-r ${color} text-white shadow-lg scale-105`
                  : "bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 shadow-sm"
              }`}
            >
              <Icon className={`w-5 h-5 ${tab === label ? "text-white" : "text-slate-600"}`} />
              <span className="font-semibold">{label}</span>
              {tab === label && (
                <ChevronRight className="w-4 h-4 text-white" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Accordions based on selected tab */}
      <div className="mt-6">
        {tab === "Faculty" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <AdminLink to="faculty-addfaculty" label="Add Profile" />
            <AdminLink to="faculty-addawards" label="Awards and Recognitions" />
            <AdminLink to="faculty-adddevlopmentprograms" label="Development Programs" />
            <AdminLink to="faculty-addpatents" label="Patent Published" />
            <AdminLink to="faculty-patentsgranted" label="Patent Granted" />
            <AdminLink to="faculty-professional-certificate" label="Professional Certificate" />
            <AdminLink to="faculty-academic-qualification-discipline" label="Academic Qualification" />
            <AdminLink to="faculty-phD-supervision" label="PhD Supervision" />
            <AdminLink to="faculty-membership-professional-bodies" label="Professional Bodies" />
            <AdminLink to="faculty-research-projects-guided" label="Research Projects" />
            <AdminLink to="faculty-invited-talks" label="Invited Talks" />
            <AdminLink to="faculty-books-chapterd-authored" label="Books/Chapters" />
          </div>
        )}

        {tab === "Student" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <AdminLink to="/admin/addstudents" label="Profile" />
            <AdminLink to="/admin/addstudentcertificates" label="Certification" />
            <AdminLink to="/admin/addhackathons" label="Hackathons" />
            <AdminLink to="/admin/addplacements" label="Placement" />
            <AdminLink to="/admin/addinternships" label="Internship" />
            <AdminLink to="/admin/addstudentresearchs" label="Research Paper" />
            <AdminLink to="/admin/addsports" label="Sports" />
            <AdminLink to="/admin/extracurricular" label="Extra Curricular" />
            <AdminLink to="/admin/capstone-projects" label="Capstone Projects" />
            <AdminLink to="/admin/startups" label="Startups" />
            <AdminLink to="/admin/technical-nontechnical" label="Technical/Non-Technical" />
            <AdminLink to="/admin/higher-studies" label="Higher Studies" />
            <AdminLink to="/admin/professional-membership" label="Professional Membership" />
          </div>
        )}

        {tab === "Institute" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <AdminLink to="/admin/addinstitue-mous" label="MoU" />
            <AdminLink to="/admin/addinstitute-counsultancy" label="Consultancy" />
            <AdminLink to="/admin/addinstitute-eventgrant" label="Event Grant" />
            <AdminLink to="/admin/addinstitute-documents" label="Institute Documents" />
            <AdminLink to="/admin/addinstitute-r&dforms" label="R&D Forms" />
            <AdminLink to="/admin/addinstitute-eventorganized" label="Event Organized" />
          </div>
        )}

        {tab === "Department" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <AdminLink to="/admin/addmou" label="MoUs" />
            <AdminLink to="/admin/addconsultancy-project" label="Consultancy Projects" />
            <AdminLink to="/admin/addrd-inititatives" label="R&D Initiatives" />
            <AdminLink to="/admin/addevent-grant-received" label="Event Grants Received" />
          </div>
        )}

        {!tab && (
          <div className="text-center py-12 text-slate-400">
            <p className="text-lg">Select a category above to manage data</p>
          </div>
        )}
      </div>
    </nav>
  );
};

// Helper component for admin links
const AdminLink = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname.includes(to.split('/').pop());
  
  return (
    <Link
      to={to}
      className={`block p-4 rounded-lg border-2 transition-all duration-200 ${
        isActive
          ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-transparent shadow-lg transform scale-105"
          : "bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:shadow-md hover:bg-blue-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{label}</span>
        <ChevronRight className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
      </div>
    </Link>
  );
};

export default AdminTabs;

