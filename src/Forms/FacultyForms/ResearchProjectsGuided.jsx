import React from 'react'
import InputBox from '../../components/InputBox'
import SelectBox from '../../components/SelectBox'
import { useForm } from 'react-hook-form'
import DataTable from 'react-data-table-component'
import { useState, useEffect } from 'react'
import axios from 'axios'
import UploadForm from '../../components/UploadForm'
import { useFilter } from '../../hooks/useFilter'
import { DataFilterComponent } from '../../components/DataFilterComponent'

function ResearchProjectsGuided() {
    const { register, handleSubmit, reset } = useForm()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [file, setFile] = useState(null)

    const { filterText, setFilterText, resetPaginationToggle, setResetPaginationToggle, handleClear, filteredData } = useFilter(data);
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
            const data = await axios.get("http://localhost:3000/api/v1/faculty/research-projects-guided")
            console.log(data.data.researchProjects)
            setData(data.data.researchProjects)

        }

    }

    useEffect(() => {
        console.log("fetching data")
        fetchData()
        console.log(data)
    }, [loading])

    const onSubmit = async (data) => {

        console.log(data)
        console.log(data.file[0])
        setFile(data.file[0])
        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await axios.post("http://localhost:3000/file", formData)
            console.log(res.data)

            const url = "http://localhost:3000/api/v1/faculty/research-project-guided"
            const response = await axios.post(url
                , {
                    facultyName: data.facultyName,
                    organizationName: data.organizationNamet,
                    membershipType: data.membershipType,
                    membershipId: data.membershipId,
                    dateOfJoining: data.dateOfJoining,
                    currentStatus: data.currentStatus
                }

            )
            console.log(response)


        } catch (err) {
            console.log("Error:", err)
        }
        console.log(data)

        setLoading((p) => !p)
    }

    function downloadCSV(array) {
        const link = document.createElement('a');
        let csv = convertArrayOfObjectsToCSV(array);

        if (csv == null) return;
        const filename = 'export.csv';
        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`;
        }
        link.setAttribute('href', encodeURI(csv));
        link.setAttribute('download', filename);
        link.click();
    }
    const Export = ({ onExport }) => <button className='px-4 py-1 bg-blue-500 hover:bg-blue-700 shadow-sm rounded-md text-white duration-150' onClick={e => onExport(e.target.value)}>Export data</button>;
    const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, []);

    return (
        <div>
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
                <div className="flex justify-between">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-2">
                        Faculty Research Project Guided Form
                    </h2>
                    <UploadForm url={"addResearchProjectGuidedData"} />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-3 md:grid-cols-3 gap-6" >

                        <InputBox
                            label="project_Title"
                            name="projectTitle"
                            register={register}
                            required
                        />

                        <SelectBox
                            label="level"
                            name="level"
                            register={register}
                            options={[
                                "UG",
                                "PG",
                                "PhD"
                            ]}
                            required
                        />

                        <InputBox
                            label="student_Names"
                            name="studentNames"
                            register={register}
                            placeholder="e.g., John Doe, Jane Smith"
                            required
                        />

                        <SelectBox
                            label="outcome"
                            name="outcome"
                            register={register}
                            options={[
                                "Publication",
                                "Patent",
                                "Prototype",
                                "Other"
                            ]}
                            required
                        />

                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                        Submit
                    </button>
                </form>
            </div>
            <DataTable
                title={"Reseach Project Guided"}
                columns={projectColumns}
                actions={actionsMemo}
                data={filteredData}
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
            />
        </div>
    )
}

export default ResearchProjectsGuided

export const projectColumns = [
    {
        name: 'Project Title',
        selector: row => row.projectTitle,
        sortable: true,
        wrap: true
    },
    {
        name: 'Level',
        selector: row => row.level,
        sortable: true,
        center: true
    },
    {
        name: 'Student Names',
        selector: row => row.studentNames,
        cell: row => Array.isArray(row.studentNames)
            ? row.studentNames.join(', ')
            : row.studentNames,
        wrap: true
    },
    {
        name: 'Outcome',
        selector: row => row.outcome,
        sortable: true,
        wrap: true
    }
];
