import React from "react";

const Tabs = ({ tabs, activeTab, setActiveTab }) => (
  <div className="flex justify-center gap-4 mb-4 ">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-4 py-2 rounded  ${activeTab === tab ? 'bg-blue-900   text-white' : 'bg-[#01093d] hover:bg-blue-900 text-white'}`}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default Tabs;
