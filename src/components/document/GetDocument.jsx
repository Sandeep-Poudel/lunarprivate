import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import customAxios from "../../utils/http";
import handleCatchError from "../../utils/handleCatchError";
import Loader from "../../utils/Loader";
import Pagination from "../../utils/Pagination";
import DocumentTable from "./DocumentTable";
import useIsMobile from "../../utils/useMobile";
import DeleteItem from "../DeleteItem";

function GetDocument() {
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    //demo groupid
    const groupId = 1;
    const [datas, setDatas] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showBlocked, setShowBlocked] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterColumn, setFilterColumn] = useState("default");
    const [sortOrder, setSortOrder] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);

    const columns = [
        { key: "serialNumber", header: "S.N", width: "80px" },
        { key: "DocId", header: "Document Id" },

        { key: "DocTitle", header: "Document Title" },
        { key: "DocDescription", header: "Document Description" },
        { key: "status", header: "Status", width: "100px" },
    ];
    // Fetch data from the API
    const fetchDocuments = async () => {
        try {
            setIsLoading(true);
            console.log(`/Document/GetList/${groupId}/${showBlocked}`);
            const response = await customAxios.get(
                `/Document/GetList/${groupId}/`
            );
            const dt = await response.data;
            console.log(dt);
            setDatas(dt);
            setFilteredData(dt);
        } catch (error) {
            handleCatchError(error, navigate);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        document.title = "Document List";
        fetchDocuments();
    }, [showBlocked]);

    const handleEdit = (data) => {
        navigate("editFile/", { state: { data } });
    };
    const handleView = (data) => {
        navigate(`seeFile/${data.DocId}`, {
            state: { data },
        });
    };

    const handleDelete = async (DocId) => {
        try {
            setIsLoading(true);
            const response = await customAxios.delete(
                `/Document/RemoveDocument/${DocId}`
            );
            await fetchDocuments();
        } catch (error) {
            handleCatchError(error, navigate);
        } finally {
            setIsLoading(false);
        }
    };

    //reset all the filter and search columns when blocked and unbocked data toggled
    useEffect(() => {
        setFilterColumn("default");
        setSortOrder("default");
        setSearchQuery("");
    }, [showBlocked]);

    // Handle search input change
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const searchInItem = (item) => {
            // Check the current item's properties
            const matches = Object.values(item || {}).some((value) => {
                return value?.toString().toLowerCase().includes(query);
            });
            return matches;
        };

        const filtered = datas.filter(searchInItem);
        setFilteredData(filtered);
        setCurrentPage(1);
    };

    // Handle column filter and sort
    const handleFilterAndSort = () => {
        let updatedData = [...datas];

        if (sortOrder == "default" && filterColumn == "default") {
            return 1;
        }

        if (filterColumn) {
            updatedData = datas.filter((item) =>
                item[filterColumn]
                    ?.toString()
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            );
        }

        if (sortOrder && filterColumn) {
            updatedData.sort((a, b) => {
                const valueA = a[filterColumn]?.toString().toLowerCase();
                const valueB = b[filterColumn]?.toString().toLowerCase();

                if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
                if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
                return 0;
            });
        }

        setFilteredData(updatedData);
        setCurrentPage(1);
    };

    useEffect(() => {
        handleFilterAndSort();
    }, [filterColumn, sortOrder, searchQuery]);

    // const handleBlockList = () => {
    //   showBlocked === "" ? setShowBlocked("/true") : setShowBlocked("");
    // };

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
                <div className=" mx-auto">
                    <div className="flex justify-center min-[750px]:justify-end gap-8">
                        <Link to={`/Document/insert/${groupId}`}>
                            <button className="bg-green-700 text-white p-4 rounded-xl  flex gap-2 items-center">
                                <i className="bx bx-plus-medical"></i> New Doc
                            </button>
                        </Link>
                        {/* <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded-xl w-4 h-4 cursor-pointer"
                onChange={handleBlockList}
                onClick={handleFilterAndSort}
                checked={showBlocked}
              />
              <p>Show Blocked</p>
            </div> */}
                    </div>

                    <div className="text-3xl text-center">All Document</div>
                    <div className="flex justify-between items-center mt-4 mb-2 gap-4 flex-wrap w-full">
                        <input
                            type="text"
                            className="border p-2 rounded w-screen min-[440px]:w-auto"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <select
                            className="border p-2 rounded cursor-pointer"
                            onChange={(e) => setFilterColumn(e.target.value)}
                            value={filterColumn}
                        >
                            <option value="default" disabled>
                                --Filter by Column--
                            </option>
                            <option value="DocTitle">Document Name</option>
                            <option value="DocDescription">
                                Document Description
                            </option>
                        </select>
                        <select
                            className="border p-2 rounded cursor-pointer"
                            onChange={(e) => setSortOrder(e.target.value)}
                            value={sortOrder}
                        >
                            <option value="default" disabled>
                                --Sort Order--
                            </option>
                            <option
                                value="asc"
                                disabled={filterColumn === "default"}
                                className={
                                    filterColumn === "default"
                                        ? "text-red-400"
                                        : ""
                                }
                            >
                                Ascending
                            </option>
                            <option
                                value="desc"
                                disabled={filterColumn === "default"}
                                className={
                                    filterColumn === "default"
                                        ? "text-red-400"
                                        : ""
                                }
                            >
                                Descending
                            </option>
                        </select>
                    </div>
                    {/*tabel*/}

                    <DocumentTable
                        data={filteredData}
                        columns={columns}
                        onEdit={handleEdit}
                        onView={handleView}
                        onDelete={handleDelete}
                    />

                    {/*  */}
                    {/*pagation*/}
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

export default GetDocument;

// <table className="text-sm w-full divide-y border-spacing-x-4 hidden min-[750px]:table min-[750px]:table-auto divide-gray-200">
//             <thead>
//               <tr>
//                 <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   S.N
//                 </th>
//                 <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Document Name
//                 </th>
//                 <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Document Description
//                 </th>
//                 {/* <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th> */}
//                 <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200 overflow">
//               {currentRows.length === 0 ? (
//                 <tr>
//                   <td
//                     className=" text-3xl bg-red-200 py-20 text-center rounded-3xl"
//                     colSpan={7}
//                   >
//                     No data available
//                   </td>
//                 </tr>
//               ) : (
//                 currentRows.map((data) => {
//                   return (
//                     <DocumentTableRow
//                       key={data?.DocId}
//                       data={data}
//                       handleDataChange={() => {}}
//                     />
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
