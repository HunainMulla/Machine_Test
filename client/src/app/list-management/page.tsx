"use client";
import { useState } from "react";

const ListManagement = () => {
  const [file, setFile] = useState<any>(null);

  const handleFileChange = (e:any) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === "text/csv") {
      setFile(uploadedFile);
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  const handleUpload = (e:any) => {
    e.preventDefault();
    if (!file) {
      alert("No file selected!");
      return;
    }
    // 🔥 TODO: send file to backend here
    console.log("Uploading file:", file);
    alert(`File "${file.name}" uploaded successfully!`);
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-[#17203D] mb-6">
          📂 List Management
        </h1>

        <form
          onSubmit={handleUpload}
          className="flex flex-col items-center space-y-5"
        >
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-[#6552D0] file:text-white
            hover:file:bg-[#4f3cb0]
            cursor-pointer"
          />

          {file && (
            <p className="text-sm text-gray-600">
              Selected file: <span className="font-medium">{file.name}</span>
            </p>
          )}

          <button
            type="submit"
            className="bg-[#6552D0] text-white px-6 py-2 rounded-lg shadow hover:bg-[#4f3cb0] transition"
          >
            Upload CSV
          </button>
        </form>
      </div>
    </div>
  );
};

export default ListManagement;
