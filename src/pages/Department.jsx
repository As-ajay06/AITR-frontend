import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import DateRangeFilter from '../components/DateRangeFilter';
import api from '../utils/axiosInstance';

import DataTable from 'react-data-table-component';
import { convertArrayOfObjectsToCSV } from '../utils/convertArrayOfObjectsToCSV';
import { universalSearch } from '../utils/universalSearch';
import { BASE_URL } from '../../config/config';

// Define exportable columns for each tab
const exportableColumnsByTab = {
  'MoUs': [
    { key: 'departmentName', label: 'Department Name' },
    { key: 'agencyName', label: 'Agency Name' },
    { key: 'date', label: 'Date' },
    { key: 'duration', label: 'Duration' },
    { key: 'description', label: 'Description' },
    { key: 'funding', label: 'Funding' },
    { key: 'titleOfMoU', label: 'Title of MoU' },
    { key: 'organizationName', label: 'Industry/Organization Name' },
    { key: 'dateOfSigning', label: 'Date of Signing' },
    { key: 'validityPeriod', label: 'Validity Period' },
    { key: 'purposeObjectives', label: 'Purpose/Objectives' },
    { key: 'fundSupportReceived', label: 'Fund/Support Received' },
  ],
  'Consultancy Project': [
    { key: 'departmentName', label: 'Department Name' },
    { key: 'agencyName', label: 'Agency Name' },
    { key: 'date', label: 'Date' },
    { key: 'duration', label: 'Duration' },
    { key: 'description', label: 'Description' },
    { key: 'funding', label: 'Funding' },
    { key: 'titleOfConsultancy', label: 'Title of Consultancy' },
    { key: 'clientOrIndustryPartner', label: 'Client/Industry Partner' },
    { key: 'facultyLead', label: 'Faculty Lead' },
    { key: 'amountSanctioned', label: 'Amount Sanctioned' },
  ],
  'R&D Initiatives': [
    { key: 'departmentName', label: 'Department Name' },
    { key: 'agencyName', label: 'Agency Name' },
    { key: 'date', label: 'Date' },
    { key: 'duration', label: 'Duration' },
    { key: 'description', label: 'Description' },
    { key: 'funding', label: 'Funding' },
    { key: 'projectTitle', label: 'Project Title' },
    { key: 'fundingAgency', label: 'Funding Agency' },
    { key: 'principalInvestigator', label: 'Principal Investigator (PI)' },
    { key: 'coInvestigator', label: 'Co-Investigator' },
    { key: 'budget', label: 'Budget' },
    { key: 'output', label: 'Output/Patents/Publications' },
  ],
  'Event Grant Received': [
    { key: 'eventTitle', label: 'Event Title' },
    { key: 'departmentName', label: 'Department Name' },
    { key: 'grantingAgency', label: 'Granting Agency' },
    { key: 'dateOfApproval', label: 'Date of Approval' },
    { key: 'duration', label: 'Duration' },
    { key: 'description', label: 'Description' },
    { key: 'funding', label: 'Funding' },
    { key: 'grantAmount', label: 'Grand Amount' },
    { key: 'facultyCoordinator', label: 'Faculty Coordinator' },
    { key: 'purpose', label: 'Purpose' },
    { key: 'utilizationSummary', label: 'Utilization Summary' },
  ],
};

const Department = () => {
  const [filterText, setFiltertext] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [column, setColumn] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('');

  // State for selected rows and columns
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [showColumnSelector, setShowColumnSelector] = React.useState(false);
  const [selectedColumns, setSelectedColumns] = React.useState([]);
  const [exportableColumns, setExportableColumns] = React.useState([]);

  const tabs = [
    { label: 'MoUs' },
    { label: 'Consultancy Project' },
    { label: 'R&D Initiatives' },
    { label: 'Event Grant Received' },
  ];

  const fetchDataByTab = async (selectedTab) => {
    setLoading(true);
    try {
      let response;
      switch (selectedTab) {

        case 'MoUs':
          response = await api.get("http://localhost:3000/api/v1/department/mous");
          console.log(response.data)
          setData(response.data.mous);
          setFilteredData(response.data.mous);
          setColumn(MoUsColumn);
          break;

        case 'Consultancy Project':
          response = await api.get("http://localhost:3000/api/v1/department/consultancies");
          console.log(response.data)
          setData(response.data.projects);
          setFilteredData(response.data.projects);
          setColumn(CounsultancyProjectColumn);
          break;

        case 'R&D Initiatives':
          response = await api.get("http://localhost:3000/api/v1/department/rnds");
          console.log(response.data)
          setData(response.data.rdInitiatives);
          setFilteredData(response.data.rdInitiatives);
          setColumn(RDColumn);
          break;

        case 'Event Grant Received':
          response = await api.get("http://localhost:3000/api/v1/department/event-grants-received");
          console.log(response.data)
          setData(response.data.eventGrants);
          setFilteredData(response.data.eventGrants);
          setColumn(EventGrantReceivedColumns);
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
    const filename = `department_${tab.toLowerCase().replace(/ /g, '_')}_export.csv`;
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

  const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(filteredData)} />, [downloadCSV, filteredData]);

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
  }, [selectedRows, downloadCSV, data]);

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
            Department Management
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full mb-3"></div>
          <p className="text-sm md:text-base text-slate-600 font-medium">
            View and manage department data across all categories
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
              {filterText.length == 0 ?
                <DataTable
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
                /> : <FilteringComponent />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Department;


export const CounsultancyProjectColumn = [
  { name: 'Department Name', selector: row => row.departmentName, sortable: true, width: '250px', wrap: true },
  { name: 'Agency Name', selector: row => row.agencyName, sortable: true, width: '200px', wrap: true },
  { name: 'Date', selector: row => new Date(row.date).toLocaleString(), sortable: true, width: '200px', wrap: true },
  { name: 'Duration', selector: row => row.duration, sortable: true, width: '200px', wrap: true },
  { name: 'Description', selector: row => row.description, sortable: true, width: '200px', wrap: true },
  { name: 'Funding', selector: row => row.funding, sortable: true, width: '200px', wrap: true },
  {
    name: "PDF Document",
    cell: row =>
      row.fileId ? (
        <a
          href={`${BASE_URL}/file/${row.fileId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View PDF
        </a>
      ) : (
        "Not Uploaded"
      ),
    button: true,
    sortable: true, width: '200px', wrap: true
  },
  { name: 'Title of Consultancy', selector: row => row.titleOfConsultancy, sortable: true, width: '300px', wrap: true },
  { name: 'Client/Industry Partner', selector: row => row.clientOrIndustryPartner, sortable: true, width: '300px', wrap: true },
  { name: 'Faculty Lead', selector: row => row.facultyLead, sortable: true, width: '200px', wrap: true },
  { name: 'Amount Sanctioned', selector: row => row.amountSanctioned, sortable: true, width: '300px', wrap: true },
  {
    name: 'Supporting Documents', selector: row => row.fileId ,
      cell : row => row.fileId ? (
        <a
          href={`${BASE_URL}/file/${row.fileId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View PDF
        </a>
      ) : "N/A" || "N/A" ,
    sortable: true, width: '300px', wrap: true
  },
];

export const RDColumn = [
  {
    name: "Department Name",
    selector: row => row.departmentName,
    cell: row => {
      if (!row.departmentName) return 'N/A';
      if (typeof row.departmentName === 'object' && !Array.isArray(row.departmentName)) {
        return Object.values(row.departmentName).filter(v => v && typeof v === 'string').join('');
      }
      return String(row.departmentName);
    },
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Agency Name",
    selector: row => row.agencyName,
    cell: row => {
      if (!row.agencyName) return 'N/A';
      if (typeof row.agencyName === 'object' && !Array.isArray(row.agencyName)) {
        return Object.values(row.agencyName).filter(v => v && typeof v === 'string').join('');
      }
      return String(row.agencyName);
    },
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Date",
    selector: row => row.date,
    cell: row => row.date ? new Date(row.date).toLocaleDateString() : 'N/A',
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Duration",
    selector: row => row.duration,
    cell: row => {
      if (!row.duration) return 'N/A';
      if (typeof row.duration === 'object' && !Array.isArray(row.duration)) {
        return Object.values(row.duration).filter(v => v && typeof v === 'string').join('');
      }
      return String(row.duration);
    },
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Description",
    selector: row => row.description,
    cell: row => {
      if (!row.description) return 'N/A';
      if (typeof row.description === 'object' && !Array.isArray(row.description)) {
        return Object.values(row.description).filter(v => v && typeof v === 'string').join('');
      }
      return String(row.description);
    },
    sortable: true, width: '450px', wrap: true
  },
  {
    name: "Funding",
    selector: row => row.funding,
    cell: row => {
      if (!row.funding) return 'N/A';
      if (typeof row.funding === 'object' && !Array.isArray(row.funding)) {
        return Object.values(row.funding).filter(v => v && typeof v === 'string').join('');
      }
      return String(row.funding);
    },
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "PDF Document",
    cell: row =>
      row.fileId ? (
        <a
          href={`${BASE_URL}/file/${row.fileId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View PDF
        </a>
      ) : (
        "Not Uploaded"
      ),
    button: true,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Project Title",
    selector: row => row.projectTitle,
    cell: row => {
      if (!row.projectTitle) return 'N/A';
      if (typeof row.projectTitle === 'object' && !Array.isArray(row.projectTitle)) {
        return Object.values(row.projectTitle).filter(v => v && typeof v === 'string').join('');
      }
      return String(row.projectTitle);
    },
    sortable: true, width: '300px', wrap: true
  },
  {
    name: "Funding Agency",
    selector: row => row.fundingAgency,
    cell: row => {
      if (!row.fundingAgency) return 'N/A';
      if (typeof row.fundingAgency === 'object' && !Array.isArray(row.fundingAgency)) {
        return Object.values(row.fundingAgency).filter(v => v && typeof v === 'string').join('');
      }
      return String(row.fundingAgency);
    },
    sortable: true, width: '300px', wrap: true
  },
  {
    name: "Principal Investigator",
    selector: row => row.principalInvestigator,
    cell: row => {
      if (!row.principalInvestigator) return 'N/A';
      if (typeof row.principalInvestigator === 'object' && !Array.isArray(row.principalInvestigator)) {
        return Object.values(row.principalInvestigator).filter(v => v && typeof v === 'string').join('');
      }
      return String(row.principalInvestigator);
    },
    sortable: true, width: '300px', wrap: true
  },
  {
    name: "Co-Investigator",
    selector: row => row.coInvestigator,
    cell: row => {
      if (!row.coInvestigator) return 'N/A';
      if (Array.isArray(row.coInvestigator)) return row.coInvestigator.map(inv => inv.memberName || inv).join(', ');
      if (typeof row.coInvestigator === 'object') return Object.values(row.coInvestigator).filter(v => v && typeof v === 'string').join(', ');
      return String(row.coInvestigator);
    },
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Budget",
    selector: row => row.budget,
    cell: row => {
      if (!row.budget) return 'N/A';
      if (typeof row.budget === 'object' && !Array.isArray(row.budget)) {
        return Object.values(row.budget).filter(v => v && typeof v === 'string').join('');
      }
      return String(row.budget);
    },
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Output / Patents / Publications",
    selector: row => row.output,
    cell: row => {
      if (!row.output) return 'N/A';
      if (typeof row.output === 'object' && !Array.isArray(row.output)) {
        return Object.values(row.output).filter(v => v && typeof v === 'string').join('');
      }
      return String(row.output);
    },
    sortable: true, width: '300px', wrap: true
  },
];

export const MoUsColumn = [
  {
    name: "Department Name",
    selector: row => row.departmentName,
    sortable: true, width: '260px', wrap: true

  },
  {
    name: "Agency Name",
    selector: row => row.agencyName,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Date",
    selector: row => new Date(row.date).toLocaleDateString(),
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Duration (in years)",
    selector: row => row.duration,
    sortable: true, width: '250px', wrap: true
  },
  {
    name: "Description",
    selector: row => row.description,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Funding",
    selector: row => row.funding || "N/A",
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "MoU PDF",
    cell: row =>
      row.fileId ? (
        <a
          href={`${BASE_URL}/file/${row.fileId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View PDF
        </a>
      ) : (
        "Not Uploaded"
      ),
    button: true,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Title of MoU",
    selector: row => row.titleOfMoU,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Industry/Organization Name",
    selector: row => row.organizationName,
    sortable: true, width: '300px', wrap: true
  },
  {
    name: "Date of Signing",
    selector: row => new Date(row.dateOfSigning).toLocaleDateString(),
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Validity Period",
    selector: row => row.validityPeriod,
    sortable: true, width: '200px', wrap: true
  },
  {
    name: "Purpose/Objectives",
    selector: row => row.purposeObjectives,
    sortable: true, width: '300px', wrap: true
  },
  {
    name: "Fund/Support Received",
    selector: row => row.fundSupportReceived || "N/A",
    sortable: true, width: '300px', wrap: true
  },
];



export const EventGrantReceivedColumns = [
  { name: "Event Title", selector: row => row.eventTitle, sortable: true, width: '200px', wrap: true },
  { name: "Department Name", selector: row => row.departmentName, sortable: true, width: '200px', wrap: true },
  { name: "Granting Agency", selector: row => row.grantingAgency, sortable: true, width: '250px', wrap: true },
  { name: "Date of Approval", selector: row => new Date(row.dateOfApproval).toLocaleDateString(), sortable: true, width: '250px', wrap: true },
  { name: "Duration", selector: row => row.duration, sortable: true, width: '250px', wrap: true },
  { name: "Description", selector: row => row.description, sortable: true, width: '200px', wrap: true },
  { name: "Funding", selector: row => row.funding, sortable: true, width: '200px', wrap: true },
  {
    name: "PDF",
    cell: row => row.fileId ? (
      <a href={`${BASE_URL}/file/${row.fileId}`} target="_blank" rel="noopener noreferrer">
        View PDF
      </a>
    ) : "N/A",
    sortable: true, width: '200px', wrap: true
  },
  { name: "Grand Amount", selector: row => row.grantAmount, sortable: true, width: '200px', wrap: true },
  { name: "Faculty Coordinator", selector: row => row.facultyCoordinator, sortable: true, width: '300px', wrap: true },
  { name: "Purpose", selector: row => row.purpose, sortable: true, width: '200px', wrap: true },
  { name: "Utilization Summary", selector: row => row.utilizationSummary, sortable: true, width: '300px', wrap: true },
];
