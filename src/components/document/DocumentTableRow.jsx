import React from "react";
import { useState } from "react";
import DeleteItem from "../DeleteItem";
const DocumentTableRow = ({
    data,
    isExpanded,
    onToggle,
    onEdit,
    onView,
    onDelete,
    index,
    columns,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModal = () => {
        setIsModalOpen(!isModalOpen);
    }
    const handleDelete = () => {
        setIsModalOpen(true);
    }



    return (
        <>
            <tr className="border-b-2 border-gray-200 hover:bg-gray-50/50 transition-colors duration-200">
                <td className="p-4 text-sm">{index + 1}</td>

                <td className="p-4 text-sm font-medium">{data.DocTitle}</td>
                <td className="p-4 text-sm">
                    {data.DocDescription.length > 40
                        ? `${data.DocDescription.slice(0, 40)}...`
                        : data.DocDescription}
                </td>
                <td className="p-4 text-sm">
                    <span
                        className={`
            bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold ring-2 ring-green-600/20
          `}
                    >
                        {data.status ? data.status : "Active"}
                    </span>
                </td>
                <td className="p-4">
                    <div className="flex items-center gap-2">
                        <button
                            className="p-2 border rounded-md transition-colors border-gray-300 hover:bg-gray-100"
                            onClick={()=>onEdit(data)}
                        >
                            <i
                                className="bx h-5 w-5 text-lg flex justify-center items-center bx-edit
                            "
                            />
                        </button>
                        <button
                            className="p-2 hover:bg-gray-100  rounded-md transition-colors border border-gray-300"
                            onClick={onView}
                        >
                            <i className="bx h-5 w-5 text-lg flex justify-center items-center bx-low-vision" />
                        </button>
                        <button
                            className="p-2 hover:bg-red-100 text-red-500 rounded-md transition-colors border border-gray-300"
                            onClick={handleDelete}
                        >
                            <i className="bx h-5 w-5 text-lg flex justify-center items-center bx-trash" />
                        </button>
                        {data.DocFiles.length > 0 && (
                            <button
                                className="p-1 hover:bg-gray-100 rounded-md transition-colors border border-gray-300"
                                onClick={onToggle}
                            >
                                {isExpanded ? (
                                    <i className="bx bx-chevron-up h-5 w-5 text-lg flex justify-center items-center" />
                                ) : (
                                    <i className="bx bx-chevron-down h-5 w-5 text-lg flex justify-center items-center" />
                                )}
                            </button>
                        )}
                    </div>
                </td>
            </tr>
            {isExpanded &&
                data.DocFiles &&
                data.DocFiles.map((child) => (
                    <tr key={child.FileId} className="bg-gray-50/50 border-b">
                        <td colSpan={columns} className="p-4">
                            <div className="ml-8 text-sm">
                                <p>
                                    <span className="font-medium">
                                        File Name:
                                    </span>{" "}
                                    {child.FileClientDescription}
                                </p>
                                <p>
                                    <span className="font-medium">
                                        File Type :
                                    </span>{" "}
                                    {child.MediaType}
                                </p>
                            </div>
                        </td>
                    </tr>
                ))}

            {isModalOpen && (
                <DeleteItem
                    isModalOpen={isModalOpen}
                    handleModal={handleModal}
                    deleteHandle={onDelete}
                    name={data.DocTitle}
                />
            )}
        </>
    );
};

export default DocumentTableRow;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import ViewDocument from "./ViewDocument";

// function DocumentTableRow({ data, handleDataChange }) {
//     const [showFiles, setShowFiles] = useState(false);
//     const navigate = useNavigate();

//     const toggleFiles = () => {
//         console.log("clicked");
//         setShowFiles(!showFiles);
//     };
//     const handleViewDetail = (DocId) => {
//         console.log(DocId);
//         navigate(`/document/seeFile/${DocId}`);
//     };

//     return (
//         <>
//             {/* <JustTableRow */}
//             <tr key={data?.DocId} className="bg-white border-b">
//                 <td className="px-3 py-2 whitespace-nowrap">{data?.DocId}</td>
//                 <td className="px-3 py-2 whitespace-nowrap cursor-pointer">
//                     {data?.DocTitle}
//                 </td>
//                 <td className="px-3 py-2 whitespace-nowrap cursor-pointer">
//                     {data?.DocDescription}
//                 </td>
//                 {/* <td
//           className={`p-4 w-full inline-flex justify-center text-base leading-5 font-semibold rounded-md bg-green-100 text-black`}
//         >
//           Active
//         </td> */}
//                 <td className="px-3 py-2 whitespace-nowrap flex gap-2">
//                     <Link
//                         to={`/Document/addfile/id=${data?.DocId}&name=${data?.DocTitle}`}
//                     >
//                         <button className="px-4 py-2 z-10 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
//                             <i className="bx bx-plus-medical mr-1"></i> New File
//                         </button>
//                     </Link>

//                     <button
//                         className="px-4 py-2 z-10 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
//                         onClick={() =>
//                             navigate("editFile/", { state: { data } })
//                         }
//                     >
//                         Edit
//                     </button>
//                     <div>
//                         <button
//                             className="px-4 py-2 z-10 font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:shadow-outline-orange active:bg-orange-600 transition duration-150 ease-in-out"
//                             onClick={() =>
//                                 navigate(`seeFile/${data.DocId}`, {
//                                     state: { data },
//                                 })
//                             }
//                         >
//                             View Details
//                         </button>
//                         <button onClick={toggleFiles} className="p-1">
//                             <i className="ml-1 bx bxs-down-arrow cursor-pointer text-blue-800"></i>
//                         </button>
//                     </div>
//                 </td>
//             </tr>

//             {/* Rendering Files with in the documents */}
//             {showFiles &&
//                 data.DocFiles?.length > 0 &&
//                 data.DocFiles.map((file) => (
//                     <tr key={file.FileId} className="bg-green-100 border-b">
//                         <td className="px-3 py-2 whitespace-nowrap">
//                             {data?.DocId}.{file?.FileId}
//                         </td>
//                         <td className="px-3 py-2 whitespace-nowrap cursor-pointer">
//                             {file?.FilePathName.length > 20
//                                 ? file?.FilePathName.slice(0, 20) + "..."
//                                 : file?.FilePathName}
//                         </td>
//                         <td className="px-3 py-2 whitespace-nowrap cursor-pointer">
//                             {file?.FileClientDescription}
//                         </td>
//                         <td className="px-3 py-2 whitespace-nowrap">
//                             <button className="px-4 py-2 z-10 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
//                                 Edit
//                             </button>
//                             <button
//                                 className="px-4 py-2 z-10 font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:shadow-outline-orange active:bg-orange-500 transition duration-150 ease-in-out ml-2"
//                                 onClick={() => handleViewDetail(file)}
//                             >
//                                 View Details
//                             </button>
//                         </td>
//                     </tr>
//                 ))}
//         </>
//     );
// }

// export default DocumentTableRow;
