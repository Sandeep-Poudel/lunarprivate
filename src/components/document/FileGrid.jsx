import { FileItem } from "./FileItem";

export const FileGrid = ({ files, selectedFiles, onSelect, onPreview }) => {
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 p-4">
            {files.DocFiles?.map(
                (file) => (

                    (
                        <FileItem
                            key={file.id}
                            file={file}
                            selected={selectedFiles.has(file.FileId)} // Check if file.id is in selectedFiles set
                            onSelect={onSelect}
                            onPreview={onPreview}
                            showSelect={selectedFiles.size > 0}
                        />
                    )
                )
            )}
        </div>
    );
};
