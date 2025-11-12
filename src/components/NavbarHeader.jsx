import React, { useState } from "react";
import logo from "../assets/img/AITR_LOGO.png";
import { FaCopy } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { href, Link } from "react-router-dom"

const NavbarHeader = () => {

  const [authenticated, setAuthenticated] = useState(false);


  const links = [
    {
      title: "Home",
      href: "/"
    },
    {
      title: "About",
      href: "/about"
    },
    {
      title: "Help",
      href: "/help"
    },
    {
      title: "Profile",
      href:"/profile"
    }
  ]


  // todo : run a useEffect on mount. to check if the user is authenticated or not.

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="bg-[#002147] h-24 w-full flex items-center justify-between text-white ">
      <div className="mx-32 flex justify-between w-full ">
        <img className="h-24 max-w-xs object-contain" src={logo} alt="logo" />
        <div className="flex gap-8 items-center">
          {
            links.map((link, index) => (
              <div key={index}
                className="text-center hover:text-zinc-300"
              >
                <Link to={link.href}>{link.title}</Link>
              </div>
            ))
          }
          {authenticated ?
            <button
              onClick={handleLogout}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-all"
            >
              Logout
            </button> :
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-all"
            >
              Login
            </Link>
          }
        </div>
      </div>

    </div>
  );
};

export default NavbarHeader;
