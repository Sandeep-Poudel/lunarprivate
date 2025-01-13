import React, { useState } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import customAxios from "../../utils/http";
import { showToast } from "../../utils/ReactToast";
import handleCatchError from "../../utils/handleCatchError";
import CLoader from "../../utils/CLoader";

function InsertFile() {
  const navigate = useNavigate();
  // Use the hook to get search parameters
  const { params } = useParams();

  // Retrieve the 'id' parameter and set to the ParentId
  const DocId = Number(params.split("&")[0].split("=")[1]);
  const DocTitle = params.split("&")[1].split("=")[1];

  const [fileData, setFileData] = useState({
    FileId: 0,
    FileData: "",
    FileClientDescription: "",
    FileClientName: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    // console.log(file.name)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileData({
          ...fileData,
          FileData: reader.result.substring(5, reader.result.length),
          FileClientName: file.name,
        });
      };
      reader.readAsDataURL(file); //base64
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await customAxios.post(
        `/Document/AddFiles/${DocId}`,
        [fileData]
      );
      if (response.status == 200) {
        showToast("Document Inserted Successfully", "success");
        setIsLoading(false);
        navigate("/document");
      }
    } catch (error) {
      handleCatchError(error, navigate);
    } finally {
      setIsLoading(false);
    }
    console.log([fileData]);
    setFileData({
      FileId: 0,
      FileData: "",
      FileClientDescription: "",
      FileClientName: "",
    });
  };

  return (
    <>
      <div className="flex mx-auto w-full justify-center">
        <div className="w-full border sm:max-w-xl border-indigo-400 m-4 p-4 sm:m-10 ">
          <div className="flex justify-end">
            <button
              className="close-btn text-2xl text-indigo-700 font-extrabold hover:text-red-300"
              onClick={() => navigate("/documentGroup")}
            >
              X
            </button>
          </div>
          <div className="mt-4">
            {/* Heading */}
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Insert File
            </h1>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Document Name */}
              <div className="md:col-span-2">
                <label
                  htmlFor="DocumentName"
                  className="block text-lg font-medium text-gray-800 mb-1"
                >
                  Document Name
                </label>
                <input
                  type="text"
                  id="DocumentName"
                  name="DocumentName"
                  value={DocTitle}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                  required
                />
              </div>

              {/* File Upload */}
              <div className="md:col-span-2">
                <label
                  htmlFor="upload"
                  className="block text-lg font-medium text-gray-800 mb-1"
                >
                  Upload File
                </label>
                <input
                  onChange={(e) => handleImageChange(e)}
                  placeholder="Add Thumbnail"
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                />
              </div>

              {/* File Description */}
              <div className="md:col-span-2">
                <label
                  htmlFor="FileDescription"
                  className="block text-lg font-medium text-gray-800 mb-1"
                >
                  File Description
                </label>
                <textarea
                  name="FileDescription"
                  id="FileDescription"
                  value={fileData.FileClientDescription}
                  onChange={(e) =>
                    setFileData({
                      ...fileData,
                      FileClientDescription: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="md:col-span-2 flex flex-wrap justify-end gap-4">
                <button
                  type="reset"
                  className="px-6 py-3 bg-red-700 text-white text-sm rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
                >
                  Clear
                </button>
                {isLoading ? (
                  <CLoader />
                ) : (
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-blue-900 text-white text-sm rounded-lg shadow-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                  >
                    Insert
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default InsertFile;
