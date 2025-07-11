import axios from 'axios';
import DataTable from 'react-data-table-component';

const facultyData = [
  {
    name: "Dr. Aditi Sharma",
    email: "aditi.sharma@university.edu",
    department: "Computer Science",
    mobile_no: "9876543210",
    years_Of_Experience: 12,
    designation: "Associate Professor"
  },
  {
    name: "Prof. Rajesh Kumar",
    email: "rajesh.kumar@university.edu",
    department: "Mechanical Engineering",
    mobile_no: "9123456780",
    years_Of_Experience: 18,
    designation: "Professor"
  },
  {
    name: "Ms. Neha Verma",
    email: "neha.verma@university.edu",
    department: "Electrical Engineering",
    mobile_no: "9988776655",
    years_Of_Experience: 7,
    designation: "Assistant Professor"
  },
  {
    name: "Dr. Vikram Singh",
    email: "vikram.singh@university.edu",
    department: "Civil Engineering",
    mobile_no: "9765432109",
    years_Of_Experience: 15,
    designation: "Professor"
  },
  {
    name: "Mr. Alok Das",
    email: "alok.das@university.edu",
    department: "Mathematics",
    mobile_no: "9090909090",
    years_Of_Experience: 5,
    designation: "Lecturer",
    fileId: "345346534653465392"
  }
];


// const responce = await axios.get("http://localhost:3000/facultydata")
// console.log(responce.data.response)

// Define faculty columns
const index =   1

const columns = [
  {
    name: 's.no',
    selector: row => row.id,
    sortable: true,
    width: '80px',
    cell: (row ,index) => index + 1 
  },
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'Email',
    selector: row => row.email,
    sortable: true,
  },
  {
    name: 'Department',
    selector: row => row.department,
    sortable: true,
  },
  {
    name: 'Mobile No',
    selector: row => row.mobile_no,
    sortable: true,
  },
  {
    name: 'Experience (Years)',
    selector: row => row.years_Of_Experience,
    sortable: true,

  },
  {
    name: 'Designation',
    selector: row => row.designation,
    sortable: true,
  },
  {
    name: 'Actions',
    cell: row => (
      <div className="flex gap-2">
        <button
          onClick={() => alert(`Viewing program ${row.Id}`)}
          className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
        >
          View
        </button>
        <button
          onClick={() => alert(`Editing program ${row.Id}`)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => alert(`Deleting program ${row.Id}`)}
          className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];


function FacultyTable({data}) {
  console.log(data)
	return (
		<DataTable columns={columns} data={facultyData} />
	);
};

export default FacultyTable;