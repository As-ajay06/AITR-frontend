import React from "react";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  Users, 
  LayoutGrid, 
  Building2
} from "lucide-react";
import CalendarWidget from "../components/CalendarWidget";
import ClockWidget from "../components/ClockWidget";
import { useStats } from "../hooks/useStats";

function HomePage() {
  // Use React Query hook for data fetching and caching
  const { stats, loading } = useStats();

  const categories = [
    {
      icon: GraduationCap,
      title: "Students",
      count: stats.studentCount,
      link: "/student",
      gradient: "from-cyan-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      description: "View and manage student profiles, achievements, and records"
    },
    {
      icon: Users,
      title: "Faculty",
      count: stats.facultyCount,
      link: "/faculty",
      gradient: "from-violet-500 to-indigo-600",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
      description: "Access faculty research papers, qualifications, and data"
    },
    {
      icon: LayoutGrid,
      title: "Department",
      count: null,
      link: "/department",
      gradient: "from-pink-500 to-fuchsia-600",
      bgColor: "bg-pink-50",
      iconBg: "bg-pink-100",
      description: "Manage department initiatives and projects"
    },
    {
      icon: Building2,
      title: "Institute",
      count: null,
      link: "/institute",
      gradient: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      description: "Institute-level documents and information"
    }
  ];

  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden max-w-full">
      {/* Header with AITR CIMS - Centered and Attractive */}
      <div className="mt-4 mb-6 text-center">
        <div className="inline-block">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-slate-800 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            AITR CIMS
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full mb-3"></div>
          <p className="text-sm md:text-base text-slate-600 font-medium">
            Comprehensive Management System for College Data
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-12 gap-4">
        {/* Left Side - Category Cards */}
        <div className="col-span-8">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-slate-600">Loading data...</p>
              </div>
            </div>
          ) : (
            /* All 4 Cards Same Style - Box Design with Centered Content */
            <div className="grid grid-cols-2 gap-4 p-4">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Link
                    key={index}
                    to={category.link}
                    className="group block"
                  >
                    <div className="relative bg-white rounded-xl shadow-lg border-2 border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 h-full flex flex-col">
                      {/* Icon Section - Top Center */}
                      <div className="flex items-center justify-center py-4">
                        <div className={`p-3 bg-gradient-to-br ${category.gradient} rounded-xl shadow-md transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      {/* Content Section - Centered */}
                      <div className={`flex-1 flex flex-col items-center justify-center p-4 ${category.bgColor} bg-opacity-30 text-center`}>
                        <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                          {category.title}
                        </h3>
                        {/* Show count only if > 0, otherwise show description */}
                        {category.count !== null && category.count > 0 ? (
                          <div className="flex flex-col items-center gap-1">
                            <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                              {category.count}
                            </p>
                            <span className="text-xs text-slate-500 font-medium">Total</span>
                          </div>
                        ) : (
                          <p className="text-xs text-slate-600 leading-relaxed max-w-[200px]">
                            {category.description}
                          </p>
                        )}
                      </div>

                      {/* Hover Border Glow */}
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Side - Calendar and Clock */}
        <div className="col-span-4 space-y-3 mr-4">
          <ClockWidget />
          <CalendarWidget />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
