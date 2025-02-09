import Modal from "../../utils/Modal";

function FileViewModel({ file, isOpen, setOpen, ...rest }) {
    const { MediaType, FileData, FileId, FileClientDescription } = file;
    const deleteFile = rest?.deleteFile;

    const content = () => {
        switch (MediaType) {
            case "Image":
                return (
                    <img
                        src={FileData}
                        className="object-cover max-h-[70vh] max-w-[80vw] h-auto rounded-md"
                    />
                );
            case "Video":
                return (
                    <video
                        src={FileData}
                        className="object-cover max-w-full max-h-[70vh] h-auto w-auto rounded-md"
                        controls
                    />
                );
            case "Pdf":
                return (
                    <div className="object-contain flex justify-center items-center w-screen  sm:w-[600px] h-[95vh] sm:h-[90vh] md:w-[700px]  lg:w-[800px]  xl:w-[1000px] ">
                        <iframe
                            src={FileData}
                            className="h-full w-full rounded-md"
                        />
                    </div>
                );
            default:
                return (
                    <div className="flex justify-center items-center w-36 h-36 rounded-md bg-gray-200">
                        <i className="bx bxs-file-pdf text-9xl text-red-500"></i>
                    </div>
                );
        }
    };
    const downloadFile = () => {
        const link = document.createElement("a");
        link.href = FileData;
        link.download = FileClientDescription;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const onDelete =  async() => {
        console.log("deleting file", FileId);
        await deleteFile(FileId);
        setOpen(false);
    };

    return (
        isOpen && (
            <Modal isOpen={isOpen} setOpen={setOpen}>
                <div className="absolute top-4 right-8 flex flex-row items-center justify-center gap-3 text-gray-500 text-3xl">
                {deleteFile ? (
                        <div
                            className="cursor-pointer hover:text-red-400"
                            onClick={onDelete}
                        >
                            <i className="bx bx-trash" />
                        </div>
                    ) : (
                        ""
                    )}
                    <div
                        className="cursor-pointer hover:text-gray-300 "
                        onClick={downloadFile}
                    >
                        <i className=" bx bx-arrow-to-bottom" />
                    </div>
                    <div
                        className="cursor-pointer hover:text-gray-300"
                        onClick={() => setOpen(false)}
                    >
                        <i className="bx bx-x "></i>
                    </div>
                   
                </div>
                <div className=" rounded-md text-white ">
                    <div className="w-full flex justify-center items-center">
                        {content()}
                    </div>
                </div>
            </Modal>
        )
    );
}

export default FileViewModel;
