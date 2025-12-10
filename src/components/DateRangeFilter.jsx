import React, { useState, useEffect } from 'react';
import { Calendar, X } from 'lucide-react';

const DateRangeFilter = ({ onDateRangeChange, data = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const applyFilter = (start, end) => {
    // Allow filtering with just start date, just end date, or both
    if (!start && !end) {
      onDateRangeChange([...data]);
      return;
    }
    
    console.log('🔍 Filtering:', { start, end, totalItems: data.length });
    
    // Debug: Log first item's structure to see what fields exist
    if (data.length > 0) {
      console.log('📋 Sample item fields:', Object.keys(data[0]));
      const sample = data[0];
      console.log('📅 Date values in sample:', {
        dateOfBirth: sample.dateOfBirth,
        createdAt: sample.createdAt,
        updatedAt: sample.updatedAt
      });
    }
    
    const filtered = data.filter(item => {
      // Check all possible date fields in the item - covering all sections
      const dateFields = [
        // Common fields
        'date', 'createdAt', 'updatedAt',
        // Profile section
        'dateOfBirth', 'yearOfAdmission',
        // Certification section
        'issueDate',
        // Technical/Non-technical Competitions
        'date',
        // Placement section
        'placementDate', 'joiningDate',
        // Internship section
        'startDate', 'endDate',
        // Research Paper section
        'publicationDate',
        // Sports section
        'eventDate',
        // Extra Curricular section
        'eventDate',
        // Hackathons section
        'eventDate',
        // Higher Studies section
        'admissionDate', 'admissionYear',
        // Professional Memberships section
        'dateOfJoining',
        // Project Work section (if any dates exist)
        'startDate', 'endDate',
        // Other possible fields
        'dateOfApproval', 'dateOfSigning', 'dateOfGrant', 'applicationDate',
        'registrationDate', 'completionDate', 'yearOfCompletion'
      ];

      for (const field of dateFields) {
        if (item[field]) {
          let itemDate;
          try {
            if (typeof item[field] === 'string') {
              // Handle different date formats
              let dateStr = item[field].trim();
              
              // If it's a timestamp (number as string)
              if (/^\d+$/.test(dateStr)) {
                itemDate = new Date(parseInt(dateStr));
              } 
              // If it's already in YYYY-MM-DD format
              else if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
                itemDate = new Date(dateStr);
              }
              // If it's in DD/MM/YYYY or MM/DD/YYYY format
              else if (/\d{1,2}\/\d{1,2}\/\d{4}/.test(dateStr)) {
                const parts = dateStr.split('/');
                // Try MM/DD/YYYY first (US format)
                if (parts[0].length <= 2 && parts[1].length <= 2) {
                  itemDate = new Date(`${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`);
                }
              }
              // Try parsing as is
              else {
                itemDate = new Date(dateStr);
              }
            } else if (typeof item[field] === 'number') {
              // Handle timestamp (milliseconds or seconds)
              if (item[field] < 10000000000) {
                // If it's in seconds, convert to milliseconds
                itemDate = new Date(item[field] * 1000);
              } else {
                // Already in milliseconds
                itemDate = new Date(item[field]);
              }
            } else if (item[field] instanceof Date) {
              itemDate = item[field];
            } else {
              continue;
            }

            if (!isNaN(itemDate.getTime())) {
              const itemDateStr = itemDate.toISOString().split('T')[0];
              
              // Debug logging for each date check
              console.log(`🔎 Checking ${field}:`, { 
                original: item[field], 
                parsed: itemDateStr, 
                start, 
                end
              });
              
              // Compare dates based on what's provided:
              // - If only start: itemDateStr >= start
              // - If only end: itemDateStr <= end
              // - If both: itemDateStr >= start AND itemDateStr <= end
              let matches = true;
              
              if (start && itemDateStr < start) {
                matches = false;
              }
              if (end && itemDateStr > end) {
                matches = false;
              }
              
              if (matches) {
                console.log('✅ Match found:', { field, itemDateStr, originalValue: item[field] });
                return true;
              }
            } else {
              console.warn('⚠️ Invalid date:', { field, value: item[field] });
            }
          } catch (error) {
            console.warn(`❌ Parse error for ${field}:`, item[field], error.message);
            continue;
          }
        }
      }
      return false;
    });

    console.log('📊 Results:', { 
      total: data.length, 
      filtered: filtered.length,
      percentage: data.length > 0 ? ((filtered.length / data.length) * 100).toFixed(1) : 0
    });
    
    // Force update with a new array reference to trigger React re-render
    console.log('🔄 Calling onDateRangeChange with', filtered.length, 'items');
    onDateRangeChange([...filtered]);
  };

  useEffect(() => {
    // Apply filter whenever startDate or endDate changes (or both)
    if (startDate || endDate) {
      applyFilter(startDate, endDate);
    } else if (!startDate && !endDate && data.length > 0) {
      // Force update with a new array reference
      console.log('🔄 Resetting filter, setting all data');
      onDateRangeChange([...data]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, data]);

  const handleStartDateChange = (e) => {
    const date = e.target.value;
    setStartDate(date);
    if (endDate && date > endDate) {
      setEndDate('');
    }
  };

  const handleEndDateChange = (e) => {
    const date = e.target.value;
    if (startDate && date && date < startDate) {
      alert('End date must be after start date');
      return;
    }
    setEndDate(date);
  };

  const clearFilter = () => {
    setStartDate('');
    setEndDate('');
    console.log('🔄 Clearing filter, resetting to all data');
    onDateRangeChange([...data]);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        <Calendar size={18} />
        {startDate || endDate ? (
          <span>
            {startDate && endDate 
              ? `${startDate} to ${endDate}`
              : startDate 
                ? `From ${startDate}`
                : `Until ${endDate}`
            }
          </span>
        ) : (
          <span>Filter by Date</span>
        )}
        {(startDate || endDate) && (
          <X 
            size={16} 
            className="ml-1 hover:bg-blue-800 rounded p-0.5"
            onClick={(e) => {
              e.stopPropagation();
              clearFilter();
            }}
          />
        )}
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-30 z-[9998]"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Date Inputs */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-gray-300 rounded-lg shadow-2xl z-[9999] p-6 w-auto min-w-[400px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Select Date Range</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  min="2000-01-01"
                  max="2099-12-31"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  min={startDate || "2000-01-01"}
                  max="2099-12-31"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                />
              </div>
              
              {(startDate || endDate) && (
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    {startDate && endDate ? (
                      <>Filtering from <span className="font-semibold text-blue-600">{startDate}</span> to <span className="font-semibold text-blue-600">{endDate}</span></>
                    ) : startDate ? (
                      <>Showing items from <span className="font-semibold text-blue-600">{startDate}</span> onwards</>
                    ) : (
                      <>Showing items until <span className="font-semibold text-blue-600">{endDate}</span></>
                    )}
                  </p>
                </div>
              )}
              
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium text-sm transition"
                >
                  Close
                </button>
                {(startDate || endDate) && (
                  <button
                    onClick={clearFilter}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium text-sm transition"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DateRangeFilter;

