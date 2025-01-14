function JustTableRow({ data, toggleFiles, handleDataChange, isChildren }) {
  return (
    <tr key={data?.DocId} className={isChildren? "bg-green-100":"bg-white" +"border-b"}>
      <td className="px-3 py-2 whitespace-nowrap">{data?.DocId}</td>
      <td className="px-3 py-2 whitespace-nowrap cursor-pointer">
        {data?.DocTitle}
      </td>
      <td className="px-3 py-2 whitespace-nowrap cursor-pointer">
        {data?.DocDescription}
      </td>
      <td
        className={`p-4 w-full inline-flex justify-center text-base leading-5 font-semibold rounded-full bg-green-100 text-black`}
      >
        Active
      </td>
      <td className="px-3 py-2 whitespace-nowrap">
        <button className="px-4 py-2 z-10 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
          Edit
        </button>
        <button className="ml-2 px-4 py-2 z-10 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
          <i className="bx bx-plus-medical mr-1"></i> New File
        </button>
        <button onClick={toggleFiles} className="mx-1">
          <i className="ml-1 bx bxs-down-arrow cursor-pointer text-blue-800"></i>
        </button>
      </td>
    </tr>
  );
}

export default JustTableRow;
