import NepaliDate from "nepali-date-converter";
import { useState, useEffect } from "react";
import customAxios from "../../utils/http";
import handleCatchError from "../../utils/handleCatchError";
import { useNavigate } from "react-router-dom";
import Loader from "../../utils/Loader";
import AttendanceTableRow from "./AttendanceTableRow";
import Pagination from "../../utils/Pagination";
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
    const [rowsPerPage] = useState(20);
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
            const response = await customAxios.get(`/DailyAttendance/GetList/${endDate}/${startDate}`);
            setDatas(response.data);
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

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };
    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const filterData = (data) => {
        let updatedData = [...data];
        if (monthSelection && yearSelection) {
            updatedData = datas.filter((item) => {
                const date = new NepaliDate(item.DateBs);
                return (
                    date.format("MM") === monthSelection.value &&
                    date.format("YYYY") === yearSelection.value
                );
            });
        } else if (monthSelection) {
            updatedData = datas.filter((item) => {
                const date = new NepaliDate(item.DateBs);
                return date.format("MM") === monthSelection.value;
            });
        } else if (yearSelection) {
            updatedData = datas.filter((item) => {
                const date = new NepaliDate(item.DateBs);
                return date.format("YYYY") === yearSelection.value;
            });
        }
        setFilteredData(updatedData);
        setCurrentPage(1);
        console.log(updatedData);
    };
    const handleClearFilter = () => {
        setMonthSelection(null);
        setYearSelection(null);
    };

    useEffect(() => {
        filterData(datas);
    }, [monthSelection, yearSelection]);
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
                                <input
                                    className="w-48 p-2 rounded border-2 "
                                    type="text"
                                    onChange={handleStartDateChange}
                                    placeholder="Date in BS (yyyy-mm-dd)"
                                />
                            </div>
                            <div className="flex   flex-col ">
                                <h2 className="text-md font-semibold">
                                    End Date
                                </h2>
                                <input
                                    className="w-48 p-2 rounded border-2"
                                    type="text"
                                    onChange={handleEndDateChange}
                                    placeholder="BS(yyyy-mm-dd)"
                                />
                            </div>
                        </>
                        <div className="flex gap-4 items-end ">
                            <div className="flex  flex-col ">
                                <h2 className="text-md font-semibold">
                                    Filter by Month
                                </h2>
                                <Dropdown
                                    options={monthDropdown}
                                    value={monthSelection}
                                    onChange={(option) =>
                                        setMonthSelection(option)
                                    }
                                />
                            </div>
                            <div className="flex   flex-col ">
                                <h2 className="text-md font-semibold">
                                    Filter by Year
                                </h2>
                                <Dropdown
                                    options={yearDropdown}
                                    value={yearSelection}
                                    onChange={(option) =>
                                        setYearSelection(option)
                                    }
                                />
                            </div>
                            <button
                                className=" bg-red-500 border-none h-fit text-white rounded w-[40px] h-[40px]"
                                title="Clear filter"
                                onClick={handleClearFilter}
                            >
                                <i className="bx bx-trash text-lg" />
                            </button>
                        </div>

                        <button
                            onClick={handleSearch}
                            className="rounded-md bg-blue-600 px-3 py-2 w-36 text-white border-none hover:bg-blue-700 font-semibold h-fit "
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
