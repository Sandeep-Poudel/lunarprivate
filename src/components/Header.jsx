import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "../utils/ReactToast";
import { useAuth } from "../contexts/AuthContext";

const Header = ({ isOpen, toggleMobileMenu }) => {
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    // Toggle Profile Menu
    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };

    const closeProfileMenu = () => {
        setProfileMenuOpen(false);
    };

    // Logout
    const handleLogout = () => {
        showToast("Logout Successfully !!", "success");
        logout();
        navigate("/login"); // Redirect to login after logout
    };

    return (
        <header
            className="sticky top-0 z-[30] w-full h-16 px-4 bg-white  border-b shadow-lg"
            onClick={closeProfileMenu}
            onMouseLeave={() => setProfileMenuOpen(false)}
        >
            <div
                className="flex items-center justify-between h-full lg:mx-10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Left side - Mobile menu button */}
                <div className="flex items-center gap-4 justify-around">
                    <button
                        onClick={toggleMobileMenu}
                        className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
                    >
                        <i className="bx bx-menu text-2xl w-5 h-5 text-gray-600 flex justify-center items-center" />
                        <span className="sr-only">
                            {isOpen ? "Close Menu" : "Open Menu"}
                        </span>
                    </button>
                    <div className="text-xl font-bold text-blue-900 ">
                        <span className="text-indigo-800">Lunar Dashboard</span>
                    </div>
                </div>

                {/* Right side - User profile and notifications */}
                <div className="flex items-center gap-4 relative">
                    <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                        <i className="h-6 w-6 text-xl bx bx-bell text-gray-600 justify-center items-center flex" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </button>

                    <div
                        className="flex items-center gap-3"
                        onMouseEnter={toggleProfileMenu}
                        onClick={toggleProfileMenu}
                    >
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
                    {profileMenuOpen && (
                        <div
                            onMouseLeave={toggleProfileMenu}
                            className="absolute right-0 mt-60 w-64 bg-white border rounded-lg shadow-lg z-50 p-4 transition-all"
                        >
                            <div className="flex items-center mb-4">
                                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 mx-2">
                                    <i className="bx bx-user h-10 w-10 text-gray-600 justify-center items-center flex" />
                                </button>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800">
                                        Admin
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        admin@example.com
                                    </p>
                                </div>
                            </div>
                            <hr className="my-2" />
                            <a
                                href="#"
                                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-indigo-800 rounded-md"
                            >
                                <i className="bx bx-user text-xl mr-2"></i>
                                Profile
                            </a>
                            <Link
                                onClick={handleLogout}
                                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600 rounded-md"
                            >
                                <i className="bx bx-power-off text-xl mr-2"></i>
                                Logout
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
