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
    setLoading(false);
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
          response = await api.get(`${BASE_URL}/api/v1/students/technicalNontechnicals`);
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
          setData(response.data.hackathonData);
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
  { name: 'Student ID', selector: row => row.studentId, sortable: true, width: '200px', wrap: true },
  { name: 'Student Name', selector: row => row.name, sortable: true, width: '200px', wrap: true },
  { name: 'Enrollment No.', selector: row => row.enrollmentNumber, sortable: true, width: '200px', wrap: true },
  { name: 'Branch', selector: row => row.branch, sortable: true, width: '200px', wrap: true },
  { name: 'Batch', selector: row => row.batch, sortable: true, width: '200px', wrap: true },
  { name: 'Email', selector: row => row.email, sortable: true, width: '200px', wrap: true },
  { name: 'Year', selector: row => row.year, sortable: true, width: '200px', wrap: true },
  { name: 'Course', selector: row => row.course, sortable: true, width: '200px', wrap: true },
  { name: 'CGPA', selector: row => row.cgpa, sortable: true, width: '200px', wrap: true },
  { name: 'Date Of Birth', selector: row => new Date(row.dateOfBirth).toLocaleDateString(), sortable: true, width: '200px', wrap: true },
  { name: 'Gender', selector: row => row.gender, sortable: true, width: '200px', wrap: true },
  { name: 'Category', selector: row => row.category, sortable: true, width: '200px', wrap: true },
  { name: 'Year Of Admission', selector: row => row.yearOfAdmission, sortable: true, width: '300px', wrap: true },
  { name: 'Status', selector: row => row.status || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Github Link', selector: row => row.githubLink ? (<a href={row.githubLink} target='_blank'>{row.githubLink}</a>) : "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'LinkedIn Profile Link', selector: row => row.linkedinProfileLink ? (<a href={row.linkedinProfileLink} target='_blank'>{row.linkinProfileLink}</a>) : "N/A", sortable: true, width: '300px', wrap: true },
  {
    name: 'Guardian Contact Number', selector: row => row.guardianContactNumber
    , sortable: true, width: '300px', wrap: true
  },
  { name: 'Guardian Name', selector: row => row.guardianName, sortable: true, width: '200px', wrap: true },
  { name: 'Address', selector: row => row.address, sortable: true, width: '200px', wrap: true },
  {
    name: 'Certificate',
    cell: row => row.fileId ? (
      <a
        href={`${BASE_URL}/file/${row.fileId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-sm"
      >
        View
      </a>
    ) : "N/A",
    sortable: true, width: '200px', wrap: true
  },
];

const studentTechinalNonTechnicalColumn = [
  { name: 'Student ID', selector: row => row.id || "N/A", sortable: true, width: '250px' },
  { name: 'Student Name', selector: row => row.studentName || "N/A", sortable: true, width: '250px' },
  { name: 'Enrollment No.', selector: row => row.enrollmentNumber || "N/A", sortable: true, width: '250px' },
  { name: 'Branch', selector: row => row.branch || "N/A", sortable: true, width: '250px' },
  { name: 'Batch', selector: row => row.batch || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Email', selector: row => row.email || "N/A", sortable: true, width: '300px', wrap: true },
  { name: 'Year', selector: row => row.year || "N/A", sortable: true, width: '250px' },
  { name: 'Competition Name', selector: row => row.competitionName || "N/A", sortable: true, width: '300px', wrap: true },
  { name: 'Date', selector: row => new Date(row.date).toLocaleDateString() || "N/A", sortable: true, width: '250px', wrap: true },
  { name: 'Team Name', selector: row => row.teamName || "N/A", sortable: true, width: '240px', wrap: true },
  { name: 'Team Size', selector: row => row.teamSize || "N/A", sortable: true, width: '240px', wrap: true },
  { name: 'Mentor Name', selector: row => row.mentorName || "N/A", sortable: true, width: '240px', wrap: true },
  { name: 'Level', selector: row => row.level || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Organiser', selector: row => row.organiser || "N/A", sortable: true, width: '240px', wrap: true },
  { name: 'Venue', selector: row => row.venue || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Problem Statement', selector: row => row.problemStatement || "N/A", sortable: true, width: '300px', wrap: true },
  {
    name: 'Technology Used',
    selector: row => {
      if (!row.technologyUsed || row.technologyUsed.length === 0) return "N/A";

      const value = row.technologyUsed[0];

      // If it's character-indexed object
      if (typeof value == 'object') {
        return Object.values(value).join('');
      }

      return value;

    },
    sortable: true,
    width: '300px',
    wrap: true,
  },
  { name: 'Price Money', selector: row => row.priceMoney || "N/A", sortable: true, width: '250px', wrap: true },
  { name: 'Sponsoring Agency', selector: row => row.sponsoringAgency || "N/A", sortable: true, width: '330px', wrap: true },
  { name: 'Position Secured', selector: row => row.positionSecured || "N/A", sortable: true, width: '330px', wrap: true },
  { name: 'Project Github Link', selector: row => (<a href={row.projectGithubLink}>Link</a>) || "N/A", sortable: true, width: '400px', wrap: true },
  { name: 'Project Description', selector: row => (<a href={row.projectDescription}>Link</a>) || "N/A", sortable: true, width: '400px', wrap: true },
  { name: 'Event Mode', selector: row => row.eventMode || "N/A", sortable: true, width: '240px', wrap: true },
  { name: 'Achievement', selector: row => row.achiecvement || "N/A", sortable: true, width: '200px', wrap: true },

  {
    name: 'Certificate',
    cell: row => row.fileId ? (
      <a
        href={`${BASE_URL}/file/${row.fileId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-sm"
      >
        View
      </a>
    ) : "N/A",
  },
];




export const certificateColumns = [
  { name: 'Student ID', selector: row => row.studentId || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Student Name', selector: row => row.studentName || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Enrollment Number', selector: row => row.enrollmentNumber || "N/A", sortable: true, width: '300px', wrap: true },
  { name: 'Certificate Name', selector: row => row.courseName || "N/A", sortable: true, width: '300px', wrap: true },
  { name: 'Branch', selector: row => row.branch || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Batch', selector: row => row.batch || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Year', selector: row => row.year || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Course', selector: row => row.courseName || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Issuing Organization', selector: row => row.issuingOrganization || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Issue Date', selector: row => new Date(row.issueDate).toLocaleDateString() || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Validity Period', selector: row => row.validityPeriod || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Graded Of Score', selector: row => row.gradeOrScore || "N/A", sortable: true, width: '250px', wrap: true },
  { name: 'Mode Of Learning', selector: row => row.modeOfLearning || "N/A", sortable: true, width: '280px', wrap: true },
  { name: 'Course Duration', selector: row => row.courseDuration || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Rank Or Position', selector: row => row.rankOrPosition || "N/A", sortable: true, width: '200px', wrap: true },
  {
    name: 'Certificate',
    cell: row => row.fileId ? (
      <a
        href={`${BASE_URL}/file/${row.fileId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-sm"
      >
        View
      </a>
    ) : "N/A",
    sortable: true, width: '200px', wrap: true
  },
];

// we dont have technical non technical columns

export const studentPlacementColumns = [
  { name: 'Student ID', selector: row => row.placementId, sortable: true, width: '200px' },
  { name: 'Student Name', selector: row => row.studentName, sortable: true, width: '200px', wrap: true },
  { name: 'Company Name', selector: row => row.companyName, sortable: true, width: '200px', wrap: true },
  { name: 'Company Location', selector: row => row.companyLocation, sortable: true, width: '250px', wrap: true },

  { name: 'Job Role', selector: row => row.roleOffered, sortable: true, width: '200px', wrap: true },
  { name: 'Branch', selector: row => row.branch, sortable: true, width: '200px', wrap: true },
  { name: 'Year', selector: row => row.year, sortable: true, width: '200px', wrap: true },

  { name: 'Placement Type', selector: row => row.placementType, sortable: true, width: '200px', wrap: true },
  { name: 'Package', selector: row => row.package, sortable: true, width: '200px', wrap: true },
  { name: 'Joining Date', selector: row => new Date(row.joiningDate).toLocaleDateString() || "N/A", sortable: true, width: '200px', wrap: true },
  {
    name: 'Offer letter',
    cell: row => row.fileId ? (
      <a
        href={`${BASE_URL}/file/${row.fileId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-sm"
      >
        View
      </a>
    ) : "N/A",
    sortable: true, width: '200px', wrap: true
  },
];

export const studentInternshipColumn = [
  { name: 'Student ID', selector: row => row._id, sortable: true, width: '200px', wrap: true },
  { name: 'Student Name', selector: row => row.name, sortable: true, width: '200px', wrap: true },
  { name: 'Enrollment Number', selector: row => row.enrollmentNumber, sortable: true, width: '250px', wrap: true },
  { name: 'Course', selector: row => row.course, sortable: true, width: '200px', wrap: true },
  { name: 'Branch', selector: row => row.branch, sortable: true, width: '200px', wrap: true },
  { name: 'Category', selector: row => row.category, sortable: true, width: '200px', wrap: true },
  { name: 'CGPA', selector: row => row.cgpa, sortable: true, width: '200px', wrap: true },
  { name: 'Year', selector: row => row.year, sortable: true, width: '200px', wrap: true },
  { name: 'Email', selector: row => row.email, sortable: true, width: '200px', wrap: true },
  { name: 'Gender', selector: row => row.gender, sortable: true, width: '200px', wrap: true },
  { name: 'Date of Birth', selector: row => new Date(row.dateOfBirth).toLocaleDateString() || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Status', selector: row => row.status, sortable: true, width: '200px', wrap: true },
  { name: 'Address', selector: row => row.address, sortable: true, width: '200px', wrap: true },
  { name: 'Guardian Name', selector: row => row.guardianName, sortable: true, width: '200px', wrap: true },
  { name: 'Guardian Contact', selector: row => row.guardianContactNumber, sortable: true, width: '250px', wrap: true },
  {
    name: 'GitHub',
    cell: row => (
      <a href={row.githubLink} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">
        GitHub
      </a>
    ), sortable: true, width: '200px', wrap: true
  },
  {
    name: 'LinkedIn',
    cell: row => (
      <a href={row.linkedinProfileLink} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">
        LinkedIn
      </a>
    ), sortable: true, width: '200px', wrap: true
  },
];

export const researchPaperColumns = [
  { name: 'Student Name', selector: row => row.studentName, sortable: true, width: '300px', wrap: true },
  { name: 'Enrollment Number', selector: row => row.enrollmentNumber, sortable: true, width: '300px', wrap: true },
  { name: 'Branch', selector: row => row.branch, sortable: true, width: '200px', wrap: true },
  { name: 'Batch', selector: row => row.batch, sortable: true, width: '200px', wrap: true },
  { name: 'DOI/ISBN', selector: row => row.doiOrIsbn, sortable: true, width: '300px', wrap: true },
  { name: 'Title of Paper', selector: row => row.titleOfPaper, sortable: true, width: '300px', wrap: true },
  { name: 'Publication Date', selector: row => new Date(row.publicationDate).toLocaleDateString() || "N/A", sortable: true, width: '300px', wrap: true },
  { name: 'Journal/Conference Name', selector: row => row.journalOrConferenceName, sortable: true, width: '300px', wrap: true },
  {
    name: 'Co-Author',
    selector: row => {
      if (!row.coAuthors) return "N/A";
      if (Array.isArray(row.coAuthors)) {
        return row.coAuthors.map(author => author?.memberName || author).filter(Boolean).join(', ') || "N/A";
      }
      return row.coAuthors || "N/A";
    },
    sortable: true,
    width: '300px',
    wrap: true
  },
  {
    name: 'Indexing (SCOPUS, SCI, etc)',
    selector: row => {
      if (!row.indexing) return "N/A";
      if (Array.isArray(row.indexing)) {
        return row.indexing.join(', ') || "N/A";
      }
      return row.indexing || "N/A";
    },
    sortable: true,
    width: '400px',
    wrap: true
  },
  {
    name: 'Certificate',
    cell: row => row.fileId ? (
      <a
        href={`${BASE_URL}/file/${row.fileId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-sm"
      >
        View
      </a>
    ) : "N/A",
    sortable: true, width: '200px', wrap: true
  },
  {
    name: 'Faculty Guide',
    selector: row => {
      if (!row.facultyGuide) return "N/A";
      if (Array.isArray(row.facultyGuide)) {
        return row.facultyGuide.map(guide => guide?.memberName || guide).filter(Boolean).join(', ') || "N/A";
      }
      return row.facultyGuide || "N/A";
    },
    sortable: true,
    width: '300px',
    wrap: true
  },
];


export const publicationColumns = [
  {
    name: 'Student ID',
    selector: row => row.facultyId,
    sortable: true, width: '200px', wrap: true,
    center: true
  },
  {
    name: 'Faculty Name',
    selector: row => row.facultyName,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: 'Title of Paper',
    selector: row => row.titleOfPaper,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: 'Publication Date',
    selector: row => row.publicationDate,
    format: row => new Date(row.publicationDate).toLocaleDateString(),
    sortable: true, width: '200px', wrap: true
  },
  {
    name: 'Journal/Conference Name',
    selector: row => row.journalOrConferenceName,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: 'Co-Author',
    selector: row => row.coAuthors,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: 'Indexing',
    selector: row => row.indexing,
    sortable: true, width: '200px', wrap: true
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
    ), sortable: true, width: '200px', wrap: true
  },
  {
    name: 'ISSN Number',
    selector: row => row.issnNumber,
    sortable: true, width: '200px', wrap: true
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
    ), sortable: true, width: '200px', wrap: true
  },
  {
    name: 'Authors',
    selector: row => row.authors,
    cell: row =>
      Array.isArray(row.authors) ? row.authors.join(', ') : row.authors,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: 'ISSN/ISBN',
    selector: row => row.issnOrIsbn,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: 'Department',
    selector: row => row.department,
    sortable: true, width: '200px', wrap: true
  },
];

export const studentSportsEventColumns = [
  {
    name: "ID",
    selector: row => row.sportsEventId,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Student Name",
    selector: row => row.studentName,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Enrollment Number",
    selector: row => row.enrollmentNumber,
    sortable: true, width: '250px', wrap: true
  },
  {
    name: "Branch",
    selector: row => row.branch,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Batch",
    selector: row => row.batch,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Year",
    selector: row => row.year,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Sports Name",
    selector: row => row.sportsName,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Event Date",
    selector: row => new Date(row.eventDate).toLocaleDateString(),
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Event Name",
    selector: row => row.eventName,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Event Level",
    selector: row => row.eventLevel,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Event Location",
    selector: row => row.eventLocation,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Position",
    selector: row => row.position,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: 'Certificate',
    cell: row => row.fileId ? (
      <a
        href={`${BASE_URL}/file/${row.fileId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-sm"
      >
        View
      </a>
    ) : "N/A",
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Coach Name",
    selector: row => row.coachName,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Organizer",
    selector: row => row.organizer,
    sortable: true, width: '200px', wrap: true
  },
];

export const studentExtraCurricularColumns = [
  {
    name: "ID",
    selector: row => row.eventParticipationId,
    sortable: true, width: '200px', wrap: true,
  },
  {
    name: "Student Name",
    selector: row => row.studentName,
    sortable: true, width: '200px', wrap: true,
  },
  {
    name: "Enrollment Number",
    selector: row => row.enrollmentNumber,
    sortable: true, width: '250px', wrap: true
  },
  {
    name: "Branch",
    selector: row => row.branch,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Batch",
    selector: row => row.batch,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Year",
    selector: row => row.year,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Event Name",
    selector: row => row.eventName,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Event Date",
    selector: row => new Date(row.eventDate).toLocaleDateString(),
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Event Level",
    selector: row => row.eventLevel,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Event Location",
    selector: row => row.eventLocation,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Position",
    selector: row => row.position,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: 'Certificate',
    cell: row => row.fileId ? (
      <a
        href={`${BASE_URL}/file/${row.fileId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-sm"
      >
        View
      </a>
    ) : "N/A",
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Organizer",
    selector: row => row.organizer,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Coach Name",
    selector: row => row.coachName,
    sortable: true, width: '200px', wrap: true
  },
];

export const CapstoneprojectColumns = [
  {
    name: "Project Title",
    selector: row => row.projectTitle,
    sortable: true, width: '200px', wrap: true,
  },
  {
    name: "Team Members",
    selector: row => {
      if (!row.teamMembers) return "N/A";
      if (Array.isArray(row.teamMembers)) {
        return row.teamMembers.map(member => typeof member === 'object' ? member?.memberName || member : member).filter(Boolean).join(', ') || "N/A";
      }
      return row.teamMembers || "N/A";
    },
    sortable: true, width: '200px', wrap: true,
  },
  {
    name: "Guide Name",
    selector: row => row.guideName,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Semester",
    selector: row => row.semester,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Industry Mentor",
    selector: row => {
      if (!row.industryMentor) return "N/A";
      if (Array.isArray(row.industryMentor)) {
        return row.industryMentor.map(mentor => mentor?.memberName || mentor).filter(Boolean).join(', ') || "N/A";
      }
      return row.industryMentor || "N/A";
    },
    sortable: true, width: '200px', wrap: true
  },

];

export const startupColumns = [
  {
    name: "Startup Name",
    selector: row => row.startupName,
    sortable: true, width: '200px', wrap: true,
  },
  {
    name: "Domain",
    selector: row => row.domain,
    sortable: true, width: '200px', wrap: true,
  },
  {
    name: "Incubation Support",
    selector: row => row.incubationSupport || "None",
    sortable: true, width: '250px', wrap: true,
  },
  {
    name: "Current Status",
    selector: row => row.currentStatus,
    sortable: true, width: '200px', wrap: true,
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
      ), sortable: true, width: '200px', wrap: true
  },
];

export const studentHackthonColumns = [
  { name: 'Hackathon Name', selector: row => row.hackathonName || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Organiser', selector: row => row.organizer },
  {
    name: 'Team Details',
    cell: row => {
      if (!row.teamDetails || row.teamDetails.length === 0) {
        return "N/A";
      }

      return (
        <div>
          {row.teamDetails.map((member, index) => (
            <div key={index} style={{ marginBottom: '6px' }}>
              <strong>{member.memberName}</strong>
              <div>{member.role}</div>
            </div>
          ))}
        </div>
      );
    },
    sortable: false,
    width: '250px',
    wrap: true,
  },

  { name: 'Result', selector: row => row.result || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Event Date', selector: row => new Date(row.eventDate).toLocaleDateString() || "N/A", width: '200px', wrap: true },
  { name: 'Team Name', selector: row => row.teamName || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Team Size', selector: row => row.teamSize || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Mentor Name', selector: row => row.mentorName || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Venue', selector: row => row.venue || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Problem Statement', selector: row => row.problemStatement || "N/A", sortable: true, width: '300px', wrap: true },
  {
    name: 'Technolgy used', selector: row => {
      if (!row.technologyUsed || row.technologyUsed.length === 0) return "N/A";

      const value = row.technologyUsed[0];

      // If it's character-indexed object
      if (typeof value === 'object') {
        return Object.values(value).join('');
      }
      // If it's already a string
      return value;
    }, sortable: true, width: '200px', wrap: true
  },
  { name: 'Prize Money', selector: row => row.prizeMoney || "N/A", sortable: true, width: '200px', wrap: true },
  { name: 'Position Secured', selector: row => row.positionSecured || "N/A", sortable: true, width: '300px', wrap: true },
];

export const studentHigherStudies = [
  { name: 'Course Name', selector: row => row.courseName, sortable: true, width: '200px', wrap: true },
  { name: 'Scholarship', selector: row => row.scholarship || 'N/A', sortable: true, width: '200px', wrap: true },
  { name: 'Institute', selector: row => row.instituteName, sortable: true, width: '200px', wrap: true },
  { name: 'City', selector: row => row.city, sortable: true, width: '200px', wrap: true },
  { name: 'Country', selector: row => row.country, sortable: true, width: '200px', wrap: true },
  { name: 'Duration (in years)', selector: row => row.programDuration, sortable: true, width: '300px', wrap: true },
  { name: 'Admission Year', selector: row => row.admissionYear, sortable: true, width: '200px', wrap: true },
  { name: 'Admission Date', selector: row => new Date(row.admissionDate).toLocaleDateString() || "N/A", sortable: true, width: '200px', wrap: true },
];

export const membershipColumns = [
  {
    name: "Organization Name",
    selector: row => row.organizationName,
    sortable: true, width: '250px', wrap: true,
  },
  {
    name: "Membership ID",
    selector: row => row.membershipId,
    sortable: true, width: '250px', wrap: true,
  },
  {
    name: "Date of Joining",
    selector: row => new Date(row.dateOfJoining).toLocaleDateString(),
    sortable: true, width: '250px', wrap: true,
  },
  {
    name: "Membership Status",
    selector: row => row.membershipStatus,
    sortable: true, width: '250px', wrap: true,
  },
];








