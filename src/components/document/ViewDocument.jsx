import { useParams } from "react-router-dom";
import customAxios from "../../utils/http";
import { useEffect, useState } from "react";
import Loader from "../../utils/Loader";
import Thumbnail from "../../utils/Thumbnail";
import FileViewModel from "./FileViewModel";

function ViewDocument() {
    const { id } = useParams();
    const [document, setDocument] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [file, setFile] = useState({});

    const fetchDocument = async () => {
        try {
            setLoading(true);
            const response = await customAxios.get(`/Document/GetItem/${id}`);
            const dt = response.data;
            console.log(dt);
            setDocument(dt);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocument();
    }, []);

    const handleSelect = (fileId) => {
        setSelectedFiles((prevSelectedFiles) =>
            prevSelectedFiles.includes(fileId)
                ? prevSelectedFiles.filter((id) => id !== fileId)
                : [...prevSelectedFiles, fileId]
        );
    };

    const renderedContent = document.DocFiles?.map((item) => (
        <Thumbnail
            file={item}
            key={item.FileId}
            setFile={setFile}
            isModelOpen={setIsModelOpen}
            showSelect={selectedFiles?.length > 0}
            toggleSelect={handleSelect}
            isSelected={selectedFiles?.includes(item.FileId)}
        />
    ));

    const deleteFiles = async () => {
        try {
            setLoading(true);
            console.log(selectedFiles);
            await customAxios.delete(`/Document/RemoveFiles/${id}`, {
                selectedFiles,
            });
            fetchDocument();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const clearSelection = () => {
        setSelectedFiles([]);
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <div className="p-2">
                        <h2 className="text-3xl font-semibold">
                            {document.DocTitle}
                        </h2>
                        <p className="text-sm mt-1">
                            {document.DocDescription}
                        </p>
                        <div>
                            <div className="p-2 flex justify-between items-center">
                                <h2 className="text-xl font-semibold mt-4">
                                    Files
                                </h2>
                                {selectedFiles.length > 0 && (
                                    <div >
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded-md mx-2"
                                            onClick={deleteFiles}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="bg-gray-500 text-white px-2 py-1 rounded-md mx-2"
                                            onClick={clearSelection}
                                        >
                                            Clear
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-4 mt-2">
                                {renderedContent}
                            </div>
                        </div>
                    </div>

                    <FileViewModel
                        isOpen={isModelOpen}
                        file={file}
                        setOpen={setIsModelOpen}
                    />
                </div>
            )}
        </>
    );
}

export default ViewDocument;
