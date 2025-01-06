import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { showToast } from "../utils/ReactToast";

const Sidebar = () => {
  const navigate = useNavigate();
  
  // const handleLogout = () => {
  //   localStorage.removeItem("authToken");
  //   showToast("Logged Out Successfully", "success");
  //   navigate("/login");
  // };

  return (
    <>
      <div className="bg-indigo-900/50 transition-opacity duration-300" />
      <aside className="sidebar fixed lg:static w-[240px] bg-indigo-50 h-[calc(100vh-4rem)] lg:h-auto transform -translate-x-full lg:translate-x-0 transition-transform duration-300 z-[110] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-indigo-100 scrollbar-track-transparent">
        {/* Menu Section */}
        <div className="bg-white rounded-xl shadow-lg mb-6 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center cursor-pointer py-4 transition-all duration-300 hover:translate-x-1 ${
                isActive ? "text-indigo-800 font-bold " : "text-gray-600"
              }`
            }
          >
            <i className="bx bx-home-alt mr-2 text-lg" />
            Home
          </NavLink>
          <NavLink
            to="/courseGroup"
            className={({ isActive }) =>
              `flex items-center cursor-pointer py-4 transition-all duration-300 hover:translate-x-1 ${
                isActive ? "text-indigo-800 font-bold" : "text-gray-600"
              }`
            }
          >
            <i className="bx bx-book mr-2 text-lg" />
            Course Group
          </NavLink>
          <NavLink
            to="/documentGroup"
            className={({ isActive }) =>
              `flex items-center cursor-pointer py-4 transition-all duration-300 hover:translate-x-1 ${
                isActive ? "text-indigo-800 font-bold text-[15px]" : "text-gray-600"
              }`
            }
          >
            <i className="bx bxs-folder-open mr-2 text-lg" />
            Document Group
          </NavLink>
        </div>

        {/* Second Section */}
        <div className="bg-white rounded-xl shadow-lg mb-6 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <NavLink
            to="/role"
            className={({ isActive }) =>
              `flex items-center cursor-pointer py-4 transition-all duration-300 hover:translate-x-1 ${
                isActive ? "text-indigo-800 font-bold" : "text-gray-600"
              }`
            }
          >
            <i className="bx bx-male mr-2 text-2xl" />
            Role
          </NavLink>

          <NavLink
            to="/office"
            className={({ isActive }) =>
              `flex items-center cursor-pointer py-4 transition-all duration-300 hover:translate-x-1 ${
                isActive ? "text-indigo-800 font-bold" : "text-gray-600"
              }`
            }
          >
            <i className="bx bxs-building-house mr-2 text-2xl" />
            Office
          </NavLink>

          <NavLink
            to="/personCategory"
            className={({ isActive }) =>
              `flex items-center cursor-pointer py-4 transition-all text-[15px] duration-300 hover:translate-x-1 ${
                isActive ? "text-indigo-800 font-bold text-[15px]" : "text-gray-600"
              }`
            }
          >
            <i className="bx bx-male-female mr-2 text-2xl" />
            Person Category
          </NavLink>
          
        </div>

        {/* Third Section */}
        <div className="bg-white rounded-xl shadow-lg mb-6 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <NavLink
            to="/certificateType"
            className={({ isActive }) =>
              `flex items-center cursor-pointer py-4 transition-all duration-300 hover:translate-x-1 ${
                isActive ? "text-indigo-800 font-bold" : "text-gray-600"
              }`
            }
          >
            <i className="bx bx-file mr-2 text-2xl" />
            Certificate Type
          </NavLink>

          <NavLink
            to="/feeTopic"
            className={({ isActive }) =>
              `flex items-center cursor-pointer py-4 transition-all duration-300 hover:translate-x-1 ${
                isActive ? "text-indigo-800 font-bold" : "text-gray-600"
              }`
            }
          >
            <i className="bx bxs-credit-card-alt mr-2 text-2xl" />
            Fee Topic
          </NavLink>

          <NavLink
            to="/Attendence"
            className={({ isActive }) =>
              `flex items-center cursor-pointer py-4 transition-all duration-300 hover:translate-x-1 ${
                isActive ? "text-indigo-800 font-bold" : "text-gray-600"
              }`
            }
          >
            <i className="bx bxs-calendar mr-2 text-2xl" />
            Attendence
          </NavLink>
          
        </div>

        {/* Profile Section
        <div className="bg-white rounded-xl shadow-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center cursor-pointer py-4 transition-all duration-300 hover:translate-x-1 ${
                isActive ? "text-indigo-800 font-bold" : "text-gray-600"
              }`
            }
          >
            <i className="bx bx-user mr-2 text-lg" />
            Profile
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center cursor-pointer py-4 transition-all duration-300 hover:translate-x-1 ${
                isActive ? "text-indigo-800 font-bold" : "text-gray-600"
              }`
            }
          >
            <i className="bx bx-wrench mr-2 text-lg" />
            Settings
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex items-center cursor-pointer text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
          >
            <i className="bx bx-log-out mr-2 text-lg" />
            Log out
          </button>
        </div> */}
      </aside>
    </>
  );
};

export default Sidebar;
