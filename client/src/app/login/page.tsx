"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [url] = useState(process.env.NEXT_PUBLIC_API_URL);
  const [errorMessage, setErrorMessage] = useState(""); // 👈 state for error
  const [successMessage, setSuccessMessage] = useState(""); // 👈 optional success message

  useEffect(() => {
    const token_ = localStorage.getItem("token");
    if (token_) {
      router.push("/agents");
    }
  }, []);

  const onSubmit = async (data:any) => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await fetch(url + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.message || "Login failed. Please try again.");
        return;
      }

      setSuccessMessage("Login successful! Redirecting...");
      localStorage.setItem("token", JSON.stringify(result.token));
      setTimeout(() => router.push("/agents"), 1000); // small delay to show success
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#17203D] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-[#17203D]">
          Login to <span className="text-[#6552D0]">MyApp</span>
        </h2>

        {/* ✅ Error UI */}
        {errorMessage && (
          <div className="mt-4 p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg">
            {errorMessage}
          </div>
        )}

        {/* ✅ Success UI */}
        {successMessage && (
          <div className="mt-4 p-3 text-sm text-green-700 bg-green-100 border border-green-300 rounded-lg">
            {successMessage}
          </div>
        )}

        <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: true })}
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6552D0]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", { required: true })}
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6552D0]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#6552D0] text-white py-2 rounded-lg hover:bg-[#4f3cb0] transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-[#6552D0] font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
