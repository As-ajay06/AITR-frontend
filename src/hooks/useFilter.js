// hooks/useFilter.js
import { useState, useMemo } from 'react';

export const useFilter = (data, filterBy = 'departmentName') => {
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);


  console.log(data, "this data ")

  const filteredData = useMemo(() => {
    
    return data = data.filter(item =>
      item[filterBy]?.toLowerCase().includes(filterText.toLowerCase())
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
