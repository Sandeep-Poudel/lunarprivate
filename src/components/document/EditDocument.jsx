import React, { useEffect, useState } from "react";
import { data, useLocation, useNavigate, useParams } from "react-router-dom";
import customAxios from "../../utils/http";
import { showToast } from "../../utils/ReactToast";
import handleCatchError from "../../utils/handleCatchError";
import CLoader from "../../utils/CLoader";

function EditDocument({ editItem, onClose, onEdit }) {
    const navigate = useNavigate();
    // Use the hook to get search parameters
    // Retrieve the 'id' parameter and set to the ParentId
    console.log("Edit file editItem: ", editItem);
    const [title, setTitle] = useState(editItem?.DocTitle);
    const DocId = editItem?.DocId;
    const [DocDescription, setDocDescription] = useState(
        editItem?.DocDescription
    );
    const [GroupId, setGroupId] = useState(editItem?.GroupId);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log({
            DocId,
            DocTitle: title,
            DocDescription,
            GroupId,
        });
        try {
            const response = await customAxios.put(`/Document/Update`, {
                DocId,
                DocTitle: title,
                DocDescription: DocDescription,
                GroupId: GroupId,
            });
            if (response.status == 200) {
                showToast("Document updated Successfully", "success");
                setIsLoading(false);
                onEdit();
                onClose();
            }
        } catch (error) {
            handleCatchError(error, navigate);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleDescriptionChange = (e) => {
        setDocDescription(e.target.value);
    };

    return (
        <>
            <div className="fixed inset-0 z-[100] bg-black bg-opacity-75 flex justify-center items-center mx-auto  max-h-[100%]" onClick={onClose}>
                <div className=" ">
                    <div className="w-full border bg-white sm:max-w-xl m-4 p-4 sm:m-10 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent"
                     onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end">
                            <button
                                className="close-btn text-2xl text-indigo-700 font-extrabold hover:text-red-300"
                                onClick={onClose}
                            >
                                X
                            </button>
                        </div>
                        <div className="mt-4">
                            {/* Heading */}
                            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                                Edit Document
                            </h1>

                            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Document Name */}
                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="DocumentName"
                                        className="block text-lg font-medium text-gray-800 mb-1"
                                    >
                                        Document Title
                                    </label>
                                    <input
                                        type="text"
                                        id="DocumentName"
                                        name="DocumentName"
                                        value={title}
                                        onChange={handleTitleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="DocumentName"
                                        className="block text-lg font-medium text-gray-800 mb-1"
                                    >
                                        Document Description
                                    </label>
                                    <input
                                        type="text"
                                        id="DocumentDescription"
                                        name="DocumentDescription"
                                        value={DocDescription}
                                        onChange={handleDescriptionChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                        required
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="md:col-span-2 flex flex-wrap justify-end gap-4">
                                    <button
                                        type="reset"
                                        className="px-6 py-3 bg-red-700 text-white text-sm rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
                                        onClick={() => navigate("/document")}
                                    >
                                        Cancel
                                    </button>
                                    {isLoading ? (
                                        <CLoader />
                                    ) : (
                                        <button
                                            type="submit"
                                            onClick={handleSubmit}
                                            className="px-6 py-3 bg-blue-900 text-white text-sm rounded-lg shadow-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                                        >
                                            Update
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditDocument;
