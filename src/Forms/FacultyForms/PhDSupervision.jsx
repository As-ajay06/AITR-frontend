import React from 'react'
import InputBox from '../../components/InputBox'
import SelectBox from '../../components/SelectBox'
import CalenderBox from '../../components/CalenderBox'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import UploadForm from '../../components/UploadForm'

import { useFilter } from '../../hooks/useFilter'
import { DataFilterComponent } from '../../components/DataFilterComponent'

function PhDSupervision() {



  const { register, handleSubmit, reset } = useForm()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)



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
      const data = await axios.get("http://localhost:3000/api/v1/faculty/phd-superviseds")
      console.log(data.data.supervisions)
      setData(data.data.supervisions)

    }

  }

  useEffect(() => {
    console.log("fetching data")
    fetchData()
    console.log(data)
  }, [loading])

  const onSubmit = async (data) => {

    try {

      const url = "http://localhost:3000/api/v1/faculty/phd-supervised"
      const response = await axios.post(url
        , {
          facultyName: data.facultyName,
          phdScholarName: data.phdScholarName,
          universityAffiliation: data.universityAffiliation,
          status: data.status,
          researchTopic: data.researchTopic,
          completionDate: data.completionDate
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
            Faculty phDSupervision Form
          </h2>
          <UploadForm url={"addphdSupervisionData"} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" >
            <InputBox label="faculty_Name" name="facultyName" register={register} required />

            <InputBox label="phd_Scholar_Name" name="phdScholarName" register={register} required />

            <InputBox label="university_Affiliation" name="universityAffiliation" register={register} required />

            <SelectBox
              label="status"
              name={"status"}
              register={register}
              options={[
                "Ongoing",
                "Completed",
              ]}
              required
            />

            <InputBox label="research_Topic" name="researchTopic" register={register} required />

            <CalenderBox
              label="registration_Date"
              name="date"
              register={register}
              required
            />

            <CalenderBox label="completion_Date" name="completionDate" register={register} />


          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </div>
      <DataTable
        title={"Faculty PhdSupervision Data"}
        columns={phdSupervisionColumns}
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

export default PhDSupervision


export const phdSupervisionColumns = [
  {
    name: 'Faculty Name',
    selector: row => row.facultyName,
    sortable: true,
    wrap: true,
  },
  {
    name: 'PhD Scholar Name',
    selector: row => row.phdScholarName,
    sortable: true,
    wrap: true,
  },
  {
    name: 'University Affiliation',
    selector: row => row.universityAffiliation,
    sortable: true,
    wrap: true,
  },
  {
    name: 'Status',
    selector: row => row.status,
    sortable: true,
    cell: row => (
      <span className={`px-2 py-1 rounded-full text-white text-xs ${row.status === 'Completed' ? 'bg-green-600' : 'bg-yellow-500'
        }`}>
        {row.status}
      </span>
    )
  },
  {
    name: 'Research Topic',
    selector: row => row.researchTopic,
    wrap: true,
  },
  {
    name: 'Date of Registration/Completion',
    selector: row => row.status === 'Completed' ? row.completionDate : row.registrationDate,
    format: row => {
      const date = row.status === 'Completed' ? row.completionDate : row.registrationDate;
      return date ? new Date(date).toLocaleDateString() : 'N/A';
    },
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
              const url = "api/v1/faculty/phd-supervised"
              const response = await axios.delete(`${baseUrl}/${url}/${row._id}`);
              console.log(response.data);
            }
          } className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded">Delete</button>
      </div >
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];
