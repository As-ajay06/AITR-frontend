import React, { useEffect } from 'react'
import useGetFacultyProfile from '../hooks/useGetFacultyProfile';
import { useParams } from 'react-router-dom'

function FacultyProfile() {
  // To display all of the faculty info for given params

  const { id } = useParams();
  console.log("here", id)
  const { data, loading, message } = useGetFacultyProfile(id);
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
    
    <div className="min-h-screen bg-zinc-200 flex justify-center p-10">
      <div className="bg-white shadow-md rounded-lg p-10 w-full min-w-5xl">
        <div className="min-h-screen bg-zinc-200 flex justify-center p-6 w-full" >
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

            {/* Profile Details */}
            <div className="mb-6">
              {/* <h2 className="text-lg font-semibold mb-2">Profile info</h2>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Roll No:</strong> {user.rollNo}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Qualification:</strong> {user.qualification}</p>
              <p><strong>Deparment:</strong> {user.qualification}</p>
              <p><strong>Mobile Number:</strong> {user.qualification}</p>
              <p><strong>Category:</strong> {user.qualification}</p>
              <p><strong>Teaching Experience:</strong> {user.qualification}</p>
              <p><strong>Current Designation:</strong> {user.qualification}</p> */}
            </div>

           {/* Faculty Development Programme */}
            {data?.facultyDevlopment && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Faculty Development Programme</h2>

                <p><strong>Faculty Name:</strong> {data.facultyDevlopment.facultyName}</p>
                <p><strong>Department:</strong> {data.facultyDevlopment.department}</p>
                <p><strong>Programme Title:</strong> {data.facultyDevlopment.fdpTitle}</p>
                <p><strong>Organizing Institute:</strong> {data.facultyDevlopment.organizingInstitute}</p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(data.facultyDevlopment.startDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  {new Date(data.facultyDevlopment.endDate).toLocaleDateString()}
                </p>
                <p><strong>Program Type:</strong> {data.facultyDevlopment.programType}</p>
                <p><strong>Mode:</strong> {data.facultyDevlopment.mode}</p>
                <p><strong>Location:</strong> {data.facultyDevlopment.location}</p>
                <p><strong>Number of Days:</strong> {data.facultyDevlopment.numberOfDays}</p>
                <p><strong>Outcome Highlights:</strong> {data.facultyDevlopment.outcomeHighlights}</p>

                {data.facultyDevlopment.certificatePdfUrl && (
                  <p>
                    <strong>Certificate:</strong>{" "}
                    <a
                      href={`/${data.facultyDevlopment.certificatePdfUrl}`}
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


          {/* Certificates */}
            {data?.certificates && data.certificates.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Certificates</h2>

                {data.certificates.map((cert, index) => (
                  <div key={index} className="mb-2">
                    <p><strong>Certificate Name:</strong> {cert.certificateName}</p>
                    <p><strong>Issuing Organization:</strong> {cert.issuingOrganization}</p>
                    <p><strong>Date of Issue:</strong> {new Date(cert.dateOfIssue).toLocaleDateString()}</p>
                    {cert.certificatePdfUrl && (
                      <p>
                        <strong>Certificate Link:</strong>{" "}
                        <a
                          href={`/${cert.certificatePdfUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View Certificate
                        </a>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}


          {/* Qualification */}
            {data?.qualification && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Qualification</h2>

                <p><strong>Faculty Name:</strong> {data.qualification.facultyName}</p>
                <p><strong>Highest Degree:</strong> {data.qualification.highestDegree}</p>
                <p><strong>University / Institute:</strong> {data.qualification.universityOrInstitute}</p>
                <p><strong>Specialization:</strong> {data.qualification.specialization}</p>
                <p><strong>Year of Completion:</strong> {data.qualification.yearOfCompletion}</p>

                {data.qualification.certificateUrl && (
                  <p>
                    <strong>Certificate:</strong>{" "}
                    <a
                      href={`/${data.qualification.certificateUrl}`}
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


            {/* Patent Published */}
            {data?.patentPublished && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Patent Published</h2>

                <p><strong>Patent Title:</strong> {data.patentPublished.patentTitle}</p>
                <p><strong>Main Title:</strong> {data.patentPublished.title}</p>
                <p><strong>Applicant:</strong> {data.patentPublished.applicant}</p>
                <p><strong>Application Number:</strong> {data.patentPublished.applicationNumber}</p>
                <p><strong>Application Date:</strong> {new Date(data.patentPublished.applicationDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {data.patentPublished.status}</p>
                <p><strong>Country:</strong> {data.patentPublished.country}</p>
                <p><strong>Category:</strong> {data.patentPublished.category}</p>

                <p>
                  <strong>Inventors:</strong>{" "}
                  {Array.isArray(data.patentPublished.inventors)
                    ? data.patentPublished.inventors.join(", ").replace(/[\[\]']+/g, "")
                    : data.patentPublished.inventors}
                </p>

                <p>
                  <strong>Co-Inventors:</strong>{" "}
                  {typeof data.patentPublished.coInventors === "string"
                    ? data.patentPublished.coInventors.replace(/[\[\]']+/g, "")
                    : data.patentPublished.coInventors}
                </p>

                <p><strong>Abstract:</strong> {data.patentPublished.abstract}</p>

                {data.patentPublished.certificatePdfUrl && (
                  <p>
                    <strong>Certificate:</strong>{" "}
                    <a
                      href={`/${data.patentPublished.certificatePdfUrl}`}
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


            {/* Patent Granted / Guided */}
            {data?.patentGuided && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Patent Granted / Guided</h2>

                <p><strong>Patent Title:</strong> {data.patentGuided.patentTitle}</p>
                <p><strong>Main Title:</strong> {data.patentGuided.title}</p>
                <p><strong>Applicant:</strong> {data.patentGuided.applicant}</p>
                <p><strong>Application Number:</strong> {data.patentGuided.applicationNumber}</p>
                <p><strong>Application Date:</strong> {new Date(data.patentGuided.applicationDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {data.patentGuided.status}</p>
                <p><strong>Country:</strong> {data.patentGuided.country}</p>
                <p><strong>Category:</strong> {data.patentGuided.category}</p>

                <p>
                  <strong>Inventors:</strong>{" "}
                  {Array.isArray(data.patentGuided.inventors)
                    ? data.patentGuided.inventors.join(", ").replace(/[\[\]']+/g, "")
                    : data.patentGuided.inventors}
                </p>

                <p>
                  <strong>Co-Inventors:</strong>{" "}
                  {Array.isArray(data.patentGuided.coInventors)
                    ? data.patentGuided.coInventors.join(", ").replace(/[\[\]']+/g, "")
                    : data.patentGuided.coInventors}
                </p>

                <p><strong>Abstract:</strong> {data.patentGuided.abstract}</p>

                {data.patentGuided.certificatePdfUrl && (
                  <p>
                    <strong>Certificate:</strong>{" "}
                    <a
                      href={`/${data.patentGuided.certificatePdfUrl}`}
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


            {/* Patent Published */}
            {data?.patentPublished && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Patent Published</h2>

                <p><strong>Patent Title:</strong> {data.patentPublished.patentTitle}</p>
                <p><strong>Main Title:</strong> {data.patentPublished.title}</p>
                <p><strong>Applicant:</strong> {data.patentPublished.applicant}</p>
                <p><strong>Application Number:</strong> {data.patentPublished.applicationNumber}</p>
                <p><strong>Application Date:</strong> {new Date(data.patentPublished.applicationDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {data.patentPublished.status}</p>
                <p><strong>Country:</strong> {data.patentPublished.country}</p>
                <p><strong>Category:</strong> {data.patentPublished.category}</p>

                <p>
                  <strong>Inventors:</strong>{" "}
                  {Array.isArray(data.patentPublished.inventors)
                    ? data.patentPublished.inventors
                        .join(", ")
                        .replace(/[\[\]']+/g, "")
                    : data.patentPublished.inventors}
                </p>

                <p>
                  <strong>Co-Inventors:</strong>{" "}
                  {typeof data.patentPublished.coInventors === "string"
                    ? data.patentPublished.coInventors.replace(/[\[\]']+/g, "")
                    : data.patentPublished.coInventors}
                </p>

                <p><strong>Abstract:</strong> {data.patentPublished.abstract}</p>

                {data.patentPublished.certificatePdfUrl && (
                  <p>
                    <strong>Certificate:</strong>{" "}
                    <a
                      href={`/${data.patentPublished.certificatePdfUrl}`}
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


            {/* PhD Supervision */}
            {data?.phdSupervision && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">PhD Supervision</h2>

                <p><strong>Scholar Name:</strong> {data.phdSupervision.phdScholarName}</p>
                <p><strong>University:</strong> {data.phdSupervision.universityAffiliation}</p>
                <p><strong>Status:</strong> {data.phdSupervision.status}</p>
                <p><strong>Research Topic:</strong> {data.phdSupervision.researchTopic}</p>
                <p><strong>Registration Date:</strong> {new Date(data.phdSupervision.registrationDate).toLocaleDateString()}</p>
                <p><strong>Completion Date:</strong> {new Date(data.phdSupervision.completionDate).toLocaleDateString()}</p>
              </div>
            )}

          {/* Professional Bodies */}
            {data?.professionalBodies && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Professional Bodies</h2>

                <p><strong>Name of Organisation:</strong> {data.professionalBodies.organizationName}</p>
                <p><strong>Membership ID:</strong> {data.professionalBodies.membershipId}</p>
                <p><strong>Date of Joining:</strong> {new Date(data.professionalBodies.dateOfJoining).toLocaleDateString()}</p>
                <p><strong>Current Status:</strong> {data.professionalBodies.currentStatus}</p>
              </div>
            )}

          {/* Research Projects Guided */}
            {data?.researchProjects && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Research Project Guided</h2>

                <p><strong>Project Title:</strong> {data.researchProjects.projectTitle}</p>

                <p>
                  <strong>Student Names:</strong>{" "}
                  {Array.isArray(data.researchProjects.studentNames)
                    ? data.researchProjects.studentNames
                        .join(", ")
                        .replace(/[\[\]']+/g, "")
                    : data.researchProjects.studentNames}
                </p>

                <p>
                  <strong>Outcome:</strong>{" "}
                  {Array.isArray(data.researchProjects.outcome)
                    ? data.researchProjects.outcome
                        .join(", ")
                        .replace(/[\[\]']+/g, "")
                    : data.researchProjects.outcome}
                </p>
              </div>
            )}

          {/* Invited Talks */}
            {data?.invitedTalks && data.invitedTalks.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Invited Talks</h2>

                {data.invitedTalks.map((talk, index) => (
                  <div key={index} className="mb-2">
                    <p><strong>Faculty Name:</strong> {talk.facultyName}</p>
                    <p><strong>Topic:</strong> {talk.topic}</p>
                    <p><strong>Event Name:</strong> {talk.eventName}</p>
                    <p><strong>Organizing Institute:</strong> {talk.organizingInstitute}</p>
                    <p><strong>Date:</strong> {new Date(talk.date).toLocaleDateString()}</p>
                    <p><strong>Location:</strong> {talk.location}</p>

                    {talk.certificatePdfUrl && (
                      <p>
                        <strong>Certificate:</strong>{" "}
                        <a
                          href={`/${talk.certificatePdfUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View Certificate
                        </a>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}


          {/* Books and Chapter Authored */}
          {data?.booksAuthored && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Books and Chapters Authored</h2>

              <p><strong>Title of Book:</strong> {data.booksAuthored.title}</p>
              <p><strong>Publisher:</strong> {data.booksAuthored.publisher}</p>
              <p><strong>ISBN:</strong> {data.booksAuthored.isbn}</p>
              <p><strong>Year of Publication:</strong> {data.booksAuthored.yearOfPublication}</p>

              <p>
                <strong>Co-authors:</strong>{" "}
                {Array.isArray(data.booksAuthored.coAuthors)
                  ? data.booksAuthored.coAuthors
                      .join(", ")
                      .replace(/[\[\]']+/g, "")
                  : data.booksAuthored.coAuthors}
              </p>
            </div>
          )}



        </div>
      </div>
      </div>
    </div>
  );
}


export default FacultyProfile