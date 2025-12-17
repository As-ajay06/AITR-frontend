import React, { useEffect, useState } from "react";
import logo from "../assets/img/AITR_LOGO.png";
import { Link, useNavigate } from "react-router-dom"
import { FiSearch } from "react-icons/fi";


const SuperAdminNavbar = () => {

    const [authenticated, setAuthenticated] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue , setSearchValue] = useState();

    const navigate = useNavigate();

    const profile = [
        {
            title: "Add data",
            href: "/admin"
        },
        {
            title: "Add Admin",
            href: "/add_profile"
        },
        {
            title: "View Admin",
            href: "/admins"
        },
        {
            title: "Settings",
            href: "/setting"
        }
    ]

    async function verifyTokenFromServer(token) {
        const res = await fetch('http://localhost:3000/api/auth/verify', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
            }
        });
        return res.json();
    }          


    // todo : run a useEffect on mount. to check if the user is authenticated or not.
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          setAuthenticated(false);
        } else {
          verifyTokenFromServer(token).then(res => {
            console.log(res);
            setAuthenticated(res.valid);
          });
        }
      }, []);
      

    const handleSearch = () => {
        console.log(searchValue);
        navigate(`faculty/profile/${searchValue}`);
    }
    

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 h-20 w-full flex items-center justify-between text-white shadow-lg sticky top-0 z-40">
            <div className="w-full px-4 lg:px-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img className="h-14 max-w-xs object-contain" src={logo} alt="logo" />
                </div>
                <div className="flex gap-3 lg:gap-4 items-center">
                    {/* Search Bar - Only show if authenticated */}
                    {authenticated && (
                        <div className="relative w-64 hidden md:block">
                            <input
                                type="text"
                                className="w-full px-4 pr-10 py-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm 
                                           focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all 
                                           duration-200 text-white placeholder:text-white/70 outline-none"
                                placeholder="Search faculty..."
                                onChange={(e) => setSearchValue(e.target.value)}
                                onClick={(e) => e.key === 'Enter' && handleSearch()}
                            />
                        
                            <button 
                                onClick={handleSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                            >
                                <FiSearch size={18} />
                            </button>
                        </div>
                    )}
                    {/* Profile Dropdown - Only show if authenticated */}
                    {authenticated && (
                    <div className="relative">
                        <button
                            className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium text-sm text-white"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            Profile
                        </button>
                        {
                            isOpen && (
                                <div
                                    onMouseLeave={() => setIsOpen(false)}
                                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50"
                                >
                                    {profile.map((link, index) => (
                                        <Link
                                            key={index}
                                            to={link.href}
                                            className="block px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium"
                                        >
                                            {link.title}
                                        </Link>
                                    ))}
                                </div>
                            )
                        }
                    </div>
                    )}
                    {authenticated ? (
                        <button
                            onClick={handleLogout}
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-5 py-2 rounded-lg font-medium hover:shadow-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 text-sm"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-5 py-2 rounded-lg font-medium hover:shadow-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 text-sm"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>

        </div>
    );
};

export default SuperAdminNavbar;
