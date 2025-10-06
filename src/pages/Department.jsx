import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import DepartmentTabs from '../components/DepartmentTabs';
import axios from 'axios';

import DataTable from 'react-data-table-component';

const Department = () => {
  const [filterText, setFiltertext] = useState('');
  const [data, setData] = useState([]);
  const [column, setColumn] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('');

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


  const FilteringComponent = () => {

    const filteredItems = data.filter(item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()) || item.department && item.department.toLowerCase().includes(filterText.toLowerCase()));
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
          {filterText.length == 0 ? <DataTable data={data} columns={column} /> : <FilteringComponent />}
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
