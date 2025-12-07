import React from 'react';
import { Outlet } from 'react-router-dom'; // 👈 Import it
import AdminTabs from '../components/AdminTabs';

function Admin() {
  return (
    <div>
      <AdminTabs/>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
