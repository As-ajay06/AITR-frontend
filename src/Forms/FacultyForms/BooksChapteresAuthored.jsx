import React from 'react'
import InputBox from '../../components/InputBox'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

function BooksChapteresAuthored() {

  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState(null)


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

  return (
    <div>
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Books and Chapters
        </h2>

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
      <DataTable columns={booksChaptersColumns} data={data} />
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
