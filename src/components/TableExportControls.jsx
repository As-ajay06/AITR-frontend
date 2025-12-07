import React from 'react';

/**
 * Reusable Table Export Controls Component
 * Provides export buttons and column selector toggle
 */
const TableExportControls = ({
  onExport,
  onToggleColumnSelector,
  selectedColumnsCount,
  selectedRowsCount,
  showColumnSelector = false,
}) => {
  return (
    <div className="flex gap-2 items-center">
      <button
        className='px-4 py-1 bg-green-500 hover:bg-green-700 shadow-sm rounded-md text-white duration-150 text-sm'
        onClick={onToggleColumnSelector}
      >
        Select Columns ({selectedColumnsCount})
      </button>
      <button
        className='px-4 py-1 bg-blue-500 hover:bg-blue-700 shadow-sm rounded-md text-white duration-150 text-sm'
        onClick={onExport}
      >
        Export Data {selectedRowsCount > 0 ? `(${selectedRowsCount} rows)` : '(All)'}
      </button>
    </div>
  );
};

export default TableExportControls;

