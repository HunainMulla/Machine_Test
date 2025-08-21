  "use client";

  import Link from "next/link";
  import {useForm} from "react-hook-form";
  import { useState,useEffect } from "react";
  import Navbar from "../Components/Navbar";

  export default function SignupPage() {

  const [url,setUrl] = useState(process.env.NEXT_PUBLIC_API_URL);

  const {register,handleSubmit,formState:{errors}} = useForm();


  const onSubmit = async (data) => {
    alert("data: "+JSON.stringify(data));
    const response = await fetch(url+"/auth/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    })
    const result = await response.json();
    alert(result.message);
    console.log('token :'+result.token);
    localStorage.setItem("token",JSON.stringify(result.token));
    localStorage.setItem("User",JSON.stringify(result.user));
  };


    return (
      <div>
        <div className="border-b border-[#6552D0]">
          <Navbar/>
        </div>
      <div className="min-h-screen flex items-center justify-center bg-[#17203D] px-4">
        
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-[#17203D]">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                {...register("name",{required:true})}
                className="text-black w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6552D0]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email",{required:true})}
                className="text-black w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6552D0]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password",{required:true})}
                className="text-black w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6552D0]"
                />
            </div>

            <button
              type="submit"
              className="w-full bg-[#6552D0] text-white py-2 rounded-lg hover:bg-[#4f3cb0] transition"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-[#6552D0] font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
              </div>
    );
  }
