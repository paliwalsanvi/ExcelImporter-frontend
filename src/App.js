
import { useState } from "react";
import FileUpload from "./components/FileUpload";
import PreviewTable from "./components/PreviewTable";
import { importValidRows } from "./api";
import "./styles/global.css";
import Pagination from "./components/Pagination";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const [uploadedData, setUploadedData] = useState([]); // Store uploaded data

  const handleUploadSuccess = (data) => {
    setUploadedData(data); // Update state with uploaded data
  };

  function App() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5; // Example total pages

    const handlePrev = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
      <div className="container">
        <h1>Excel Data Importer</h1>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    );
  }


  // const handleImport = async () => {
  //   try {
  //     await importValidRows();
  //     alert("Data imported successfully!");
  //     setRefresh(!refresh);
  //   } catch (err) {
  //     alert("Failed to import data.");
  //   }
  // };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Excel Data Importer</h1>
      <FileUpload onUploadSuccess={handleUploadSuccess} />
      <PreviewTable data={uploadedData} />

    </div>
  );
};

export default App;
