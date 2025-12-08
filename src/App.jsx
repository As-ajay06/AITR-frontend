import { useState } from "react";
import "./App.css";

import { BrowserRouter, useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from "./components/Layout";

// Create a QueryClient instance with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh
      cacheTime: 10 * 60 * 1000, // 10 minutes - cache duration
      refetchOnWindowFocus: false, // Don't refetch on window focus
      refetchOnMount: false, // Don't refetch if data exists in cache
      retry: 1, // Retry failed requests once
    },
  },
});

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
import ProfilePage from "./pages/ProfilePage";

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
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import UpdateProfile from "./pages/UpdateProfile";
import SuperAdmin from "./pages/SuperAdmin";
import SuperAdminNavbar from "./components/SuperAdminNavbar";
import AddProfile from "./pages/AddProfile";
import FacultyProfile from "./components/FacultyProfile";
import ProtectedRoute from "./routes/ProtectedRoutes";
import PublicRoute from "./routes/PublicRoutes";
import StudentProfile from "./components/StudentProfile";



function AppContent() {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50">
        {!hideNavbar && <SuperAdminNavbar />}
        <div className={hideNavbar ? "" : "p-4 lg:p-6"}>
              <Routes>
          <Route path={`faculty/profile/:id`} element={<FacultyProfile />} />
          <Route path={`student/profile/:id`} element={<StudentProfile />} />
          {/* super admin Routes */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          <Route path="/update_profile" element={<UpdateProfile />} />

          <Route path="/add_profile" element={<AddProfile />} /> 

          {/* super admin routes */}
          <Route path="/user/:id" element={<ProfilePage />} />

          <Route path="/super_admin" element={<SuperAdmin />} >
          </Route>

          <Route path="/*" element={
            <ProtectedRoute>
              <Routes>
                <Route index element={<HomePage />} />
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
        </Routes>
        </ProtectedRoute>
        }
        />


        <Route path='*' element={<NotFound404 />} />
              </Routes>
            </div>
          </div>
        </Layout>
  );
}

function App() {
  // todo: add some class name for to fix some notification bar
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App;
