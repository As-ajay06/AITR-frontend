import { useState } from "react";
import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import PatentGrantedForm from "./Forms/FacultyForms/PatentGrantedForm";
import ProfessionalCertificationsEarned from "./Forms/FacultyForms/ProfessionalCertificationsEarned";
import AcademicQualificationForm from "./Forms/FacultyForms/AcedmicQualificationDiscipline";
import PhDSupervision from "./Forms/FacultyForms/PhDSupervision";
import MembershipProfessionalBodies from "./Forms/FacultyForms/MembershipProfessionalBodies";
import ResearchProjectsGuidedForm from "./Forms/FacultyForms/ResearchProjectsGuided";
import InvitedTalksForm from "./Forms/FacultyForms/InvitedTalks";
import BooksChapteresAuthored from "./Forms/FacultyForms/BooksChapteresAuthored";
import ResearchPaper from "./Forms/FacultyForms/ResearchPaper";

//institute forms

import Counsultancy from "./Forms/InstituteForms/Counsultancy";
import EventGrant from "./Forms/InstituteForms/EventGrant";
import RnDForms from "./Forms/InstituteForms/R&DForms";
import MouForm from "./Forms/InstituteForms/MousForm";
import InstituteDocumentForm from "./Forms/InstituteForms/InstituteDocuments";

// student forms import




import HomePage from "./pages/HomePage";
import Admin from "./pages/Admin";

import Navbar from './components/Navbar'
import NavbarHeader from './components/NavbarHeader'


import Accordian from './components/Accordian'

// Add in faculty tabs

import AddFaculty from "./AddDataForms/facultyData/FacultyData";
import AddConferenceData from './AddDataForms/facultyData/AddConferenceData'
import AddDevelopmentProgramData from './AddDataForms/facultyData/AddDevelopmentProgramData'
import AddFacultyResearchData from './AddDataForms/facultyData/AddFacultyResearchData'
import AddPatentData from "./AddDataForms/facultyData/AddPatentData";
import AddAwards from "./AddDataForms/facultyData/AwardsData";

import NotFound404 from './pages/NotFound404'

// Add in student tabs

import AddStudentData from "./AddDataForms/studentData/AddStudentData";
import AddTechnicalNonTechnicalCompetition from "./AddDataForms/studentData/AddTechnicalNonTechnicalCompetition";
import AddStudentCertificateData from './AddDataForms/studentData/AddStudentCertificateData'
import AddHackathonsData from './AddDataForms/studentData/AddHackathonsData'
import AddInternshipData from './AddDataForms/studentData/AddInternshipData'
import AddPlacementData from './AddDataForms/studentData/AddPlacementData'
import AddStudentResearchData from './AddDataForms/studentData/AddStudentResearchData'
import AddSportsData from './AddDataForms/studentData/AddSportsData'
import ExtraCurricular from './AddDataForms/studentData/AddExtraCurricular';
import CapstoneProjects from './AddDataForms/studentData/AddCapstoneProjects';
import Startups from './AddDataForms/studentData/AddStartups';
import HackathonsData from "./AddDataForms/studentData/AddHackathonsData";
import HigherStudies from "./AddDataForms/studentData/AddHigherStudies";
// import AddProfessionalMembership from './AddDataForms/AddProfessionalMembership';
import AddProfessionalMembership from "./AddDataForms/studentData/AddProfessionalMembership";

import TechnicalNonTechnicalCompetition from "./Forms/StudentForms/TechnicalNonTechnicalCompetition";

import Faculty from './pages/Faculty'
import Student from './pages/Student'
import Institute from './pages/Institute'
import Department from './pages/Department'
// import AddHigherStudies from "./AddDataForms/AddHigherStudies";
// import AddProfessionalMembership from "./AddDataForms/AddProfessionalMembership";

//Admin Department
import MOU from './Forms/Department/Mous'
import ConsultancyProject from "./Forms/Department/ConsultancyProject";
import RDInititatives from "./Forms/Department/RD_Inititatives";
import EventGrantReceived from "./Forms/Department/EventGrantReceived";
import EventOrganized from "./Forms/InstituteForms/EventOrganized";
import StudentTable from "./table/StudentTable";
import ExcelUploader from "./components/ExelUploader";
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
=======
>>>>>>> feat/file-uploading-route
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import UpdateProfile from "./pages/UpdateProfile";
import SuperAdmin from "./pages/SuperAdmin";
<<<<<<< HEAD

=======
import SuperAdminNavbar from "./components/SuperAdminNavbar";
import AddProfile from "./pages/AddProfile";

>>>>>>> Stashed changes
>>>>>>> feat/file-uploading-route


function App() {
  // todo: add some class name for to fix some notification bar
  return (

    <>
      <BrowserRouter>
<<<<<<< Updated upstream
        <NavbarHeader />
        <Routes>

<<<<<<< HEAD
=======
=======
        <SuperAdminNavbar />
        <Routes>

>>>>>>> feat/file-uploading-route
          {/* super admin Routes */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/update_profile" element={<UpdateProfile />} />

<<<<<<< HEAD
=======
          <Route path="/add_profile" element={<AddProfile />} />

>>>>>>> feat/file-uploading-route
          {/* super admin routes */}

          <Route path="/super_admin" element={<SuperAdmin />} >
            <Route path="faculty-addfaculty" element={<AddFaculty />} />
          </Route>





<<<<<<< HEAD
=======
>>>>>>> Stashed changes
>>>>>>> feat/file-uploading-route
          <Route path="/" element={<HomePage />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/student" element={<Student />} />
          <Route path="/institute" element={<Institute />} />
          <Route path="/department" element={<Department />} />


          <Route path="/admin" element={<Admin />} >
            {/* faculty Routes */}
            <Route path="faculty-addfaculty" element={<AddFaculty />} />
            <Route path="faculty-addawards" element={<AddAwards />} />
            <Route path="faculty-addconferences" element={<AddConferenceData />} />
            <Route path="faculty-adddevlopmentprograms" element={<AddDevelopmentProgramData />} />
            <Route path="faculty-addpatents" element={<AddPatentData />} />
            <Route path="faculty-patentsgranted" element={<PatentGrantedForm />} />
            <Route path="faculty-professional-certificate" element={<ProfessionalCertificationsEarned />} />
            <Route path="faculty-phD-supervision" element={<PhDSupervision />} />

          // problem with this form
            <Route path="faculty-research-projects-guided" element={<ResearchProjectsGuidedForm />} />


            <Route path="faculty-books-chapterd-authored" element={<BooksChapteresAuthored />} />
            <Route path="faculty-invited-talks" element={<InvitedTalksForm />} />
            <Route path="faculty-academic-qualification-discipline" element={<AcademicQualificationForm />} />
            <Route path="faculty-membership-professional-bodies" element={<MembershipProfessionalBodies />} />
            <Route path="faculty-research-paper-publication" element={<ResearchPaper />} />

            <Route path="addfacultyresearch" element={<AddFacultyResearchData />} />


            {/* student Routes */}
            <Route path="/admin/addstudents" element={<AddStudentData />} />
            <Route path="/admin/addstudentcertificates" element={<AddStudentCertificateData />} />
            <Route path="/admin/addhackathons" element={<AddHackathonsData />} />
            <Route path="/admin/addplacements" element={<AddPlacementData />} />
            <Route path="/admin/addinternships" element={<AddInternshipData />} />
            <Route path="/admin/addstudentresearchs" element={<AddStudentResearchData />} />
            <Route path="/admin/addsports" element={<AddSportsData />} />
            <Route path="/admin/extracurricular" element={<ExtraCurricular />} />
            <Route path="/admin/capstone-projects" element={<CapstoneProjects />} />
            <Route path="/admin/technical-nontechnical" element={<AddTechnicalNonTechnicalCompetition />} />
            <Route path="/admin/startups" element={<Startups />} />
            <Route path="/admin/hackathon-challenges" element={<HackathonsData />} />
            <Route path="/admin/higher-studies" element={<HigherStudies />} />
            <Route path="/admin/professional-membership" element={<AddProfessionalMembership />} />


            {/* Institute Routes */}
            <Route path="/admin/addinstitue-mous" element={<MouForm />} />
            <Route path="/admin/addinstitute-counsultancy" element={<Counsultancy />} />
            <Route path="/admin/addinstitute-eventgrant" element={<EventGrant />} />
            <Route path="/admin/addinstitute-documents" element={<InstituteDocumentForm />} />
            <Route path="/admin/addinstitute-r&dforms" element={<RnDForms />} />
            <Route path="/admin/addinstitute-eventorganized" element={<EventOrganized />} />

            {/* Department Routes */}
            <Route path='/admin/addmou' element={<MOU />} />
            <Route path="/admin/addconsultancy-project" element={<ConsultancyProject />} />
            <Route path="/admin/addrd-inititatives" element={<RDInititatives />} />
            <Route path="/admin/addevent-grant-received" element={<EventGrantReceived />} />
          </Route>
          <Route path='*' element={<NotFound404 />} />
        </Routes>

      </BrowserRouter>
    </>

  )
}

export default App;
