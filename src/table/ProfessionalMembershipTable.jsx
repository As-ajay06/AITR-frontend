import React from 'react';
import DataTable from 'react-data-table-component';

const columns = [
  { name: 'Organization Name', selector: row => row.organizationName },
  { name: 'Membership ID', selector: row => row.membershipId },
  { name: 'Date of Joining', selector: row => row.dateOfJoining },
  { name: 'Membership Status', selector: row => row.membershipStatus },
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
              alert(`Deleting certificate ${row._Id}`)
              const baseUrl = "http://localhost:3000";
              const url = "api/v1/students/membership"
              const response = await axios.delete(`${baseUrl}/${url}/${row._id}`);
              console.log(response.data.certificate);
            }
          } className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded">Delete</button>
      </div >
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  }
];

const ProfessionalMembershipTable = ({ data }) => {
  return (
    <div className="p-4 overflow-x-auto">
      <DataTable
        title="Professional Memberships"
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        striped
        responsive
        fixedHeader
        fixedHeaderScrollHeight="600px"
      />
    </div>
  );
};

export default ProfessionalMembershipTable;
