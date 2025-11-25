import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useGetStudentProfile from '../hooks/useGetStudentProfile';

function StudentProfile() {
  // To display all of the faculty info for given params
  const { id } = useParams();
  console.log("here", id)
  const { data, loading, message } = useGetStudentProfile(id);
  console.log("loading", loading)
  console.log("data", data)
  useEffect(() => {
    if (data && !loading) {
      console.log("this", data);
    }


    return () => {
      console.log("cleaning up")
    }
  }, [loading])



  return (
    <div>
      { data && 
      <div>
          <div className="min-h-screen bg-zinc-200 flex justify-center p-10">
            < div className="bg-white shadow-md rounded-lg p-10 w-full min-w-5xl">
              < div className="min-h-screen bg-zinc-200 flex justify-center p-6 w-full" >
                <div className="bg-white border rounded-md p-6 w-full min-w-5xl">
                  <div className="flex items-center gap-6 mb-8">
                    <img
                      src="https://via.placeholder.com/120"
                      alt="Profile"
                      className="w-32 h-32 object-cover rounded-lg border"
                      />
                    <div className="mb-6 border-b pb-4">
                      <h1 className="text-2xl font-semibold text-gray-800">Faculty Report</h1>
                    </div>
                  </div>

                  {/* Basic Details */}
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Profile info</h2>
                    <p><strong>Name :</strong> {user.name}</p>
                    <p><strong>Enrollement number :</strong> {user.rollNo}</p>
                    <p><strong>Age :</strong> {user.age}</p>
                    <p><strong>Email :</strong> {user.email}</p>
                    <p><strong>Batch :</strong> {user.qualification}</p>
                    <p><strong>Branch :</strong> {user.qualification}</p>
                    <p><strong>Course :</strong> {user.qualification}</p>
                    <p><strong>CGPA :</strong> {user.qualification}</p>
                    <p><strong>Date of birth :</strong> {user.qualification}</p>
                    <p><strong>Gender:</strong> {user.qualification}</p>
                    <p><strong>Category :</strong> {user.name}</p>
                    <p><strong>Year of Admission :</strong> {user.rollNo}</p>
                    <p><strong>Year of Graduation :</strong> {user.age}</p>
                    <p><strong>Status :</strong> {user.email}</p>
                    <p><strong>Github link :</strong> {user.qualification}</p>
                    <p><strong>linkedin profile :</strong> {user.qualification}</p>
                    <p><strong>Parent/Gaurdian contact number :</strong> {user.qualification}</p>
                    <p><strong>Parent/Guardian Name :</strong> {user.qualification}</p>
                    <p><strong>Address :</strong> {user.qualification}</p>
                    <p><strong>certificate :</strong> {user.qualification}</p>
                  </div>

                  {/* Certificate */}
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Student Certificates Report</h2>
                    <p><strong>Course name :</strong> {user.name}</p>
                    <p><strong>Issuing organization :</strong> {user.rollNo}</p>
                    <p><strong>Issue Date :</strong> {user.rollNo}</p>
                    <p><strong>Validity Period :</strong> {user.rollNo}</p>
                    <p><strong>Grade or score :</strong> {user.rollNo}</p>
                    <p><strong>Certificate description :</strong> {user.rollNo}</p>
                    <p><strong>Mode of learning :</strong> {user.rollNo}</p>
                    <p><strong>Course duration :</strong> {user.rollNo}</p>
                    <p><strong>Rank/Position :</strong> {user.rollNo}</p>
                    <p><strong>Relevance to program/branch :</strong> {user.rollNo}</p>
                    <p><strong>certificate link :</strong> {user.rollNo}</p>
                  </div>

                  {/* Hackathon */}
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Hackathons</h2>
                    <p><strong>Hackathon Name :</strong> {user.name}</p>
                    <p><strong>Organiser :</strong> {user.rollNo}</p>
                    <p><strong>Team details :</strong> {user.age}</p>
                    <p><strong>Result :</strong> {user.email}</p>
                    <p><strong>Event Date :</strong> {user.qualification}</p>

                    <p><strong>Team name :</strong> {user.rollNo}</p>
                    <p><strong>Team size :</strong> {user.age}</p>
                    <p><strong>Mentor name :</strong> {user.email}</p>
                    <p><strong>Venue :</strong> {user.qualification}</p>
                    <p><strong>Problem statement :</strong> {user.rollNo}</p>
                    <p><strong>Technology used :</strong> {user.age}</p>
                    <p><strong>Prize money :</strong> {user.email}</p>
                    <p><strong>Position secured :</strong> {user.qualification}</p>
                  </div>

                  {/* Placement */}
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Placement</h2>
                    <p><strong>Company Name :</strong> {user.name}</p>
                    <p><strong>Company location :</strong> {user.rollNo}</p>
                    <p><strong>Role offered :</strong> {user.age}</p>
                    <p><strong>Branch :</strong> {user.email}</p>
                    <p><strong>Batch : </strong> {user.qualification}</p>
                    <p><strong>Year :</strong> {user.name}</p>
                    <p><strong>Placement type :</strong> {user.rollNo}</p>
                    <p><strong>Package :</strong> {user.age}</p>
                    <p><strong>Joining date :</strong> {user.email}</p>
                    <p><strong>Offer letter : </strong> {user.qualification}</p><p><strong>Company Name :</strong> {user.name}</p>
                  </div>

                  {/* Internship */}
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Patent Published</h2>
                    <p><strong>Branch :</strong> {user.name}</p>
                    <p><strong>Batch :</strong> {user.rollNo}</p>
                    <p><strong>Year :</strong> {user.age}</p>
                    <p><strong>Company name :</strong> {user.email}</p>
                    <p><strong>Internship role :</strong> {user.qualification}</p>
                    <p><strong>Mode of internship :</strong> {user.qualification}</p>
                    <p><strong>Stipend :</strong> {user.qualification}</p>
                    <p><strong>Start date :</strong> {user.qualification}</p>
                    <p><strong>End Date :</strong> {user.qualification}</p>
                    <p><strong>Company location :</strong> {user.qualification}</p>

                    <p><strong>Project description :</strong> {user.qualification}</p>
                    <p><strong>Project name :</strong> {user.qualification}</p>
                    <p><strong>Area of work :</strong> {user.qualification}</p>
                    <p><strong>certificate link :</strong> {user.qualification}</p>
                    {/* todo: I will stores the links of then showing their name here , when you click on that link you will be redirected to the person profile */}
                  </div>

                  {/* Reseach paper */}
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Student Reasearch data </h2>
                    <p><strong>Branch :</strong> {user.name}</p>
                    <p><strong>Batch :</strong> {user.rollNo}</p>
                    <p><strong>DOI/ISBN :</strong> {user.age}</p>
                    <p><strong>Title of paper :</strong> {user.email}</p>
                    <p><strong>Publication date :</strong> {user.name}</p>
                    <p><strong>Journal/Conference name :</strong> {user.rollNo}</p>
                    <p><strong>Co-authors :</strong> {user.age}</p>
                    <p><strong>Title of paper :</strong> {user.email}</p><p><strong>Branch :</strong> {user.name}</p>
                    <p><strong>Indexing :</strong> {user.rollNo}</p>
                    <p><strong>pdfs :</strong> {user.age}</p>
                    <p><strong>Faculty Guide :</strong> {user.email}</p>
                  </div>

                  {/* Event participation */}
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold mb-2">Event Participation</h2>

                    <p><strong>Event Participation ID:</strong> {user.eventId}</p>
                    <p><strong>Student Name:</strong> {user.studentName}</p>
                    <p><strong>Enrollment Number:</strong> {user.enrollmentNumber}</p>
                    <p><strong>Branch:</strong> {user.branch}</p>
                    <p><strong>Batch:</strong> {user.batch}</p>
                    <p><strong>Year:</strong> {user.year}</p>
                    <p><strong>Event Name:</strong> {user.eventName}</p>
                    <p><strong>Event Date:</strong> {user.eventDate}</p>
                    <p><strong>Event Level:</strong> {user.eventLevel}</p>
                    <p><strong>Event Location:</strong> {user.eventLocation}</p>
                    <p><strong>Position:</strong> {user.position}</p>
                    <p><strong>Organizer:</strong> {user.organizer}</p>
                    <p><strong>Coach Name:</strong> {user.coachName}</p>
                    <p><strong>Certificate PDF:</strong> {user.certificatePdf}</p>
                  </div>

                  {/* Studnet capstone */}
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold mb-2">Project/Capstone Details</h2>
                    <p><strong>Project Title:</strong> {user.projectTitle}</p>
                    <p><strong>Team Members:</strong> {user.teamMembers}</p>
                    <p><strong>Guide Name:</strong> {user.guideName}</p>
                    <p><strong>Semester:</strong> {user.semester}</p>
                    <p><strong>Industry Mentor:</strong> {user.industryMentor}</p>
                    <p><strong>Project Report (PDF):</strong> {user.projectReportPdf}</p>
                  </div>

                  {/* Startups */}
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold mb-2">Startup Details</h2>
                    <p><strong>Startup Name:</strong> {user.startupName}</p>
                    <p><strong>Domain:</strong> {user.domain}</p>
                    <p><strong>Incubation Support:</strong> {user.incubationSupport}</p>
                    <p><strong>Current Status:</strong> {user.currentStatus}</p>
                    <p><strong>Website or Link:</strong> {user.website}</p>
                  </div>

                  {/* Techinal non technical talks */}
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold mb-2">Techinal/Non technical Details</h2>

                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Enrollment Number:</strong> {user.enrollmentNumber}</p>
                    <p><strong>Branch:</strong> {user.branch}</p>
                    <p><strong>Batch:</strong> {user.batch}</p>
                    <p><strong>Year:</strong> {user.year}</p>
                    <p><strong>Competition Name:</strong> {user.competitionName}</p>
                    <p><strong>Date:</strong> {user.date}</p>
                    <p><strong>Team Name:</strong> {user.teamName}</p>
                    <p><strong>Team Size:</strong> {user.teamSize}</p>
                    <p><strong>Mentor Name:</strong> {user.mentorName}</p>
                    <p><strong>Level:</strong> {user.level}</p>
                    <p><strong>Organizer:</strong> {user.organizer}</p>
                    <p><strong>Venue:</strong> {user.venue}</p>
                    <p><strong>Problem Statement:</strong> {user.problemStatement}</p>
                    <p><strong>Parent/Guardian Contact No:</strong> {user.parentContact}</p>
                    <p><strong>Prize Money:</strong> {user.prizeMoney}</p>
                    <p><strong>Sponsoring Agency:</strong> {user.sponsoringAgency}</p>
                    <p><strong>Position Acquired:</strong> {user.positionAcquired}</p>
                    <p><strong>Project GitHub Link:</strong> {user.githubLink}</p>
                    <p><strong>Event Mode:</strong> {user.eventMode}</p>
                    <p><strong>Achievement:</strong> {user.achievement}</p>
                    <p><strong>Certificate:</strong> {user.certificate}</p>
                  </div>

                  {/* Student higher studies */}
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold mb-2">Program Details</h2>

                    <p><strong>Student Name:</strong> {user.studentName}</p>
                    <p><strong>Enrollment Number:</strong> {user.enrollmentNumber}</p>
                    <p><strong>Name of the Course:</strong> {user.courseName}</p>
                    <p><strong>Scholarship (If Any):</strong> {user.scholarship}</p>
                    <p><strong>Institute Name:</strong> {user.instituteName}</p>
                    <p><strong>City:</strong> {user.city}</p>
                    <p><strong>Country:</strong> {user.country}</p>
                    <p><strong>Duration of Program (in Months):</strong> {user.programDuration}</p>
                    <p><strong>Admission Year:</strong> {user.admissionYear}</p>
                    <p><strong>Date of Admission:</strong> {user.admissionDate}</p>
                  </div>

                  {/* Proffesional membership */}
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold mb-2">Membership Details</h2>

                    <p><strong>Organization Name (IEI, CSI, IEEE, etc.):</strong> {user.organizationName}</p>
                    <p><strong>Membership ID:</strong> {user.membershipId}</p>
                    <p><strong>Date of Joining:</strong> {user.dateOfJoining}</p>
                    <p><strong>Membership Status:</strong> {user.membershipStatus}</p>
                  </div>


                </div >
              </div >
            </div >
          </div >
        </div>
        }
    </div>
  );
}


export default StudentProfile;