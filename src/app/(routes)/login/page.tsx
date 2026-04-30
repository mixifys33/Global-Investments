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

      if (data?.token) {
        localStorage.setItem("accessToken", data.token);
      }

      setTimeout(() => {
        router.push("/");
      }, 1000);
    },
    onError: (error:AxiosError) => {
      setServerSuccess(null);
      let errorMessage = "An error occurred. Please try again.";

      if (error.response) {
        const responseData = error.response.data as any;
        errorMessage = responseData?.message ||
                       responseData?.error ||
                       `Error: ${error.response.status} - ${error.response.statusText}`;
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection and try again.";
      } else {
        errorMessage = error.message || "Invalid credentials";
      }

      setServerError(errorMessage);
    },
  });

  const onSubmit = (data: FormData) => {
    setServerError(null);
    setServerSuccess(null);
    loginMutation.mutate(data);
  };

  return (
    <div className="w-full py-10 min-h-[85vh] relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-green-900">
      {/* Moving Wave Background */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="50%" stopColor="rgba(147, 51, 234, 0.3)" />
              <stop offset="100%" stopColor="rgba(34, 197, 94, 0.3)" />
            </linearGradient>
            <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(34, 197, 94, 0.2)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.2)" />
              <stop offset="100%" stopColor="rgba(147, 51, 234, 0.2)" />
            </linearGradient>
            <linearGradient id="wave-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(147, 51, 234, 0.1)" />
              <stop offset="50%" stopColor="rgba(34, 197, 94, 0.1)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
            </linearGradient>
          </defs>
          
          <path 
            d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z" 
            fill="url(#wave-gradient-1)"
            className="animate-wave-1"
          />
          
          <path 
            d="M0,500 C400,400 800,600 1200,500 L1200,800 L0,800 Z" 
            fill="url(#wave-gradient-2)"
            className="animate-wave-2"
          />
          
          <path 
            d="M0,600 C200,550 800,650 1200,600 L1200,800 L0,800 Z" 
            fill="url(#wave-gradient-3)"
            className="animate-wave-3"
          />
        </svg>
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-60"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-float-reverse opacity-40"></div>
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-float opacity-50 delay-300"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-pulse opacity-70"></div>
          <div className="absolute bottom-1/3 right-10 w-2 h-2 bg-pink-400 rounded-full animate-float opacity-30 delay-500"></div>
        </div>
      </div>

      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
          Welcome Back
        </h1>

        <p className="text-center text-xl font-medium py-3 text-blue-100">
          Access your Global Investments account
        </p>

        <div className="w-full flex justify-center">
          <div className="md:w-[480px] p-8 bg-black/20 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 animate-gradient-border"></div>
            <div className="absolute inset-[1px] rounded-2xl bg-black/40 backdrop-blur-xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Sign In
              </h3>

              <p className="text-center text-blue-200 mb-6">
                Don&apos;t have an account?{" "}
                <Link href={"/signup"} className="text-green-400 hover:text-green-300 font-medium underline transition-colors">
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
                <div className="mt-3 p-3 bg-red-500/20 border border-red-400/50 rounded-xl backdrop-blur-sm">
                  <p className="text-red-300 text-sm font-medium">{googleError}</p>
                </div>
              )}

              <div className="flex items-center my-6 text-blue-200 text-sm">
                <div className="flex-1 border-t border-white/20" />
                <span className="px-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium">or continue with email</span>
                <div className="flex-1 border-t border-white/20" />
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <label className="block text-blue-200 mb-2 font-medium flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full p-4 border border-white/20 bg-white/5 text-white placeholder-gray-300 outline-0 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-300 mb-4 backdrop-blur-sm"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {String(errors.email.message)}
                  </p>
                )}

                <label className="block text-blue-200 mb-2 font-medium flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Password
                </label>
                <div className="relative mb-4">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full p-4 border border-white/20 bg-white/5 text-white placeholder-gray-300 outline-0 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-300 pr-12 backdrop-blur-sm"
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
                    className="absolute inset-y-0 right-3 flex items-center text-blue-300 hover:text-blue-200 transition-colors"
                  >
                    {passwordVisible ? <Eye /> : <EyeOff />}
                  </button>

                  {errors.password && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {String(errors.password.message)}
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center my-6">
                  <label className="flex items-center text-blue-200">
                    <input
                      type="checkbox"
                      className="mr-2 rounded border-white/20 text-blue-500 focus:ring-blue-500 bg-white/5"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    Remember me
                  </label>

                  <Link href={"/forgot-password"} className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors">
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg text-base bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 hover:from-blue-600 hover:via-purple-600 hover:to-green-600 text-white transform hover:scale-[1.02]"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation?.isPending ? (
                    <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  ) : (
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Sign In
                    </span>
                  )}
                </button>

                {serverSuccess && (
                  <div className="mt-4 p-4 bg-green-500/20 border border-green-400/50 rounded-xl backdrop-blur-sm">
                    <p className="text-green-300 text-sm font-medium flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {serverSuccess}
                    </p>
                  </div>
                )}

                {serverError && (
                  <div className="mt-4 p-4 bg-red-500/20 border border-red-400/50 rounded-xl backdrop-blur-sm">
                    <p className="text-red-300 text-sm font-medium flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {serverError}
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;