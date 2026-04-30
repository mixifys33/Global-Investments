"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import GoogleButton from "../../../shared/components/google-button";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";


type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const loginMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/login-user`,
        data,
        { withCredentials: true}
      );
        return response.data;
    },
    onSuccess: (data) => {
      setServerError(null);
      const successMessage = data.message || "Login successful! Redirecting...";
      setServerSuccess(successMessage);

      // Save token to localStorage for axiosInstance to use
      if (data?.token) {
        localStorage.setItem("accessToken", data.token);
      }

      // Small delay to show success message before redirect
      setTimeout(() => {
        router.push("/");
      }, 1000);
    },
    onError: (error:AxiosError) => {
      setServerSuccess(null);
      let errorMessage = "An error occurred. Please try again.";

      if (error.response) {
        // Backend responded with error
        const responseData = error.response.data as any;
        errorMessage = responseData?.message ||
                       responseData?.error ||
                       `Error: ${error.response.status} - ${error.response.statusText}`;
      } else if (error.request) {
        // Request made but no response
        errorMessage = "Network error. Please check your connection and try again.";
      } else {
        // Something else happened
        errorMessage = error.message || "Invalid credentials";
      }

      setServerError(errorMessage);
    },
  });


  const onSubmit = (data: FormData) => {
    // Clear previous messages when submitting new form
    setServerError(null);
    setServerSuccess(null);
    loginMutation.mutate(data);
  };

  return (
    <div className="w-full py-10 min-h-[85vh] relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Subtle geometric patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute top-20 left-10 text-4xl">💰</div>
        <div className="absolute top-40 right-20 text-3xl">💎</div>
        <div className="absolute bottom-20 left-1/4 text-2xl">📈</div>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-2 text-slate-800">
        Welcome Back
      </h1>

      <p className="text-center text-base font-medium py-3 text-slate-600">
        Access your Global Investments account
      </p>

      <div className="w-full flex justify-center">
        <div className="md:w-[480px] p-8 bg-white shadow-lg rounded-xl border border-slate-200 relative overflow-hidden">
          {/* Subtle accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />

          <h3 className="text-xl sm:text-2xl font-semibold text-center mb-2 text-slate-800">
            Sign In
          </h3>


          <p className="text-center text-slate-500 mb-6">
            Don&apos;t have an account?{" "}
            <Link href={"/signup"} className="text-blue-600 hover:text-blue-700 font-medium">
              Sign Up
            </Link>
          </p>

          <GoogleButton
            mode="login"
            onSuccess={() => {
              setGoogleError(null);
              setServerSuccess("Google login successful! Redirecting...");
              setTimeout(() => {
                router.push("/");
              }, 1000);
            }}
            onError={(error) => {
              setGoogleError(error);
              setServerSuccess(null);
            }}
          />

          {googleError && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm font-medium">{googleError}</p>
            </div>
          )}

          <div className="flex items-center my-6 text-slate-400 text-sm">
            <div className="flex-1 border-t border-slate-200" />
            <span className="px-4">or continue with email</span>
            <div className="flex-1 border-t border-slate-200" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <label className="block text-slate-700 mb-2 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-slate-300 outline-0 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors mb-4"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mb-4">
                {String(errors.email.message)}
              </p>
            )}

            {/* Password */}
            <label className="block text-slate-700 mb-2 font-medium">Password</label>
            <div className="relative mb-4">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full p-3 border border-slate-300 outline-0 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors pr-12"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />

              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                {passwordVisible ? <Eye /> : <EyeOff />}
              </button>

              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {String(errors.password.message)}
                </p>
              )}
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="flex justify-between items-center my-6">
              <label className="flex items-center text-slate-600">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me
              </label>

              <Link href={"/forgot-password"} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center text-base font-semibold py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
              disabled={loginMutation.isPending}
            >
              {loginMutation?.isPending ? (
                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In
                </span>
              )}
            </button>



            {/* Success Message */}
            {serverSuccess && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-700 text-sm font-medium">{serverSuccess}</p>
              </div>
            )}

            {/* Error Message */}
            {serverError && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700 text-sm font-medium">{serverError}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
