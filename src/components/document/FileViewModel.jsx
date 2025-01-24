import Modal from "../../utils/Modal";
import { useState } from "react";

function FileViewModel({ file, isOpen, setOpen }) {
    const { MediaType, FileData, FileId, FileClientDescription } = file;

    const content = () => {
        switch (MediaType) {
            case "Image":
                return (
                    <img
                        src={FileData}
                        className="object-cover  max-h-[70vh] max-w-[80vw] h-auto rounded-md"
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

    return (
        isOpen && (
            <Modal isOpen={isOpen} setOpen={setOpen}>
                <div className=" rounded-md text-white">
                    <div className="w-full flex justify-center items-center">
                        {content()}
                    </div>
                </div>
            </Modal>
        )
    );
}

export default FileViewModel;
