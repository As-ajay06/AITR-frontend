import React from "react";
import logo from "../assets/img/AITR_LOGO.png";
import { FaCopy } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

const NavbarHeader = () => {
<<<<<<< Updated upstream
=======

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
  ]


  // todo : run a useEffect on mount. to check if the user is authenticated or not.

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

>>>>>>> Stashed changes
  return (
    <div className="bg-[#002147] h-24 w-full flex items-center justify-between text-white ">
      <div className="ml-44 ">
        <img className="h-24 max-w-xs object-contain" src={logo} alt="logo" />
<<<<<<< Updated upstream
=======
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
          <div>
            <div
              className="text-center hover:text-zinc-300"
            >
              <button>Profile</button>
            </div>
          </div>
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
>>>>>>> Stashed changes
      </div>
      <div className="mr-24">
        <ul>
          <li className="flex text-base ">
            <p className="px-6 font-medium  flex items-center gap-x-1">
              <FaCopy color="#FFB606" />
              TOTAL COURSES: <span className="font-semibold">50+</span>
            </p>
            <p className="px-6 font-medium flex items-center gap-x-1">
              <FaUserShield color="#FFB606" />
              INSTRUCTOR: <span className="font-semibold">20+</span>
            </p>
            <p className="px-6 font-medium flex items-center gap-x-1">
              <IoCall color="#FFB606" />
              HELP LINE : <span className="font-semibold">+91 98765-43210</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarHeader;
