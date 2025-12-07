import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import DataTable from 'react-data-table-component';
import { BASE_URL } from '../../config/config';

const Student = () => {
  const [data, setData] = useState([]);
  const [column, setColumn] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('');
  const [filterText, setFiltertext] = useState('');


  const tabs = [
    { label: 'Profile' },
    { label: 'Certification' },
    { label: 'Technical/ Non-technical Competitions' },
    { label: 'Placement' },
    { label: 'Internship' },
    { label: 'Reasearch Paper' },
    { label: 'Sports' },
    { label: 'Extra Curricular' },
    { label: 'Project Work / Capstone Projects' },
    { label: 'Startups/ Entrepreneurial Ventures' },
    { label: 'Hackathons / Innvoation Challenges' },
    { label: 'Higher Studies' },
    { label: 'Professional Memberships' },
  ];

  const fetchDataByTab = async (selectedTab) => {
    setLoading(true);
    try {
      let response;
      switch (selectedTab) {
        case 'Profile':
          response = await axios.get(`${BASE_URL}/api/v1/students/profiles`);
          console.log(response.data)
          setData(response.data.profiles);
          setColumn(studentProfileColumns);
          break;

        case 'Certification':
          response = await axios.get(`${BASE_URL}/api/v1/students/certificates`);
          console.log(response.data);
          setData(response.data.certificates);
          setColumn(certificateColumns);
          break;

        case 'Technical/ Non-technical Competitions':
          response = await axios.get(`${BASE_URL}/api/v1/students/skills`);
          console.log(response.data)
          setData(response.data.technicalData);
          setColumn(studentTechinalNonTechnicalColumn);
          break;

        case 'Placement':
          response = await axios.get(`${BASE_URL}/api/v1/students/placements`);
          console.log(response.data)
          setData(response.data.placements);
          setColumn(studentPlacementColumns);
          break;

        case 'Internship':
          response = await axios.get(`${BASE_URL}/api/v1/students/profiles`);
          console.log(response.data)
          setData(response.data.profiles);
          setColumn(studentInternshipColumn);
          break;

        case 'Reasearch Paper':
          response = await axios.get(`${BASE_URL}/api/v1/students/research-papers`);
          console.log(response.data)
          setData(response.data.researchPapers);
          setColumn(researchPaperColumns);
          // we dont have reaserach paper column here
          break;

        case 'Sports':
          response = await axios.get(`${BASE_URL}/api/v1/students/sports`);
          console.log(response.data)
          setData(response.data.sportsData);
          setColumn(studentSportsEventColumns);
          break;

        case 'Extra Curricular':
          response = await axios.get(`${BASE_URL}/api/v1/students/extracurriculars`);
          console.log(response.data)
          setData(response.data.extraCurriculars);
          setColumn(studentExtraCurricularColumns);
          break;

        case 'Project Work / Capstone Projects':
          response = await axios.get(`${BASE_URL}/api/v1/students/projects`);
          console.log(response.data)
          setData(response.data.projectWorks);
          setColumn(CapstoneprojectColumns);
          break;

        case 'Startups/ Entrepreneurial Ventures':
          response = await axios.get(`${BASE_URL}/api/v1/students/startups`);
          console.log(response.data)
          setData(response.data.startupsData);
          setColumn(startupColumns);
          break;

        case 'Hackathons / Innvoation Challenges':
          response = await axios.get(`${BASE_URL}/api/v1/students/hackathons`);
          console.log(response.data)
          setData(response.data.hackathons);
          setColumn(studentHackthonColumns);
          break;

        case 'Higher Studies':
          response = await axios.get(`${BASE_URL}/api/v1/students/higher-studies`);
          console.log(response.data)
          setData(response.data.higherStudies);
          setColumn(studentHigherStudies);
          break;


        case 'Professional Memberships':
          response = await axios.get(`${BASE_URL}/api/v1/students/memberships`);
          console.log(response.data)
          setData(response.data.membershipCertificates);
          setColumn(membershipColumns);
          break;

        default:
          setData([]);
          setColumn([]);
          break;
      }
    } catch (error) {
      console.error(`Error fetching ${selectedTab} data:`, error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (tab) {
      fetchDataByTab(tab);
    }
  }, [tab]);

  const FilteringComponent = () => {

    const filteredItems = data.filter(item =>
      // filters
      item.studentName && item.studentName.toLowerCase().includes(filterText.toLowerCase()) ||
      item.enrollmentNumber && item.enrollmentNumber.toLowerCase().includes(filterText.toLowerCase()) ||
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));
    // can add more filters to this manually or think about more options
    // can go with search woth department faculty Name, ID etc.

    return (
      <>
        <DataTable data={filteredItems} columns={column} />
      </>
    )
  }

  return (
    <div>
      <SearchBar placeholder={"filter by Id, name , department"} onChange={(e) => setFiltertext(e.target.value)} value={filterText} />
      <br />

      <div className="flex flex-wrap justify-center gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 shadow">
        {tabs.map(({ label }) => (
          <button key={label} onClick={() => setTab(label)}>
            <div className={`px-4 py-2 rounded-full transition-colors duration-200 ${tab === label
              ? "bg-blue-600 text-white"
              : "bg-white text-black hover:bg-blue-300"
              }`}>
              {label}
            </div>
          </button>
        ))}
      </div>

      {/* Display loading or table */}
      <div className="mt-6">
        {loading ? (
          <div className="text-center py-8 text-blue-600 font-semibold">Loading...</div>
        ) : <div>
          {filterText.length == 0 ? <DataTable data={data} columns={column} /> : <FilteringComponent />}
        </div>
        }
      </div>
    </div>
  );
};

export default Student;




// columns

export const studentProfileColumns = [
  { name: 'ID', selector: row => row.studentId, sortable: true, width: '70px' },
  { name: 'Student Name', selector: row => row.name, sortable: true },
  { name: 'Enrollment No.', selector: row => row.enrollmentNumber },
  { name: 'Branch', selector: row => row.branch },
  { name: 'batch', selector: row => row.batch, wrap: true },
  { name: 'email', selector: row => row.email },
  { name: 'year', selector: row => row.year },
  { name: 'course', selector: row => row.course, wrap: true },
  { name: 'cgpa', selector: row => row.cgpa, wrap: true },
  { name: 'dateOfBirth', selector: row => row.dateOfBirth, wrap: true },
  { name: 'gender', selector: row => row.gender, wrap: true },
  { name: 'catogory', selector: row => row.category, wrap: true },
  { name: 'yearOfAdmission', selector: row => row.yearOfAdmission, wrap: true },
  { name: 'status', selector: row => row.status, wrap: true },
  { name: 'githubLink', selector: row => (<a href={row.githubLink} target='_blank'>{row.githubLink}</a>), wrap: true },
  { name: 'linkinProfileLink', selector: row => (<a href={row.linkedinProfileLink} target='_blank'>{row.linkinProfileLink}</a>), wrap: true },
  {
    name: 'gaurdianContactNumber', selector: row => row.guardianContactNumber
    , wrap: true
  },
  { name: 'gaurdianName', selector: row => row.guardianName, wrap: true },
  { name: 'address', selector: row => row.address, wrap: true },
  {
    name: 'Certificate',
    cell: row => (
      <a
        href={row.Certificate_Link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-sm"
      >
        View
      </a>
    ),
  },
  {
    name: 'Actions',
    cell: row => (
      <div className="flex gap-2">
        <button
          onClick={() => alert(`Viewing ${row.Title}`)}
          className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
        >
          View
        </button>
        <button
          onClick={() => alert(`Editing ${row.Title}`)}
          className="bg-yellow-500 text-white text-xs px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => alert(`Deleting ${row.Title}`)}
          className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export const studentTechinalNonTechnicalColumn = [
  { name: 'ID', selector: row => row.id, sortable: true, width: '70px' },
  { name: 'Student Name', selector: row => row.studentName, sortable: true },
  { name: 'Enrollment No.', selector: row => row.enrollmentNumber },
  { name: 'Branch', selector: row => row.branch },
  { name: 'batch', selector: row => row.batch, wrap: true },
  { name: 'email', selector: row => row.email },
  { name: 'year', selector: row => row.year },
  { name: 'Competition Name', selector: row => row.competitionName, wrap: true },
  { name: 'date', selector: row => row.date, wrap: true },
  { name: 'Team Name', selector: row => row.teamName, wrap: true },
  { name: 'Team size', selector: row => row.teamSize, wrap: true },
  { name: 'Mentor name', selector: row => row.mentorName, wrap: true },
  { name: 'Level', selector: row => row.level, wrap: true },
  { name: 'Organiser', selector: row => row.organiser, wrap: true },
  { name: 'venue', selector: row => row.venue, wrap: true },
  { name: 'Problem statement', selector: row => row.problemStatement, wrap: true },
  { name: 'Technology used', selector: row => row.technologyUsed, wrap: true },
  { name: 'Price Money', selector: row => row.priceMoney, wrap: true },
  { name: 'Sponsoring Agency', selector: row => row.sponsoringAgency, wrap: true },
  { name: 'Position secured', selector: row => row.positionSecured, wrap: true },
  { name: 'Project Git-hub link', selector: row => (<a href={row.projectGithubLink}>Link</a>), wrap: true },
  { name: 'Project Description', selector: row => (<a href={row.projectDescription}>Link</a>), wrap: true },
  { name: 'Event mode', selector: row => row.eventMode, wrap: true },
  { name: 'Achievement', selector: row => row.achiecvement, wrap: true },

  {
    name: 'Certificate',
    cell: row => (
      <a
        href={row.Certificate_Link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-sm"
      >
        View
      </a>
    ),
  },
  {
    name: 'Actions',
    cell: row => (
      <div className="flex gap-2">
        <button
          onClick={() => alert(`Viewing ${row.Title}`)}
          className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
        >
          View
        </button>
        <button
          onClick={() => alert(`Editing ${row.Title}`)}
          className="bg-yellow-500 text-white text-xs px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => alert(`Deleting ${row.Title}`)}
          className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];




export const certificateColumns = [
  { name: 'ID', selector: row => row.certificateId, sortable: true, width: '100px' },
  { name: 'Student Name', selector: row => row.studentName, sortable: true },
  { name: 'Enrollment Number', selector: row => row.enrollmentNumber },
  { name: 'Certificate Name', selector: row => row.courseName },
  { name: 'Certificate Type', selector: row => row.certificateType },
  { name: 'Branch', selector: row => row.branch },
  { name: 'Batch', selector: row => row.batch },
  { name: 'Year', selector: row => row.year },
  { name: 'Course', selector: row => row.courseName },
  { name: 'Issuing Organization', selector: row => row.issuingOrganization, wrap: true },
  { name: 'issue Date', selector: row => row.issueDate },
  { name: 'Validity Period', selector: row => row.validityPeriod },
  { name: 'Graded of Score', selector: row => row.gradeOrScore },
  { name: 'Mode Of Learning', selector: row => row.modeOfLearning },
  { name: 'Course Duration', selector: row => row.courseDuration },
  { name: 'Rank or Position', selector: row => row.rankOrPosition },
  { name: 'Certificate Description', selector: row => row.certificateDescription },
  { name: 'relevance To Program Or Branch', selector: row => row.relevanceToProgramOrBranch },


  {
    name: 'Certificate Link',
    cell: row => (
      <a href={row.fileId} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
        View
      </a>
    ),
  },
  {
    name: 'Actions',
    cell: row => (
      <div className="flex gap-2">
        <button
          onClick={() => alert(`Viewing ${row.Title}`)}
          className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
        >
          View
        </button>
        <button
          onClick={() => alert(`Editing ${row.Title}`)}
          className="bg-yellow-500 text-white text-xs px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => alert(`Deleting ${row.Title}`)}
          className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

// we dont have technical non technical columns

export const studentPlacementColumns = [
  { name: 'ID', selector: row => row.placementId, sortable: true, width: '70px' },
  { name: 'Student Name', selector: row => row.studentName, sortable: true },
  { name: 'Company Name', selector: row => row.companyName },
  { name: 'Company Location', selector: row => row.companyLocation },

  { name: 'Job Role', selector: row => row.roleOffered },
  { name: 'Branch', selector: row => row.branch },
  { name: 'Year', selector: row => row.year },

  { name: 'Placement Type', selector: row => row.placementType },
  { name: 'Package', selector: row => row.package },
  { name: 'Joining Date', selector: row => row.joiningDate },
  {
    name: 'Offer Letter',
    cell: row => (
      <a
        href={row.fileId}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-sm"
      >
        View
      </a>
    ),
  },
  {
    name: 'Actions',
    cell: row => (
      <div className="flex gap-2">
        <button
          onClick={() => alert(`Viewing ${row.Title}`)}
          className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
        >
          View
        </button>
        <button
          onClick={() => alert(`Editing ${row.Title}`)}
          className="bg-yellow-500 text-white text-xs px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => alert(`Deleting ${row.Title}`)}
          className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export const studentInternshipColumn = [
  { name: 'ID', selector: row => row._id, sortable: true, width: '60px' },
  { name: 'Student Name', selector: row => row.name },
  { name: 'Enrollment Number', selector: row => row.enrollmentNumber },
  { name: 'Course', selector: row => row.course },
  { name: 'Branch', selector: row => row.branch },
  { name: 'Category', selector: row => row.category },
  { name: 'CGPA', selector: row => row.cgpa },
  { name: 'Year', selector: row => row.year },
  { name: 'Email', selector: row => row.email },
  { name: 'Gender', selector: row => row.gender },
  { name: 'Date of Birth', selector: row => row.dateOfBirth },
  { name: 'Status', selector: row => row.status },
  { name: 'Address', selector: row => row.address },
  { name: 'Guardian Name', selector: row => row.guardianName },
  { name: 'Guardian Contact', selector: row => row.guardianContactNumber },
  {
    name: 'GitHub',
    cell: row => (
      <a href={row.githubLink} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">
        GitHub
      </a>
    ),
  },
  {
    name: 'LinkedIn',
    cell: row => (
      <a href={row.linkedinProfileLink} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">
        LinkedIn
      </a>
    ),
  },
  {
    name: 'Actions',
    cell: row => (
      <div className="flex gap-2">
        <button
          onClick={() => alert(`Viewing ${row.Title}`)}
          className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
        >
          View
        </button>
        <button
          onClick={() => alert(`Editing ${row.Title}`)}
          className="bg-yellow-500 text-white text-xs px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => alert(`Deleting ${row.Title}`)}
          className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export const researchPaperColumns = [
  { name: 'Student Name', selector: row => row.studentName, sortable: true },
  { name: 'Enrollment Number', selector: row => row.enrollmentNumber, sortable: true },
  { name: 'Branch', selector: row => row.branch, sortable: true },
  { name: 'Batch', selector: row => row.batch, sortable: true },
  { name: 'DOI/ISBN', selector: row => row.doiOrIsbn },
  { name: 'Title of Paper', selector: row => row.titleOfPaper, wrap: true },
  { name: 'Publication Date', selector: row => row.publicationDate },
  { name: 'Journal/Conference Name', selector: row => row.journalOrConferenceName, wrap: true },
  { name: 'Co-Author', selector: row => row.coAuthors },
  { name: 'Indexing (SCOPUS, SCI, etc)', selector: row => row.indexing },
  {
    name: 'Paper PDF',
    cell: row => (
      <a href={row.paperPdfLink} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">
        View
      </a>
    ),
  },
  { name: 'Faculty Guide', selector: row => row.facultyGuide },
  {
    name: 'Actions',
    cell: row => (
      <div className="flex gap-2">
        <button
          onClick={() => alert(`Viewing ${row.Title}`)}
          className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
        >
          View
        </button>
        <button
          onClick={() => alert(`Editing ${row.Title}`)}
          className="bg-yellow-500 text-white text-xs px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => alert(`Deleting ${row.Title}`)}
          className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];


export const publicationColumns = [
  {
    name: 'ID',
    selector: row => row.facultyId,
    sortable: true,
    center: true
  },
  {
    name: 'Faculty Name',
    selector: row => row.facultyName,
    sortable: true
  },
  {
    name: 'Title of Paper',
    selector: row => row.titleOfPaper,
    sortable: true,
    wrap: true
  },
  {
    name: 'Publication Date',
    selector: row => row.publicationDate,
    format: row => new Date(row.publicationDate).toLocaleDateString()
  },
  {
    name: 'Journal/Conference Name',
    selector: row => row.journalOrConferenceName,
    wrap: true
  },
  {
    name: 'Co-Author',
    selector: row => row.coAuthors,
    wrap: true
  },
  {
    name: 'Indexing',
    selector: row => row.indexing,
    wrap: true
  },
  {
    name: 'Paper PDF',
    selector: row => row.paperPdf,
    cell: row => (
      <a
        href={row.paperPdf}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View PDF
      </a>
    )
  },
  {
    name: 'ISSN Number',
    selector: row => row.issnNumber
  },
  {
    name: 'DOI Link',
    selector: row => row.doiLink,
    cell: row => (
      <a
        href={row.doiLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        DOI
      </a>
    )
  },
  {
    name: 'Authors',
    selector: row => row.authors,
    cell: row =>
      Array.isArray(row.authors) ? row.authors.join(', ') : row.authors
  },
  {
    name: 'ISSN/ISBN',
    selector: row => row.issnOrIsbn
  },
  {
    name: 'Department',
    selector: row => row.department
  },
  {
    name: 'Actions',
    cell: row => (
      <div className="flex gap-2">
        <button
          onClick={() => alert(`Viewing ${row.Title}`)}
          className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
        >
          View
        </button>
        <button
          onClick={() => alert(`Editing ${row.Title}`)}
          className="bg-yellow-500 text-white text-xs px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => alert(`Deleting ${row.Title}`)}
          className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export const studentSportsEventColumns = [
  {
    name: "ID",
    selector: row => row.sportsEventId,
    sortable: true
  },
  {
    name: "Student Name",
    selector: row => row.studentName,
    sortable: true
  },
  {
    name: "Enrollment Number",
    selector: row => row.enrollmentNumber
  },
  {
    name: "Branch",
    selector: row => row.branch
  },
  {
    name: "Batch",
    selector: row => row.batch
  },
  {
    name: "Year",
    selector: row => row.year
  },
  {
    name: "Sports Name",
    selector: row => row.sportsName
  },
  {
    name: "Event Date",
    selector: row => new Date(row.eventDate).toLocaleDateString()
  },
  {
    name: "Event Name",
    selector: row => row.eventName
  },
  {
    name: "Event Level",
    selector: row => row.eventLevel
  },
  {
    name: "Event Location",
    selector: row => row.eventLocation
  },
  {
    name: "Position",
    selector: row => row.position
  },
  {
    name: "Certificate PDF",
    cell: row =>
      row.fileId ? (
        <a href={row.certificatePDF} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          View Certificate
        </a>
      ) : (
        "N/A"
      )
  },
  {
    name: "Coach Name",
    selector: row => row.coachName
  },
  {
    name: "Organizer",
    selector: row => row.organizer
  },
  {
    name: 'Actions',
    cell: row => (
      <div className="flex gap-2">
        <button
          onClick={() => alert(`Viewing ${row.Title}`)}
          className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
        >
          View
        </button>
        <button
          onClick={() => alert(`Editing ${row.Title}`)}
          className="bg-yellow-500 text-white text-xs px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => alert(`Deleting ${row.Title}`)}
          className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export const studentExtraCurricularColumns = [
  {
    name: "ID",
    selector: row => row.eventParticipationId,
    sortable: true,
  },
  {
    name: "Student Name",
    selector: row => row.studentName,
    sortable: true,
  },
  {
    name: "Enrollment Number",
    selector: row => row.enrollmentNumber,
  },
  {
    name: "Branch",
    selector: row => row.branch,
  },
  {
    name: "Batch",
    selector: row => row.batch,
  },
  {
    name: "Year",
    selector: row => row.year,
  },
  {
    name: "Event Name",
    selector: row => row.eventName,
  },
  {
    name: "Event Date",
    selector: row => new Date(row.eventDate).toLocaleDateString(),
  },
  {
    name: "Event Level",
    selector: row => row.eventLevel,
  },
  {
    name: "Event Location",
    selector: row => row.eventLocation,
  },
  {
    name: "Position",
    selector: row => row.position,
  },
  {
    name: "Certificate PDF",
    cell: row =>
      row.fileId ? (
        <a
          href={row.fileId}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View
        </a>
      ) : (
        "N/A"
      ),
  },
  {
    name: "Organizer",
    selector: row => row.organizer,
  },
  {
    name: "Coach Name",
    selector: row => row.coachName,
  },
  {
    name: 'Actions',
    cell: row => (
      <div className="flex gap-2">
        <button
          onClick={() => alert(`Viewing ${row.Title}`)}
          className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
        >
          View
        </button>
        <button
          onClick={() => alert(`Editing ${row.Title}`)}
          className="bg-yellow-500 text-white text-xs px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => alert(`Deleting ${row.Title}`)}
          className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export const CapstoneprojectColumns = [
  {
    name: "Project Title",
    selector: row => row.projectTitle,
    sortable: true,
  },
  {
    name: "Team Members",
    selector: row => row.teamMembers?.join(", "),
    wrap: true,
  },
  {
    name: "Guide Name",
    selector: row => row.guideName,
  },
  {
    name: "Semester",
    selector: row => row.semester,
  },
  {
    name: "Industry Mentor",
    selector: row => row.industryMentor || "N/A",
  },
  {
    name: "Project Outcome",
    selector: row => row.projectOutcome,
  },
  {
    name: 'Actions',
    cell: row => (
      <div className="flex gap-2">
        <button
          onClick={() => alert(`Viewing ${row.Title}`)}
          className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
        >
          View
        </button>
        <button
          onClick={() => alert(`Editing ${row.Title}`)}
          className="bg-yellow-500 text-white text-xs px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => alert(`Deleting ${row.Title}`)}
          className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export const startupColumns = [
  {
    name: "Startup Name",
    selector: row => row.startupName,
    sortable: true,
  },
  {
    name: "Domain",
    selector: row => row.domain,
    sortable: true,
  },
  {
    name: "Incubation Support",
    selector: row => row.incubationSupport || "None",
    wrap: true,
  },
  {
    name: "Current Status",
    selector: row => row.currentStatus,
    sortable: true,
  },
  {
    name: "Website/Link",
    selector: row => row.websiteOrLink,
    cell: row =>
      row.websiteOrLink ? (
        <a
          href={row.websiteOrLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Visit
        </a>
      ) : (
        "N/A"
      ),
  },
  {
    name: 'Actions',
    cell: row => (
      <div className="flex gap-2">
        <button
          onClick={() => alert(`Viewing ${row.Title}`)}
          className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
        >
          View
        </button>
        <button
          onClick={() => alert(`Editing ${row.Title}`)}
          className="bg-yellow-500 text-white text-xs px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => alert(`Deleting ${row.Title}`)}
          className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export const studentHackthonColumns = [
  { name: 'Hackathon Name', selector: row => row.hackathonName },
  { name: 'Organiser', selector: row => row.organizer },
  { name: 'Team Details', selector: row => row.teamDetails, wrap: true },
  { name: 'Result', selector: row => row.result },
  { name: 'Event Date', selector: row => row.eventDate },
  { name: 'Team Name', selector: row => row.teamName },
  { name: 'Team Size', selector: row => row.teamSize },
  { name: 'Mentor Name', selector: row => row.mentorName },
  { name: 'Venue', selector: row => row.venue },
  { name: 'Problem Statement', selector: row => row.problemStatement, wrap: true },
  { name: 'Technology Used', selector: row => row.technologyUsed },
  { name: 'Prize Money', selector: row => row.prizeMoney },
  { name: 'Position Secured', selector: row => row.positionSecured },
  {
    name: 'Actions',
    cell: row => (
      <div className="flex gap-2">
        <button
          onClick={() => alert(`Viewing ${row.Title}`)}
          className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
        >
          View
        </button>
        <button
          onClick={() => alert(`Editing ${row.Title}`)}
          className="bg-yellow-500 text-white text-xs px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => alert(`Deleting ${row.Title}`)}
          className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export const studentHigherStudies = [
  { name: 'Course Name', selector: row => row.courseName },
  { name: 'Scholarship', selector: row => row.scholarship || 'N/A' },
  { name: 'Institute', selector: row => row.instituteName },
  { name: 'City', selector: row => row.city },
  { name: 'Country', selector: row => row.country },
  { name: 'Duration (months)', selector: row => row.programDuration },
  { name: 'Admission Year', selector: row => row.admissionYear },
  { name: 'Admission Date', selector: row => row.admissionDate },
  {
    name: 'Actions',
    cell: row => (
      <div className="flex gap-2">
        <button
          onClick={() => alert(`Viewing ${row.Title}`)}
          className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
        >
          View
        </button>
        <button
          onClick={() => alert(`Editing ${row.Title}`)}
          className="bg-yellow-500 text-white text-xs px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => alert(`Deleting ${row.Title}`)}
          className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export const membershipColumns = [
  {
    name: "Organization Name",
    selector: row => row.organizationName,
    sortable: true,
  },
  {
    name: "Membership ID",
    selector: row => row.membershipId,
    sortable: true,
  },
  {
    name: "Date of Joining",
    selector: row => new Date(row.dateOfJoining).toLocaleDateString(),
    sortable: true,
  },
  {
    name: "Membership Status",
    selector: row => row.membershipStatus,
    sortable: true,
  },
  {
    name: 'Actions',
    cell: row => (
      <div className="flex gap-2">
        <button
          onClick={() => alert(`Viewing ${row.Title}`)}
          className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
        >
          View
        </button>
        <button
          onClick={() => alert(`Editing ${row.Title}`)}
          className="bg-yellow-500 text-white text-xs px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => alert(`Deleting ${row.Title}`)}
          className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];








