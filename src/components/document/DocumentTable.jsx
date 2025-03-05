import React, { useState } from "react";
import DocumentTableRow from "./DocumentTableRow";
import useIsMobile from "../../utils/useMobile";
import { DocumentCard } from "./DocumentCard";
import handleCatchError from "../../utils/handleCatchError";
import { useNavigate } from "react-router-dom";
import customAxios from "../../utils/http";

const DocumentTable = ({ data, columns,  onEdit, onView, onDelete,setEditModelOpen }) => {
    const isMobile = useIsMobile();
    const [expandedRows, setExpandedRows] = useState([]);

    
    const toggleRow = (id) => {
        setExpandedRows((prev) =>
            prev.includes(id)
                ? prev.filter((rowId) => rowId !== id)
                : [...prev, id]
        );
    };

    if (isMobile) {
        return (
            <div className="grid gap-5">
                {data.map((item, index) => (
                    <DocumentCard
                        index={index}
                        key={item.DocId}
                        data={item}
                        onEdit={() => onEdit?.(item)}
                        onDelete={()=>onDelete?.(item.DocId)}
                        onViewInfo={() => onView?.(item)}
                    />
                ))}
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="text-xl bg-red-200 border-red-300 border-2 text-red-500 font-semibold leading-8 h-36 flex justify-center items-center  rounded-lg ">
                No documents found
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-lg">
            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-gray-100">
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="py-4 px-6 text-left font-semibold text-gray-800 border-b-2 border-gray-300"
                                style={
                                    column.width
                                        ? { width: column.width }
                                        : undefined
                                }
                            >
                                {column.header}
                            </th>
                        ))}
                        <th className="py-4 px-6 text-left font-bold text-gray-800 border-b-2 border-gray-300">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <DocumentTableRow
                            key={item.DocId}
                            data={item}
                            index={index}
                            isExpanded={expandedRows.includes(item.DocId)}
                            onToggle={() => toggleRow(item.DocId)}
                            onEdit={() => onEdit?.(item)}
                            onView={() => onView?.(item)}
                            onDelete={()=>onDelete?.(item.DocId)}
                            columns={columns.length}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DocumentTable;
