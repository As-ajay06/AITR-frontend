import React from "react";
import { useForm } from "react-hook-form";
import InputBox from "../../components/InputBox";
import CalenderBox from "../../components/CalenderBox";
import FileBox from "../../components/FileBox";
import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const ConsultancyForm = () => {
  const {register, handleSubmit, reset} = useForm()
  const [data, setData] = useState([])
  const [loading , setLoading ] = useState(true)
  const [submit, setSubmit ] = useState(false)




  const fetchData = async () => {
    if(loading == true ){
      const data = await axios.get("http://localhost:3000/api/v1/institute/consultancies")
      console.log(data.data)
      setData(data.data.consultancies)
    }
 
  }

  useEffect(() => {
    console.log("fetching data")
    fetchData()
    console.log(data)
  },[loading])

  const onSubmit = async (data) => {
 
    try{
      const formData = new FormData();
      formData.append("file" , file);

      const res = await axios.post("http://localhost:3000/file", formData)
      console.log(res.data)

      console.log(data)
      const url = "http://localhost:3000/api/v1/institute/counsultancy"
      const response = await axios.post( url 
        , {
        agencyName: data.agencyName,
        date: data.date,
        duration: data.duration,
        description: data.description,
        fundind: data.fundind,

        // using fileId without middleware 
        // TODO : create middleware and send the fileId with using middleware
        fileId : res.data.fileId
      }
    )

      console.log(response)
      
      }catch(err){
        console.log("Error:", err )
      }
      console.log(data)

    setLoading((p) => !p)
  }


  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Consultancy Submission Form
      </h2>

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
      <DataTable data={data} columns={ConsultancyColumns} />
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
