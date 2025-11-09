import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import FileBox from "../../components/FileBox";
import UploadForm from "../../components/UploadForm";
import axios from "axios";
import DataTable from "react-data-table-component";
import { convertArrayOfObjectsToCSV } from "../../utils/convertArrayOfObjectsToCSV";
import { useFilter } from "../../hooks/useFilter";
import { DataFilterComponent } from "../../components/DataFilterComponent";

// Define available columns for export
const exportableColumns = [
  { key: 'aictePdf', label: 'AICTE Affiliation PDF' },
  { key: 'rgpvPdf', label: 'RGPV PDF' },
  { key: 'societyPdf', label: 'Society PDF' },
  { key: 'byLawsPdf', label: 'By Laws PDF' },
];

const InstituteDocumentForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <DataFilterComponent placeholder={"Filter documents"} onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
    );
  }, [filterText, resetPaginationToggle, handleClear]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/Institute/documents");
      console.log(response.data);
      setData(response.data.instituteDocuments || []);
    } catch (error) {
      console.error("Error fetching documents:", error);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const files = new FormData();
      
      // Append all files to FormData
      if (formData.aicteAffiliationPdf?.[0]) {
        files.append("aicteAffiliationPdf", formData.aicteAffiliationPdf[0]);
      }
      if (formData.rgpvPdf?.[0]) {
        files.append("rgpvPdf", formData.rgpvPdf[0]);
      }
      if (formData.societyPdf?.[0]) {
        files.append("societyPdf", formData.societyPdf[0]);
      }
      if (formData.byLawsPdf?.[0]) {
        files.append("byLawsPdf", formData.byLawsPdf[0]);
      }

      const response = await axios.post("http://localhost:3000/api/v1/Institute/document", files, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Upload successful:", response.data);
      alert("Documents uploaded successfully!");
      reset();
      fetchData(); // Refresh the data
    } catch (error) {
      console.error("Error uploading documents:", error);
      alert("Error uploading documents. Please try again.");
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
    const filename = 'institute_documents_export.csv';
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
          Institute Document Upload Form
        </h2>
        <UploadForm url={"addInstituteDocumentData"} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <FileBox
            label="AICTE Affiliation PDF"
            name="aicteAffiliationPdf"
            register={register}
            accept=".pdf"
            required
          />

          <FileBox
            label="RGPV PDF"
            name="rgpvPdf"
            register={register}
            accept=".pdf"
            required
          />

          <FileBox
            label="Society PDF"
            name="societyPdf"
            register={register}
            accept=".pdf"
            required
          />

          <FileBox
            label="By Laws PDF"
            name="byLawsPdf"
            register={register}
            accept=".pdf"
            required
          />

          <button
            type="submit"
            className="col-span-2 mt-6 px-6 py-3 bg-blue-600 text-white font-semibold text-base rounded-md shadow hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Data Table Section */}
      <div className="p-4 mt-8">
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
          title={"Institute Documents"}
          columns={instituteDocumentColumns}
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

export default InstituteDocumentForm;

export const instituteDocumentColumns = [
  {
    name: "AICTE Affiliation PDF",
    cell: row =>
      row.aictePdf || row.aicteAffiliationPdf ? (
        <a
          href={row.aictePdf || row.aicteAffiliationPdf}
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
    name: "RGPV PDF",
    cell: row =>
      row.rgpvPdf ? (
        <a
          href={row.rgpvPdf}
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
    name: "Society PDF",
    cell: row =>
      row.societyPdf ? (
        <a
          href={row.societyPdf}
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
    name: "By Laws PDF",
    cell: row =>
      row.byLawsPdf ? (
        <a
          href={row.byLawsPdf}
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
];
