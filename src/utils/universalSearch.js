/**
 * Universal Search Function - Smart Search across all fields
 * Searches in all properties of an object including arrays and nested objects
 * 
 * @param {Array} data - Array of objects to search
 * @param {string} searchTerm - Search term to match
 * @returns {Array} Filtered array of objects
 */
export const universalSearch = (data, searchTerm) => {
  // Return all data if search term is empty
  if (!searchTerm || searchTerm.trim() === '') return data;
  
  const term = searchTerm.toLowerCase().trim();
  
  return data.filter(item => {
    return Object.keys(item).some(key => {
      const value = item[key];
      
      // Skip null, undefined, and functions
      if (value === null || value === undefined) return false;
      if (typeof value === 'function') return false;
      
      // Handle arrays (e.g., coAuthors, authors, etc.)
      if (Array.isArray(value)) {
        return value.some(arrItem => {
          if (arrItem === null || arrItem === undefined) return false;
          return String(arrItem).toLowerCase().includes(term);
        });
      }
      
      // Handle nested objects (convert to string for search)
      if (typeof value === 'object' && value !== null) {
        try {
          const objString = JSON.stringify(value).toLowerCase();
          return objString.includes(term);
        } catch {
          return false;
        }
      }
      
      // Handle regular values (string, number, boolean, date)
      return String(value).toLowerCase().includes(term);
    });
  });
};


