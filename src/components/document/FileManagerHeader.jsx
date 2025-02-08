import { useState, useEffect } from "react";
import customAxios from "../../utils/http";

export const FileManagerHeader = ({
    selectedCount,
    totalCount,
    onDeleteSelected,
    onSelectAll,
    onClearSelection,
}) => {
    const [people, setPeople] = useState([]);
    const getPersonList = async () => {
        try {
            const response = await customAxios.get(`/Person/GetList/`);
            const dt = response.data;
            console.log("Access by ", dt);
            setPeople(dt);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getPersonList();
    }, []);

    return (
        <div className="flex justify-between items-center mb-6 gap-2 flex-wrap">
            <h1 className="text-2xl font-bold">File Manager</h1>
            {selectedCount > 0 && (
                <div className="flex  flex-wrap items-center gap-2">
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
                        <i className="bx bxs-trash w-4 h-4" />
                        Delete ({selectedCount})
                    </button>
                </div>
            )}
            <div>
                <select
                    multiple
                    className="border border-gray-300 rounded px-4 py-2"
                    onChange={(e) => {
                        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                        console.log("Selected options: ", selectedOptions);
                    }}
                >
                    {people.map((person) => (
                        <option key={person.id} value={person.id}>
                            {person.FirstName}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
