import React, { Suspense, lazy } from "react";
const Sidebar = lazy(() => import("../components/Sidebar"));
const Header = lazy(() => import("../components/Header"));
import { Outlet } from "react-router-dom";
import LazyLoader from "../utils/LazyLoader";
import { useState } from "react";

const DashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(false); // Manage sidebar state

    const toggleMobileMenu = () => {
        setIsOpen((prev) => !prev);
    };
    return (
        <div className="flex flex-col h-screen">
            <Suspense fallback={<LazyLoader />}>
                <Header toggleMobileMenu={toggleMobileMenu} isOpen={isOpen} />
            </Suspense>

            <div className="flex flex-1  overflow-hidden">
                <Sidebar isOpen={isOpen} toggleMobileMenu={toggleMobileMenu} />{" "}
                <div className="flex-1 bg-gray-100 p-4 overflow-auto scrollbar scrollbar-thumb-indigo-300 scrollbar-track-transparent">
                    <Suspense fallback={<LazyLoader />}>
                        <Outlet />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
