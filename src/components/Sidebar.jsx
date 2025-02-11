import React from "react";
import useIsMobile from "../utils/useMobile";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
    const isMobile = useIsMobile();
    const [searchTerm, setSearchTerm] = useState("");

    // const handleLogout = () => {
    //   localStorage.removeItem("authToken");
    //   showToast("Logged Out Successfully", "success");
    //   navigate("/login");
    // };
    const [expandedList, setExpandedList] = useState(null);

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSidebarCollapse = () => {
        setIsCollapsed((prev) => !prev);
        setSearchTerm("");
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

    if (isMobile && isCollapsed) {
        return null;
    }

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
                    setExpandedList((prev) => {
                        if (prev === index) {
                            return null;
                        } else {
                            return index;
                        }
                    })
                }
            >
                <NavLink
                    to={item.to}
                    className={`
                                flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-200
                                ${isCollapsed && "justify-center"}
                            `}
                    onClick={() => isMobile && setIsCollapsed(true)}
                >
                    {item.icon}
                    {!isCollapsed && (
                        <span className="truncate">{item.title}</span>
                    )}
                </NavLink>
                {!isCollapsed &&
                    (expandedList === index || searchTerm.length > 0) &&
                    item.items?.length > 0 && (
                        <div className="ml-8 space-y-1 ">
                            {item.items?.map((subItem) => (
                                <NavLink
                                    key={subItem.title}
                                    to={subItem.to}
                                    onClick={() =>
                                        isMobile && setIsCollapsed(true)
                                    }
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
            <div
                className={`fixed sidebar md:relative z-[100] flex flex-col border-r ${
                    isMobile ? "bg-white" : "bg-white/50 backdrop-blur-xl"
                } transition-all duration-300 h-screen
                ${isCollapsed ? "w-20" : "w-64"} `}
            >
                <div className="flex h-16 items-center justify-between px-4">
                    <h2
                        className={`
                        "text-lg font-semibold text-gray-800 leading-tight"
                        ${isCollapsed && "hidden"}
                    `}
                    >
                        OMS
                    </h2>
                    <button
                        onClick={handleSidebarCollapse}
                        className="rounded-lg  hover:bg-gray-100 flex  justify-center items-center p-2 h-auto"
                    >
                        {isCollapsed ? (
                            <i className="bx bx-menu text-2xl w-5 h-5 flex justify-center items-center" />
                        ) : (
                            <i className="bx bx-x  text-2xl w-5 h-5 flex justify-center items-center" />
                        )}
                    </button>
                </div>
                {!isCollapsed && (
                    <div className="px-4 py-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchTerm}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                )}
                <nav className="flex-1  p-4 overflow-y-auto ">
                    {renderNavLinks()}
                </nav>
            </div>
            {isMobile && !isCollapsed && (
                <div
                    className="fixed inset-0 bg-black/20 z-20"
                    onClick={() => setIsCollapsed(true)}
                />
            )}
        </>
    );
};

export default Sidebar;
//return(
// <>
//     <div className="bg-indigo-900/50 transition-opacity duration-300" />
//     <aside className="sidebar fixed lg:static w-[240px]  h-[calc(100vh-4rem)] lg:h-auto transform -translate-x-full lg:translate-x-0 transition-transform duration-300 z-[110] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-indigo-100 scrollbar-track-transparent ">
//         <NavLink
//             to="/"
//             className={({ isActive }) =>
//                 `flex items-center cursor-pointer py-2 px-2  rounded ${
//                     isActive
//                         ? "text-blue-500 font-semibold bg-blue-100"
//                         : "text-gray-600 hover:bg-gray-100"
//                 }`
//             }
//         >
//             <i className="bx bx-home-alt mr-2 text-lg" />
//             Home
//         </NavLink>
//         <NavLink
//             to="/courseGroup"
//             className={({ isActive }) =>
//                 `flex items-center cursor-pointer py-2 px-1  rounded ${
//                     isActive
//                         ? "text-blue-500 font-semibold bg-blue-100"
//                         : "text-gray-600 hover:bg-gray-100"
//                 }`
//             }
//         >
//             <i className="bx bx-book mr-2 text-lg" />
//             Course Group
//         </NavLink>
//         <NavLink
//             to="/documentGroup"
//             className={({ isActive }) =>
//                 `flex items-center cursor-pointer py-2 px-1  rounded ${
//                     isActive
//                         ? "text-blue-500 font-semibold bg-blue-100 text-[15px]"
//                         : "text-gray-600 hover:bg-gray-100"
//                 }`
//             }
//         >
//             <i className="bx bxs-folder-open mr-2 text-lg" />
//             Document Group
//         </NavLink>
//         <NavLink
//             to="/role"
//             className={({ isActive }) =>
//                 `flex items-center cursor-pointer py-2 px-1  rounded ${
//                     isActive
//                         ? "text-blue-500 font-semibold bg-blue-100"
//                         : "text-gray-600 hover:bg-gray-100"
//                 }`
//             }
//         >
//             <i className="bx bx-male mr-2 text-2xl" />
//             Role
//         </NavLink>

//         <NavLink
//             to="/office"
//             className={({ isActive }) =>
//                 `flex items-center cursor-pointer py-2 px-1  rounded ${
//                     isActive
//                         ? "text-blue-500 font-semibold bg-blue-100"
//                         : "text-gray-600 hover:bg-gray-100"
//                 }`
//             }
//         >
//             <i className="bx bxs-building-house mr-2 text-2xl" />
//             Office
//         </NavLink>

//         <NavLink
//             to="/personCategory"
//             className={({ isActive }) =>
//                 `flex items-center cursor-pointer py-2 px-1  rounded ${
//                     isActive
//                         ? "text-blue-500 font-semibold bg-blue-100 text-[15px]"
//                         : "text-gray-600 hover:bg-gray-100"
//                 }`
//             }
//         >
//             <i className="bx bx-male-female mr-2 text-2xl" />
//             Person Category
//         </NavLink>

//         {/* Third Section */}
//         <NavLink
//             to="/certificateType"
//             className={({ isActive }) =>
//                 `flex items-center cursor-pointer py-2 px-1  rounded ${
//                     isActive
//                         ? "text-blue-500 font-semibold bg-blue-100"
//                         : "text-gray-600 hover:bg-gray-100"
//                 }`
//             }
//         >
//             <i className="bx bx-file mr-2 text-2xl" />
//             Certificate Type
//         </NavLink>

//         <NavLink
//             to="/feeTopic"
//             className={({ isActive }) =>
//                 `flex items-center cursor-pointer py-2 px-1  rounded ${
//                     isActive
//                         ? "text-blue-500 font-semibold bg-blue-100"
//                         : "text-gray-600 hover:bg-gray-100"
//                 }`
//             }
//         >
//             <i className="bx bxs-credit-card-alt mr-2 text-2xl" />
//             Fee Topic
//         </NavLink>

//         <NavLink
//             to="/Attendence"
//             className={({ isActive }) =>
//                 `flex items-center cursor-pointer py-2 px-1  rounded ${
//                     isActive
//                         ? "text-blue-500 font-semibold bg-blue-100"
//                         : "text-gray-600 hover:bg-gray-100"
//                 }`
//             }
//         >
//             <i className="bx bxs-calendar mr-2 text-2xl" />
//             Attendence
//         </NavLink>

//         <NavLink
//             to="/Document"
//             className={({ isActive }) =>
//                 `flex items-center cursor-pointer py-2 px-1  rounded ${
//                     isActive
//                         ? "text-blue-500 font-semibold bg-blue-100"
//                         : "text-gray-600 hover:bg-gray-100"
//                 }`
//             }
//         >
//             <i className="bx bx-file mr-2 text-2xl" />
//             Document
//         </NavLink>

//         Profile Section
// <div className="bg-white rounded-xl shadow-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
//   <NavLink
//     to="/profile"
//     className={({ isActive }) =>
//       `flex items-center cursor-pointer py-4  ${
//         isActive ? "text-indigo-800 font-semibold bg-blue-100" : "text-gray-600"
//       }`
//     }
//   >
//     <i className="bx bx-user mr-2 text-lg" />
//     Profile
//   </NavLink>
//   <NavLink
//     to="/settings"
//     className={({ isActive }) =>
//       `flex items-center cursor-pointer py-4  ${
//         isActive ? "text-indigo-800 font-semibold" : "text-gray-600"
//       }`
//     }
//   >
//     <i className="bx bx-wrench mr-2 text-lg" />
//     Settings
//   </NavLink>
//   <button
//     onClick={handleLogout}
//     className="flex items-center cursor-pointer text-gray-600 hover:text-indigo-800 py-4 "
//   >
//     <i className="bx bx-log-out mr-2 text-lg" />
//     Log out
//   </button>
// </div>
//     </aside>
// </>
//)
//export const Sidebar;
