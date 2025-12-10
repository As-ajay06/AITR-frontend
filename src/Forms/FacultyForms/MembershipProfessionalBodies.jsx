import React from 'react'
import InputBox from '../../components/InputBox'
import SelectBox from '../../components/SelectBox'
import CalenderBox from '../../components/CalenderBox'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import axios from 'axios'
import UploadForm from '../../components/UploadForm'
import DataTable from 'react-data-table-component'
import { useFilter } from '../../hooks/useFilter'
import { DataFilterComponent } from '../../components/DataFilterComponent'
import { convertArrayOfObjectsToCSV } from '../../utils/convertArrayOfObjectsToCSV'
import { API_FACULTY_FILE_UPLOAD } from '../../../config/config'

// Define available columns for export
const exportableColumns = [
    { key: 'facultyName', label: 'Faculty Name' },
    { key: 'organizationName', label: 'Organization Name' },
    { key: 'membershipType', label: 'Membership Type' },
    { key: 'membershipId', label: 'Membership ID' },
    { key: 'dateOfJoining', label: 'Date of Joining' },
    { key: 'currentStatus', label: 'Current Status' },
];

function MembershipProfessionalBodies() {

    const { register, handleSubmit, reset } = useForm()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

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
            const data = await axios.get("http://localhost:3000/api/v1/faculty/faculty-membership")
            console.log(data.data)
            setData(data.data.facultyMembershipData)

        }

    }

    useEffect(() => {
        console.log("fetching data")
        fetchData()
        console.log(data)
    }, [loading])

    const onSubmit = async (data) => {

        try {
            const url = "http://localhost:3000/api/v1/faculty/faculty-membership" //factulty-membership
            const response = await axios.post(url
                , {
                    facultyName: data.facultyName,
                    organizationName: data.organizationNamet,
                    membershipType: data.membershipType,
                    membershipId: data.membershipId,
                    dateOfJoining: data.dateOfJoining,
                    currentStatus: data.currentStatus,
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
        const filename = 'professional_membership_export.csv';
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
                        Faculty Membership Form
                    </h2>
                    <UploadForm url={`${API_FACULTY_FILE_UPLOAD}/membership_professional_bodies`} />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-3 md:grid-cols-3 gap-6" >
                        <InputBox label="faculty_Name" name="facultyName" register={register} required />
                        <InputBox label="name_Of_Organization" name="organizationName" register={register} required />

                        <SelectBox
                            label="membership_Type"
                            name="membershipType"
                            options={["Life", "Annual", "Student", "Professional"]}
                            register={register}
                            required
                        />

                        <InputBox label="membership_ID" name="membershipId" register={register} required />

                        <CalenderBox label="date_Of_Joining" name="dateOfJoining" register={register} required />

                        <SelectBox
                            label="current_Status"
                            name="currentStatus"
                            options={["Active", "Expired"]}
                            register={register}
                            required
                        />

                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
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
                    title={"Professional Membership Data"}
                    columns={membershipColumns}
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
    )
}

export default MembershipProfessionalBodies


export const membershipColumns = [
    {
        name: 'Faculty Name',
        selector: row => row.facultyName,
        sortable: true, width: '200px', wrap: true,
    },
    {
        name: 'Organization Name',
        selector: row => row.organizationName,
       sortable: true, width: '200px', wrap: true, 
    },
    {
        name: 'Membership Type',
        selector: row => row.membershipType,
        sortable: true, width: '200px', wrap: true,
    },
    {
        name: 'Membership ID',
        selector: row => row.membershipId,
        sortable: true, width: '200px', wrap: true,
    },
    {
        name: 'Date of Joining',
        selector: row => row.dateOfJoining,
        format: row => new Date(row.dateOfJoining).toLocaleDateString(),
        sortable: true, width: '200px', wrap: true,
    },
    {
        name: 'Current Status',
        selector: row => row.currentStatus,
        cell: row => (
            <span className={`px-2 py-1 rounded-full text-white text-xs ${row.currentStatus === 'Active' ? 'bg-green-600' : 'bg-gray-400'
                }`}>
                {row.currentStatus}
            </span>
        ),
        sortable: true, width: '200px', wrap: true,
    }
];
