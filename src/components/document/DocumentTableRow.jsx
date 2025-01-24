import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ViewDocument from "./ViewDocument";

function DocumentTableRow({ data, handleDataChange }) {
    const [showFiles, setShowFiles] = useState(false);
    const navigate = useNavigate();

    const toggleFiles = () => {
        console.log("clicked");
        setShowFiles(!showFiles);
    };
    const handleViewDetail = (DocId) => {
        console.log(DocId);
        navigate(`/document/seeFile/${DocId}`);
    };

    return (
        <>
            {/* <JustTableRow */}
            <tr key={data?.DocId} className="bg-white border-b">
                <td className="px-3 py-2 whitespace-nowrap">{data?.DocId}</td>
                <td className="px-3 py-2 whitespace-nowrap cursor-pointer">
                    {data?.DocTitle}
                </td>
                <td className="px-3 py-2 whitespace-nowrap cursor-pointer">
                    {data?.DocDescription}
                </td>
                {/* <td
          className={`p-4 w-full inline-flex justify-center text-base leading-5 font-semibold rounded-full bg-green-100 text-black`}
        >
          Active
        </td> */}
                <td className="px-3 py-2 whitespace-nowrap flex gap-2">
                    <Link
                        to={`/Document/addfile/id=${data?.DocId}&name=${data?.DocTitle}`}
                    >
                        <button className="px-4 py-2 z-10 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
                            <i className="bx bx-plus-medical mr-1"></i> New File
                        </button>
                    </Link>

                    <button
                        className="px-4 py-2 z-10 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                        onClick={() =>
                            navigate("editFile/", { state: { data } })
                        }
                    >
                        Edit
                    </button>
                    <div>
                        <button
                            className="px-4 py-2 z-10 font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:shadow-outline-orange active:bg-orange-600 transition duration-150 ease-in-out"
                            onClick={() =>
                                navigate(`seeFile/${data.DocId}`, {
                                    state: { data },
                                })
                            }
                        >
                            View Details
                        </button>
                        <button onClick={toggleFiles} className="p-1">
                            <i className="ml-1 bx bxs-down-arrow cursor-pointer text-blue-800"></i>
                        </button>
                    </div>
                </td>
            </tr>

            {/* Rendering Files with in the documents */}
            {showFiles &&
                data.DocFiles?.length > 0 &&
                data.DocFiles.map((file) => (
                    <tr key={file.FileId} className="bg-green-100 border-b">
                        <td className="px-3 py-2 whitespace-nowrap">
                            {data?.DocId}.{file?.FileId}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap cursor-pointer">
                            {file?.FilePathName.length > 20
                                ? file?.FilePathName.slice(0, 20) + "..."
                                : file?.FilePathName}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap cursor-pointer">
                            {file?.FileClientDescription}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                            <button className="px-4 py-2 z-10 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
                                Edit
                            </button>
                            <button
                                className="px-4 py-2 z-10 font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:shadow-outline-orange active:bg-orange-500 transition duration-150 ease-in-out ml-2"
                                onClick={() => handleViewDetail(file)}
                            >
                                View Details
                            </button>
                        </td>
                    </tr>
                ))}
        </>
    );
}

export default DocumentTableRow;
