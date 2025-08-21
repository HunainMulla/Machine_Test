"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface Task {
  [key: string]: string;
}

interface Agent {
  _id: string; // since MongoDB returns _id
  name: string;
  email: string;
  phone: string;
  country_code: string;
  tasks: Task[];
}

const API_URL = "http://localhost:5000"; // change to your backend url

const ListManagement = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<Task[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);

  // Fetch agents on mount
  useEffect(() => {
    fetch(`${API_URL}/agent/all`)
      .then((res) => res.json())
      .then((data) => setAgents(data))
      .catch((err) => console.error("Error fetching agents:", err));
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (
      uploadedFile &&
      (uploadedFile.type === "text/csv" || uploadedFile.name.endsWith(".csv"))
    ) {
      setFile(uploadedFile);

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const text = event.target?.result as string;
        const rows = text
          .split("\n")
          .map((row) => row.trim())
          .filter(Boolean);
        const headers = rows[0].split(",");

        const parsedData: Task[] = rows.slice(1).map((row) => {
          const values = row.split(",");
          return headers.reduce((acc: Task, header, idx) => {
            acc[header.trim()] = values[idx]?.trim() || "";
            return acc;
          }, {});
        });

        setData(parsedData);
      };
      reader.readAsText(uploadedFile);
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  const handleUpload = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert("No file selected!");
      return;
    }
    alert(`File "${file.name}" uploaded and parsed successfully!`);
    setFile(null);
  };

  const handleDistribute = async () => {
    if (data.length === 0) {
      alert("No parsed data to distribute!");
      return;
    }

    let updatedAgents = agents.map((agent) => ({ ...agent, tasks: [] })); // reset tasks

    data.forEach((task, index) => {
      const agentIndex = index % updatedAgents.length; // round-robin distribution
      updatedAgents[agentIndex].tasks.push(task);
    });

    setAgents(updatedAgents);

    // 🔹 Push updated tasks to backend
    try {
      await Promise.all(
        updatedAgents.map((agent) =>
          fetch(`${API_URL}/agent/updateTasks/${agent._id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tasks: agent.tasks }),
          })
        )
      );
      alert("Tasks distributed and saved to DB successfully!");
    } catch (err) {
      console.error("Error updating tasks:", err);
      alert("Failed to update tasks in DB.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-[#17203D] mb-6">
          📂 List Management
        </h1>

        <form onSubmit={handleUpload} className="flex flex-col items-center space-y-5">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#6552D0] file:text-white hover:file:bg-[#4f3cb0] cursor-pointer"
          />
          {file && (
            <p className="text-sm text-gray-600">
              Selected file: <span className="font-medium">{file.name}</span>
            </p>
          )}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-[#6552D0] text-white px-6 py-2 rounded-lg shadow hover:bg-[#4f3cb0] transition"
            >
              Upload & Parse CSV
            </button>
            <button
              onClick={handleDistribute}
              type="button"
              className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
            >
              Distribute Tasks
            </button>
          </div>
        </form>

        {/* Display Parsed Data */}
        {data.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-black mb-3">
              Parsed Data (CSV Rows)
            </h2>
            <div className="space-y-3">
              {data.map((row, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50"
                >
                  {Object.entries(row).map(([key, value], idx) => (
                    <p key={idx} className="text-sm text-gray-800">
                      <span className="font-semibold">{key}:</span> {value}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Display Agents */}
        {agents.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-black mb-3">
              Agents & Their Tasks
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {agents.map((agent, idx) => (
                <div key={idx} className="bg-white border rounded-xl shadow p-5">
                  <h3 className="text-xl font-bold text-[#17203D]">
                    {agent.name}
                  </h3>
                  <p className="text-sm text-gray-600">{agent.email}</p>
                  <p className="text-sm text-gray-600">
                    {agent.country_code} {agent.phone}
                  </p>

                  <h4 className="mt-3 font-semibold text-gray-800">Tasks:</h4>
                  {agent.tasks.length > 0 ? (
                    <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                      {agent.tasks.map((task, tIdx) => (
                        <li key={tIdx}>{Object.values(task).join(" | ")}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No tasks assigned.</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListManagement;
