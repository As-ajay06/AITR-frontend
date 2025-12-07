import { useState, useCallback } from 'react';
import { convertArrayOfObjectsToCSV } from '../utils/convertArrayOfObjectsToCSV';

/**
 * Custom hook for table export functionality
 * Handles column selection, row selection, and CSV export
 * 
 * @param {Array} exportableColumns - Array of {key, label} objects for exportable columns
 * @param {Array} data - The data array to export
 * @returns {Object} Export utilities and state
 */
export const useTableExport = (exportableColumns = [], data = []) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState(
    exportableColumns.map(col => col.key) // All columns selected by default
  );

  // Handle row selection
  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  // Toggle column selection
  const toggleColumnSelection = useCallback((columnKey) => {
    setSelectedColumns(prev => {
      if (prev.includes(columnKey)) {
        return prev.filter(key => key !== columnKey);
      } else {
        return [...prev, columnKey];
      }
    });
  }, []);

  // Select all columns
  const selectAllColumns = useCallback(() => {
    setSelectedColumns(exportableColumns.map(col => col.key));
  }, [exportableColumns]);

  // Deselect all columns
  const deselectAllColumns = useCallback(() => {
    setSelectedColumns([]);
  }, []);

  // Filter data to only include selected columns
  const filterDataByColumns = useCallback((dataArray) => {
    return dataArray.map(row => {
      const filteredRow = {};
      selectedColumns.forEach(colKey => {
        if (Object.prototype.hasOwnProperty.call(row, colKey)) {
          filteredRow[colKey] = row[colKey];
        }
      });
      return filteredRow;
    });
  }, [selectedColumns]);

  // Download CSV
  const downloadCSV = useCallback((dataToExport = data, filename = 'export.csv') => {
    let exportData = dataToExport;
    
    // If rows are selected, only export selected rows
    if (selectedRows.length > 0) {
      exportData = selectedRows;
    }

    // Filter by selected columns
    if (selectedColumns.length > 0) {
      exportData = filterDataByColumns(exportData);
    }

    if (exportData.length === 0) {
      alert('No data to export. Please select rows and/or columns.');
      return;
    }

    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(exportData);

    if (csv == null) return;
    
    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }
    
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }, [selectedRows, selectedColumns, filterDataByColumns, data]);

  return {
    // State
    selectedRows,
    showColumnSelector,
    selectedColumns,
    
    // Setters
    setShowColumnSelector,
    
    // Handlers
    handleRowSelected,
    toggleColumnSelection,
    selectAllColumns,
    deselectAllColumns,
    downloadCSV,
    
    // Utilities
    filterDataByColumns,
  };
};

