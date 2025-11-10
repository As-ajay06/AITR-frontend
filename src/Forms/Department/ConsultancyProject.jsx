import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputBox from '../../components/InputBox';
import CalenderBox from '../../components/CalenderBox';
import FileBox from '../../components/FileBox';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import UploadForm from '../../components/UploadForm';
import { useFilter } from '../../hooks/useFilter';
import { useMemo } from 'react';
import { DataFilterComponent } from '../../components/DataFilterComponent';
import { convertArrayOfObjectsToCSV } from '../../utils/convertArrayOfObjectsToCSV';
import { API_DEPARTMENT_FILE_UPLOAD } from '../../../config/config';

// Define available columns for export
const exportableColumns = [
  { key: 'departmentName', label: 'Department Name' },
  { key: 'titleOfConsultancy', label: 'Title of Consultancy' },
  { key: 'clientOrIndustryPartner', label: 'Client/Industry Partner' },
  { key: 'facultyLead', label: 'Faculty Lead' },
  { key: 'amountSanctioned', label: 'Amount Sanctioned' },
  { key: 'agencyName', label: 'Agency Name' },
  { key: 'date', label: 'Date' },
  { key: 'duration', label: 'Duration' },
  { key: 'description', label: 'Description' },
  { key: 'funding', label: 'Funding' },
];

const ConsultancyProject = () => {

  const { register, handleSubmit, reset } = useForm()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [submit, setSubmit] = useState(false)
  const { filterText, setFilterText, resetPaginationToggle,setResetPaginationToggle, handleClear, filteredData } = useFilter(data);
  
  // State for selected rows and columns
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [showColumnSelector, setShowColumnSelector] = React.useState(false);
  const [selectedColumns, setSelectedColumns] = React.useState(
    exportableColumns.map(col => col.key)
  );


  const fetchData = async () => {
    if (loading == true) {
      const data = await axios.get("http://localhost:3000/api/v1/department/consultancies")
      console.log(data.data)
      setData(data.data.projects)
    }

  }


  useEffect(() => {
    console.log("fetching data")
    fetchData()
    console.log(data)
  }, [loading])


  // this is subheader component memo

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <DataFilterComponent placeholder={"Filter by department name"} onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
    );
  }, [filterText, resetPaginationToggle, handleClear]);


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
      const url = "http://localhost:3000/api/v1/department/consulatancy"
      const response = await axios.post(url
        , {
          dapetmentName: data.dapetmentName,
          agencyName: data.agencyName,
          date: data.date,
          duration: data.duration,
          description: data.description,
          funding: data.funding,
          titleOfMoU: data.titleOfMoU,
          organizationName: data.organizationName,
          dateOfSigning: data.dateOfSigning,
          validityPeriod: data.validityPeriod,
          purposeObjectives: data.purposeObjectives,
          fundSupportReceived: data.fundSupportReceived,
          // using fileId without middleware 
          // TODO : create middleware and send the fileId with using middleware
          fileId: res.data.fileId
        }
      )
      console.log(response.data)
    }
    catch (error) {
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
    const filename = 'department_consultancy_export.csv';
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

  console.log(" this is filtered data" , filteredData)

  return (
    <div>
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-2">
            Consulatancy Projects
          </h2>
          <UploadForm url={`${API_DEPARTMENT_FILE_UPLOAD}/consultancy_projects`} /> 
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputBox label="department Name" name="departmentName" register={register} required />
            <InputBox label="agency Name" name="agencyName" register={register} required />
            <CalenderBox label="date" name="date" register={register} required type="date" />
            <InputBox label="duration" name="duration" register={register} required />
            <InputBox label="description" name="description" register={register} required />
            <InputBox label="funding" name="funding" register={register} required />
            <FileBox label="pdf" name="pdf" register={register} />
            <InputBox label="title Of Consultancy" name="titleOfConsultancy" register={register} required />
            <InputBox label="client Industry Partner" name="clientIndustryPartner" register={register} required />
            <InputBox label="faculty Lead" name="facultyLead" register={register} required />
            <InputBox label="amount Sanctioned" name="amountSanctioned" register={register} required />
            <FileBox label="supporting Documents" name="supportingDocuments" register={register} />

            <button
              type="submit"
              className="col-span-2 mt-6 px-6 py-3 bg-blue-600 text-white font-semibold text-base rounded-md shadow hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>

        </form>
      </div>
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
          title={"Consultancy Project Data"}
          columns={consultancyColumns}
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

export default ConsultancyProject;


export const consultancyColumns = [
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
    selector: row => new Date(row.date).toLocaleDateString(),
    sortable: true,
  },
  {
    name: "Duration",
    selector: row => row.duration,
  },
  {
    name: "Description",
    selector: row => row.description,
    wrap: true,
  },
  {
    name: "Funding",
    selector: row => row.funding || "N/A",
  },
  {
    name: "Proposal PDF",
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
    name: "Title of Consultancy",
    selector: row => row.titleOfConsultancy,
    sortable: true,
  },
  {
    name: "Client/Industry Partner",
    selector: row => row.clientOrIndustryPartner,
  },
  {
    name: "Faculty Lead",
    selector: row => row.facultyLead,
  },
  {
    name: "Amount Sanctioned",
    selector: row => row.amountSanctioned || "N/A",
  },
  {
    name: "Supporting Documents",
    cell: row =>
      row.supportingDocumentsUrl ? (
        <a
          href={row.supportingDocumentsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View File
        </a>
      ) : (
        "Not Uploaded"
      ),
    button: true,
  },
];
