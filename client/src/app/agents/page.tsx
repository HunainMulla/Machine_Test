"use client";
import {useRouter} from "next/navigation";
import Navbar from "../Components/Navbar";
import {useEffect,useState} from 'react'



const Agents = () => {

  const[loading,setLoading] = useState<boolean>(true);

  const router = useRouter();
  useEffect(() => {
    const token_ = localStorage.getItem("token");
    if (!token_) {
      router.push("/login");
    }
    setLoading(false);
  }, []);

  const demo_agents = [
    {
      name: "Hunain Mulla",
      email: "hunainmulla@gmail.com",
      phone: "1234567890",
      country_code: "+91",
      list: [],
    },
    {
      name: "Hunain Mulla",
      email: "hunainmulla@gmail.com",
      phone: "1234567890",
      country_code: "+91",
      list: [],
    },
  ];

  return (
    <>
    <Navbar/>
    {loading && <p>Loading...</p>}
    {!loading && <div className="min-h-screen bg-[#17203D] px-6 py-10">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Agents
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {demo_agents.map((agent, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold text-[#17203D] mb-2">
              {agent.name}
            </h2>
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {agent.email}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Phone:</span> {agent.country_code}{" "}
              {agent.phone}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Lists:</span>{" "}
              {agent.list.length > 0
                ? agent.list.join(", ")
                : "No lists assigned"}
            </p>
          </div>
        ))}
      </div>
    </div>}
    </>
  );
};

export default Agents;
