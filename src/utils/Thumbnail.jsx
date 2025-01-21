import { useState, useEffect } from "react";

function Thumbnail({
    file,
    setFile,
    isModelOpen,
    toggleSelect,
    showSelect,
    isSelected,
    ...rest
}) {
    const { MediaType, FileData, FileId, FileClientDescription } = file;

    const findSize = (file) => {
        const sizeInBytes = FileData.length * (3 / 4);
        if (sizeInBytes < 1024) {
            return `${sizeInBytes.toFixed(0)} Bytes`;
        }
        const kb = sizeInBytes / 1024;
        if (kb < 1024) {
            return `${kb.toFixed(1)} KB`;
        }
        const mb = kb / 1024;
        if (mb < 1024) {
            return `${mb.toFixed(1)} MB`;
        }
        const gb = mb / 1024;
        return `${gb.toFixed(1)} GB`;
    };

    const handleDoubleClick = () => {
        if (!isSelected) {
            setFile(file);
            isModelOpen(true);
        }
    };

    const handleClick = () => {
        if (showSelect) {
            toggleSelect(FileId);
        }
        console.log(`${FileId} : `, showSelect);
    };

    const handleSelect = (e) => {
        toggleSelect(FileId);
        e.stopPropagation();
    };

    const content = () => {
        switch (MediaType) {
            case "Image":
                return (
                    <img
                        src={FileData}
                        className="object-cover w-36 h-36 rounded-md"
                    />
                );
            case "Pdf":
                return (
                    <div className="flex justify-center items-center w-36 h-36 rounded-md bg-gray-200">
                        <i className="bx bxs-file-pdf text-9xl text-red-500"></i>
                    </div>
                );
            case "Video":
                return (
                    <div className="flex justify-center items-center w-36 h-36 rounded-md bg-blue-500">
                        <i className="bx bx-play text-9xl text-white"></i>
                    </div>
                );
            default:
                return (
                    <div className="flex justify-center items-center w-36 h-36 rounded-md bg-gray-200">
                        <i className="bx bxs-file text-9xl text-gray-500"></i>
                    </div>
                );
        }
    };

    return (
        <div
            key={FileId}
            className={`${
                isSelected ? "bg-gray-300" : "bg-white"
            } p-3 rounded-md shadow-md w-fit relative hover:shadow-xl transition hover:scale-[101%] duration-[50ms] hover:border-gray-800 cursor-pointer`}
            onDoubleClick={isSelected?null:handleDoubleClick}
            onClick={handleClick}
            {...rest}
        >
            <input
                type="checkbox"
                className="absolute top-1 right-1 w-5 h-5  bg-transparent "
                checked={isSelected}
                onClick={(e) => e.stopPropagation()}
                onChange={handleSelect}
            />
            <div className="flex justify-center items-center">
                <div className="flex flex-col items-center">
                    <div className="w-[150px] overflow-hidden">{content()}</div>
                    <p className="text-sm mt-1 mb-2 line-clamp-1 self-start">
                        {FileClientDescription.length > 20
                            ? `${FileClientDescription.substring(0, 20)}...`
                            : FileClientDescription}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 self-end absolute bottom-1 right-1">
                        {findSize(file)}
                    </p>
                </div>
            </div>
        </div>
    );
}
export default Thumbnail;
