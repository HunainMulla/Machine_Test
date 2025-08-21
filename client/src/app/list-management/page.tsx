"use client";
import { useState } from "react";

const ListManagement = () => {
  const [file, setFile] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([
    {
      name: "Hunain Mulla",
      email: "hunainmulla@gmail.com",
      phone: "1234567890",
      country_code: "+91",
      tasks: [],
    },
    {
      name: "Agent Two",
      email: "agenttwo@gmail.com",
      phone: "9876543210",
      country_code: "+91",
      tasks: [],
    },
  ]);

  const handleFileChange = (e: any) => {
    const uploadedFile = e.target.files[0];
    if (
      uploadedFile &&
      (uploadedFile.type === "text/csv" || uploadedFile.name.endsWith(".csv"))
    ) {
      setFile(uploadedFile);

      const reader = new FileReader();
      reader.onload = (event: any) => {
        const text = event.target.result;
        const rows = text.split("\n").map((row: string) => row.trim()).filter(Boolean);
        const headers = rows[0].split(",");

        const parsedData = rows.slice(1).map((row: string) => {
          const values = row.split(",");
          return headers.reduce((acc: any, header: string, idx: number) => {
            acc[header.trim()] = values[idx]?.trim() || "";
            return acc;
          }, {});
        });

        setData(parsedData);
        console.log("Parsed CSV Data:", parsedData);
      };
      reader.readAsText(uploadedFile);
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  const handleUpload = (e: any) => {
    e.preventDefault();
    if (!file) {
      alert("No file selected!");
      return;
    }
    console.log("Final parsed data:", data);
    alert(`File "${file.name}" uploaded and parsed successfully!`);
    setFile(null);
  };

  const handleDistribute = (e: any) => {
    e.preventDefault();
    if (data.length === 0) {
      alert("No parsed data to distribute!");
      return;
    }

    const updatedAgents = agents.map(agent => ({ ...agent, tasks: [] })); // reset tasks

    data.forEach((task, index) => {
      const agentIndex = index % updatedAgents.length; // round-robin distribution
      updatedAgents[agentIndex].tasks.push(task);
    });

    setAgents(updatedAgents);
    console.log("Distributed Agents Data:", updatedAgents);
    alert("Tasks distributed among agents successfully!");
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
            Upload & Parse CSV
          </button>
          <button
            onClick={handleDistribute}
            className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            Distribute Tasks
          </button>
        </form>

        {/* Display Parsed Data */}
        {data.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-black mb-2">
              Parsed Data:
            </h2>
            <pre className="bg-black text-green-300 p-4 rounded-lg text-sm overflow-x-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}

        {/* Display Agents with Distributed Tasks */}
        {agents.some(agent => agent.tasks.length > 0) && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-black mb-2">
              Agents with Tasks:
            </h2>
            <pre className="bg-gray-900 text-yellow-300 p-4 rounded-lg text-sm overflow-x-auto">
              {JSON.stringify(agents, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListManagement;
