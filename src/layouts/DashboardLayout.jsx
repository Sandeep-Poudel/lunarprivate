import React, { Suspense, lazy } from "react";
const Sidebar = lazy(() => import("../components/Sidebar"));
const Header = lazy(() => import("../components/Header"));
import { Outlet } from "react-router-dom";
import LazyLoader from "../utils/LazyLoader";
import { useState } from "react";
import useIsMobile from "../utils/useMobile";

const DashboardLayout = () => {
    const isMobile = useIsMobile();
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    return (
        <div className="flex overflow-hidden h-screen">
            <Sidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}         
            />

            <div className="flex flex-1 flex-col overflow-x-hidden">
                <Header
                    isCollapsed={isCollapsed}
                    isMobile={isMobile}
                    setIsCollapsed={setIsCollapsed}
                />
                <div className="flex-1 overflow-x-auto px-4 py-2 md-px-8 ">
                    <Suspense fallback={<LazyLoader />}>
                        <Outlet />
                    </Suspense>
                </div>
            </div>
            
        </div>
    );
};

export default DashboardLayout;
