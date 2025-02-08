export const FileItem = ({
    file,
    selected,
    onSelect,
    onPreview,
    showSelect,
    ...rest
}) => {
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
        if (!selected) {
            onPreview(file); 
        }
    };

    const handleClick = () => {
        const small = window.innerWidth < 760;
        if (showSelect) {
            onSelect(FileId);
        }
        if (small && !showSelect) {
            onPreview(file);
        }
    };

    const handleSelect = (e) => {
        onSelect(FileId);
        e.stopPropagation();
    };

    const getIcon = () => {
        switch (MediaType) {
            case "Pdf":
                return (
                    <i className="bx bxs-file-pdf min-[760px]:text-9xl text-4xl text-red-500 " />
                );
            case "Video":
                return (
                    <i className="bx bx-play min-[760px]:text-9xl text-4xl text-white" />
                );
            case "Image":
                return (
                    <img
                        src={FileData}
                        className="object-cover w-12 h-12 min-[760px]:w-36 min-[760px]:h-36  rounded-md aspect-square   "
                    />
                );
            default:
                return (
                    <i className="bx bxs-file min-[760px]:text-9xl text-4xl text-gray-500 w-12 h-12" />
                );
        }
    };

    return (
        <>
            <div
                className={`${
                    selected
                        ? "bg-gray-300 border-gray-400"
                        : "bg-white border-gray-200"
                } p-3 rounded-md shadow-md w-full flex justify-start items-center 
                    min-[760px]:hidden
                 relative hover:shadow-xl transition border duration-[50ms] cursor-pointer`}
                onDoubleClick={selected ? null : handleDoubleClick}
                onClick={handleClick}
                {...rest}
            >
                <input
                    type="checkbox"
                    className="w-5 h-5 bg-transparent"
                    checked={selected}
                    onClick={(e) => e.stopPropagation()}
                    onChange={handleSelect}
                />
                <div className="flex flex-row justify-center items-center w-full">
                    <div className=" mx-2 ">{getIcon()}</div>
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
                    selected
                        ? "bg-gray-300 border-gray-400"
                        : "bg-white border-gray-200"
                } p-3 rounded-md shadow-md w-fit relative hover:shadow-md transition border min-[760px]:block hidden duration-[50ms] cursor-pointer `}
                onDoubleClick={handleDoubleClick}
                onClick={handleClick}
                {...rest}
            >
                <input
                    type="checkbox"
                    className="absolute top-1 right-1 w-5 h-5 bg-transparent"
                    checked={selected}
                    onClick={(e) => e.stopPropagation()}
                    onChange={handleSelect}
                />
                <div className="flex flex-col justify-center items-center">
                    <div className="w-[150px] overflow-hidden p-1 bg-gray-200">{getIcon()}</div>
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
};
