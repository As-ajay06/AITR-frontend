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
                    <p><strong>ID:</strong> {profile._id}</p>

                    <p><strong>Certificate ID:</strong> {profile.certificate._id}</p>
                    <p><strong>Certificate Uploaded At:</strong> {profile.certificate.uploadedAt}</p>

                    <p><strong>Student ID:</strong> {profile.studentId}</p>
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Enrollment Number:</strong> {profile.enrollmentNumber}</p>
                    <p><strong>Branch:</strong> {profile.branch}</p>
                    <p><strong>Batch:</strong> {profile.batch}</p>
                    <p><strong>Email:</strong> {profile.email}</p>

                    <p><strong>Year:</strong> {profile.year}</p>
                    <p><strong>Course:</strong> {profile.course}</p>
                    <p><strong>CGPA:</strong> {profile.cgpa}</p>

                    <p><strong>Date of Birth:</strong> {profile.dateOfBirth}</p>
                    <p><strong>Gender:</strong> {profile.gender}</p>
                    <p><strong>Category:</strong> {profile.category}</p>

                    <p><strong>Year of Admission:</strong> {profile.yearOfAdmission}</p>
                    <p><strong>Year of Graduation Status:</strong> {profile.yearOfGraduationStatus}</p>
                    <p><strong>Status:</strong> {profile.status}</p>

                    <p><strong>Github Link:</strong> {profile.githubLink}</p>

                    <p><strong>Guardian Contact Number:</strong> {profile.guardianContactNumber}</p>
                    <p><strong>Guardian Name:</strong> {profile.guardianName}</p>

                    <p><strong>Address:</strong> {profile.address}</p>

                    <p><strong>Created At:</strong> {profile.createdAt}</p>
                    <p><strong>Updated At:</strong> {profile.updatedAt}</p>

                  </div>

                                      
                      {/* Certificates */}
                      {data?.certificates && (
                        <div className="mb-6">
                          <h2 className="text-lg font-semibold mb-2">Certificate</h2>
                          <p><strong>Certificate ID:</strong> {data.certificates.certificateId}</p>
                          <p><strong>Student Name:</strong> {data.certificates.studentName}</p>
                          <p><strong>Enrollment Number:</strong> {data.certificates.enrollmentNumber}</p>
                          <p><strong>Branch:</strong> {data.certificates.branch}</p>
                          <p><strong>Batch:</strong> {data.certificates.batch}</p>
                          <p><strong>Year:</strong> {data.certificates.year}</p>
                          <p><strong>Course Name:</strong> {data.certificates.courseName}</p>
                          <p><strong>Issuing Organization:</strong> {data.certificates.issuingOrganization}</p>
                          <p><strong>Issue Date:</strong> {new Date(data.certificates.issueDate).toLocaleDateString()}</p>
                          <p><strong>Validity Period:</strong> {data.certificates.validityPeriod}</p>
                          <p><strong>Grade / Score:</strong> {data.certificates.gradeOrScore}</p>
                          <p><strong>Description:</strong> {data.certificates.certificateDescription}</p>
                          <p><strong>Mode of Learning:</strong> {data.certificates.modeOfLearning}</p>
                          <p><strong>Course Duration:</strong> {data.certificates.courseDuration}</p>
                          <p><strong>Relevance to Program / Branch:</strong> {data.certificates.relevanceToProgramOrBranch}</p>
                          {data.certificates.certificatePDF && (
                            <p>
                              <strong>Certificate PDF:</strong>{" "}
                              <a href={`/${data.certificates.certificatePDF}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                View Certificate
                              </a>
                            </p>
                          )}
                        </div>
                      )}

                    {/* Higher Studies */}
                    {data?.higherStudies && (
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">Higher Studies</h2>
                        <p><strong>Course Name:</strong> {data.higherStudies.courseName}</p>
                        <p><strong>Scholarship:</strong> {data.higherStudies.scholarship}</p>
                        <p><strong>Institute Name:</strong> {data.higherStudies.instituteName}</p>
                        <p><strong>City:</strong> {data.higherStudies.city}</p>
                        <p><strong>Country:</strong> {data.higherStudies.country}</p>
                        <p><strong>Program Duration:</strong> {data.higherStudies.programDuration}</p>
                        <p><strong>Admission Year:</strong> {data.higherStudies.admissionYear}</p>
                      </div>
                    )}

                    {/* Hackathons */}
                  {data?.hackathons && (
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-2">Hackathons</h2>
                      <p><strong>Hackathon Name:</strong> {data.hackathons.hackathonName}</p>
                      <p><strong>Organizer:</strong> {data.hackathons.organizer}</p>
                      <p><strong>Team Name:</strong> {data.hackathons.teamName}</p>
                      <p><strong>Team Size:</strong> {data.hackathons.teamSize}</p>
                      <p><strong>Team Members:</strong> {Array.isArray(data.hackathons.teamDetails) 
                          ? data.hackathons.teamDetails.join(", ").replace(/[\[\]']+/g, "") 
                          : data.hackathons.teamDetails.replace(/[\[\]']+/g, "")
                      }</p>
                      <p><strong>Mentor Name:</strong> {data.hackathons.mentorName}</p>
                      <p><strong>Venue:</strong> {data.hackathons.venue}</p>
                      <p><strong>Event Date:</strong> {new Date(data.hackathons.eventDate).toLocaleDateString()}</p>
                      <p><strong>Problem Statement:</strong> {data.hackathons.problemStatement}</p>
                      <p><strong>Technology Used:</strong> {Array.isArray(data.hackathons.technologyUsed) 
                          ? data.hackathons.technologyUsed.join(", ").replace(/[\[\]']+/g, "") 
                          : data.hackathons.technologyUsed.replace(/[\[\]']+/g, "")
                      }</p>
                      <p><strong>Prize Money:</strong> {data.hackathons.prizeMoney}</p>
                      <p><strong>Position Secured:</strong> {data.hackathons.positionSecured}</p>
                    </div>
                  )}

                  {/* Placement */}
                  <div className="mb-6">
                  </div>

                  {/* Internship */}
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Patent Published</h2>
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
                  </div>

                  {/* Student capstone */}
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold mb-2">Project/Capstone Details</h2>
                  </div>

                 {/* Startups */}
                {data?.startups && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Startup / Entrepreneurial Activities</h2>
                    <p><strong>Startup Name:</strong> {data.startups.startupName}</p>
                    <p><strong>Domain:</strong> {data.startups.domain}</p>
                    <p><strong>Incubation Support:</strong> {data.startups.incubationSupport}</p>
                    <p><strong>Current Status:</strong> {data.startups.currentStatus}</p>
                    {data.startups.websiteOrLink && (
                      <p>
                        <strong>Website / Link:</strong>{" "}
                        <a href={data.startups.websiteOrLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                          Visit Website
                        </a>
                      </p>
                    )}
                  </div>
                )}


                {/* Extra-Curricular Activities */}
                {data?.extraCurricular && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Extra-Curricular Activities</h2>
                    <p><strong>Event Participation ID:</strong> {data.extraCurricular.eventParticipationId}</p>
                    <p><strong>Student Name:</strong> {data.extraCurricular.studentName}</p>
                    <p><strong>Enrollment Number:</strong> {data.extraCurricular.enrollmentNumber}</p>
                    <p><strong>Branch:</strong> {data.extraCurricular.branch}</p>
                    <p><strong>Batch:</strong> {data.extraCurricular.batch}</p>
                    <p><strong>Year:</strong> {data.extraCurricular.year}</p>
                    <p><strong>Event Name:</strong> {data.extraCurricular.eventName}</p>
                    <p><strong>Event Date:</strong> {new Date(data.extraCurricular.eventDate).toLocaleDateString()}</p>
                    <p><strong>Event Level:</strong> {data.extraCurricular.eventLevel}</p>
                    <p><strong>Event Location:</strong> {data.extraCurricular.eventLocation}</p>
                    <p><strong>Position:</strong> {data.extraCurricular.position}</p>
                    <p><strong>Organizer:</strong> {data.extraCurricular.organizer}</p>
                    <p><strong>Coach Name:</strong> {data.extraCurricular.coachName}</p>

                    {data.extraCurricular.certificatePDF && (
                      <p>
                        <strong>Certificate:</strong>{" "}
                        <a
                          href={`/${data.extraCurricular.certificatePDF}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View Certificate
                        </a>
                      </p>
                    )}
                  </div>
                )}


                  {/* Techinal non technical talks */}
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold mb-2">Techinal/Non technical Details</h2>
                  </div>


                {/* Membership */}
                {data?.membership && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Membership</h2>
                    <p><strong>Organization Name:</strong> {data.membership.organizationName}</p>
                    <p><strong>Membership ID:</strong> {data.membership.membershipId}</p>
                    <p><strong>Date of Joining:</strong> {new Date(data.membership.dateOfJoining).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> {data.membership.membershipStatus}</p>
                  </div>
                )}



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