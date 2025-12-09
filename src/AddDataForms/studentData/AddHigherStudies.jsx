import React, { useEffect, useState } from 'react';
import HigherStudiesForm from '../../Forms/StudentForms/HigherStudiesForm';
import HigherStudiesTable from '../../table/HigherStudiesTable';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function AddHigherStudies() {

  const { register, handleSubmit, reset } = useForm()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [submit, setSubmit] = useState(false)


  const fetchData = async () => {
    if (loading == true) {
      const data = await axios.get("http://localhost:3000/api/v1/students/higher-studies")
      console.log(data.data)
      setData(data.data.higherStudies)
    }

  }

  useEffect(() => {
    console.log("fetching data")
    fetchData()
    console.log(data)
  }, [loading])

  const onSubmit = async (data, e) => {
    e.preventDefault();

    console.log(data);

    try {
    
      // const url = "http://localhost:3000/api/v1/students/higher-study"
      const response = await axios.post(url
        , {
          courseName: data.courseName,
          scholarship: data.scholarship,
          instituteName: data.instituteName,
          city: data.city,
          country: data.country,
          programDuration: data.progarmaDuration,
          admissionYear: data.admissionYear,
          admissionDate: data.admissionDate
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
    const Export = ({ onExport }) => <button className='px-4 py-1 bg-blue-500 hover:bg-blue-700 shadow-sm rounded-md text-white duration-150' onClick={e => onExport(e.target.value)}>Export Data</button>;
    const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, []);
  

  return (
    <div>
      <HigherStudiesForm
        onSubmit={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        reset={reset}
      />
      <HigherStudiesTable data={data} />
    </div>
  );
}

export default AddHigherStudies;
