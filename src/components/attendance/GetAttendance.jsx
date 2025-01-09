import NepaliDate from "nepali-date-converter";
import { useState, useEffect } from "react";
import customAxios from "../../utils/http";
import handleCatchError from "../../utils/handleCatchError";
import { useNavigate } from "react-router-dom";
import Loader from "../../utils/Loader";
import AttendanceTableRow from "./AttendanceTableRow";
import Pagination from "../../utils/Pagination";

import Calender from "../../utils/Calender";

function GetAttendance() {
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState({
        year: new NepaliDate().format("YYYY"),
        month: new NepaliDate().format("MM"),
        day:"01",
    });
    const [endDate, setEndDate] = useState({
        year: new NepaliDate().format("YYYY"),
        month: new NepaliDate().format("MM"),
        day:new NepaliDate().format("DD"),
    });
    const [search, setSearch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rowsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState([]);

    // Fetch data from the API
    const fetchAttendance = async () => {
        try {
            setIsLoading(true);
            const response = await customAxios.get(
                `/DailyAttendance/GetList/${endDate.year}-${endDate.month}-${endDate.day}/${startDate.year}-${startDate.month}-${startDate.day}`
            );
            setFilteredData(response.data);
            console.log(response.data);
        } catch (error) {
            handleCatchError(error, navigate);
        } finally {
            setIsLoading(false);
        }
    };

    //Attend in the User
    const attendIn = async () => {
        try {
            const data = await customAxios.post(
                `/DailyAttendance/AttendanceIn`
            );
            console.log(data);
        } catch (error) {
            handleCatchError(error, navigate);
        }
    };

    //Attend out the User
    const attendOut = async () => {
        try {
            const data = await customAxios.put(
                `/DailyAttendance/AttendanceOut`
            );
            console.log(data);
        } catch (error) {
            handleCatchError(error, navigate);
        }
    };

    // Handle data change
    const handleDataChange = () => {
        fetchAttendance();
    };

    const handleSearch = () => {
        // Handle search logic here
        if (startDate === "") {
            setStartDate(`${new NepaliDate().format("YYYY-MM")}-01`);
            return;
        }
        if (endDate === "") {
            setEndDate(`${new NepaliDate().format("YYYY-MM-DD")}`);
        }
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
                    <div className="flex gap-3 flex-wrap">
                        <button
                            className="rounded-md bg-blue-600 px-3 py-2 w-36 text-white border-none hover:bg-blue-700 font-semibold"
                            onClick={attendIn}
                        >
                            Attend In
                        </button>
                        <button
                            className="rounded-md bg-blue-600 px-3 py-2 w-36 text-white border-none hover:bg-blue-700 font-semibold"
                            onClick={attendOut}
                        >
                            Attend Out
                        </button>
                    </div>

                    <div className="flex flex-row gap-4 items-end flex-wrap ">
                        <>
                            <div className="flex   flex-col">
                                <h2 className="text-md font-semibold">
                                    Start Date
                                </h2>
                                <Calender
                                    language="np"
                                    getDate={setStartDate}
                                    defaultDate={startDate}
                                    restrict
                                    
                                />
                            </div>
                            <div className="flex   flex-col ">
                                <h2 className="text-md font-semibold">
                                    End Date
                                </h2>
                                <Calender
                                    language="en"
                                    getDate={setEndDate}
                                    defaultDate={endDate}
                                    restrict
                                    editable
                                />
                            </div>
                        </>

                        <button
                            onClick={handleSearch}
                            className="rounded-md bg-blue-600 px-3 py-2 w-36 text-white border-none hover:bg-blue-700 font-semibold h-fit "
                        >
                            Search
                        </button>
                    </div>

                    <div className="mt-4">
                        <h1 className="text-xl">
                            Attendence from{" "}
                            <strong>{`${startDate.year}-${startDate.month}-${startDate.day}`}</strong>{" "}
                            to{" "}
                            <strong>{`${endDate.year}-${endDate.month}-${endDate.day}`}</strong>
                        </h1>
                    </div>

                    <div>
                        <table className=" w-full divide-y border-spacing-x-4 hidden min-[750px]:table min-[750px]:table-auto divide-gray-200">
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
                                    {/* <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Remarks
                                    </th> */}
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
                                    currentRows.map((data, index) => {
                                        return (
                                            <AttendanceTableRow
                                                key={data.AttendanceId}
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
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                    />
                </div>
            )}
        </>
    );
}

export default GetAttendance;
