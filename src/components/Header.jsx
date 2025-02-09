import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "../utils/ReactToast";

const Header = ({ isMobile, isCollapsed, setIsCollapsed }) => {
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    // Toggle Sidebar Menu
    const toggleMobileMenu = () => {
        document
            .querySelector(".sidebar")
            .classList.toggle("-translate-x-full");
    };

    // Toggle Profile Menu
    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };

    const closeProfileMenu = () => {
        setProfileMenuOpen(false);
    };

    //logout
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        showToast("Logged Out Successfully", "success");
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-30 w-full h-16 px-4 bg-white/50 backdrop-blur-lg border-b">
            <div className="flex items-center justify-between h-full">
                {/* Left side - Mobile menu button */}
                <div className="flex items-center gap-4">
                   

                    {isMobile && isCollapsed && (
                        <button
                            onClick={() => setIsCollapsed(false)}
                            className="rounded-lg p-2 hover:bg-gray-100"
                        >
                            <i className="bx bx-menu text-2xl w-5 h-5 text-gray-600 flex justify-center items-center" />
                        </button>
                    )}
                    <div className="text-xl font-bold text-blue-900">
                        <span className="text-indigo-800">Lunar Dashboard</span>
                    </div>
                </div>

                {/* Right side - User profile and notifications */}
                <div className="flex items-center gap-4 ">
                    <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                        <i className="h-6 w-6 text-xl bx bx-bell text-gray-600 justify-center items-center flex" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:block text-right">
                            <p className="text-sm font-medium text-gray-900">
                                Admin
                            </p>
                            <p className="text-xs text-gray-500">
                                Administrator
                            </p>
                        </div>
                        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                            <i className="bx bx-user h-10 w-10 text-gray-600 justify-center items-center flex" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;

//     <header
//         className="fixed w-full bg-white text-indigo-800 z-50 shadow-lg"
//         onClick={closeProfileMenu}
//         onMouseLeave={() => setProfileMenuOpen(false)}
//     >
//         <div
//             className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between h-16"
//             onClick={(e) => e.stopPropagation()}
//         >
//             {/* Mobile Menu Button */}
//             <button
//                 className="p-2 lg:hidden text-2xl text-indigo-800"
//                 onClick={toggleMobileMenu}
//             >
//                 {/* Boxicons Menu Icon */}
//                 <i className="bx bx-menu text-3xl"></i>
//             </button>

//             {/* Title */}
//             <div className="text-xl font-bold text-blue-900">
//                 <span className="text-indigo-800">Lunar Dashboard</span>
//             </div>

//             {/* Icons and Profile */}
//             <div className="flex items-center space-x-2 relative">
//                 {/* <input
//         className="mx-4 w-full border rounded-md px-4 py-2"
//         type="text"
//         placeholder="Search"
//       />
//       <button className="hidden md:block p-2 text-indigo-800 hover:text-blue-700 transition duration-300">
//         <i className="bx bx-search text-2xl"></i>
//       </button> */}

//                 <img
//                     className="w-10 h-10 rounded-full transition-transform duration-300 hover:scale-110 object-cover cursor-pointer"
//                     src="https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg"
//                     alt="Profile"
//                     onMouseEnter={toggleProfileMenu}
//                     onClick={toggleProfileMenu}
//                 />

//                 {/* Profile Menu */}
//                 {profileMenuOpen && (
//                     <div
//                         onMouseLeave={toggleProfileMenu}
//                         className="absolute right-0 mt-60 w-64 bg-white border rounded-lg shadow-lg z-50 p-4 transition-all"
//                     >
//                         <div className="flex items-center mb-4">
//                             <img
//                                 className="w-12 h-12 rounded-full object-cover mr-3"
//                                 src="https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg"
//                                 alt="Admin"
//                             />
//                             <div>
//                                 <h4 className="text-lg font-semibold text-gray-800">
//                                     Admin
//                                 </h4>
//                                 <p className="text-sm text-gray-500">
//                                     admin@example.com
//                                 </p>
//                             </div>
//                         </div>
//                         <hr className="my-2" />
//                         <a
//                             href="#"
//                             className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-indigo-800 rounded-md"
//                         >
//                             {/* Boxicons User Icon */}
//                             <i className="bx bx-user text-xl mr-2"></i>
//                             Profile
//                         </a>
//                         <Link
//                             onClick={handleLogout}
//                             className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600 rounded-md"
//                         >
//                             {/* Boxicons Power Icon */}
//                             <i className="bx bx-power-off text-xl mr-2"></i>
//                             Logout
//                         </Link>
//                     </div>
//                 )}
//             </div>
//         </div>
//     </header>
