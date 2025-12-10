import React, { useEffect, useState } from 'react';
import api from '../utils/axiosInstance';
import SearchBar from '../components/SearchBar';
import DateRangeFilter from '../components/DateRangeFilter';
import DataTable from 'react-data-table-component';
import { BASE_URL } from '../../config/config';
import { convertArrayOfObjectsToCSV } from '../utils/convertArrayOfObjectsToCSV';
import { universalSearch } from '../utils/universalSearch';

// Define exportable columns for each tab
const exportableColumnsByTab = {
  'Profile': [
    { key: 'studentId', label: 'Student ID' },
    { key: 'name', label: 'Student Name' },
    { key: 'enrollmentNumber', label: 'Enrollment Number' },
    { key: 'branch', label: 'Branch' },
    { key: 'batch', label: 'Batch' },
    { key: 'email', label: 'Email' },
    { key: 'year', label: 'Year' },
    { key: 'course', label: 'Course' },
    { key: 'cgpa', label: 'CGPA' },
    { key: 'dateOfBirth', label: 'Date of Birth' },
    { key: 'gender', label: 'Gender' },
    { key: 'category', label: 'Category' },
    { key: 'yearOfAdmission', label: 'Year of Admission' },
    { key: 'status', label: 'Status' },
    { key: 'guardianName', label: 'Guardian Name' },
    { key: 'guardianContactNumber', label: 'Guardian Contact' },
    { key: 'address', label: 'Address' },
  ],
  'Certification': [
    { key: 'studentName', label: 'Student Name' },
    { key: 'enrollmentNumber', label: 'Enrollment Number' },
    { key: 'certificateName', label: 'Certificate Name' },
    { key: 'certificateType', label: 'Certificate Type' },
    { key: 'issuingOrganization', label: 'Issuing Organization' },
    { key: 'issueDate', label: 'Issue Date' },
    { key: 'branch', label: 'Branch' },
    { key: 'batch', label: 'Batch' },
  ],
  'Technical/ Non-technical Competitions': [
    { key: 'studentName', label: 'Student Name' },
    { key: 'enrollmentNumber', label: 'Enrollment Number' },
    { key: 'competitionName', label: 'Competition Name' },
    { key: 'date', label: 'Date' },
    { key: 'level', label: 'Level' },
    { key: 'positionSecured', label: 'Position Secured' },
    { key: 'organiser', label: 'Organiser' },
    { key: 'venue', label: 'Venue' },
    { key: 'priceMoney', label: 'Price Money' },
  ],
  'Placement': [
    { key: 'studentName', label: 'Student Name' },
    { key: 'enrollmentNumber', label: 'Enrollment Number' },
    { key: 'companyName', label: 'Company Name' },
    { key: 'jobTitle', label: 'Job Title' },
    { key: 'package', label: 'Package' },
    { key: 'placementDate', label: 'Placement Date' },
    { key: 'branch', label: 'Branch' },
  ],
  'Internship': [
    { key: 'studentName', label: 'Student Name' },
    { key: 'enrollmentNumber', label: 'Enrollment Number' },
    { key: 'companyName', label: 'Company Name' },
    { key: 'internshipTitle', label: 'Internship Title' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
    { key: 'stipend', label: 'Stipend' },
    { key: 'branch', label: 'Branch' },
  ],
  'Reasearch Paper': [
    { key: 'studentName', label: 'Student Name' },
    { key: 'enrollmentNumber', label: 'Enrollment Number' },
    { key: 'titleOfPaper', label: 'Title of Paper' },
    { key: 'publicationDate', label: 'Publication Date' },
    { key: 'journalOrConferenceName', label: 'Journal/Conference Name' },
    { key: 'coAuthors', label: 'Co-Authors' },
    { key: 'indexing', label: 'Indexing' },
    { key: 'facultyGuide', label: 'Faculty Guide' },
  ],
  'Sports': [
    { key: 'studentName', label: 'Student Name' },
    { key: 'enrollmentNumber', label: 'Enrollment Number' },
    { key: 'eventName', label: 'Event Name' },
    { key: 'eventType', label: 'Event Type' },
    { key: 'date', label: 'Date' },
    { key: 'position', label: 'Position' },
    { key: 'level', label: 'Level' },
    { key: 'venue', label: 'Venue' },
  ],
  'Extra Curricular': [
    { key: 'studentName', label: 'Student Name' },
    { key: 'enrollmentNumber', label: 'Enrollment Number' },
    { key: 'activityName', label: 'Activity Name' },
    { key: 'activityType', label: 'Activity Type' },
    { key: 'date', label: 'Date' },
    { key: 'organizer', label: 'Organizer' },
    { key: 'role', label: 'Role' },
  ],
  'Project Work / Capstone Projects': [
    { key: 'studentName', label: 'Student Name' },
    { key: 'enrollmentNumber', label: 'Enrollment Number' },
    { key: 'projectTitle', label: 'Project Title' },
    { key: 'description', label: 'Description' },
    { key: 'technologiesUsed', label: 'Technologies Used' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
    { key: 'facultyGuide', label: 'Faculty Guide' },
  ],
  'Startups/ Entrepreneurial Ventures': [
    { key: 'studentName', label: 'Student Name' },
    { key: 'enrollmentNumber', label: 'Enrollment Number' },
    { key: 'startupName', label: 'Startup Name' },
    { key: 'description', label: 'Description' },
    { key: 'foundingDate', label: 'Founding Date' },
    { key: 'status', label: 'Status' },
    { key: 'website', label: 'Website' },
  ],
  'Hackathons / Innvoation Challenges': [
    { key: 'studentName', label: 'Student Name' },
    { key: 'enrollmentNumber', label: 'Enrollment Number' },
    { key: 'hackathonName', label: 'Hackathon Name' },
    { key: 'date', label: 'Date' },
    { key: 'position', label: 'Position' },
    { key: 'organizer', label: 'Organizer' },
    { key: 'prize', label: 'Prize' },
  ],
  'Higher Studies': [
    { key: 'studentName', label: 'Student Name' },
    { key: 'enrollmentNumber', label: 'Enrollment Number' },
    { key: 'universityName', label: 'University Name' },
    { key: 'programName', label: 'Program Name' },
    { key: 'country', label: 'Country' },
    { key: 'admissionDate', label: 'Admission Date' },
  ],
  'Professional Memberships': [
    { key: 'studentName', label: 'Student Name' },
    { key: 'enrollmentNumber', label: 'Enrollment Number' },
    { key: 'organizationName', label: 'Organization Name' },
    { key: 'membershipType', label: 'Membership Type' },
    { key: 'membershipId', label: 'Membership ID' },
    { key: 'dateOfJoining', label: 'Date of Joining' },
  ],
};

const Student = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [column, setColumn] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('');
  const [filterText, setFiltertext] = useState('');

  // State for selected rows and columns
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [showColumnSelector, setShowColumnSelector] = React.useState(false);
  const [selectedColumns, setSelectedColumns] = React.useState([]);
  const [exportableColumns, setExportableColumns] = React.useState([]);

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
          response = await api.get(`${BASE_URL}/api/v1/students/profiles`);
          console.log(response.data)
          setData(response.data.profiles);
          setColumn(studentProfileColumns);
          break;

        case 'Certification':
          response = await api.get(`${BASE_URL}/api/v1/students/certificates`);
          console.log(response.data);
          setData(response.data.certificates);
          setColumn(certificateColumns);
          break;

        case 'Technical/ Non-technical Competitions':
          response = await api.get(`${BASE_URL}/api/v1/students/skills`);
          console.log(response.data)
          setData(response.data.technicalData);
          setColumn(studentTechinalNonTechnicalColumn);
          break;

        case 'Placement':
          response = await api.get(`${BASE_URL}/api/v1/students/placements`);
          console.log(response.data)
          setData(response.data.placements);
          setColumn(studentPlacementColumns);
          break;

        case 'Internship':
          response = await api.get(`${BASE_URL}/api/v1/students/profiles`);
          console.log(response.data)
          setData(response.data.profiles);
          setColumn(studentInternshipColumn);
          break;

        case 'Reasearch Paper':
          response = await api.get(`${BASE_URL}/api/v1/students/research-papers`);
          console.log(response.data)
          setData(response.data.researchPapers);
          setColumn(researchPaperColumns);
          // we dont have reaserach paper column here
          break;

        case 'Sports':
          response = await api.get(`${BASE_URL}/api/v1/students/sports`);
          console.log(response.data)
          setData(response.data.sportsData);
          setColumn(studentSportsEventColumns);
          break;

        case 'Extra Curricular':
          response = await api.get(`${BASE_URL}/api/v1/students/extracurriculars`);
          console.log(response.data)
          setData(response.data.extraCurriculars);
          setColumn(studentExtraCurricularColumns);
          break;

        case 'Project Work / Capstone Projects':
          response = await api.get(`${BASE_URL}/api/v1/students/projects`);
          console.log(response.data)
          setData(response.data.projectWorks);
          setColumn(CapstoneprojectColumns);
          break;

        case 'Startups/ Entrepreneurial Ventures':
          response = await api.get(`${BASE_URL}/api/v1/students/startups`);
          console.log(response.data)
          setData(response.data.startupsData);
          setColumn(startupColumns);
          break;

        case 'Hackathons / Innvoation Challenges':
          response = await api.get(`${BASE_URL}/api/v1/students/hackathons`);
          console.log(response.data)
          setData(response.data.hackathons);
          setColumn(studentHackthonColumns);
          break;

        case 'Higher Studies':
          response = await api.get(`${BASE_URL}/api/v1/students/higher-studies`);
          console.log(response.data)
          setData(response.data.higherStudies);
          setColumn(studentHigherStudies);
          break;


        case 'Professional Memberships':
          response = await api.get(`${BASE_URL}/api/v1/students/memberships`);
          console.log(response.data)
          setData(response.data.membershipCertificates);
          setColumn(membershipColumns);
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
    const filename = `student_${tab.toLowerCase().replace(/ /g, '_').replace(/[()]/g, '')}_export.csv`;
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
        className='px-3 py-1 bg-green-500 hover:bg-green-700 shadow-sm rounded-md text-white text-sm duration-150'
        onClick={() => setShowColumnSelector(!showColumnSelector)}
      >
        Select Columns ({selectedColumns.length})
      </button>
      <button
        className='px-3 py-1 bg-blue-500 hover:bg-blue-700 shadow-sm rounded-md text-white text-sm duration-150'
        onClick={e => onExport(e.target.value)}
      >
        Export Data {selectedRows.length > 0 ? `(${selectedRows.length} rows)` : '(All)'}
      </button>
    </div>
  );

  const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(filteredData)} />, [downloadCSV, filteredData, selectedRows, selectedColumns]);

  // Context Actions - Shows export button in selection bar
  const contextActions = React.useMemo(() => {
    if (selectedRows.length === 0) return null;

    return (
      <button
        className='px-3 py-1 bg-blue-500 hover:bg-blue-700 shadow-sm rounded-md text-white text-sm duration-150'
        onClick={() => downloadCSV(filteredData)}
      >
        Export {selectedRows.length} Selected
      </button>
    );
  }, [selectedRows, downloadCSV, filteredData]);

  const FilteringComponent = () => {
    // Universal Search - searches in all fields automatically
    const filteredItems = universalSearch(filteredData, filterText);

    return (
      <div
        className="overflow-x-auto w-full"
        style={{
          overflowX: 'auto',
          overflowY: 'visible',
          WebkitOverflowScrolling: 'touch',
          minWidth: '100%'
        }}
        onWheel={(e) => {
          // Enable horizontal scroll with Shift + Mouse Wheel
          if (e.shiftKey) {
            e.preventDefault();
            e.currentTarget.scrollLeft += e.deltaY;
          }
          // Also enable horizontal scroll when at horizontal edge
          const element = e.currentTarget;
          const isAtLeftEdge = element.scrollLeft === 0;
          const isAtRightEdge = element.scrollLeft + element.clientWidth >= element.scrollWidth - 1;
          if ((isAtLeftEdge && e.deltaY < 0) || (isAtRightEdge && e.deltaY > 0)) {
            e.preventDefault();
            element.scrollLeft += e.deltaY;
          }
        }}
      >
        <DataTable
          data={filteredItems}
          columns={column}
          actions={actionsMemo}
          selectableRows
          onSelectedRowsChange={handleRowSelected}
          contextActions={contextActions}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30, 50, 100]}
          customStyles={{
            headCells: {
              style: {
                fontSize: '16px',
                fontWeight: '600',
              },
            },
          }}
        />
      </div>
    )
  }

  return (
    <div className="w-full px-4">
      {/* Header */}
      <div className="mt-4 mb-6 text-center">
        <div className="inline-block">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-slate-800 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Student Management
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full mb-3"></div>
          <p className="text-sm md:text-base text-slate-600 font-medium">
            View and manage student data across all categories
          </p>
        </div>
      </div>

      {/* Search Bar and Date Filter */}
      <div className="mb-6 flex gap-4 items-center flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <SearchBar
            placeholder={"Filter by ID, name, or department"}
            onChange={(e) => setFiltertext(e.target.value)}
            value={filterText}
          />
        </div>
        <DateRangeFilter
          onDateRangeChange={setFilteredData}
          data={data}
        />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 mb-6 overflow-x-auto">
        <div className="flex flex-wrap gap-2 min-w-max">
          {tabs.map(({ label }) => (
            <button
              key={label}
              onClick={() => setTab(label)}
              className="whitespace-nowrap"
            >
              <div className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${tab === label
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}>
                {label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Display loading or table */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200">
        {loading ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 font-medium">Loading data...</p>
          </div>
        ) : (
          <div className="p-4">
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

            <div
              className="overflow-x-auto w-full"
              style={{
                overflowX: 'auto',
                overflowY: 'visible',
                WebkitOverflowScrolling: 'touch',
                minWidth: '100%'
              }}
              onWheel={(e) => {
                // Enable horizontal scroll with Shift + Mouse Wheel
                if (e.shiftKey) {
                  e.preventDefault();
                  e.currentTarget.scrollLeft += e.deltaY;
                }
                // Also enable horizontal scroll when at horizontal edge
                const element = e.currentTarget;
                const isAtLeftEdge = element.scrollLeft === 0;
                const isAtRightEdge = element.scrollLeft + element.clientWidth >= element.scrollWidth - 1;
                if ((isAtLeftEdge && e.deltaY < 0) || (isAtRightEdge && e.deltaY > 0)) {
                  e.preventDefault();
                  element.scrollLeft += e.deltaY;
                }
              }}
            >
              {filterText.length == 0 ? (
                <DataTable
                  key={`table-${tab}-${filteredData.length}`}
                  data={filteredData}
                  columns={column}
                  actions={actionsMemo}
                  selectableRows
                  onSelectedRowsChange={handleRowSelected}
                  contextActions={contextActions}
                  pagination
                  paginationPerPage={10}
                  paginationRowsPerPageOptions={[10, 20, 30, 50, 100]}
                  customStyles={{
                    table: {
                      style: {
                        tableLayout: "fixed",
                      },
                    },
                    headCells: {
                      style: {
                        whiteSpace: "nowrap",
                        fontSize: "18px",     // ⬆ Bigger header font
                        fontWeight: "700",
                      },
                    },
                    cells: {
                      style: {
                        whiteSpace: "nowrap",
                        fontSize: "16px",     // ⬆ Bigger row font
                        paddingTop: "12px",
                        paddingBottom: "12px",
                      },
                    },
                  }}
                />
              ) : (
                <FilteringComponent />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Student;




// columns

export const studentProfileColumns = [
  { name: 'Student ID', selector: row => row.studentId, sortable: true, width: '200px', wrap: false },
  { name: 'Student Name', selector: row => row.name, sortable: true, width: '200px', wrap: false },
  { name: 'Enrollment No.', selector: row => row.enrollmentNumber, sortable: true, width: '200px', wrap: false },
  { name: 'Branch', selector: row => row.branch, sortable: true, width: '200px', wrap: false },
  { name: 'Batch', selector: row => row.batch, sortable: true, width: '200px', wrap: false },
  { name: 'Email', selector: row => row.email, sortable: true, width: '200px', wrap: false },
  { name: 'Year', selector: row => row.year, sortable: true, width: '200px', wrap: false },
  { name: 'Course', selector: row => row.course, sortable: true, width: '200px', wrap: false },
  { name: 'CGPA', selector: row => row.cgpa, sortable: true, width: '200px', wrap: false },
  { name: 'Date Of Birth', selector: row => row.dateOfBirth, sortable: true, width: '200px', wrap: false },
  { name: 'Gender', selector: row => row.gender, sortable: true, width: '200px', wrap: false },
  { name: 'Category', selector: row => row.category, sortable: true, width: '200px', wrap: false },
  { name: 'Year Of Admission', selector: row => row.yearOfAdmission, sortable: true, width: '300px', wrap: false },
  { name: 'Status', selector: row => row.status || "N/A" , sortable: true, width: '200px', wrap: false },
  { name: 'Github Link', selector: row => row.githubLink ? ( <a href={row.githubLink} target='_blank'>{row.githubLink}</a>) : "N/A", sortable: true, width: '200px', wrap: false },
  { name: 'LinkedIn Profile Link', selector: row => row.linkedinProfileLink ? (<a href={row.linkedinProfileLink} target='_blank'>{row.linkinProfileLink}</a>) : "N/A" , sortable: true, width: '300px', wrap: false },
  {
    name: 'Guardian Contact Number', selector: row => row.guardianContactNumber
    , sortable: true, width: '300px', wrap: false
  },
  { name: 'Guardian Name', selector: row => row.guardianName, sortable: true, width: '200px', wrap: false },
  { name: 'Address', selector: row => row.address, sortable: true, width: '200px', wrap: false },
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
];

export const studentTechinalNonTechnicalColumn = [
  { name: 'Student ID', selector: row => row.id, sortable: true, width: '70px' },
  { name: 'Student Name', selector: row => row.studentName, sortable: true },
  { name: 'Enrollment No.', selector: row => row.enrollmentNumber },
  { name: 'Branch', selector: row => row.branch },
  { name: 'Batch', selector: row => row.batch, sortable: true, width: '200px', wrap: false },
  { name: 'Email', selector: row => row.email },
  { name: 'Year', selector: row => row.year },
  { name: 'Competition Name', selector: row => row.competitionName, sortable: true, width: '200px', wrap: false },
  { name: 'Date', selector: row => row.date, sortable: true, width: '200px', wrap: false },
  { name: 'Team Name', selector: row => row.teamName, sortable: true, width: '200px', wrap: false },
  { name: 'Team Size', selector: row => row.teamSize, sortable: true, width: '200px', wrap: false },
  { name: 'Mentor Name', selector: row => row.mentorName, sortable: true, width: '200px', wrap: false },
  { name: 'Level', selector: row => row.level, sortable: true, width: '200px', wrap: false },
  { name: 'Organiser', selector: row => row.organiser, sortable: true, width: '200px', wrap: false },
  { name: 'Venue', selector: row => row.venue, sortable: true, width: '200px', wrap: false },
  { name: 'Problem Statement', selector: row => row.problemStatement, sortable: true, width: '200px', wrap: false },
  { name: 'Technology Used', selector: row => row.technologyUsed, sortable: true, width: '200px', wrap: false },
  { name: 'Price Money', selector: row => row.priceMoney, sortable: true, width: '200px', wrap: false },
  { name: 'Sponsoring Agency', selector: row => row.sponsoringAgency, sortable: true, width: '200px', wrap: false },
  { name: 'Position Secured', selector: row => row.positionSecured, sortable: true, width: '200px', wrap: false },
  { name: 'Project Git-hub Link', selector: row => (<a href={row.projectGithubLink}>Link</a>), sortable: true, width: '200px', wrap: false },
  { name: 'Project Description', selector: row => (<a href={row.projectDescription}>Link</a>), sortable: true, width: '200px', wrap: false },
  { name: 'Event Mode', selector: row => row.eventMode, sortable: true, width: '200px', wrap: false },
  { name: 'Achievement', selector: row => row.achiecvement, sortable: true, width: '200px', wrap: false },

  {
    name: 'Certificate',
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
];




export const certificateColumns = [
  { name: 'Student ID', selector: row => row.studentId || "N/A" , sortable: true, width: '200px', wrap: false },
  { name: 'Student Name', selector: row => row.studentName || "N/A", sortable: true, width: '200px', wrap: false },
  { name: 'Enrollment Number', selector: row => row.enrollmentNumber || "N/A", sortable: true, width: '300px', wrap: false },
  { name: 'Certificate Name', selector: row => row.courseName || "N/A", sortable: true, width: '300px', wrap: false },
  { name: 'Branch', selector: row => row.branch || "N/A", sortable: true, width: '200px', wrap: false },
  { name: 'Batch', selector: row => row.batch || "N/A", sortable: true, width: '200px', wrap: false },
  { name: 'Year', selector: row => row.year || "N/A", sortable: true, width: '200px', wrap: false },
  { name: 'Course', selector: row => row.courseName || "N/A", sortable: true, width: '200px', wrap: false },
  { name: 'Issuing Organization', selector: row => row.issuingOrganization || "N/A", sortable: true, width: '200px', wrap: false },
  { name: 'Issue Date', selector: row => row.issueDate || "N/A", sortable: true, width: '200px', wrap: false },
  { name: 'Validity Period', selector: row => row.validityPeriod || "N/A", sortable: true, width: '200px', wrap: false },
  { name: 'Graded Of Score', selector: row => row.gradeOrScore || "N/A", sortable: true, width: '200px', wrap: false },
  { name: 'Mode Of Learning', selector: row => row.modeOfLearning || "N/A", sortable: true, width: '280px', wrap: false },
  { name: 'Course Duration', selector: row => row.courseDuration || "N/A", sortable: true, width: '200px', wrap: false },
  { name: 'Rank Or Position', selector: row => row.rankOrPosition || "N/A", sortable: true, width: '200px', wrap: false },
  { name: 'Certificate Description', selector: row => row.certificateDescription || "N/A", sortable: true, width: '300px', wrap: false },
  { name: 'Relevance To Program Or Branch', selector: row => row.relevanceToProgramOrBranch || "N/A", sortable: true, width: '350px', wrap: false },


  {
    name: 'Certificate Link',
    cell: row => row.fileId ? (
      <a href={row.fileId} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
        View
      </a>
    ) : "N/A", sortable: true, width: '200px', wrap: false
  },
];

// we dont have technical non technical columns

export const studentPlacementColumns = [
  { name: 'Student ID', selector: row => row.placementId, sortable: true, width: '200px' },
  { name: 'Student Name', selector: row => row.studentName, sortable: true, width: '200px', wrap: false },
  { name: 'Company Name', selector: row => row.companyName, sortable: true, width: '200px', wrap: false },
  { name: 'Company Location', selector: row => row.companyLocation, sortable: true, width: '250px', wrap: false },

  { name: 'Job Role', selector: row => row.roleOffered, sortable: true, width: '200px', wrap: false },
  { name: 'Branch', selector: row => row.branch, sortable: true, width: '200px', wrap: false },
  { name: 'Year', selector: row => row.year, sortable: true, width: '200px', wrap: false },

  { name: 'Placement Type', selector: row => row.placementType, sortable: true, width: '200px', wrap: false },
  { name: 'Package', selector: row => row.package, sortable: true, width: '200px', wrap: false },
  { name: 'Joining Date', selector: row => new Date(row.joiningDate).toLocaleDateString() || "N/A" , sortable: true, width: '200px', wrap: false },
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
    ), sortable: true, width: '200px', wrap: false
  },
];

export const studentInternshipColumn = [
  { name: 'Student ID', selector: row => row._id, sortable: true, width: '200px', wrap: false },
  { name: 'Student Name', selector: row => row.name, sortable: true, width: '200px', wrap: false },
  { name: 'Enrollment Number', selector: row => row.enrollmentNumber, sortable: true, width: '250px', wrap: false },
  { name: 'Course', selector: row => row.course, sortable: true, width: '200px', wrap: false },
  { name: 'Branch', selector: row => row.branch, sortable: true, width: '200px', wrap: false },
  { name: 'Category', selector: row => row.category, sortable: true, width: '200px', wrap: false },
  { name: 'CGPA', selector: row => row.cgpa, sortable: true, width: '200px', wrap: false },
  { name: 'Year', selector: row => row.year, sortable: true, width: '200px', wrap: false },
  { name: 'Email', selector: row => row.email, sortable: true, width: '200px', wrap: false },
  { name: 'Gender', selector: row => row.gender, sortable: true, width: '200px', wrap: false },
  { name: 'Date of Birth', selector: row => row.dateOfBirth, sortable: true, width: '200px', wrap: false },
  { name: 'Status', selector: row => row.status, sortable: true, width: '200px', wrap: false },
  { name: 'Address', selector: row => row.address, sortable: true, width: '200px', wrap: false },
  { name: 'Guardian Name', selector: row => row.guardianName, sortable: true, width: '200px', wrap: false },
  { name: 'Guardian Contact', selector: row => row.guardianContactNumber, sortable: true, width: '250px', wrap: false },
  {
    name: 'GitHub',
    cell: row => (
      <a href={row.githubLink} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">
        GitHub
      </a>
    ), sortable: true, width: '200px', wrap: false
  },
  {
    name: 'LinkedIn',
    cell: row => (
      <a href={row.linkedinProfileLink} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">
        LinkedIn
      </a>
    ), sortable: true, width: '200px', wrap: false
  },
];

export const researchPaperColumns = [
  { name: 'Student Name', selector: row => row.studentName, sortable: true, width: '300px', wrap: false },
  { name: 'Enrollment Number', selector: row => row.enrollmentNumber, sortable: true, width: '300px', wrap: false },
  { name: 'Branch', selector: row => row.branch, sortable: true, width: '200px', wrap: false },
  { name: 'Batch', selector: row => row.batch, sortable: true, width: '200px', wrap: false },
  { name: 'DOI/ISBN', selector: row => row.doiOrIsbn, sortable: true, width: '300px', wrap: false },
  { name: 'Title of Paper', selector: row => row.titleOfPaper, sortable: true, width: '300px', wrap: false },
  { name: 'Publication Date', selector: row => row.publicationDate, sortable: true, width: '300px', wrap: false },
  { name: 'Journal/Conference Name', selector: row => row.journalOrConferenceName, sortable: true, width: '300px', wrap: false },
  { name: 'Co-Author', selector: row => row.coAuthors, sortable: true, width: '300px', wrap: false },
  { name: 'Indexing (SCOPUS, SCI, etc)', selector: row => row.indexing, sortable: true, width: '400px', wrap: false },
  {
    name: 'Paper PDF',
    cell: row => (
      <a href={row.paperPdfLink} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">
        View
      </a>
    ), sortable: true, width: '200px', wrap: false
  },
  { name: 'Faculty Guide', selector: row => row.facultyGuide, sortable: true, width: '300px', wrap: false },
];


export const publicationColumns = [
  {
    name: 'Student ID',
    selector: row => row.facultyId,
    sortable: true, width: '200px', wrap: false,
    center: true
  },
  {
    name: 'Faculty Name',
    selector: row => row.facultyName,
    sortable: true, width: '200px', wrap: false
  },
  {
    name: 'Title of Paper',
    selector: row => row.titleOfPaper,
    sortable: true, width: '200px', wrap: false
  },
  {
    name: 'Publication Date',
    selector: row => row.publicationDate,
    format: row => new Date(row.publicationDate).toLocaleDateString(),
    sortable: true, width: '200px', wrap: false
  },
  {
    name: 'Journal/Conference Name',
    selector: row => row.journalOrConferenceName,
    sortable: true, width: '200px', wrap: false
  },
  {
    name: 'Co-Author',
    selector: row => row.coAuthors,
    sortable: true, width: '200px', wrap: false
  },
  {
    name: 'Indexing',
    selector: row => row.indexing,
    sortable: true, width: '200px', wrap: false
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
    ), sortable: true, width: '200px', wrap: false
  },
  {
    name: 'ISSN Number',
    selector: row => row.issnNumber,
    sortable: true, width: '200px', wrap: false
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
    ), sortable: true, width: '200px', wrap: false
  },
  {
    name: 'Authors',
    selector: row => row.authors,
    cell: row =>
      Array.isArray(row.authors) ? row.authors.join(', ') : row.authors,
    sortable: true, width: '200px', wrap: false
  },
  {
    name: 'ISSN/ISBN',
    selector: row => row.issnOrIsbn,
    sortable: true, width: '200px', wrap: false
  },
  {
    name: 'Department',
    selector: row => row.department,
    sortable: true, width: '200px', wrap: false
  },
];

export const studentSportsEventColumns = [
  {
    name: "ID",
    selector: row => row.sportsEventId,
    sortable: true, width: '200px', wrap: false
  },
  {
    name: "Student Name",
    selector: row => row.studentName,
    sortable: true, width: '200px', wrap: false
  },
  {
    name: "Enrollment Number",
    selector: row => row.enrollmentNumber,
    sortable: true, width: '250px', wrap: false
  },
  {
    name: "Branch",
    selector: row => row.branch,
    sortable: true, width: '200px', wrap: false
  },
  {
    name: "Batch",
    selector: row => row.batch,
    sortable: true, width: '200px', wrap: false
  },
  {
    name: "Year",
    selector: row => row.year,
    sortable: true, width: '200px', wrap: false
  },
  {
    name: "Sports Name",
    selector: row => row.sportsName,
    sortable: true, width: '200px', wrap: false
  },
  {
    name: "Event Date",
    selector: row => new Date(row.eventDate).toLocaleDateString(),
    sortable: true, width: '200px', wrap: false
  },
  {
    name: "Event Name",
    selector: row => row.eventName,
    sortable: true, width: '200px', wrap: false
  },
  {
    name: "Event Level",
    selector: row => row.eventLevel,
    sortable: true, width: '200px', wrap: false
  },
  {
    name: "Event Location",
    selector: row => row.eventLocation,
    sortable: true, width: '200px', wrap: false
  },
  {
    name: "Position",
    selector: row => row.position,
    sortable: true, width: '200px', wrap: false
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
      ), sortable: true, width: '200px', wrap: false
  },
  {
    name: "Coach Name",
    selector: row => row.coachName,
    sortable: true, width: '200px', wrap: false
  },
  {
    name: "Organizer",
    selector: row => row.organizer,
    sortable: true, width: '200px', wrap: false
  },
];

export const studentExtraCurricularColumns = [
  {
    name: "ID",
    selector: row => row.eventParticipationId,
    sortable: true, width: '200px', wrap: false,
  },
  {
    name: "Student Name",
    selector: row => row.studentName,
    sortable: true, width: '200px', wrap: false,
  },
  {
    name: "Enrollment Number",
    selector: row => row.enrollmentNumber,
    sortable: true, width: '250px', wrap: false
  },
  {
    name: "Branch",
    selector: row => row.branch,
    sortable: true, width: '200px', wrap: false
  },
  {
    name: "Batch",
    selector: row => row.batch,
    sortable: true, width: '200px', wrap: false
  },
  {
    name: "Year",
    selector: row => row.year,
    sortable: true, width: '200px', wrap: false
  },
  {
    name: "Event Name",
    selector: row => row.eventName,
    sortable: true, width: '200px', wrap: false
  },
  {
    name: "Event Date",
    selector: row => new Date(row.eventDate).toLocaleDateString(),
    sortable: true, width: '200px', wrap: false
  },
  {
    name: "Event Level",
    selector: row => row.eventLevel,
    sortable: true, width: '200px', wrap: false
  },
  {
    name: "Event Location",
    selector: row => row.eventLocation,
    sortable: true, width: '200px', wrap: false
  },
  {
    name: "Position",
    selector: row => row.position,
    sortable: true, width: '200px', wrap: false
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
      ), sortable: true, width: '200px', wrap: false
  },
  {
    name: "Organizer",
    selector: row => row.organizer,
    sortable: true, width: '200px', wrap: false
  },
  {
    name: "Coach Name",
    selector: row => row.coachName,
    sortable: true, width: '200px', wrap: false
  },
];

export const CapstoneprojectColumns = [
  {
    name: "Project Title",
    selector: row => row.projectTitle,
    sortable: true, width: '200px', wrap: false,
  },
  {
    name: "Team Members",
    selector: row => row.teamMembers?.join(", "),
    sortable: true, width: '200px', wrap: false,
  },
  {
    name: "Guide Name",
    selector: row => row.guideName,
    sortable: true, width: '200px', wrap: false
  },
  {
    name: "Semester",
    selector: row => row.semester,
    sortable: true, width: '200px', wrap: false
  },
  {
    name: "Industry Mentor",
    selector: row => row.industryMentor || "N/A",
    sortable: true, width: '200px', wrap: false
  },
  {
    name: "Project Outcome",
    selector: row => row.projectOutcome,
    sortable: true, width: '200px', wrap: false
  },
];

export const startupColumns = [
  {
    name: "Startup Name",
    selector: row => row.startupName,
    sortable: true, width: '200px', wrap: false,
  },
  {
    name: "Domain",
    selector: row => row.domain,
    sortable: true, width: '200px', wrap: false,
  },
  {
    name: "Incubation Support",
    selector: row => row.incubationSupport || "None",
    sortable: true, width: '250px', wrap: false,
  },
  {
    name: "Current Status",
    selector: row => row.currentStatus,
    sortable: true, width: '200px', wrap: false,
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
      ), sortable: true, width: '200px', wrap: false
  },
];

export const studentHackthonColumns = [
  { name: 'Hackathon Name', selector: row => row.hackathonName, sortable: true, width: '250px', wrap: false },
  { name: 'Organiser', selector: row => row.organizer, sortable: true, width: '200px', wrap: false },
  { name: 'Team Details', selector: row => row.teamDetails, sortable: true, width: '200px', wrap: false },
  { name: 'Result', selector: row => row.result, sortable: true, width: '200px', wrap: false },
  { name: 'Event Date', selector: row => row.eventDate, sortable: true, width: '200px', wrap: false },
  { name: 'Team Name', selector: row => row.teamName, sortable: true, width: '200px', wrap: false },
  { name: 'Team Size', selector: row => row.teamSize, sortable: true, width: '200px', wrap: false },
  { name: 'Mentor Name', selector: row => row.mentorName, sortable: true, width: '200px', wrap: false },
  { name: 'Venue', selector: row => row.venue, sortable: true, width: '200px', wrap: false },
  { name: 'Problem Statement', selector: row => <p 
    className='w-fit'>{row.problemStatement}</p>, sortable: true, width: '250px', wrap: false },
  { name: 'Technology Used', selector: row => row.technologyUsed, sortable: true, width: '250px', wrap: false },
  { name: 'Prize Money', selector: row => row.prizeMoney, sortable: true, width: '200px', wrap: false },
  { name: 'Position Secured', selector: row => row.positionSecured, sortable: true, width: '300px', wrap: false },
];

export const studentHigherStudies = [
  { name: 'Course Name', selector: row => row.courseName, sortable: true, width: '200px', wrap: false },
  { name: 'Scholarship', selector: row => row.scholarship || 'N/A', sortable: true, width: '200px', wrap: false },
  { name: 'Institute', selector: row => row.instituteName, sortable: true, width: '200px', wrap: false },
  { name: 'City', selector: row => row.city, sortable: true, width: '200px', wrap: false },
  { name: 'Country', selector: row => row.country, sortable: true, width: '200px', wrap: false },
  { name: 'Duration (in years)', selector: row => row.programDuration, sortable: true, width: '300px', wrap: false },
  { name: 'Admission Year', selector: row => row.admissionYear, sortable: true, width: '200px', wrap: false },
  { name: 'Admission Date', selector: row => row.admissionDate, sortable: true, width: '200px', wrap: false },
];

export const membershipColumns = [
  {
    name: "Organization Name",
    selector: row => row.organizationName,
    sortable: true, width: '250px', wrap: false,
  },
  {
    name: "Membership ID",
    selector: row => row.membershipId,
    sortable: true, width: '250px', wrap: false,
  },
  {
    name: "Date of Joining",
    selector: row => new Date(row.dateOfJoining).toLocaleDateString(),
    sortable: true, width: '250px', wrap: false,
  },
  {
    name: "Membership Status",
    selector: row => row.membershipStatus,
    sortable: true, width: '250px', wrap: false,
  },
];








