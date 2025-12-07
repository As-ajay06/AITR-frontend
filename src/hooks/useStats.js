import { useQuery } from '@tanstack/react-query';

/**
 * Custom hook to fetch and cache home page statistics
 * Uses React Query for automatic caching and state management
 * 
 * @returns {Object} { stats: { studentCount, facultyCount }, loading: boolean }
 */
export const useStats = () => {
  const { 
    data: stats = { studentCount: 0, facultyCount: 0 }, 
    isLoading,
    isError,
    error 
  } = useQuery({
    queryKey: ['homeStats'], // Unique key for caching
    queryFn: async () => {
      const [studentRes, facultyRes] = await Promise.all([
        fetch("http://localhost:5000/api/students/count").catch(() => null),
        fetch("http://localhost:5000/api/faculty/count").catch(() => null),
      ]);

      let studentCount = 0;
      let facultyCount = 0;

      if (studentRes?.ok) {
        const studentData = await studentRes.json();
        studentCount = studentData.count || 0;
      }

      if (facultyRes?.ok) {
        const facultyData = await facultyRes.json();
        facultyCount = facultyData.count || 0;
      }

      return { studentCount, facultyCount };
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    refetchOnWindowFocus: false, // Don't refetch when window gains focus
    refetchOnMount: false, // Don't refetch on component mount if data exists
    retry: 1, // Retry failed requests once
  });

  return { 
    stats, 
    loading: isLoading,
    isError,
    error 
  };
};




