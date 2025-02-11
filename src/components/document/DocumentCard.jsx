import { useState } from "react";
import DeleteItem from "../DeleteItem";
export const DocumentCard = ({
    index,
    data,
    onEdit,
    onDelete,
    onViewInfo,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const handleDelete = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="p-4 space-y-3  transition-all duration-200 bg-white shadow-lg border-2 border-gray-300 rounded-lg ">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">
                    {index + 1}. {data.DocTitle}
                </h3>
                <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold 
             bg-green-100 text-green-700 ring-2 ring-green-600/20 `}
                >
                    {data?.status || "Active"}
                </span>
            </div>

            <div className="space-y-2 text-sm text-gray-700">
                <p className="flex gap-2">
                    <span className="font-bold text-gray-800">
                        Description:
                    </span>
                    {`${
                        data.DocDescription?.slice(0, 50) ||
                        "No description available"
                    } ...`}
                </p>
            </div>

            <div className="flex gap-2 pt-2 flex-wrap">
                <button
                    onClick={() => onEdit(data.DocId)}
                    className="flex-1 bg-gray-50 border rounded-md p-1 hover:bg-gray-100 hover:text-gray-900 border-gray-300 flex justify-center items-center gap-2"
                >
                    <i className="bx bx-edit w-5 h-5 mr-1 flex justify-center items-center" />
                    Edit
                </button>
                <button
                    onClick={() => onViewInfo(data.DocId)}
                    className="flex-1 bg-gray-50 border rounded-md p-1 hover:bg-gray-100 hover:text-gray-900 border-gray-300 flex justify-center items-center gap-2"
                >
                    <i className="bx bx-home w-5 h-5 mr-1 flex justify-center items-center" />
                    View
                </button>
                <button
                    onClick={handleDelete}
                    className="flex-1 bg-red-50 border rounded-md p-1 hover:bg-red-100 text-red-500 border-red-300 flex justify-center items-center gap-2"
                >
                    <i className="bx bx-block w-5 h-5 mr-1 flex justify-center items-center " />
                    Block
                </button>
            </div>
            {isModalOpen && (
                <DeleteItem
                    isModalOpen={isModalOpen}
                    handleModal={handleModal}
                    deleteHandle={onDelete}
                    name={data.DocTitle}
                />
            )}
        </div>
    );
};
