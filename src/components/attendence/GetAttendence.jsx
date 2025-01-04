import NepaliDate from "nepali-date-converter";
import { useState, useEffect } from "react";
import customAxios from "../../utils/http";
import handleCatchError from "../../utils/handleCatchError";
import { useNavigate } from "react-router-dom";
import Loader from "../../utils/Loader";

const dummyData = [
  {
    AttendenceId: 0,
    PersonalId: 0,
    FullName: "String",
    DateBs: "String",
    InTime: "String",
    OutTime: "String",
    RemarkId: 0,
    Remarks: "String",
    RemarkSymbol: "String",
  },
  {
    AttendenceId: 1,
    PersonalId: 1,
    FullName: "String",
    DateBs: "String",
    InTime: "String",
    OutTime: "String",
    RemarkId: 1,
    Remarks: "String",
    RemarkSymbol: "String",
  },
  {
    AttendenceId: 2,
    PersonalId: 2,
    FullName: "String",
    DateBs: "String",
    InTime: "String",
    OutTime: "String",
    RemarkId: 2,
    Remarks: "String",
    RemarkSymbol: "String",
  },
  {
    AttendenceId: 3,
    PersonalId: 3,
    FullName: "String",
    DateBs: "String",
    InTime: "String",
    OutTime: "String",
    RemarkId: 3,
    Remarks: "String",
    RemarkSymbol: "String",
  },
];

function GetAttendence() {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(
    `${new NepaliDate().format("YYYY-MM")}-01`
  );
  const [endDate, setEndDate] = useState(new NepaliDate().format("YYYY-MM-DD"));
  const [search, setSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [datas, setDatas] = useState([]);
  const [rowsPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);

  // Fetch data from the API
  const fetchAttendence = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      const response = await customAxios.get(
        `/DailyAttendance/GetList/${endDate}/${startDate}`
      );
      setDatas(response.data);
      //using dummy data since [] is coming from api
      setFilteredData(dummyData);
      console.log(response.data);
    } catch (error) {
      handleCatchError(error, navigate);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    // Handle search logic here
    setSearch(!search);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
  };

  useEffect(() => {
    fetchAttendence();
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
          <div className="flex flex-col gap-4">
            <h1 className="text-xl">Search from</h1>
            <div className="flex gap-4 items-center w-2/3">
              <input
                className="w-full p-2 rounded border-2"
                type="text"
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Start Date in BS (yyyy-mm-dd)"
              />
              <h1 className="text-xl">to</h1>
              <input
                className="w-full p-2 rounded border-2"
                type="text"
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="End Date in BS (yyyy-mm-dd)"
              />
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-800 transition-all duration-300"
              >
                Search
              </button>
            </div>
          </div>

          <div className="mt-4">
            <h1 className="text-xl">
              Attendence from <strong>{startDate}</strong> to{" "}
              <strong>{endDate}</strong>
            </h1>
          </div>

          <div>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((data) => (
                  <tr key={data.AttendenceId}>
                    <td className="border px-4 py-2">{data.AttendenceId}</td>
                    <td className="border px-4 py-2">{data.FullName}</td>
                    <td className="border px-4 py-2">{data.DateBs}</td>
                    <td className="border px-4 py-2">{data.InTime}</td>
                    <td className="border px-4 py-2">{data.OutTime}</td>
                  </tr>
                ))}
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

export default GetAttendence;
