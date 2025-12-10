import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import TechnicalNonTechnicalCompetition from '../../Forms/StudentForms/TechnicalNonTechnicalCompetition';
import { convertArrayOfObjectsToCSV } from '../../utils/convertArrayOfObjectsToCSV';
import { BASE_URL } from '../../../config/config';

// Define available columns for export
const exportableColumns = [
  { key: 'competitionId', label: 'Competition ID' },
  { key: 'studentName', label: 'Student Name' },
  { key: 'enrollmentNumber', label: 'Enrollment Number' },
  { key: 'branch', label: 'Branch' },
  { key: 'batch', label: 'Batch' },
  { key: 'year', label: 'Year' },
  { key: 'competitionName', label: 'Competition Name' },
  { key: 'date', label: 'Date' },
  { key: 'teamName', label: 'Team Name' },
  { key: 'teamSize', label: 'Team Size' },
  { key: 'mentorName', label: 'Mentor Name' },
  { key: 'level', label: 'Level' },
  { key: 'organizer', label: 'Organizer' },
  { key: 'vanue', label: 'Venue' },
  { key: 'problemStatement', label: 'Problem Statement' },
  { key: 'prizeMoney', label: 'Prize Money' },
  { key: 'sponsoringAgency', label: 'Sponsoring Agency' },
  { key: 'positionSecured', label: 'Position Secured' },
  { key: 'projectGithubLink', label: 'Project GitHub Link' },
  { key: 'projectDescription', label: 'Project Description' },
  { key: 'eventMode', label: 'Event Mode' },
  { key: 'achievement', label: 'Achievement' },
];

function AddTechnicalNonTechnicalCompetition() {
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState([])
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(true)
  const [submit, setSubmit] = useState(false)

  // State for selected rows and columns
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [showColumnSelector, setShowColumnSelector] = React.useState(false);
  const [selectedColumns, setSelectedColumns] = React.useState(
    exportableColumns.map(col => col.key)
  );


  const fetchData = async () => {
    if (loading == true) {
      // todo : set the url
      const data = await axios.get("http://localhost:3000/api/v1/students/technicalNontechnical")
      console.log(data.data)
      setData(data.data.technicalData)
    }

  }

  useEffect(() => {
    console.log("fetching data")
    fetchData()
    console.log(data)
  }, [loading])

  const onSubmit = async (data, e) => {
    e.preventDefault();

    console.log(data);
    try {

      let fileId = null;
      const formData = new FormData();
      if (data.file && data.file[0]) {
        formData.append("file", data.file[0]);
        const res = await axios.post("http://localhost:3000/file", formData)
        console.log(res.data);
        fileId = res.data.fileId;
      }

      // todo: correct the url
      const url = "http://localhost:3000/api/v1/students/technicalNontechnical"
      const response = await axios.post(url
        , {
          competitionId: data.competitionId,
          studentName: data.studentName,
          enrollmentNumber: data.enrollmentNumber,
          currentStatus: data.currentStatus,
          wesiteLink: data.wesiteLink,
          branch: data.branch,
          batch: data.batch,
          year: data.year,
          competitionName: data.competitionName,
          date: data.date,
          teamName: data.teamName,
          teamSize: data.teamSize,
          mentorName: data.mentorName,
          level: data.level,
          organizer: data.organizer,
          vanue: data.vanue,
          problemStatement: data.problemStatement,
          datahnologyUsed: data.datahnologyUsed,
          prizeMoney: data.prizeMoney,
          sponsoringAgency: data.sponsoringAgency,
          positionSecured: data.positionSecured,
          projectGithubLink: data.projectGithubLink,
          projectDescription: data.projectDescription,
          eventMode: data.eventMode,
          achievement: data.achievement,
          fileId: "sdfsdfsdf",
        }
      )
      console.log(response.data)
    }
    catch (error) {
      console.error("Error occurred:", error.message);
    }
    console.log(data)

    setLoading((p) => !p)
  }

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

    if (selectedColumns.length > 0) {
      dataToExport = filterDataByColumns(dataToExport);
    }

    if (dataToExport.length === 0) {
      alert('No data to export. Please select rows and/or columns.');
      return;
    }

    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(dataToExport);

    if (csv == null) return;
    const filename = 'technical_nontechnical_export.csv';
    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }, [selectedRows, selectedColumns, filterDataByColumns]);

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



  return (
    <div>
      <TechnicalNonTechnicalCompetition
        onSubmit={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        reset={reset}
      />
      <div className="p-4">
        {/* Column Selector Modal */}
        {showColumnSelector && (
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

        <DataTable
          title={"Technical/Nontechnical"}
          data={data}
          columns={TechnicalNonTechnicalCompetitionColumn}
          actions={actionsMemo}
          selectableRows
          onSelectedRowsChange={handleRowSelected}
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
      </div>
    </div>
  );
}

export default AddTechnicalNonTechnicalCompetition;

export const TechnicalNonTechnicalCompetitionColumn = [
  {
    name: "Student ID",
    selector: row => row._id,
    width: '300px', wrap: true
  },
  {
    name: "Student Name",
    selector: row => row.studentName,
    width: '300px', wrap: true
  },
  {
    name: "Acheivement",
    selector: row => row.achievement,
    width: '300px', wrap: true
  },
  {
    name: "Batch",
    selector: row => row.batch,
    width: '300px', wrap: true
  },
  {
    name: "Branch",
    selector: row => row.branch,
    width: '300px', wrap: true
  },
  {
    name: "certificate",
    selector: row => <a href={`${BASE_URL}/file/${row.fileId}`} >view certificate</a>,
    width: '300px', wrap: true

  }, {
    name: "Competition Id",
    selector: row => row.competitionId,
    width: '300px', wrap: true

  },
  {
    name: "Competiontion Name",
    selector: row => row.competitionName,
    width: '300px', wrap: true

  },
  {
    name: "Date",
    selector: row => row.date,
    width: '300px', wrap: true

  },
  {
    name: "Enrollment Number",
    selector: row => row.enrollmentNumber,
    width: '300px', wrap: true

  },
  {
    name: "Event mode",
    selector: row => row.eventMode,
    width: '300px', wrap: true

  },
  {
    name: "Level",
    selector: row => row.level,
    width: '300px', wrap: true

  },
  {
    name: "Mentor name",
    selector: row => row.mentorName,
    width: '300px', wrap: true

  },
  {
    name: "Organizer",
    selector: row => row.organizer,
    width: '300px', wrap: true

  },
  {
    name: "Position secured",
    selector: row => row.positionSecured,
    width: '300px', wrap: true

  },
  {
    name: "Prize Money",
    selector: row => row.prizeMoney,
    width: '300px', wrap: true
  },
  {
    name: "Problem Statement",
    selector: row => row.problemStatement,
    width: '300px', wrap: true

  },
  {
    name: "Project Description",
    selector: row => row.projectDescription,
    width: '300px', wrap: true
  },
  {
    name: "Project GitHub Link",
    selector: row => row.projectGithubLink,
    cell: row => (
      <a href={row.projectGithubLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
        {row.projectGithubLink}
      </a>
    ),
    sortable: true,
  },
  {
    name: "Sponsoring Agency",
    selector: row => row.sponsoringAgency,
    width: '300px', wrap: true
  },
  {
    name: "Team Name",
    selector: row => row.teamName,
    sortable: true,

  },
  {
    name: "Team Size",
    selector: row => row.teamSize,
    sortable: true,

  },
  {
    name: "Certificate PDF",
    selector: row => row.fileId,
    cell: row =>
      row.fileId ? (
        <a
          href={`http://localhost:3000/file/${row.fileId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View PDF
        </a>
      ) : (
        "N/A"
      ),
    sortable: true,
  },
];
