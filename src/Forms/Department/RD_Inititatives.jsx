import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputBox from '../../components/InputBox';
import CalenderBox from '../../components/CalenderBox';
import FileBox from '../../components/FileBox';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import DynamicUserFields from '../../components/DynamicFieldsForm';
import { FormProvider } from 'react-hook-form';
import UploadForm from '../../components/UploadForm';
import { convertArrayOfObjectsToCSV } from '../../utils/convertArrayOfObjectsToCSV';
import { useFilter } from '../../hooks/useFilter';
import { DataFilterComponent } from '../../components/DataFilterComponent';

// Define available columns for export
const exportableColumns = [
  { key: 'departmentName', label: 'Department Name' },
  { key: 'projectTitle', label: 'Project Title' },
  { key: 'fundingAgency', label: 'Funding Agency' },
  { key: 'principalInvestigator', label: 'Principal Investigator (PI)' },
  { key: 'coInvestigator', label: 'Co-Investigator' },
  { key: 'budget', label: 'Budget' },
  { key: 'output', label: 'Output/Patents/Publications' },
  { key: 'agencyName', label: 'Agency Name' },
  { key: 'date', label: 'Date' },
  { key: 'duration', label: 'Duration' },
  { key: 'description', label: 'Description' },
  { key: 'funding', label: 'Funding' },
];

const RDInitiatives = () => {

  const { register, handleSubmit, reset } = useForm()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [submit, setSubmit] = useState(false)
  const { filterText, setFilterText, resetPaginationToggle, setResetPaginationToggle, handleClear, filteredData } = useFilter(data);
  
  // State for selected rows and columns
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [showColumnSelector, setShowColumnSelector] = React.useState(false);
  const [selectedColumns, setSelectedColumns] = React.useState(
    exportableColumns.map(col => col.key)
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <DataFilterComponent placeholder={"Filter by Department Name"} onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
    );
  }, [filterText, resetPaginationToggle, handleClear]);


  const fetchData = async () => {
    if (loading == true) {
      const data = await axios.get("http://localhost:3000/api/v1/department/rnds")
      console.log(data.data)
      setData(data.data.rdInitiatives)
    }

  }
  useEffect(() => {
    console.log("fetching data")
    fetchData()
    console.log(data)
  }, [loading])

  const methods = useForm({
    defaultValues: {
      coInvestigator: [{ memberName: "", role: "" }], // 👈 default subform array
    },
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();

    const formData = new FormData();
    const fileInput = document.querySelector("input[type='file']");
    if (fileInput?.files[0]) {
      formData.append("file", fileInput.files[0]);
    }
    try {
      const res = await axios.post("http://localhost:3000/file", formData)
      console.log(res.data)
      console.log(data)
      const url = "http://localhost:3000/api/v1/department/rnd"
      const response = await axios.post(url
        , {
          dapetmentName: data.dapetmentName,
          agencyName: data.agencyName,
          date: data.date,
          duration: data.duration,
          description: data.description,
          funding: data.funding,
          projectTitle: data.titleOfMoU,
          fundingAgency: data.fundingAgency,
          principalInvestigator: data.principalInvestigator,
          coInvestigator: data.coInvestigator,
          budget: data.budget,
          output: data.output,
          // using fileId without middleware 
          // TODO : create middleware and send the fileId with using middleware
          fileId: res.data.fileId
        }
      )
      console.log(response.d)
    } catch (error) {
      console.error("Error occurred:", error.message);
    }
    console.log(data)

    setLoading((p) => !p)
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
    const filename = 'department_rnd_initiatives_export.csv';
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
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-2">
          RnD initiative submission form
        </h2>
        <UploadForm url={`${API_DEPARTMENT_FILE_UPLOAD}/rnd_initiatives`} />
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputBox label="department Name" name="departmentName" register={methods.register} required />
            <InputBox label="agency Name" name="agencyName" register={methods.register} required />
            <CalenderBox label="date" name="date" register={methods.register} required type="date" />
            <InputBox label="duration" name="duration" register={methods.register} required />
            <InputBox label="description" name="description" register={methods.register} required />
            <InputBox label="funding" name="funding" register={methods.register} required />
            <FileBox label="pdf" name="fileId" register={methods.register} />
            <InputBox label="project Title" name="projectTitle" register={methods.register} required />
            <InputBox label="funding Agency" name="fundingAgency" register={methods.register} required />
            <InputBox label="principal Investigator" name="principalInvestigator" register={methods.register} required />
            <DynamicUserFields label="co Investigator" name="coInvestigator" register={methods.register} />
            <InputBox label="budget" name="budget" register={methods.register} required />
            <InputBox label="output Patents Publications" name="outputPatentsPublications" register={methods.register} />

            <button
              type="submit"
              className="col-span-2 mt-6 px-6 py-3 bg-blue-600 text-white font-semibold text-base rounded-md shadow hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
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
          title={"R&D Initiatives Data"}
          columns={rdInitiativesColumns}
          actions={actionsMemo}
          data={filteredData}
          pagination
          paginationResetDefaultPage={resetPaginationToggle}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          selectableRows
          onSelectedRowsChange={handleRowSelected}
        />
      </div>
    </div>
  );
};

export default RDInitiatives;

export const rdInitiativesColumns = [
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
    sortable: true,
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
    sortable: true,
  },
  {
    name: "Date",
    selector: row => row.date,
    cell: row => row.date ? new Date(row.date).toLocaleDateString() : 'N/A',
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
    wrap: true,
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
  },
  {
    name: "PDF Document",
    cell: row =>
      row.pdfUrl ? (
        <a
          href={row.pdfUrl}
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
    sortable: true,
    wrap: true,
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
    wrap: true,
  },
];
