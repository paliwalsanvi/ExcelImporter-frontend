import { useEffect, useState } from "react";
import "../styles/table.css";

const PreviewTable = () => {
  const [data, setData] = useState([]);
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`https://excelimporter-backend.onrender.com/api/preview?page=${page}&limit=10`)
      .then((response) => response.json())
      .then((result) => {
        setData((prevData) => [...result.data]);
        setTotalPages(result.totalPages);
      })
      .catch((error) => console.error("Error fetching preview data:", error));
  }, [page]);


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this row?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(`https://excelimporter-backend.onrender.com/api/delete/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete row");
      }
  
      alert("Row deleted successfully");
      setData((prevData) => prevData.filter((row) => row._id !== id)); // Remove row from UI
    } catch (error) {
      console.error("Error deleting row:", error);
      alert("Failed to delete row");
    }
  };

  return (
    <div>
      <table className="min-w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Amount</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Verified</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="border border-gray-300 p-2">{row.name}</td>
                <td className="border border-gray-300 p-2">{row.amount.toLocaleString("en-IN")}</td>
                <td className="border border-gray-300 p-2">
                  {new Date(row.date).toLocaleDateString("en-GB")}
                </td>
                <td className="border border-gray-300 p-2">{row.verified}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleDelete(row._id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-2">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-gray-500 text-white p-2 mx-2 rounded"
        >
          Prev
        </button>
        <span className="p-2">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="bg-gray-500 text-white p-2 mx-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PreviewTable;