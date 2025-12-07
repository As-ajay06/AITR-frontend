import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import DateRangeFilter from '../components/DateRangeFilter';
import api from '../utils/axiosInstance';

import DataTable from 'react-data-table-component';
import { convertArrayOfObjectsToCSV } from '../utils/convertArrayOfObjectsToCSV';
import { universalSearch } from '../utils/universalSearch';

// Define exportable columns for each tab
const exportableColumnsByTab = {
  'MOU': [
    { key: 'agencyName', label: 'Agency Name' },
    { key: 'date', label: 'Date' },
    { key: 'duration', label: 'Duration' },
    { key: 'description', label: 'Description' },
    { key: 'funding', label: 'Funding' },
  ],
  'Consultancy': [
    { key: 'agencyName', label: 'Agency Name' },
    { key: 'date', label: 'Date' },
    { key: 'duration', label: 'Duration' },
    { key: 'description', label: 'Description' },
    { key: 'funding', label: 'Funding' },
  ],
  'R&D': [
    { key: 'agencyName', label: 'Agency Name' },
    { key: 'date', label: 'Date' },
    { key: 'duration', label: 'Duration' },
    { key: 'description', label: 'Description' },
    { key: 'funding', label: 'Funding' },
  ],
  'Event Grant ': [
    { key: 'eventName', label: 'Event Name' },
    { key: 'eventType', label: 'Type of the Event' },
    { key: 'agencyName', label: 'Agency Name' },
    { key: 'date', label: 'Date' },
    { key: 'duration', label: 'Duration' },
    { key: 'description', label: 'Description' },
    { key: 'funding', label: 'Funding' },
  ],
  'Event Grant Organized': [
    { key: 'eventName', label: 'Event Name' },
    { key: 'eventType', label: 'Type of the Event' },
    { key: 'agencyName', label: 'Agency Name' },
    { key: 'category', label: 'Category' },
    { key: 'numberOfParticipants', label: 'Number of Participants' },
    { key: 'date', label: 'Date' },
    { key: 'duration', label: 'Duration' },
    { key: 'discription', label: 'Description' },
    { key: 'funding', label: 'Funding' },
  ],
  'Institute Documents': [
    { key: 'aictePdf', label: 'AICTE Affiliation PDF' },
    { key: 'rgpvPdf', label: 'RGPV PDF' },
    { key: 'societyPdf', label: 'Society PDF' },
    { key: 'byLawsPdf', label: 'By Laws PDF' },
  ],
};

const Institute = () => {
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
    { label: 'MOU' },
    { label: 'Consultancy' },
    { label: 'R&D' },
    { label: 'Event Grant ' },
    { label: 'Event Grant Organized' },
    { label: 'Institute Documents' },
  ];

  const fetchDataByTab = async (selectedTab) => {
    setLoading(true);
    try {
      let response;
      switch (selectedTab) {

        case 'MOU':
          response = await api.get("http://localhost:3000/api/v1/Institute/mous");
          console.log(response.data)
          setData(response.data.mous);
          setFilteredData(response.data.mous);
          setColumn(MouColumns);
          break;

        case 'Consultancy':
          response = await api.get("http://localhost:3000/api/v1/Institute/consultancies");
          console.log(response.data)
          setData(response.data.consultancies);
          setFilteredData(response.data.consultancies);
          setColumn(ConsultancyColumns);
          break;

        case 'R&D':
          response = await api.get("http://localhost:3000/api/v1/Institute/rnds");
          console.log(response.data)
          setData(response.data.rds);
          setFilteredData(response.data.rds);
          setColumn(RDColumns);
          break;

        case 'Event Grant ':
          response = await api.get("http://localhost:3000/api/v1/Institute/event-grants");
          console.log(response.data)
          setData(response.data.eventGrants);
          setFilteredData(response.data.eventGrants);
          setColumn(EventGrantColumns);
          break;

        case 'Event Grant Organized':
          response = await api.get("http://localhost:3000/api/v1/Institute/events-organised");
          console.log(response.data)
          setData(response.data.eventOrganised);
          setFilteredData(response.data.eventOrganised);
          setColumn(EventOrganziedColumns);
          break;

        case 'Institute Documents':
          response = await api.get("http://localhost:3000/api/v1/Institute/documents");
          console.log(response.data)
          setData(response.data.instituteDocuments);
          setFilteredData(response.data.instituteDocuments);
          setColumn(InstituteDocumentsColumns);
          break;

        default:
          setData([]);
          setFilteredData([]);
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
    const filename = `institute_${tab.toLowerCase().replace(/ /g, '_')}_export.csv`;
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
            Institute Management
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full mb-3"></div>
          <p className="text-sm md:text-base text-slate-600 font-medium">
            View and manage institute data across all categories
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
              <div className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${
                tab === label
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
                  headCells: {
                    style: {
                      fontSize: '16px',
                      fontWeight: '600',
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

export default Institute;

export const MouColumns = [
  { name: "Agency Name", selector: row => row.agencyName, sortable: true },
  { name: "Date", selector: row => row.date, sortable: true },
  { name: "Duration", selector: row => row.duration },
  { name: "Description", selector: row => row.description, wrap: true },
  { name: "Funding", selector: row => row.funding },
  {
    name: "MOU PDF",
    cell: row => (
      <a href={row.mouPdf} target="_blank" rel="noopener noreferrer">
        View PDF
      </a>
    ),
  },
];

export const ConsultancyColumns = [
  { name: "Agency Name", selector: row => row.agencyName, sortable: true },
  { name: "Date", selector: row => row.date, sortable: true },
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
];
export const RDColumns = [
  { name: "AGENCY NAME", selector: row => row.agencyName, sortable: true },
  { name: "DATE", selector: row => row.date, sortable: true },
  { name: "DURATION", selector: row => row.duration },
  { name: "DISCRIPTION", selector: row => row.description, wrap: true }, // spelling as per your header
  { name: "FUNDING", selector: row => row.funding },
  {
    name: "PDF",
    cell: row => (
      <a href={row.pdf} target="_blank" rel="noopener noreferrer">
        View PDF
      </a>
    ),
  },
];
export const EventGrantColumns = [
  { name: "EVENT NAME", selector: row => row.eventName, sortable: true },
  { name: "TYPE OF THE EVENT", selector: row => row.eventType },
  { name: "AGENCY NAME", selector: row => row.agencyName },
  { name: "DATE", selector: row => row.date },
  { name: "DURATION", selector: row => row.duration },
  { name: "DISCRIPTION", selector: row => row.description, wrap: true }, // keeping your spelling
  { name: "FUNDING", selector: row => row.funding },
  {
    name: "PDF",
    cell: row => (
      <a href={row.pdf} target="_blank" rel="noopener noreferrer">
        View PDF
      </a>
    ),
  },
];
export const EventOrganziedColumns = [
  { name: "EVENT NAME", selector: row => row.eventName, sortable: true },
  { name: "TYPE OF THE EVENT", selector: row => row.eventType },
  { name: "AGENCY NAME", selector: row => row.agencyName },
  { name: "CATEGORY", selector: row => row.category },
  { name: "NUMBER OF PARTICIPANTS", selector: row => row.numberOfParticipants },
  { name: "DATE", selector: row => row.date },
  { name: "DURATION", selector: row => row.duration },
  { name: "DISCRIPTION", selector: row => row.discription, wrap: true }, // use description if your data has correct spelling
  { name: "FUNDING", selector: row => row.funding },
  {
    name: "PDF",
    cell: row => (
      <a href={row.pdf} target="_blank" rel="noopener noreferrer">
        View PDF
      </a>
    ),
  },
];

export const InstituteDocumentsColumns = [
  {
    name: "AICTE AFFILIATION PDF",
    cell: row => (
      <a href={row.aictePdf} target="_blank" rel="noopener noreferrer">
        View PDF
      </a>
    ),
  },
  {
    name: "RGPV PDF",
    cell: row => (
      <a href={row.rgpvPdf} target="_blank" rel="noopener noreferrer">
        View PDF
      </a>
    ),
  },
  {
    name: "SOCIETY PDF",
    cell: row => (
      <a href={row.societyPdf} target="_blank" rel="noopener noreferrer">
        View PDF
      </a>
    ),
  },
  {
    name: "BY LAWS PDF",
    cell: row => (
      <a href={row.byLawsPdf} target="_blank" rel="noopener noreferrer">
        View PDF
      </a>
    ),
  },
];
