import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Tabs from "./Tabs";
import DataTable from "./DataTable";
import FilterPanel from "./FilterPanel";
import DownloadButton from "./DownloadButton";
import axios from "axios";

const DepartmentTemplate = ({ tabs, apiMap, bgImage }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [dataMap, setDataMap] = useState(
    Object.fromEntries(tabs.map((tab) => [tab, []]))
  );
  const clearFilters = () => setFilters({});

  const columns =
    dataMap[activeTab].length > 0 ? Object.keys(dataMap[activeTab][0]) : [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(apiMap[activeTab]);
        if (res.data && res.data.length > 0) {
          setDataMap((prev) => ({ ...prev, [activeTab]: res.data }));
        } else {
          throw new Error("Empty data");
        }
      } catch (error) {
        console.warn(`API failed for ${activeTab}. Using dummy data.`);
        const dummy = {
          Certificates: [
            {
              name: "Gaurav Parmar",
              rollNo: "AIML001",
              type: "Winner",
              date: "2024-05-12",
            },
            {
              name: "Simran Sharma",
              rollNo: "AIML002",
              type: "Participant",
              date: "2024-06-18",
            },
          ],
          Hackathons: [
            {
              name: "Dev Bhai",
              project: "Weather App",
              score: 92,
              date: "2024-01-15",
            },
          ],
          Sports: [
            {
              name: "Rahul",
              game: "Chess",
              position: "1st",
              date: "2023-10-05",
            },
          ],
        };
        setDataMap((prev) => ({
          ...prev,
          [activeTab]: dummy[activeTab] || [],
        }));
      }
    };

    fetchData();
  }, [activeTab]);

  const filteredData = dataMap[activeTab].filter((item) => {
    const values = Object.values(item).join(" ").toLowerCase();
    if (!values.includes(searchQuery.toLowerCase())) return false;

    return columns.every((col) => {
      const value = item[col];
      const textFilter = filters[col];
      const dateFrom = filters[`${col}_from`];
      const dateTo = filters[`${col}_to`];

      if (col.toLowerCase().includes("date") && value) {
        const itemDate = new Date(value);
        if (dateFrom && itemDate < dateFrom) return false;
        if (dateTo && itemDate > dateTo) return false;
      }

      if (textFilter && textFilter !== "") {
        if (
          !value?.toString().toLowerCase().includes(textFilter.toLowerCase())
        ) {
          return false;
        }
      }

      return true;
    });
  });

  return (
    <div className="w-full h-full">
      <div className="w-full h-96 relative bg-[#030927]">
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
          src={bgImage}
          alt="Department Background"
        />
      </div>
      <div className="p-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        <p className="text-base font-semibold text-gray-800 px-14 mt-3 mb-2">
          Showing <span className="text-blue-600">{filteredData.length}</span>{" "}
          result
          {filteredData.length !== 1 ? "s" : ""} in{" "}
          <span className="uppercase">{activeTab}</span>
        </p>

        <div className="flex flex-wrap sm:flex-nowrap items-end px-12 gap-3 mb-4">
          <FilterPanel
            columns={columns}
            filters={filters}
            setFilters={setFilters}
            rawData={dataMap[activeTab]}
          />
          <button
            onClick={clearFilters}
            className="bg-red-500 text-white text-sm px-3 py-[6px] rounded hover:bg-red-600 transition-all shadow"
          >
            Clear Filter
          </button>
        </div>

        <DataTable
          data={filteredData}
          filters={filters}
          setFilters={setFilters}
        />

        <div className="pt-8 px-12">
          <DownloadButton
            data={filteredData}
            filename={`${activeTab}_data.xlsx`}
          />
        </div>
      </div>
    </div>
  );
};

export default DepartmentTemplate;
