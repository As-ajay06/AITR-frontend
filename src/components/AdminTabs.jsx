import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Accordion from "./Accordian";

const AdminTabs = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  const tabs = [
    { label: "Student" },
    { label: "Faculty" }, 
    { label: "Department" },
    { label: "Institute" },
  ];



  return (
    <nav className="mt-4 px-4">
      {/* Top Tabs */}
      <div className="flex flex-wrap justify-center gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 shadow">
        {tabs.map(({ label }) => (
          <button
            key={label}
            onClick={() => setTab(label)}
          >
            <div
              className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                tab === label
                  ? "bg-blue-600 text-white"
                  : "bg-white text-black hover:bg-blue-300"
              }`}
            >
              {label}
            </div>
          </button>
        ))}
      </div>

      {/* Accordions based on selected tab */}
      <div className="flex flex-wrap justify-center gap-3 mt-4">

        {tab === "Faculty" && (
          <Accordion isOpen={true}>
            <Link to="faculty-addfaculty">Add Profile</Link>
            <Link to="faculty-addawards">Awards and Recognitions</Link>
            <Link to="faculty-adddevlopmentprograms">Development Programs</Link>
            <Link to="faculty-addpatents">Patent Published</Link>
            <Link to="faculty-patentsgranted">Patent Granted</Link>
            <Link to="faculty-professional-certificate">Professional Certificate</Link>
            <Link to="faculty-academic-qualification-discipline">Academic Qualification</Link>
            <Link to="faculty-phD-supervision">PhD Supervision</Link>
            <Link to="faculty-membership-professional-bodies">Professional Bodies</Link>
            <Link to="faculty-research-projects-guided">Research Projects</Link>
            <Link to="faculty-invited-talks">Invited Talks</Link>
            <Link to="faculty-books-chapterd-authored">Books/Chapters</Link>
          </Accordion>
        )}

        {tab === "Student" && (
          <Accordion label="Student" isOpen={true}>
            <Link to="/admin/addstudents">Profile</Link>
            <Link to="/admin/addstudentcertificates">Certification</Link>
            <Link to="/admin/addhackathons">Hackathons</Link>
            <Link to="/admin/addplacements">Placement</Link>
            <Link to="/admin/addinternships">Internship</Link>
            <Link to="/admin/addstudentresearchs">Research Paper</Link>
            <Link to="/admin/addsports">Sports</Link>
            <Link to="/admin/extracurricular">Extra Curricular</Link>
            <Link to="/admin/capstone-projects">Capstone Projects</Link>
            <Link to="/admin/startups">Startups</Link>
            <Link to="/admin/technical-nontechnical">Technical/Non-Technical</Link>
            <Link to="/admin/higher-studies">Higher Studies</Link>
            <Link to="/admin/professional-membership">Professional Membership</Link>
          </Accordion>
        )}

        {tab === "Institute" && (
          <Accordion label="Institute" isOpen={true}>
            <Link to="/admin/addinstitue-mous">MoU</Link>
            <Link to="/admin/addinstitute-counsultancy">Consultancy</Link>
            <Link to="/admin/addinstitute-eventgrant">Event Grant</Link>
            <Link to="/admin/addinstitute-documents">Institute Documents</Link>
            <Link to="/admin/addinstitute-r&dforms">R&D Forms</Link>
            <Link to="/admin/addinstitute-eventorganized">Event Organized</Link>
          </Accordion>
        )}

        {tab === "Department" && (
          <Accordion label="Department" isOpen={true}>
            <Link to="/admin/addmou">MoUs</Link>
            <Link to="/admin/addconsultancy-project">Consultancy Projects</Link>
            <Link to="/admin/addrd-inititatives">R&D Initiatives</Link>
            <Link to="/admin/addevent-grant-received">Event Grants Received</Link>
          </Accordion>
        )}
      </div>
    </nav>
  );
};

export default AdminTabs;


