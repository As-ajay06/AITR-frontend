import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminTabs from '../components/AdminTabs';
import { Settings, Database } from 'lucide-react';

function Admin() {
  return (
    <div className="max-w-7xl mx-auto overflow-x-hidden w-full">
      {/* Header */}
      <div className="mt-4 mb-8 text-center">
        <div className="inline-block">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-slate-800 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full mb-3"></div>
          <p className="text-sm md:text-base text-slate-600 font-medium">
            Manage and organize your college data
          </p>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-6">
        <AdminTabs/>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 min-h-[500px]">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
