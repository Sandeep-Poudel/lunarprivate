import React from "react";
import { ToastContainer } from "react-toastify";
import { DashboardCard } from "../utils/DashboardCard";
const Dashboard = () => {
    const userData = {
        name: "Admin",
        role: "Administator",
    };

    return (
        <div className="flex-1 px-4  md:p-8">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Welcome back, {userData?.name || "Admin"}! 👋
                </h1>
                <p className="mt-2 text-gray-600">
                    Here's what's happening in your institution today
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <DashboardCard
                    title="Total Office"
                    value="5"
                    icon={
                        <i className="bx bx-group flex justify-center items-center text-2xl h-6 w-6 text-blue-500" />
                    }
                />
                <DashboardCard
                    title="Total People"
                    value="20"
                    icon={
                        <i className=" bx bxs-graduation justify-center flex items-center text-2xl h-6 w-6 text-green-500" />
                    }
                />
                <DashboardCard
                    title="Total Courses"
                    value="12"
                    icon={
                        <i className="bx bx-book  text-2xl justify-center flex items-center h-6 w-6 text-purple-500" />
                    }
                />
            </div>

            {/* Analytics Section */}
            {/* <div className="mt-6 md:mt-8 grid gap-6 grid-cols-1 lg:grid-cols-2"> */}
            {/* Student Growth Chart */}
            {/* <div className="rounded-xl border bg-white/50 p-4 md:p-6 backdrop-blur-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <i className="bx  bx-trending-up h-5 w-5 text-blue-500" />
                            Student Growth
                        </h2>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={sampleData}>
                                <defs>
                                    <linearGradient
                                        id="colorStudents"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#60A5FA"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#60A5FA"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="students"
                                    stroke="#60A5FA"
                                    fillOpacity={1}
                                    fill="url(#colorStudents)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                Attendance Rate Chart
                <div className="rounded-xl border bg-white/50 p-4 md:p-6 backdrop-blur-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Activity className="h-5 w-5 text-green-500" />
                            Attendance Rate
                        </h2>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={sampleData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="attendance"
                                    stroke="#22C55E"
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div> */}
            {/* </div> */}

            <div className="mt-6 md:mt-8 rounded-xl border bg-white/50 p-4 md:p-6 backdrop-blur-lg">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                    Quick Actions
                </h2>
                <div className="mt-4 grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        "View Document",
                        "View Office List",
                        "Add Document",
                        "Settings",
                    ].map((action) => (
                        <button
                            key={action}
                            className="rounded-lg border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            {action}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
