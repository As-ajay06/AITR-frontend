import React from 'react'
import InputBox from '../../components/InputBox'
import SelectBox from '../../components/SelectBox'
import CalenderBox from '../../components/CalenderBox'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import axios from 'axios'
import UploadForm from '../../components/UploadForm'

import DataTable from 'react-data-table-component'

function MembershipProfessionalBodies() {


    const { register, handleSubmit, reset } = useForm()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)


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
                        Faculty Membership Form
                    </h2>
                    <UploadForm url={"addFacultyMembershipData"} />
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
            <DataTable
                title={"Proffesional Membership Data"}
                columns={membershipColumns}
                data={data}
                actions={actionsMemo}
            />
        </div>
    )
}

export default MembershipProfessionalBodies


export const membershipColumns = [
    {
        name: 'Faculty Name',
        selector: row => row.facultyName,
        sortable: true,
    },
    {
        name: 'Organization Name',
        selector: row => row.organizationName,
        sortable: true,
        wrap: true,
    },
    {
        name: 'Membership Type',
        selector: row => row.membershipType,
        sortable: true,
    },
    {
        name: 'Membership ID',
        selector: row => row.membershipId,
        sortable: true,
    },
    {
        name: 'Date of Joining',
        selector: row => row.dateOfJoining,
        format: row => new Date(row.dateOfJoining).toLocaleDateString(),
        sortable: true,
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
        sortable: true,
    }
];
