import React from 'react';
import { X } from 'lucide-react';

/**
 * Reusable Column Selector Modal Component
 * Allows users to select which columns to export
 */
const ColumnSelectorModal = ({
  isOpen,
  onClose,
  exportableColumns,
  selectedColumns,
  onToggleColumn,
  onSelectAll,
  onDeselectAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="mb-4 p-4 bg-gray-100 rounded-lg border border-gray-300">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Select Columns to Export</h3>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 font-bold text-xl transition-colors"
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="flex gap-2 mb-3">
        <button
          onClick={onSelectAll}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
        >
          Select All
        </button>
        <button
          onClick={onDeselectAll}
          className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded transition-colors"
        >
          Deselect All
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-60 overflow-y-auto">
        {exportableColumns.map(column => (
          <label
            key={column.key}
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 p-2 rounded transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedColumns.includes(column.key)}
              onChange={() => onToggleColumn(column.key)}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="text-sm">{column.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ColumnSelectorModal;

