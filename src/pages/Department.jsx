import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import DepartmentTabs from '../components/DepartmentTabs';
import axios from 'axios';

import DataTable from 'react-data-table-component';
import { convertArrayOfObjectsToCSV } from '../utils/convertArrayOfObjectsToCSV';
import { universalSearch } from '../utils/universalSearch';

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
          response = await axios.get("http://localhost:3000/api/v1/department/mous");
          console.log(response.data)
          setData(response.data.mous);
          setColumn(MoUsColumn);
          break;

        case 'Consultancy Project':
          response = await axios.get("http://localhost:3000/api/v1/department/consultancies");
          console.log(response.data)
          setData(response.data.projects);
          setColumn(CounsultancyProjectColumn);
          break;

        case 'R&D Initiatives':
          response = await axios.get("http://localhost:3000/api/v1/department/rnds");
          console.log(response.data)
          setData(response.data.rdInitiatives);
          setColumn(RDColumn);
          break;

        case 'Event Grant Received':
          response = await axios.get("http://localhost:3000/api/v1/department/event-grants-received");
          console.log(response.data)
          setData(response.data.eventGrants);
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

  const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, [downloadCSV, data]);

  // Context Actions - Shows export button in selection bar
  const contextActions = React.useMemo(() => {
    if (selectedRows.length === 0) return null;
    
    return (
      <button
        className='px-3 py-1 bg-blue-500 hover:bg-blue-700 shadow-sm rounded-md text-white text-sm duration-150'
        onClick={() => downloadCSV(data)}
      >
        Export {selectedRows.length} Selected
      </button>
    );
  }, [selectedRows, downloadCSV, data]);

  const FilteringComponent = () => {
    // Universal Search - searches in all fields automatically
    const filteredItems = universalSearch(data, filterText);
    
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
        />
      </div>
    )
  }


  return (
    <div className="w-full">
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
      <SearchBar placeholder={"Search ..."} onChange={(e) => setFiltertext(e.target.value)} value={filterText} />
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
                data={data} 
                columns={column} 
                actions={actionsMemo}
                selectableRows
                onSelectedRowsChange={handleRowSelected}
                contextActions={contextActions}
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 20, 30, 50, 100]}
              /> : <FilteringComponent />}
          </div>
        </div>
        } 
      </div>
    </div>
  );
};

export default Department;


export const CounsultancyProjectColumn = [
  { name: 'Department Name', selector: row => row.departmentName, sortable: true },
  { name: 'Agency Name', selector: row => row.agencyName, sortable: true },
  { name: 'Date', selector: row => row.date, sortable: true },
  { name: 'Duration', selector: row => row.duration, sortable: true },
  { name: 'Description', selector: row => row.description, sortable: true },
  { name: 'Funding', selector: row => row.funding, sortable: true },
  { name: 'PDF', selector: row => row.pdf, cell: row => <a href={row.pdf} target="_blank" rel="noreferrer">View</a> },
  { name: 'Title of Consultancy', selector: row => row.titleOfConsultancy, sortable: true },
  { name: 'Client/Industry Partner', selector: row => row.clientOrIndustryPartner, sortable: true },
  { name: 'Faculty Lead', selector: row => row.facultyLead, sortable: true },
  { name: 'Amount Sanctioned', selector: row => row.amountSanctioned, sortable: true },
  { name: 'Supporting Documents', selector: row => row.supportingDocs, cell: row => <a href={row.supportingDocs} target="_blank" rel="noreferrer">Download</a> },
];

export const RDColumn = [
  {
    name: "Department Name",
    selector: row => row.departmentName,
    sortable: true,
  },
  {
    name: "Agency Name",
    selector: row => row.agencyName,
    sortable: true,
  },
  {
    name: "Date",
    selector: row => row.date,
    sortable: true,
  },
  {
    name: "Duration",
    selector: row => row.duration,
    sortable: true,
  },
  {
    name: "Description",
    selector: row => row.description,
    wrap: true,
  },
  {
    name: "Funding",
    selector: row => row.funding,
  },
  {
    name: "PDF",
    cell: row => (
      <a href={row.pdf} target="_blank" rel="noopener noreferrer">
        View PDF
      </a>
    ),
  },
  {
    name: "Project Title",
    selector: row => row.projectTitle,
    wrap: true,
  },
  {
    name: "Funding Agency",
    selector: row => row.fundingAgency,
  },
  {
    name: "Principal Investigator (PI)",
    selector: row => row.principalInvestigator,
  },
  {
    name: "Co-Investigator",
    selector: row => row.coInvestigator,
  },
  {
    name: "Budget",
    selector: row => row.budget,
  },
  {
    name: "Output/Patents/Publications",
    selector: row => row.output,
    wrap: true,
  },

]
export const MoUsColumn = [
  { name: "Department Name", selector: row => row.departmentName, sortable: true },
  { name: "Agency Name", selector: row => row.agencyName, sortable: true },
  { name: "Date", selector: row => row.date, sortable: true },
  { name: "Duration", selector: row => row.duration },
  { name: "Description", selector: row => row.description, wrap: true },
  { name: "Funding", selector: row => row.funding },
  {
    name: "MOU PDF",
    cell: row => (
      <a href={row.mouPdfUrl} target="_blank" rel="noopener noreferrer">
        View PDF
      </a>
    ),
  },
  { name: "Title of MoU", selector: row => row.titleOfMoU },
  { name: "Industry/Organization Name", selector: row => row.organizationName },
  { name: "Date of Signing", selector: row => row.dateOfSigning },
  { name: "Validity Period", selector: row => row.validityPeriod },
  { name: "Purpose/Objectives", selector: row => row.purposeObjectives, wrap: true },
  { name: "Fund/Support Received", selector: row => row.fundSupportReceived },
]

export const EventGrantReceivedColumns=[
  { name: "Event Title", selector: row => row.eventTitle, sortable: true },
  { name: "Department Name", selector: row => row.departmentName, sortable: true },
  { name: "Granting Agency", selector: row => row.grantingAgency },
  { name: "Date of Approval", selector: row => row.dateOfApproval },
  { name: "Duration", selector: row => row.duration },
  { name: "Description", selector: row => row.description, wrap: true },
  { name: "Funding", selector: row => row.funding },
  {
    name: "PDF",
    cell: row => (
      <a href={row.pdf} target="_blank" rel="noopener noreferrer">
        View PDF
      </a>
    ),
  },
  { name: "Grand Amount", selector: row => row.grantAmount },
  { name: "Faculty Coordinator", selector: row => row.facultyCoordinator },
  { name: "Purpose", selector: row => row.purpose, wrap: true },
  { name: "Utilization Summary", selector: row => row.utilizationSummary, wrap: true },
];
