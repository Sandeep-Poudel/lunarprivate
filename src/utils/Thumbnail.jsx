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

    const findSize = () => {
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
        const small = window.innerWidth < 760;
        if (showSelect) {
            toggleSelect(FileId);
        }
        if (small && !showSelect) {
            setFile(file);
            isModelOpen(true);
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
                    <div className="flex justify-center items-center min-[760px]:w-36 min-[760px]:h-36 w-12 h-12 rounded-md bg-gray-200">
                        <img
                            src={FileData}
                            className="object-cover w-12 h-12 min-[760px]:w-36 min-[760px]:h-36  rounded-md aspect-square"
                        />
                    </div>
                );
            case "Pdf":
                return (
                    <div className="flex justify-center items-center min-[760px]:w-36 min-[760px]:h-36 w-12 h-12 rounded-md bg-gray-200">
                        <i className="bx bxs-file-pdf min-[760px]:text-9xl text-4xl text-red-500"></i>
                    </div>
                );
            case "Video":
                return (
                    <div className="flex justify-center items-center min-[760px]:w-36 min-[760px]:h-36 w-12 h-12 rounded-md bg-blue-500">
                        <i className="bx bx-play min-[760px]:text-9xl text-4xl text-white"></i>
                    </div>
                );
            default:
                return (
                    <div className="flex justify-center items-center min-[760px]:w-36 min-[760px]:h-36 w-12 h-12 rounded-md bg-gray-200">
                        <i className="bx bxs-file min-[760px]:text-9xl text-4xl text-gray-500"></i>
                    </div>
                );
        }
    };

    return (
        <>
            <div
                className={`${
                    isSelected
                        ? "bg-gray-300 border-gray-400"
                        : "bg-white border-gray-200"
                } p-3 rounded-md shadow-md w-full flex justify-start items-center 
                    min-[760px]:hidden
                 relative hover:shadow-xl transition border duration-[50ms] cursor-pointer`}
                onDoubleClick={isSelected ? null : handleDoubleClick}
                onClick={handleClick}
                {...rest}
            >
                <input
                    type="checkbox"
                    className="w-5 h-5 bg-transparent"
                    checked={isSelected}
                    onClick={(e) => e.stopPropagation()}
                    onChange={handleSelect}
                />
                <div className="flex flex-row justify-center items-center w-full">
                    <div className=" mx-2 ">{content()}</div>
                    <div className="flex justify-between items-center w-full">
                        <p className="text-sm mt-1 mb-2 line-clamp-1 ml-2">
                            {FileClientDescription.length > 20
                                ? `${FileClientDescription.substring(0, 20)}...`
                                : FileClientDescription}
                        </p>
                        <p className="text-xs text-gray-500 ml-2">
                            {findSize(file)}
                        </p>
                    </div>
                </div>
            </div>

            <div
                className={`${
                    isSelected
                        ? "bg-gray-300 border-gray-400"
                        : "bg-white border-gray-200"
                } p-3 rounded-md shadow-md w-fit relative hover:shadow-xl transition border min-[760px]:block hidden duration-[50ms] cursor-pointer `}
                onDoubleClick={handleDoubleClick}
                onClick={handleClick}
                {...rest}
            >
                <input
                    type="checkbox"
                    className="absolute top-1 right-1 w-5 h-5 bg-transparent"
                    checked={isSelected}
                    onClick={(e) => e.stopPropagation()}
                    onChange={handleSelect}
                />
                <div className="flex flex-col justify-center items-center">
                    <div className="w-[150px] overflow-hidden">{content()}</div>
                    <p className="text-sm mt-1 mb-2 line-clamp-1 self-start">
                        {FileClientDescription.length > 20
                            ? `${FileClientDescription.substring(0, 20)}...`
                            : FileClientDescription}
                    </p>
                    <p className="text-xs text-gray-500 self-end absolute bottom-1 right-1 mt-1">
                        {findSize(file)}
                    </p>
                </div>
            </div>
        </>
    );
}
export default Thumbnail;
