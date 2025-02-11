import { useState, useEffect } from "react";
import customAxios from "../../utils/http";

export const FileManagerHeader = ({
    selectedCount,
    totalCount,
    onDeleteSelected,
    onSelectAll,
    id,
    onClearSelection,
}) => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [accessBy, setAccessBy] = useState([]);

    // const getPersonList = async () => {
    //     try {
    //         const response = await customAxios.get(`/Person/GetList/`);
    //         const dt = response.data;
    //         console.log("List of people ", dt);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const getAccessList = async () => {
        try {
            const response = await customAxios.get(
                `/DocumentAccess/GetPersonList/${id}`
            );
            const dt = response.data;
            console.log("Access by ", dt);
            setAccessBy(dt);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // getPersonList();
        getAccessList();
    }, []);

    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };



    return (
        <div className="relative">
            <div className="flex justify-between items-center mb-6 gap-2 flex-wrap">
                <h1 className="text-2xl font-bold">File Manager</h1>
                <button
                    onClick={togglePanel}
                    className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    <i className="bx bx-user-check w-4 h-4" />
                    Page Access
                </button>
            </div>
            {selectedCount > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    <button
                        onClick={onSelectAll}
                        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        <i className="bx bx-select-multiple w-4 h-4" />
                        Select {totalCount}
                        {console.log(
                            "selectedCount",
                            selectedCount,
                            totalCount
                        )}
                    </button>
                    <button
                        onClick={onClearSelection}
                        className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                        <i className="bx bx-eraser w-4 h-4" />
                        Clear
                    </button>
                    <button
                        onClick={onDeleteSelected}
                        className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        <i className="bx bxs-trash w-4 h-4" />({selectedCount})
                    </button>
                </div>
            )}

            {/*===========================================- Access Panel -============================================*/}
            {isPanelOpen && (
                <div className={`fixed inset-0 flex justify-end z-[200]`}>
                    <div
                        className={`bg-white w-80 h-full shadow-lg p-4 z-[300] ${
                            isPanelOpen ? "translate-x-0" : "translate-x-full"
                        } transition-transform duration-1000`}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">
                                Access List
                            </h2>
                            <button
                                onClick={togglePanel}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <i className="bx bx-x w-6 h-6" />
                            </button>
                        </div>
                        <ul>
                            {accessBy.length === 0 ? (
                                <li className="mb-2">No people have access</li>
                            ) : (
                                accessBy.map((person) => (
                                    <li key={person.id} className="mb-2">
                                        {person.FirstName} {person.LastName}
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                    <div
                        className="fixed inset-0 bg-black opacity-50 z-[250]"
                        onClick={togglePanel}
                    ></div>
                </div>
            )}
        </div>
    );
};
