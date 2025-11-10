import React from 'react'
import InputBox from '../../components/InputBox'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import UploadForm from '../../components/UploadForm';
import { useFilter } from '../../hooks/useFilter';
import { DataFilterComponent } from '../../components/DataFilterComponent';
import { convertArrayOfObjectsToCSV } from '../../utils/convertArrayOfObjectsToCSV';
import { API_FACULTY_FILE_UPLOAD } from '../../../config/config';

// Define available columns for export
const exportableColumns = [
  { key: 'facultyName', label: 'Faculty Name' },
  { key: 'title', label: 'Title of Book/Chapter' },
  { key: 'publisher', label: 'Publisher' },
  { key: 'isbn', label: 'ISBN' },
  { key: 'yearOfPublication', label: 'Year of Publication' },
  { key: 'coAuthors', label: 'Co-Authors' },
];

function BooksChapteresAuthored() {

  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState(null)

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
      <DataFilterComponent placeholder={"Filter by Faculty Name"} onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
    );
  }, [filterText, resetPaginationToggle, handleClear]);


  const fetchData = async () => {
    if (loading == true) {
      const data = await axios.get("http://localhost:3000/api/v1/faculty/books-authored")
      console.log(data.data.books)
      setData(data.data.books)

    }

  }

  useEffect(() => {
    console.log("fetching data")
    fetchData()
    console.log(data)
  }, [loading])

  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {

      const url = "http://localhost:3000/api/v1/faculty/book-authored"
      const response = await axios.post(url
        , {
          facultyName: data.facultyName,
          title: data.title,
          publisher: data.publisher,
          isbn: data.isbn,
          yearOfPublication: data.yearOfPublication,
          coAuthors: data.coAuthors,
        }

      )
      console.log(response)


    } catch (err) {
      console.log("Error:", err)
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
    const filename = 'books_chapters_export.csv';
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
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-2">
            Books and Chapter Authored
          </h2>
          <UploadForm url={`${API_FACULTY_FILE_UPLOAD}/books_chapters_authored`} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputBox
              label="Faculty_Name"
              name="facultyName"
              register={register}
              required
            />
            <InputBox
              label="Title of Book/Chapter"
              name="title"
              register={register}
              required
            />

            <InputBox
              label="publisher"
              name="publisher"
              register={register}
              required
            />

            <InputBox
              label="isbn"
              name="isbn"
              register={register}
              required
            />

            <InputBox
              label="year_Of_Publication"
              name="yearOfPublication"
              register={register}
              type="number"
              required
            />

            <InputBox
              label="Co-authors (if any)"
              name="coAuthors"
              register={register}
              placeholder="Comma-separated names (e.g., John Doe, Jane Smith)"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
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
          title={"Books & Chapters Authored"}
          columns={booksChaptersColumns}
          data={filteredData}
          actions={actionsMemo}
          pagination
          paginationResetDefaultPage={resetPaginationToggle}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          selectableRows
          onSelectedRowsChange={handleRowSelected}
        />
      </div>
    </div>
  )
}

export default BooksChapteresAuthored

export const booksChaptersColumns = [
  {
    name: 'Title of Book/Chapter',
    selector: row => row.title,
    wrap: true,
    sortable: true
  },
  {
    name: 'Publisher',
    selector: row => row.publisher,
    sortable: true
  },
  {
    name: 'ISBN',
    selector: row => row.isbn
  },
  {
    name: 'Year of Publication',
    selector: row => row.yearOfPublication,
    sortable: true
  },
  {
    name: 'Co-authors (if any)',
    selector: row => row.coAuthors?.join(', ') || 'N/A',
    wrap: true
  },
  {
    name: 'Actions',
    cell: row => (
      <div className="flex flex-col items-center justify-center gap-0.5">
        {/* <button onClick={() => alert(`Viewing certificate ${row.Id}`)} className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-4 py-1 rounded">View</button> */}
        <button onClick={() => alert(`Editing certificate ${row._Id}`)} className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-5 py-1 rounded">Edit</button>
        <button
          onClick={
            async () => {
              console.log(row._id)
              alert(`Deleting this ${row._id}`)
              const baseUrl = "http://localhost:3000";
              const url = "api/v1/faculty/book-authored"
              const response = await axios.delete(`${baseUrl}/${url}/${row._id}`);
              console.log(response.data);
            }
          } className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded">Delete</button>
      </div >
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  }
];
