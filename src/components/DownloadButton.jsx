import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const DownloadButton = ({ data, filename = "data.xlsx" }) => {
  const handleDownload = () => {
    if (!data || data.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, filename);
  };

  return (
    <button
      onClick={handleDownload}
      className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Download Excel
    </button>
  );
};

export default DownloadButton;
