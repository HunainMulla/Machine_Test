"use client";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
const API_URL = "http://localhost:5000"; // 🔹 change this to your backend URL

const AgentManagement = () => {
  const [agents, setAgents] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country_code: "+91",
    password: "",
  });

  // 🔹 Fetch agents from backend
  const fetchAgents = async () => {
    try {
      const res = await fetch(`${API_URL}/agent/all`);
      if (!res.ok) throw new Error("Failed to fetch agents");
      const data = await res.json();
      setAgents(data);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  // Fetch agents on component load
  useEffect(() => {
    fetchAgents();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/agent/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          number: formData.phone, // 🔹 match backend field
          country_code: formData.country_code,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error creating agent");
        return;
      }

      alert("Agent created successfully!");
      setFormData({ name: "", email: "", phone: "", country_code: "+91", password: "" });

      // Refresh agents list
      fetchAgents();

    } catch (error) {
      console.error("Error creating agent:", error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-[#17203D] mb-6">👨‍💼 Agent Management</h1>

        {/* Agent Creation Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="text-black mt-1 block w-full px-4 py-2 border rounded-lg"
              placeholder="Enter agent name"
              />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="text-black mt-1 block w-full px-4 py-2 border rounded-lg"
              placeholder="Enter agent email"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Country Code</label>
              {/* <select
                name="country_code"
                value={formData.country_code}
                onChange={handleChange}
                className="text-black mt-1 block w-full px-4 py-2 border rounded-lg"
              >
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+61">+61</option>
              </select> */}
              <input
                type="text"
                name="country_code"
                value={formData.country_code}
                onChange={handleChange}
                className="text-black mt-1 block w-full px-4 py-2 border rounded-lg"
                placeholder="Enter country code"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="text-black mt-1 block w-full px-4 py-2 border rounded-lg"
                placeholder="Enter mobile number"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="text-black mt-1 block w-full px-4 py-2 border rounded-lg"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#6552D0] text-white py-2 rounded-lg shadow hover:bg-[#4f3cb0] transition"
          >
            Create Agent
          </button>
        </form>

        {/* Agent List */}
        {agents.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-black mb-3">Agents List</h2>
            <div className="grid gap-4">
              {agents.map((agent, idx) => (
                <div
                key={idx}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50"
                >
                  <h3 className="font-bold text-[#17203D]">{agent.name}</h3>
                  <p className="text-sm text-black">{agent.email}</p>
                  <p className="text-sm text-black">
                    {agent.country_code} {agent.number}
                  </p>
                  <p className="text-sm text-black">Tasks: {agent.tasks?.length || 0}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default AgentManagement;
