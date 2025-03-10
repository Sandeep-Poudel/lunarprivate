import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import customAxios from '../../utils/http';
import { showToast } from '../../utils/ReactToast';
import handleCatchError from '../../utils/handleCatchError';
import Loader from '../../utils/Loader';
import CLoader from '../../utils/CLoader';

function UpdateDocumentGroup() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //for fectching the data at first
    const fetchDocumentGroup = async () => {

        try {
            setIsLoading(true);
            const response = await customAxios.get(`/documentGroup/getItem/${id}`);
            const dt = await response.data;
            setFormData(dt);
            console.log(dt)
            setIsLoading(false);

        }
        catch (error) {
            handleCatchError(error, navigate);
        }
        finally {
            setIsLoading(false);
        }
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await customAxios.put('/documentGroup/update', formData);
            if (response.status == 200) {
                showToast("Document Group Updated Successfully", "success");
                navigate('/documentGroup');
            }
        } catch (error) {
            handleCatchError(error, navigate);
        }
    };

    useEffect(() => {
        document.title = "documentGroup Update"
        fetchDocumentGroup();
    }, [])
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className='flex mx-auto w-full justify-center'>
                    <div className='w-full border sm:max-w-xl border-indigo-400 m-4 p-4 sm:m-10'>
                        <div className='flex justify-end'>
                            <button
                            className="close-btn text-2xl text-indigo-700 font-extrabold hover:text-red-300"
                            onClick={() => navigate('/documentGroup')}
                            >
                            X
                            </button>
                        </div> 
                        <div className="mt-4">
                            {/* Heading */}
                            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                                Update Document Group
                            </h1>

                            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Group Name */}
                                <div className="md:col-span-2">
                                    <label htmlFor="GroupName" className="block text-lg font-medium text-gray-800 mb-1">
                                        Group Name
                                    </label>
                                    <input
                                        type="text"
                                        id="GroupName"
                                        name="GroupName"
                                        value={formData?.GroupName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                        required
                                    />
                                </div>

                                {/* Group Description */}
                                <div className="md:col-span-2">
                                    <label htmlFor="GroupDescription" className="block text-lg font-medium text-gray-800 mb-1">
                                        Group Description
                                    </label>
                                    <textarea
                                        name="GroupDescription"
                                        id="GroupDescription"
                                        value={formData?.GroupDescription || ""}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                    ></textarea>
                                </div>

                                {/* Parent Name */}
                                {formData?.ParentId && <div>
                                    <label htmlFor="ParentName" className="block text-lg font-medium text-gray-800 mb-1">
                                        Parent Name
                                    </label>
                                    <input
                                        type="text"
                                        id="ParentName"
                                        name="ParentName"
                                        value={formData?.ParentName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                        required
                                        disabled
                                    />
                                </div>}

                                {/* Office Name */}
                                <div>
                                    <label htmlFor="OfficeName" className="block text-lg font-medium text-gray-800 mb-1">
                                        Office Name
                                    </label>
                                    <input
                                        type="text"
                                        id="OfficeName"
                                        name="OfficeName"
                                        value={formData?.OfficeName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                        required
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="md:col-span-2 flex flex-wrap justify-end gap-4">
                                    
                                    {isLoading ? (<CLoader />) :(
                                        <button
                                            type="submit"
                                            onClick={handleUpdate}
                                            className="px-6 py-3 bg-blue-900 text-white text-sm rounded-lg shadow-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                                        >
                                            Update
                                        </button>
                                    )}
                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UpdateDocumentGroup;
