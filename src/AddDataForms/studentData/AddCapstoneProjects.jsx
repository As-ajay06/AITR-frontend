import React, { useEffect, useState } from 'react';
import CapstoneProjectForm from '../../Forms/StudentForms/CapstoneProjectForm';
import StudentTable from '../../table/StudentTable'; // Replace later if table differs
import { useForm } from 'react-hook-form';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { convertArrayOfObjectsToCSV } from '../../utils/convertArrayOfObjectsToCSV';

// Define available columns for export
const exportableColumns = [
  { key: 'projectTitle', label: 'Project Title' },
  { key: 'teamMembers', label: 'Team Members' },
  { key: 'guideName', label: 'Guide Name' },
  { key: 'semester', label: 'Semester' },
  { key: 'industryMentor', label: 'Industry Mentor' },
  { key: 'outcome', label: 'Project Outcome' },
];

function AddCapstoneProjects() {
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for selected rows and columns
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [showColumnSelector, setShowColumnSelector] = React.useState(false);
  const [selectedColumns, setSelectedColumns] = React.useState(
    exportableColumns.map(col => col.key)
  );

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/students/projects');
      console.log(res.data)
      setData(res.data.projectWorks); // Adjust key from backend
    } catch (err) {
      console.error("Error fetching capstone projects:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [loading]);

  const onSubmit = async (data, e) => {
    e.preventDefault();

    console.log(data)

    const formData = new FormData();
    const fileInput = document.querySelector("input[type='file']");
    if (fileInput?.files[0]) {
      formData.append("file", fileInput.files[0]);
    }
    try {

      const res = await axios.post("http://localhost:3000/file", formData)
      console.log(res.data)
      // todo: set the url
      const url = "http://localhost:3000/api/v1/students/extracurricular"
      const response = await axios.post(url
        , {
          projectTitle: data.projectTitle,
          teamMembers: data.teamMembers,
          guideName: data.guideName,
          semester: data.semester,
          industryMentor: data.industryMentor,
          outcome: data.outcome,
          fileId: res.data.fileId,
        }
      )
      console.log(response.data);
    } catch (error) {
      console.error("Error occurred:", error.message);
    }
  };

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
    const filename = 'capstone_projects_export.csv';
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
      <CapstoneProjectForm
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
          title="Capstone Projects"
          columns={CapstoneprojectColumns}
          data={data}
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

export default AddCapstoneProjects;

export const CapstoneprojectColumns = [
  {
    name: "Project Title",
    selector: row => row.projectTitle,
    width: '200px', wrap: false
  },
  {
    name: "Team Members",
    selector: row => row.teamMembers?.join(", "),
    width: '300px', wrap: false
  },
  {
    name: "Guide Name",
    selector: row => row.guideName,
    width: '200px', wrap: false
  },
  {
    name: "Semester",
    selector: row => row.semester,
    width: '200px', wrap: false
  },
  {
    name: "Industry Mentor",
    selector: row => row.industryMentor || "N/A",
    width: '200px', wrap: false
  },
  {
    name: "Project Outcome",
    selector: row => row.outcome || "N/A",
    width: '300px', wrap: false
  },
];

// todo: add file downloading schema

