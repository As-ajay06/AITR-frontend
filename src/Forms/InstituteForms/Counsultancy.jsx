import React from "react";
import { useForm } from "react-hook-form";
import InputBox from "../../components/InputBox";
import CalenderBox from "../../components/CalenderBox";
import FileBox from "../../components/FileBox";
import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import UploadForm from "../../components/UploadForm";

const ConsultancyForm = () => {
  const { register, handleSubmit, reset } = useForm()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [submit, setSubmit] = useState(false)




  const fetchData = async () => {
    if (loading == true) {
      const data = await axios.get("http://localhost:3000/api/v1/institute/consultancies")
      console.log(data.data)
      setData(data.data.consultancies)
    }

  }

  useEffect(() => {
    console.log("fetching data")
    fetchData()
    console.log(data)
  }, [loading])

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", file);

    try {

      const res = await axios.post("http://localhost:3000/file", formData)
      console.log(res.data)
      if (res.data.status == 200 && res?.data.fileId) {

        console.log(data)
        const url = "http://localhost:3000/api/v1/institute/counsultancy"
        const response = await axios.post(url
          , {
            agencyName: data.agencyName,
            date: data.date,
            duration: data.duration,
            description: data.description,
            fundind: data.fundind,

            // using fileId without middleware 
            // TODO : create middleware and send the fileId with using middleware
            fileId: res.data.fileId
          }
        )
        console.log(response.data)
      }

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
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-2">
          COnsultancy submission form
        </h2>
        <UploadForm url={"addInstituteConsultancyData"} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <InputBox
            label="Agency Name"
            name="agencyName"
            register={register}
            required
          />

          <CalenderBox
            label="Date"
            name="date"
            register={register}
            required
          />

          <InputBox
            label="Duration"
            name="duration"
            register={register}
            placeholder="e.g., 1 year"
            required
          />

          <InputBox
            label="Funding"
            name="funding"
            register={register}
            required
          />

          <InputBox
            label="Description"
            name="description"
            register={register}
            textarea
            required
            className="md:col-span-2"
          />

          <FileBox
            label="Upload PDF"
            name="pdf"
            register={register}
            accept=".pdf"
            className="md:col-span-2"
          />

          <button
            type="submit"
            className="col-span-2 mt-6 px-6 py-3 bg-blue-600 text-white font-semibold text-base rounded-md shadow hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
      <DataTable title={"Consultancy data"} data={data} columns={ConsultancyColumns} actions={actionsMemo} />
    </div>
  );
};

export default ConsultancyForm;

export const ConsultancyColumns = [
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
    sortable: true,
  },
  {
    name: "Description",
    selector: row => row.description,
    wrap: true,
  },
  {
    name: "Funding",
    selector: row => row.funding ? `₹${row.funding}` : "N/A",
    right: true,
  },
  {
    name: "PDF",
    cell: row =>
      row.fileId ? (
        <a href={row.fileId} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          View PDF
        </a>
      ) : (
        "Not Uploaded"
      ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  }
];
