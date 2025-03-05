import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
const Sidebar = ({ isOpen, toggleMobileMenu }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedList, setExpandedList] = useState(null);

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    };

    const closeSidebar = () => {
        toggleMobileMenu(); // Toggles isOpen to false
    };

    const menuItems = [
        {
            title: "Home",
            to: "/",
            icon: <i className="bx bx-home-alt text-xl" />,
        },
        {
            title: "Office Management",
            to: "/office",
            icon: <i className="bx bx-building text-xl" />,
            items: [
                { title: "Office List", to: "/office" },
                { title: "Office Category", to: "/office" },
                { title: "Office Setting", to: "/office" },
            ],
        },
        {
            title: "Document Management",
            to: "/documentGroup",
            icon: <i className="bx bx-file text-xl" />,
            items: [
                { title: "Document Group", to: "/documentGroup" },
                { title: "Office Document", to: "/document" },
                { title: "Access Control", to: "/documentGroup" },
            ],
        },
        {
            title: "Academic",
            to: "/attendence",
            icon: <i className="bx bx-book text-xl" />,
            items: [
                { title: "Student Batch", to: "" },
                { title: "Grade List", to: "" },
                { title: "Class List", to: "" },
            ],
        },
        {
            title: "Library",
            to: "/",
            icon: <i className="bx bx-library text-xl" />,
            items: [
                { title: "Book Category", to: "" },
                { title: "Book List", to: "" },
                { title: "Issue/Return", to: "" },
            ],
        },
        {
            title: "Website",
            to: "/",
            icon: <i className="bx bx-globe text-xl" />,
            items: [
                { title: "Web Contacts", to: "/" },
                { title: "Web Setting", to: "/" },
            ],
        },
        {
            title: "Settings",
            to: "/",
            icon: <i className="bx bx-cog text-xl" />,
            items: [
                { title: "User Management", to: "/" },
                { title: "System Settings", to: "/" },
            ],
        },
    ];

    const getFilteredData = () => {
        if (!searchTerm) {
            return menuItems;
        }

        return menuItems.filter((item) => {
            const titleMatch = item.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const itemsMatch =
                item.items &&
                item.items.some((subItem) =>
                    subItem.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                );
            return titleMatch || itemsMatch;
        });
    };

    const renderNavLinks = () => {
        const filteredData = getFilteredData();
        console.log(filteredData);

        return filteredData.map((item, index) => (
            // <NavBlock item={item} isCollapsed={isCollapsed} isMobile={isMobile}/>
            <div
                key={item.title}
                className="space-y-2"
                onClick={() =>
                    // setExpandedList((prev) => {
                    // if (prev === index) {
                    //     return null;
                    // } else {
                    // return index;
                    // }
                    // })
                    setExpandedList(index)
                }
            >
                <NavLink
                    to={item.to}
                    className={`
                                flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-200
                            `}
                >
                    {item.icon}

                    <span className="truncate">{item.title}</span>
                </NavLink>
                {(expandedList === index || searchTerm.length > 0) &&
                    item.items?.length > 0 && (
                        <div className="ml-8 space-y-1 ">
                            {item.items?.map((subItem) => (
                                <NavLink
                                    key={subItem.title}
                                    to={subItem.to}
                                    className={({ isActive }) =>
                                        `block rounded-lg px-3 py-2 text-sm  hover:bg-gray-100 ${
                                            isActive
                                                ? "text-indigo-700 font-semibold bg-indigo-100 hover:bg-indigo-200"
                                                : "text-gray-600 hover:bg-indigo-100"
                                        }  truncate`
                                    }
                                >
                                    {subItem.title}
                                </NavLink>
                            ))}
                        </div>
                    )}
            </div>
        ));
    };

    return (
        <>
            {/* Overlay: Only shown when sidebar is open on mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-[10] lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            <div
                className={`sidebar fixed lg:static w-64 h-full bg-white lg:h-auto transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 transition-transform duration-300 z-[100] scrollbar-thin scrollbar-thumb-indigo-100 scrollbar-track-transparent`}
            >
                <div className="flex h-16 items-center justify-center px-4">
                    <h2 className="text-lg font-semibold text-gray-800 leading-tight">
                        OMS
                    </h2>
                </div>
                <div className="px-4 py-2">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchTerm}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <nav className="flex-1 p-4 overflow-y-auto">
                    {renderNavLinks()}
                </nav>
            </div>
        </>
    );
};

export default Sidebar;