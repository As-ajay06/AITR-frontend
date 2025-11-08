// hooks/useFilter.js
import { useState, useMemo } from 'react';

export const useFilter = (data, filterBy = ['departmentName', 'eventTitle']) => {   // add more filtering fields here
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);


  console.log(data, "this data ")

  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    if (!filterText) return data;

    const lowerText = filterText.toLowerCase();

    return data.filter(item =>
      filterBy.some(field =>
        item[field]?.toString().toLowerCase().includes(lowerText)
      )
    );
  }, [data, filterBy, filterText]);

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(prev => !prev);
      setFilterText('');
    }
  };

  return {
    filterText,
    setFilterText,
    setResetPaginationToggle,
    resetPaginationToggle,
    handleClear,
    filteredData,
  };
};
