import React from 'react';
import SearchBar from '../components/SearchBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { convertArrayOfObjectsToCSV } from '../utils/convertArrayOfObjectsToCSV';

// Define exportable columns for each tab
const exportableColumnsByTab = {
  'Profile': [
    { key: 'facultyId', label: 'Faculty ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'qualification', label: 'Qualification' },
    { key: 'department', label: 'Department' },
    { key: 'mobileNumber', label: 'Mobile Number' },
    { key: 'category', label: 'Category' },
    { key: 'teachingExperience', label: 'Teaching Experience' },
    { key: 'designation', label: 'Designation' },
  ],
  'Research paper publication': [
    { key: 'facultyId', label: 'Faculty ID' },
    { key: 'facultyName', label: 'Faculty Name' },
    { key: 'titleOfPaper', label: 'Title of Paper' },
    { key: 'publicationDate', label: 'Publication Date' },
    { key: 'journalOrConferenceName', label: 'Journal/Conference Name' },
    { key: 'coAuthors', label: 'Co-Authors' },
    { key: 'indexing', label: 'Indexing' },
    { key: 'issnNumber', label: 'ISSN Number' },
    { key: 'doiLink', label: 'DOI Link' },
    { key: 'authors', label: 'Authors' },
    { key: 'issnOrIsbn', label: 'ISSN/ISBN' },
    { key: 'department', label: 'Department' },
  ],
  'Faculty Awards and Recognitions': [
    { key: 'recipientId', label: 'Recipient ID' },
    { key: 'recipientName', label: 'Recipient Name' },
    { key: 'department', label: 'Department' },
    { key: 'awardName', label: 'Award Name' },
    { key: 'issuingOrganization', label: 'Issuing Organization' },
    { key: 'date', label: 'Date' },
    { key: 'category', label: 'Category' },
    { key: 'eventName', label: 'Event Name' },
    { key: 'description', label: 'Description/Purpose' },
    { key: 'titleOfAward', label: 'Title of Award' },
    { key: 'level', label: 'Level' },
  ],
  'Faculty Devlopment Program(FDPs Attended)': [
    { key: 'facultyId', label: 'Faculty ID' },
    { key: 'facultyName', label: 'Faculty Name' },
    { key: 'department', label: 'Department' },
    { key: 'fdpTitle', label: 'FDP Title' },
    { key: 'organizingInstitute', label: 'Organizing Institute' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
    { key: 'programType', label: 'Program Type' },
    { key: 'mode', label: 'Mode' },
    { key: 'location', label: 'Location' },
    { key: 'numberOfDays', label: 'Number of Days' },
  ],
  'Patent Published': [
    { key: 'facultyId', label: 'Faculty ID' },
    { key: 'facultyName', label: 'Faculty Name' },
    { key: 'department', label: 'Department' },
    { key: 'title', label: 'Title' },
    { key: 'applicant', label: 'Applicant' },
    { key: 'applicationNumber', label: 'Application Number' },
    { key: 'applicationDate', label: 'Application Date' },
    { key: 'status', label: 'Status' },
    { key: 'coInventors', label: 'Co-Inventors' },
    { key: 'country', label: 'Country' },
    { key: 'category', label: 'Category' },
    { key: 'patentTitle', label: 'Patent Title' },
    { key: 'inventors', label: 'Inventors' },
    { key: 'publicationDate', label: 'Publication Date' },
    { key: 'abstract', label: 'Abstract' },
  ],
  'Patents Granted': [
    { key: 'patentTitle', label: 'Patent Title' },
    { key: 'inventors', label: 'Inventors' },
    { key: 'grantNumber', label: 'Grant Number' },
    { key: 'dateOfGrant', label: 'Date of Grant' },
    { key: 'countryOfGrant', label: 'Country of Grant' },
    { key: 'applicationNumber', label: 'Application Number' },
  ],
  'Membership in Professional Bodies': [
    { key: 'facultyName', label: 'Faculty Name' },
    { key: 'organizationName', label: 'Organization Name' },
    { key: 'membershipType', label: 'Membership Type' },
    { key: 'membershipId', label: 'Membership ID' },
    { key: 'dateOfJoining', label: 'Date of Joining' },
    { key: 'currentStatus', label: 'Current Status' },
  ],
  'Academic Qualifications Discipline': [
    { key: 'facultyName', label: 'Faculty Name' },
    { key: 'highestDegree', label: 'Highest Degree' },
    { key: 'universityOrInstitute', label: 'University/Institute' },
    { key: 'specialization', label: 'Specialization' },
    { key: 'yearOfCompletion', label: 'Year of Completion' },
  ],
  'PhD Supervision / Guidances': [
    { key: 'facultyName', label: 'Faculty Name' },
    { key: 'phdScholarName', label: 'PhD Scholar Name' },
    { key: 'universityAffiliation', label: 'University Affiliation' },
    { key: 'status', label: 'Status' },
    { key: 'researchTopic', label: 'Research Topic' },
    { key: 'registrationDate', label: 'Registration Date' },
    { key: 'completionDate', label: 'Completion Date' },
  ],
  'Research Projects Guided': [
    { key: 'studentName', label: 'Student Name' },
    { key: 'enrollmentNumber', label: 'Enrollment Number' },
    { key: 'branch', label: 'Branch' },
    { key: 'batch', label: 'Batch' },
    { key: 'doiOrIsbn', label: 'DOI/ISBN' },
    { key: 'titleOfPaper', label: 'Title of Paper' },
    { key: 'publicationDate', label: 'Publication Date' },
    { key: 'journalOrConferenceName', label: 'Journal/Conference Name' },
    { key: 'coAuthors', label: 'Co-Authors' },
    { key: 'indexing', label: 'Indexing' },
    { key: 'facultyGuide', label: 'Faculty Guide' },
  ],
  'Invited Talks / Resource Person': [
    { key: 'facultyName', label: 'Faculty Name' },
    { key: 'titleOfTalk', label: 'Title of Talk/Session' },
    { key: 'eventName', label: 'Event Name' },
    { key: 'organizingBody', label: 'Organizing Body' },
    { key: 'date', label: 'Date' },
    { key: 'natureOfEngagement', label: 'Nature of Engagement' },
  ],
  'Books / Chapters Authored': [
    { key: 'title', label: 'Title of Book/Chapter' },
    { key: 'publisher', label: 'Publisher' },
    { key: 'isbn', label: 'ISBN' },
    { key: 'yearOfPublication', label: 'Year of Publication' },
    { key: 'coAuthors', label: 'Co-authors' },
    { key: 'facultyName', label: 'Faculty Name' },
  ],
};

const Faculty = () => {
  const [filterText, setFiltertext] = useState("");
  const [data, setData] = useState([]);
  const [column, setColumn] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('');
  
  // State for selected rows and columns
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [showColumnSelector, setShowColumnSelector] = React.useState(false);
  const [selectedColumns, setSelectedColumns] = React.useState([]);
  const [exportableColumns, setExportableColumns] = React.useState([]);

  const tabs = [
    { label: 'Profile' },
    { label: 'Research paper publication' },
    { label: 'Faculty Awards and Recognitions' },
    { label: 'Faculty Devlopment Program(FDPs Attended)' },
    { label: 'Patent Published' },
    { label: 'Patents Granted' },
    { label: 'Membership in Professional Bodies' },
    { label: 'Academic Qualifications Discipline' },
    { label: 'PhD Supervision / Guidances' },
    { label: 'Research Projects Guided' },
    { label: 'Invited Talks / Resource Person' },
    { label: 'Books / Chapters Authored' },
  ];

  const fetchDataByTab = async (selectedTab) => {
    setLoading(true);
    try {
      let response;
      switch (selectedTab) {
        case 'Profile':
          response = await axios.get("http://localhost:3000/api/v1/faculty/profiles");
          console.log(response.data)
          setData(response.data.profiles);
          setColumn(facultyProfileColumn);
          break;

        case 'Research paper publication':
          response = await axios.get("http://localhost:3000/api/v1/faculty/research-papers");
          console.log(response.data)
          setData(response.data.papers);
          setColumn(facultyResearchPaperColumn);
          break;

        case 'Faculty Awards and Recognitions':
          response = await axios.get("http://localhost:3000/api/v1/faculty/award-recognitions");
          console.log(response.data)
          setData(response.data.data);
          setColumn(facultyAwardsColumns);
          break;

        case 'Faculty Devlopment Program(FDPs Attended)':
          response = await axios.get("http://localhost:3000/api/v1/faculty/development-programmes");
          console.log(response.data)
          setData(response.data.programs);
          setColumn(facultyDevlopmentColumn);
          break;

        case 'Patent Published':
          response = await axios.get("http://localhost:3000/api/v1/faculty/patents-published");
          console.log(response.data)
          setData(response.data.patents);
          setColumn(patentPublished);
          break;

        case 'Patents Granted':
          response = await axios.get("http://localhost:3000/api/v1/faculty/patents-granted");
          console.log(response.data)
          setData(response.data.patents);
          setColumn(patentGrantedColumns);
          break;

        case 'Membership in Professional Bodies':
          response = await axios.get("http://localhost:3000/api/v1/faculty/faculty-membership");
          console.log(response.data)
          setData(response.data.facultyMembershipData);
          setColumn(membershipColumn);
          break;

        case 'Academic Qualifications Discipline':
          response = await axios.get("http://localhost:3000/api/v1/faculty/academic-qualifications");
          console.log('Academic Qualifications Response:', response.data);
          console.log('Qualifications Data:', response.data.qualifications);
          const qualificationsData = response.data.qualifications || [];
          console.log('Setting data with', qualificationsData.length, 'items');
          setData(qualificationsData);
          setColumn(academicQualificationColumns);
          console.log('Columns set:', academicQualificationColumns);
          break;

        case 'PhD Supervision / Guidances':
          response = await axios.get("http://localhost:3000/api/v1/faculty/phd-superviseds");
          console.log(response.data)
          setData(response.data.supervisions);
          setColumn(phdSupervisionColumns);
          break;

        case 'Research Projects Guided':
          response = await axios.get("http://localhost:3000/api/v1/faculty/research-projects-guided");
          console.log(response.data)
          setData(response.data.talks);
          setColumn(invitedTalksColumn);
          break;

        case 'Invited Talks / Resource Person':
          response = await axios.get("http://localhost:3000/api/v1/faculty/invited-talks");
          console.log(response.data)
          setData(response.data.talks);
          setColumn(invitedTalksColumn);
          break;

        case 'Books / Chapters Authored':
          response = await axios.get("http://localhost:3000/api/v1/faculty/books-authored");
          console.log("Data Length:", response.data.length);
          console.log("Full Data:", response.data);
          setData(response.data.books);
          setColumn(booksChaptersColumns);
          break;

        default:
          setData([]);
          setColumn([]);
          break;
      }
      
      // Set exportable columns for the selected tab
      const tabColumns = exportableColumnsByTab[selectedTab] || [];
      setExportableColumns(tabColumns);
      setSelectedColumns(tabColumns.map(col => col.key));
    } catch (error) {
      console.error(`Error fetching ${selectedTab} data:`, error);
    }
    setLoading(false);
  };


  useEffect(() => {
    if (tab) {
      fetchDataByTab(tab);
    }

    console.log(filterText)
  }, [tab]);

  // Handle row selection
  const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);

  // Toggle column selection
  const toggleColumnSelection = (columnKey) => {
    setSelectedColumns(prev => {
      if (prev.includes(columnKey)) {
        return prev.filter(key => key !== columnKey);
      } else {
        return [...prev, columnKey];
      }
    });
  };

  // Select all columns
  const selectAllColumns = () => {
    setSelectedColumns(exportableColumns.map(col => col.key));
  };

  // Deselect all columns
  const deselectAllColumns = () => {
    setSelectedColumns([]);
  };

  // Filter data to only include selected columns
  const filterDataByColumns = React.useCallback((dataArray) => {
    return dataArray.map(row => {
      const filteredRow = {};
      selectedColumns.forEach(colKey => {
        if (Object.prototype.hasOwnProperty.call(row, colKey)) {
          filteredRow[colKey] = row[colKey];
        }
      });
      return filteredRow;
    });
  }, [selectedColumns]);

  const downloadCSV = React.useCallback((array) => {
    let dataToExport = array;
    
    if (selectedRows.length > 0) {
      dataToExport = selectedRows;
    }

    if (selectedColumns.length > 0 && dataToExport.length > 0) {
      dataToExport = filterDataByColumns(dataToExport);
    }

    if (dataToExport.length === 0) {
      alert('No data to export. Please select rows and/or columns.');
      return;
    }

    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(dataToExport);

    if (csv == null) return;
    const filename = `faculty_${tab.toLowerCase().replace(/ /g, '_').replace(/[()]/g, '')}_export.csv`;
    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }, [selectedRows, selectedColumns, filterDataByColumns, tab]);

  const Export = ({ onExport }) => (
    <div className="flex gap-2 items-center">
      <button 
        className='px-4 py-1 bg-green-500 hover:bg-green-700 shadow-sm rounded-md text-white duration-150' 
        onClick={() => setShowColumnSelector(!showColumnSelector)}
      >
        Select Columns ({selectedColumns.length})
      </button>
      <button 
        className='px-4 py-1 bg-blue-500 hover:bg-blue-700 shadow-sm rounded-md text-white duration-150' 
        onClick={e => onExport(e.target.value)}
      >
        Export Data {selectedRows.length > 0 ? `(${selectedRows.length} rows)` : '(All)'}
      </button>
    </div>
  );

  const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, [downloadCSV, data]);

  const FilteringComponent = () => {

    const filteredItems = data.filter(item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()) || item.department && item.department.toLowerCase().includes(filterText.toLowerCase()));
    // can add more filters to this manually or think about more options
    // can go with search woth department faculty Name, ID etc.
    return (
      <>
        <DataTable 
          data={filteredItems} 
          columns={column} 
          actions={actionsMemo}
          selectableRows
          onSelectedRowsChange={handleRowSelected}
        />
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
          {/* Column Selector Modal */}
          {showColumnSelector && exportableColumns.length > 0 && (
            <div className="mb-4 p-4 bg-gray-100 rounded-lg border border-gray-300">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Select Columns to Export</h3>
                <button 
                  onClick={() => setShowColumnSelector(false)}
                  className="text-gray-600 hover:text-gray-900 font-bold text-xl"
                >
                  ×
                </button>
              </div>
              <div className="flex gap-2 mb-3">
                <button 
                  onClick={selectAllColumns}
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded"
                >
                  Select All
                </button>
                <button 
                  onClick={deselectAllColumns}
                  className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded"
                >
                  Deselect All
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-60 overflow-y-auto">
                {exportableColumns.map(column => (
                  <label key={column.key} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={selectedColumns.includes(column.key)}
                      onChange={() => toggleColumnSelection(column.key)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm">{column.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          
          { filterText.length == 0 ? 
            <DataTable 
              data={data} 
              columns={column} 
              actions={actionsMemo}
              selectableRows
              onSelectedRowsChange={handleRowSelected}
            /> : <FilteringComponent /> }
        </div>
        }
      </div>
    </div>
  );
};

export default Faculty;



// columns

export const facultyProfileColumn = [
  {
    name: 's.no',
    selector: row => row.id,
    sortable: true,
    width: '80px',
    cell: (row, index) => index + 1
  },
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'Email',
    selector: row => row.email,
    sortable: true,
  },
  {
    name: 'Department',
    selector: row => row.department,
    sortable: true,
  },
  {
    name: 'Mobile No',
    selector: row => row.mobileNumber,
    sortable: true,
  },
  {
    name: 'Experience (Years)',
    selector: row => row.teachingExperience,
    sortable: true,

  },
  {
    name: 'Designation',
    selector: row => row.designation,
    sortable: true,
  },
  {
    name: 'Actions',
    cell: row => (
      <div className="flex gap-2">
        <button
          onClick={() => alert(`Viewing program ${row.Id}`)}
          className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
        >
          View
        </button>
        <button
          onClick={() => alert(`Editing program ${row.Id}`)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => alert(`Deleting program ${row.Id}`)}
          className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
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

export const facultyResearchPaperColumn = [
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
  }
];

export const facultyAwardsColumns = [
  {
    name: 'ID',
    selector: row => row.recipientId,
    sortable: true
  },
  {
    name: 'Recipient Name',
    selector: row => row.recipientName,
    sortable: true
  },
  {
    name: 'Department',
    selector: row => row.department,
    sortable: true
  },
  {
    name: 'Award Name',
    selector: row => row.awardName,
    sortable: true
  },
  {
    name: 'Issuing Organization',
    selector: row => row.issuingOrganization,
    sortable: true
  },
  {
    name: 'Date',
    selector: row => new Date(row.date).toLocaleDateString(),
    sortable: true
  },
  {
    name: 'Category',
    selector: row => row.category,
    sortable: true
  },
  {
    name: 'Event Name',
    selector: row => row.eventName,
    sortable: true
  },
  {
    name: 'Description/Purpose',
    selector: row => row.description,
    wrap: true
  },
  {
    name: 'Certificate PDF',
    cell: row => (
      <a
        href={`http://localhost:3000/file/${row.fileId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View
      </a>
    )
  },
  {
    name: 'Title of Award',
    selector: row => row.titleOfAward,
    sortable: true
  },
  {
    name: 'Level',
    selector: row => row.level,
    sortable: true
  },
];

export const facultyDevlopmentColumn = [
  { name: 'ID', selector: row => row.facultyId, sortable: true, width: '70px' },
  { name: 'Faculty Name', selector: row => row.facultyName, sortable: true },
  { name: 'department', selector: row => row.department, wrap: true },
  { name: 'FDP title', selector: row => row.fdpTitle },
  { name: 'Organising Institute', selector: row => row.organizingInstitute },

  { name: 'Start Date', selector: row => row.startDate },
  { name: 'End Date', selector: row => row.endDate },
  { name: 'Program Type', selector: row => row.programType },
  { name: 'Mode', selector: row => row.mode },
  { name: 'Location', selector: row => row.location },
  { name: 'No of days', selector: row => row.numberOfDays },

  {
    name: 'Certificate',
    cell: row => (
      <a
        href={`http://localhost:3000/file/${row.fileId}`}
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
          onClick={() => alert(`Viewing program ${row.Id}`)}
          className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
        >
          View
        </button>
        <button
          onClick={() => alert(`Editing program ${row.Id}`)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => alert(`Deleting program ${row.Id}`)}
          className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
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

export const patentPublished = [
  { name: 'faculty Id', selector: row => row.facultyId, sortable: true, width: '70px' },
  { name: 'Faculty Name', selector: row => row.facultyName, sortable: true },
  { name: 'Department', selector: row => row.department, wrap: true },
  { name: 'Title', selector: row => row.title },
  { name: 'Applicant', selector: row => row.applicant },
  { name: 'Application Number', selector: row => row.applicationNumber, wrap: true },
  { name: 'Application Date', selector: row => row.applicationDate },
  { name: 'Status', selector: row => row.status },
  { 
    name: 'Co-Inventors', 
    selector: row => row.coInventors,
    cell: row => {
      if (!row.coInventors) return 'N/A';
      if (Array.isArray(row.coInventors)) return row.coInventors.join(', ');
      if (typeof row.coInventors === 'object') return Object.values(row.coInventors).filter(v => v).join(', ');
      return String(row.coInventors);
    },
    wrap: true
  },
  { name: 'Country', selector: row => row.country },
  { name: 'Category', selector: row => row.category },
  {
    name: 'Certificate',
    cell: row => (
      row.Certificate_Link || row.certificateLink || row.fileId ? (
        <a
          href={row.Certificate_Link || row.certificateLink || `http://localhost:3000/file/${row.fileId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm"
        >
          View
        </a>
      ) : 'N/A'
    ),
  },
  { name: 'Patent Title', selector: row => row.patentTitle, wrap: true },
  { 
    name: 'Inventors', 
    selector: row => row.inventors,
    cell: row => {
      if (!row.inventors) return 'N/A';
      if (Array.isArray(row.inventors)) return row.inventors.join(', ');
      if (typeof row.inventors === 'object') return Object.values(row.inventors).filter(v => v).join(', ');
      return String(row.inventors);
    },
    wrap: true
  },
  { name: 'Publication Date', selector: row => row.publicationDate },
  { name: 'Abstract', selector: row => row.abstract, wrap: true },
  {
    name: 'Actions',
    cell: row => (
      <div className="flex gap-2">
        <button
          onClick={() => alert(`Viewing patent ${row.Id || row._id}`)}
          className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
        >
          View
        </button>
        <button
          onClick={() => alert(`Editing patent ${row.Id || row._id}`)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => alert(`Deleting patent ${row.Id || row._id}`)}
          className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
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


export const patentGrantedColumns = [
  {
    name: 'Patent Title',
    selector: row => row.patentTitle,
    sortable: true,
    wrap: true,
  },
  {
    name: 'Inventors',
    selector: row => row.inventors,
    cell: row => {
      if (!row.inventors) return 'N/A';
      if (Array.isArray(row.inventors)) return row.inventors.join(', ');
      if (typeof row.inventors === 'object') return Object.values(row.inventors).filter(v => v).join(', ');
      return String(row.inventors);
    },
    sortable: true,
    wrap: true,
  },
  {
    name: 'Grant Number',
    selector: row => row.grantNumber,
    sortable: true,
  },
  {
    name: 'Date of Grant',
    selector: row => (row.dateOfGrant),
    sortable: true,
  },
  {
    name: 'Country of Grant',
    selector: row => row.countryOfGrant,
    sortable: true,
  },
  {
    name: 'Application Number',
    selector: row => row.applicationNumber,
    sortable: true,
  }
];

export const professionalCertificationEarned = [
  {
    name: 'Faculty Name',
    selector: row => row.facultyName,
    sortable: true,
    wrap: true,
  },
  {
    name: 'Certification Name',
    selector: row => row.certificationName,
    sortable: true,
    wrap: true,
  },
  {
    name: 'Issuing Body',
    selector: row => row.issuingBody,
    sortable: true,
  },
  {
    name: 'Level',
    selector: row => row.certificationLevel,
    sortable: true,
  },
  {
    name: 'Validity Period',
    selector: row => row.validityPeriod,
    sortable: true,
  },
  {
    name: 'Field/Domain',
    selector: row => row.domain,
    sortable: true,
  },
  {
    name: 'Certificate',
    cell: row => (
      row.certificateUrl ? (
        <a
          href={row.certificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View PDF
        </a>
      ) : "N/A"
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  }
];



export const membershipColumn = [
  {
    name: 'Faculty Name',
    selector: row => row.facultyName,
    sortable: true,
  },
  {
    name: 'Organization Name',
    selector: row => row.organizationName,
    sortable: true,
    wrap: true,
  },
  {
    name: 'Membership Type',
    selector: row => row.membershipType,
    sortable: true,
  },
  {
    name: 'Membership ID',
    selector: row => row.membershipId,
    sortable: true,
  },
  {
    name: 'Date of Joining',
    selector: row => row.dateOfJoining,
    format: row => new Date(row.dateOfJoining).toLocaleDateString(),
    sortable: true,
  },
  {
    name: 'Current Status',
    selector: row => row.currentStatus,
    cell: row => (
      <span className={`px-2 py-1 rounded-full text-white text-xs ${row.currentStatus === 'Active' ? 'bg-green-600' : 'bg-gray-400'
        }`}>
        {row.currentStatus}
      </span>
    ),
    sortable: true,
  }
];

export const academicQualificationColumns = [
  {
    name: 'Faculty Name',
    selector: row => row.facultyName,
    cell: row => {
      if (!row.facultyName) return 'N/A';
      if (typeof row.facultyName === 'object' && !Array.isArray(row.facultyName)) {
        return Object.values(row.facultyName).filter(v => v && typeof v === 'string').join('');
      }
      return String(row.facultyName);
    },
    sortable: true,
    wrap: true,
  },
  {
    name: 'Highest Degree',
    selector: row => row.highestDegree,
    cell: row => {
      if (!row.highestDegree) return 'N/A';
      if (typeof row.highestDegree === 'object' && !Array.isArray(row.highestDegree)) {
        return Object.values(row.highestDegree).filter(v => v && typeof v === 'string').join('');
      }
      return String(row.highestDegree);
    },
    sortable: true,
    wrap: true,
  },
  {
    name: 'University/Institute',
    selector: row => row.universityOrInstitute,
    cell: row => {
      if (!row.universityOrInstitute) return 'N/A';
      if (typeof row.universityOrInstitute === 'object' && !Array.isArray(row.universityOrInstitute)) {
        return Object.values(row.universityOrInstitute).filter(v => v && typeof v === 'string').join('');
      }
      return String(row.universityOrInstitute);
    },
    sortable: true,
    wrap: true,
  },
  {
    name: 'Specialization',
    selector: row => row.specialization,
    cell: row => {
      if (!row.specialization) return 'N/A';
      if (typeof row.specialization === 'object' && !Array.isArray(row.specialization)) {
        return Object.values(row.specialization).filter(v => v && typeof v === 'string').join('');
      }
      return String(row.specialization);
    },
    sortable: true,
  },
  {
    name: 'Year of Completion',
    selector: row => row.yearOfCompletion,
    cell: row => {
      if (!row.yearOfCompletion) return 'N/A';
      if (typeof row.yearOfCompletion === 'object' && !Array.isArray(row.yearOfCompletion)) {
        return Object.values(row.yearOfCompletion).filter(v => v && typeof v === 'string').join('');
      }
      return String(row.yearOfCompletion);
    },
    sortable: true,
  },
  {
    name: 'Certificate',
    cell: row => {
      const certLink = row.certificateUrl || row.fileId;
      if (!certLink) return 'N/A';
      
      const url = row.fileId ? `http://localhost:3000/file/${row.fileId}` : certLink;
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View PDF
        </a>
      );
    },
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
  {
    name: 'Actions',
    cell: row => (
      <div className="flex flex-col items-center justify-center gap-0.5">
        <button onClick={() => alert(`Editing qualification ${row._id}`)} className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-5 py-1 rounded">Edit</button>
        <button onClick={() => alert(`Deleting qualification ${row._id}`)} className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded">Delete</button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];



export const phdSupervisionColumns = [
  {
    name: 'Faculty Name',
    selector: row => row.facultyName,
    sortable: true,
    wrap: true,
  },
  {
    name: 'PhD Scholar Name',
    selector: row => row.phdScholarName,
    sortable: true,
    wrap: true,
  },
  {
    name: 'University Affiliation',
    selector: row => row.universityAffiliation,
    sortable: true,
    wrap: true,
  },
  {
    name: 'Status',
    selector: row => row.status,
    sortable: true,
    cell: row => (
      <span className={`px-2 py-1 rounded-full text-white text-xs ${row.status === 'Completed' ? 'bg-green-600' : 'bg-yellow-500'
        }`}>
        {row.status}
      </span>
    )
  },
  {
    name: 'Research Topic',
    selector: row => row.researchTopic,
    wrap: true,
  },
  {
    name: 'Date of Registration/Completion',
    selector: row => row.status === 'Completed' ? row.completionDate : row.registrationDate,
    format: row => {
      const date = row.status === 'Completed' ? row.completionDate : row.registrationDate;
      return date ? new Date(date).toLocaleDateString() : 'N/A';
    },
  },
];


export const researchProjectGuided = [
  { name: 'Student Name', selector: row => row.studentName, sortable: true },
  { name: 'Enrollment Number', selector: row => row.enrollmentNumber, wrap: true },
  { name: 'Branch', selector: row => row.branch },
  { name: 'Batch', selector: row => row.batch },
  { name: 'doiOrIsbn', selector: row => row.doiOrIsbn, wrap: true },
  { name: 'title Of Paper', selector: row => row.titleOfPaper },
  { name: 'Publication Date', selector: row => row.publicationDate },
  { name: 'journal Or Conference Name', selector: row => row.journalOrConferenceName },
  { name: 'cCo Authors', selector: row => row.coAuthors },
  { name: 'indexing', selector: row => row.indexing },
  { name: 'PDF', selector: row => row.fileId },
  { name: 'Faculty Guide', selector: row => row.facultyGuide },
  {
    name: 'Actions',
    cell: row => (
      <div className="flex gap-2">
        <button onClick={() => alert(`Viewing ${row.Title}`)} className="bg-blue-500 text-white text-xs px-2 py-1 rounded">View</button>
        <button onClick={() => alert(`Editing ${row.Id}`)} className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">Edit</button>
        <button onClick={() => alert(`Deleting ${row.Id}`)} className="bg-red-500 text-white text-xs px-2 py-1 rounded">Delete</button>
      </div>
    ),
    button: true,
  },
];


export const invitedTalksColumn = [
  {
    name: 'Faculty Name',
    selector: row => row.facultyName,
    sortable: true
  },
  {
    name: 'Title of Talk/Session',
    selector: row => row.titleOfTalk,
    wrap: true
  },
  {
    name: 'Event Name',
    selector: row => row.eventName,
    wrap: true
  },
  {
    name: 'Organizing Body',
    selector: row => row.organizingBody
  },
  {
    name: 'Date',
    selector: row => row.date,
    format: row => new Date(row.date).toLocaleDateString()
  },
  {
    name: 'Nature of Engagement',
    selector: row => row.natureOfEngagement // Keynote / Panelist / Speaker
  },
  {
    name: 'Certificate',
    selector: row => row.fileId,
    cell: row => (
      <a
        href={row.certificateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View
      </a>
    )
  }
];

export const booksChaptersColumns = [
  {
    name: 'Title of Book/Chapter',
    selector: row => row.title, // ✅ correct key
    wrap: true,
    sortable: true
  },
  {
    name: 'Publisher',
    selector: row => row.publisher,
    sortable: true
  },
  {
    name: 'ISBN',
    selector: row => row.isbn
  },
  {
    name: 'Year of Publication',
    selector: row => row.yearOfPublication,
    sortable: true
  },
  {
    name: 'Co-authors (if any)',
    selector: row =>
      Array.isArray(row.coAuthors)
        ? row.coAuthors.join(', ')
        : typeof row.coAuthors === 'string'
          ? row.coAuthors.replace(/[\[\]']+/g, '') // clean weird stringified array
          : 'N/A',
    wrap: true
  },
  {
    name: 'Faculty Name',
    selector: row => row.facultyName,
    sortable: true
  }
];
