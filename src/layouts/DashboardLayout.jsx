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
    console.log(
        "THis is from dashboard layout :",
        "isMobile:",
        isMobile,
        "isCollapsed:",
        isCollapsed
    );
    return (
        <div className="flex overflow-hidden h-screen">
            <Sidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />

            <div className="flex flex-1 flex-col">
                <Suspense fallback={<LazyLoader />}>
                    <Header
                        isCollapsed={isCollapsed}
                        isMobile={isMobile}
                        setIsCollapsed={setIsCollapsed}
                    />
                </Suspense>
                <div className="flex-1 overflow-y-auto px-4 py-2 md-px-8 ">
                    <Suspense fallback={<LazyLoader />}>
                        <Outlet />
                    </Suspense>
                </div>
            </div>
            {isMobile && !isCollapsed && (
                <div
                    className="fixed inset-0 bg-black/20 z-20"
                    onClick={() => setIsCollapsed(true)}
                />
            )}
        </div>
    );
};

export default DashboardLayout;
