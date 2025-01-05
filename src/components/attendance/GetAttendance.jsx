import NepaliDate from "nepali-date-converter";
import { useState, useEffect } from "react";
import customAxios from "../../utils/http";
import handleCatchError from "../../utils/handleCatchError";
import { useNavigate } from "react-router-dom";
import Loader from "../../utils/Loader";
import AttendanceTableRow from "./AttendanceTableRow";
import Dropdown from "../../utils/Dropdown";

function GetAttendance() {
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState(
        `${new NepaliDate().format("YYYY-MM")}-01`
    );
    const [endDate, setEndDate] = useState(
        new NepaliDate().format("YYYY-MM-DD")
    );
    const [search, setSearch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [datas, setDatas] = useState([]);
    const [rowsPerPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState([]);
    const [monthSelection, setMonthSelection] = useState(null);
    const [yearSelection, setYearSelection] = useState(null);

    const monthDropdown = [
        { label: "Baisakh", value: "01" },
        { label: "Jestha", value: "02" },
        { label: "Ashad", value: "03" },
        { label: "Shrawan", value: "04" },
        { label: "Bhadra", value: "05" },
        { label: "Ashwin", value: "06" },
        { label: "Kartik", value: "07" },
        { label: "Mangshir", value: "08" },
        { label: "Poush", value: "09" },
        { label: "Magh", value: "10" },
        { label: "Falgun", value: "11" },
        { label: "Chaitra", value: "12" },
    ];

    const generateYearDropdown = (startYear, endYear) => {
        const years = [];
        for (let year = endYear; year >= startYear; year--) {
            years.push({ label: year.toString(), value: year.toString() });
        }
        return years;
    };

    const yearDropdown = generateYearDropdown(
        2080,
        Number(new NepaliDate().format("YYYY"))
    );

    // Fetch data from the API

    const fetchAttendance = async () => {
        try {
            setIsLoading(true);
            const response = await customAxios.get(
                `/DailyAttendance/GetList/${endDate}/${startDate}`
            );
            setDatas(response.data);
            //using dummy data since [] is coming from api
            setFilteredData(response.data);
            console.log(response.data);
        } catch (error) {
            handleCatchError(error, navigate);
        } finally {
            setIsLoading(false);
        }
    };

    const attendIn = async () => {
        try {
            const data = await customAxios.post(`/DailyAttendance/AttendanceIn`);
            console.log(data);
        } catch (error) {
            handleCatchError(error, navigate);
        }
    };
    const attendOut = async () => {
        try {
            const data = await customAxios.put(`/DailyAttendance/AttendanceOut`);
            console.log(data);
        } catch (error) {
            handleCatchError(error, navigate);
        }
    };

    const handleDataChange = () => {
        fetchAttendance();
    };
    const handleSearch = () => {
        // Handle search logic here
        setSearch(!search);
        console.log("Start Date:", startDate);
        console.log("End Date:", endDate);
    };

    useEffect(() => {
        fetchAttendance();
    }, [search]);

    // Pagination logic
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl text-center">Attendence List</h1>
                    <button className="rounded-md bg-blue-600 px-3 py-2 w-36 text-white border-none hover:bg-blue-700" onClick={attendIn}>Attend In</button>
                    <button className="rounded-md bg-blue-600 px-3 py-2 w-36 text-white border-none hover:bg-blue-700" onClick={attendOut}>Attend Out</button>
                    <div className="flex flex-row gap-4">
                        <div className="flex   flex-col">
                            <h2 className="text-md font-semibold">
                                Start Date
                            </h2>
                            <input
                                className="w-48 p-2 rounded border-2 "
                                type="text"
                                onChange={(e) => setStartDate(e.target.value)}
                                placeholder="Date in BS (yyyy-mm-dd)"
                            />
                        </div>
                        <div className="flex   flex-col ">
                            <h2 className="text-md font-semibold">End Date</h2>
                            <input
                                className="w-48 p-2 rounded border-2"
                                type="text"
                                onChange={(e) => setEndDate(e.target.value)}
                                placeholder="BS(yyyy-mm-dd)"
                            />
                        </div>
                        <div className="flex   flex-col ">
                            <h2 className="text-md font-semibold">
                                Filter by Month
                            </h2>
                            <Dropdown
                                options={monthDropdown}
                                value={monthSelection}
                                onChange={(option) => setMonthSelection(option)}
                            />
                        </div>
                        <div className="flex   flex-col ">
                            <h2 className="text-md font-semibold">
                                Filter by Year
                            </h2>
                            <Dropdown
                                options={yearDropdown}
                                value={yearSelection}
                                onChange={(option) => setYearSelection(option)}
                            />
                        </div>

                        <button
                            onClick={handleSearch}
                            className="px-6 py-3 bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-800 transition-all duration-300"
                        >
                            Search
                        </button>
                    </div>

                    <div className="mt-4">
                        <h1 className="text-xl">
                            Attendence from <strong>{startDate}</strong> to{" "}
                            <strong>{endDate}</strong>
                        </h1>
                    </div>

                    <div>
                        <table className="text-sm w-full divide-y border-spacing-x-4 hidden min-[750px]:table min-[750px]:table-auto divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        S.N
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Remarks
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Time online
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 overflow">
                                {currentRows.length === 0 ? (
                                    <tr>
                                        <td
                                            className=" text-3xl bg-red-200 py-20 text-center rounded-3xl"
                                            colSpan={7}
                                        >
                                            No data available
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((data, index) => {
                                        return (
                                            <AttendanceTableRow
                                                key={data.AttendenceId}
                                                handleDataChange={
                                                    handleDataChange
                                                }
                                                index={indexOfFirstRow + index}
                                                data={data}
                                            />
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                            className="p-2 border rounded disabled:bg-blue-300 bg-blue-600 disabled:hover:bg-blue-300 text-white hover:bg-blue-800 "
                        >
                            Previous
                        </button>
                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }, (_, idx) => (
                                <button
                                    key={idx + 1}
                                    onClick={() => setCurrentPage(idx + 1)}
                                    className={`p-2 border rounded ${
                                        currentPage === idx + 1
                                            ? "bg-blue-600 text-white"
                                            : "hover:bg-blue-800 hover:text-white"
                                    }`}
                                >
                                    {idx + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            className="p-2 border rounded disabled:bg-blue-300 bg-blue-600 disabled:hover:bg-blue-300 text-white hover:bg-blue-800"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default GetAttendance;
