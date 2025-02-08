import { useParams } from "react-router-dom";
import customAxios from "../../utils/http";
import { useEffect, useState } from "react";
import Loader from "../../utils/Loader";
import FileViewModel from "./FileViewModel";
import { FileManagerHeader } from "./FileManagerHeader";
import { FileGrid } from "./FileGrid";
import { showToast } from "../../utils/ReactToast";

function ViewDocument() {
    const { id } = useParams();
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState(new Set());
    const [previewFile, setPreviewFile] = useState({});
    const [accessedBy, setAccessedBy] = useState([]);

    const handleFileSelect = (fileId) => {
        setSelectedFiles((prevSelectedFiles) => {
            const newSelected = new Set(prevSelectedFiles);
            if (newSelected.has(fileId)) {
                newSelected.delete(fileId);
            } else {
                newSelected.add(fileId);
            }
            console.log(newSelected);
            return newSelected;
        });
    };

    const handleSelectAll = () => {
        const allFileIds = files.DocFiles.map((file) => file.FileId);
        setSelectedFiles(new Set(allFileIds));
    };

    const handleClearSelection = () => {
        setSelectedFiles(new Set());
        showToast("Selection Cleared", "info");
    };

    const handleFilePreview = (file) => {
        setPreviewFile(file);
        setIsModelOpen(true);
        console.log("previewing file", file);
    };

    const handleDeleteSelected = async () => {
        try {
            setLoading(true);

            console.log("files to delete: ", selectedFiles);
            await customAxios.delete(`/Document/RemoveFiles/${id}`, {
                data: Array.from(selectedFiles),
            });
            showToast("Selected files deleted", "success");
            console.log(files);
            const newFiles = files.DocFiles.filter(
                (file) => !selectedFiles.has(file.FileId)
            );

            await fetchDocument();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteSingle = async (fileId) => {
        try {
            setLoading(true);
            console.log("Deleting file:", fileId);
            await customAxios.delete(`/Document/RemoveFiles/${id}`, {
                data: [fileId],
            });
            console.log("File Deleted", fileId);
            showToast("File Deleted", "success");

            const newDocFiles = files.DocFiles.filter(
                (file) => file.FileId !== fileId
            );
            setFiles((prevFiles) => ({
                ...prevFiles,
                DocFiles: newDocFiles,
            }));
            setSelectedFiles(new Set());
        } catch (error) {
            showToast(error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    const fetchDocument = async () => {
        try {
            setLoading(true);
            const response = await customAxios.get(`/Document/GetItem/${id}`);
            const dt = response.data;
            console.log(dt);
            setFiles(dt);
            setSelectedFiles(new Set());
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const getDocumentAccess = async () => {
        try {
            const response = await customAxios.get(
                `/DocumentAccess/GetPersonList/${id}`
            );
            const dt = response.data;
            console.log("Access by ", dt);
            setAccessedBy(dt);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDocument();
        getDocumentAccess();
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="container mx-auto p-6">
                    <FileManagerHeader
                        selectedCount={selectedFiles.size}
                        totalCount={files.DocFiles?.length}
                        onDeleteSelected={handleDeleteSelected}
                        onSelectAll={handleSelectAll}
                        onClearSelection={handleClearSelection}
                        accessedBy={accessedBy}
                        
                    />
                    {files.DocFiles?.length > 0 ? (
                        <FileGrid
                            files={files}
                            selectedFiles={selectedFiles}
                            onSelect={handleFileSelect}
                            onPreview={handleFilePreview}
                        />
                    ) : (
                        <div className="text-center text-2xl font-semibold">
                            No Files
                        </div>
                    )}

                    <FileViewModel
                        file={previewFile}
                        isOpen={isModelOpen}
                        setOpen={setIsModelOpen}
                        deleteFile={handleDeleteSingle}
                    />
                </div>
            )}
        </>
    );
}

export default ViewDocument;
