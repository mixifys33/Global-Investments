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
    <div className="w-full py-10 min-h-[85vh] relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-green-900 animate-gradient-x">
      {/* CRAZY Animated money background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating money symbols */}
        <div className="absolute top-10 left-10 text-6xl animate-bounce text-yellow-400 drop-shadow-lg">💰</div>
        <div className="absolute top-20 right-20 text-5xl animate-pulse text-green-400 drop-shadow-lg">💎</div>
        <div className="absolute bottom-20 left-1/4 text-4xl animate-spin text-blue-400 drop-shadow-lg">📈</div>
        <div className="absolute top-1/3 right-1/3 text-3xl animate-bounce text-yellow-300 drop-shadow-lg delay-300">💵</div>
        <div className="absolute bottom-1/3 right-10 text-5xl animate-pulse text-green-300 drop-shadow-lg delay-500">🤑</div>
        <div className="absolute top-1/2 left-20 text-4xl animate-spin text-purple-400 drop-shadow-lg delay-700">💸</div>
        
        {/* Moving gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
        
        {/* Sparkle effects */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-green-300 rounded-full animate-ping delay-300"></div>
        <div className="absolute bottom-1/4 left-3/4 w-2 h-2 bg-blue-300 rounded-full animate-ping delay-500"></div>
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
        💰 WELCOME BACK 💰
      </h1>

      <p className="text-center text-xl font-bold py-3 text-yellow-300 animate-bounce drop-shadow-lg">
        🚀 Access Your Money-Making Machine! 🚀
      </p>

      <div className="w-full flex justify-center">
        <div className="md:w-[480px] p-8 bg-gradient-to-br from-black/80 via-purple-900/80 to-blue-900/80 backdrop-blur-lg shadow-2xl rounded-2xl border-2 border-yellow-400/50 relative overflow-hidden animate-glow">
          {/* Crazy animated border */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 animate-gradient-x" />
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x" />
          
          {/* Money rain effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-2 left-10 text-2xl animate-bounce text-yellow-400">💰</div>
            <div className="absolute top-4 right-12 text-xl animate-pulse text-green-400">💵</div>
            <div className="absolute top-6 left-1/2 text-lg animate-spin text-blue-400">💎</div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-4 bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent animate-pulse drop-shadow-lg">
            🔥 SIGN IN TO RICHES 🔥
          </h3>


          <p className="text-center text-yellow-300 mb-6 font-bold animate-bounce">
            Don&apos;t have an account?{" "}
            <Link href={"/signup"} className="text-green-400 hover:text-green-300 font-bold underline animate-pulse">
              🚀 JOIN THE MONEY TRAIN! 🚀
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

          <div className="flex items-center my-6 text-yellow-300 text-sm font-bold">
            <div className="flex-1 border-t-2 border-yellow-400 animate-pulse" />
            <span className="px-4 bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">💎 or continue with email 💎</span>
            <div className="flex-1 border-t-2 border-yellow-400 animate-pulse" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <label className="block text-yellow-300 mb-2 font-bold animate-pulse">💰 Email Address 💰</label>
            <input
              type="email"
              placeholder="Enter your money-making email..."
              className="w-full p-4 border-2 border-yellow-400/50 bg-black/50 text-white placeholder-gray-300 outline-0 rounded-xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/30 transition-all duration-300 mb-4 backdrop-blur-sm animate-glow"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mb-4 font-bold animate-bounce">
                ⚠️ {String(errors.email.message)} ⚠️
              </p>
            )}

            {/* Password */}
            <label className="block text-yellow-300 mb-2 font-bold animate-pulse">🔐 Password 🔐</label>
            <div className="relative mb-4">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your secret money code..."
                className="w-full p-4 border-2 border-yellow-400/50 bg-black/50 text-white placeholder-gray-300 outline-0 rounded-xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/30 transition-all duration-300 pr-12 backdrop-blur-sm animate-glow"
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
                className="absolute inset-y-0 right-3 flex items-center text-yellow-400 hover:text-yellow-300 animate-pulse"
              >
                {passwordVisible ? <Eye /> : <EyeOff />}
              </button>

              {errors.password && (
                <p className="text-red-400 text-sm mt-2 font-bold animate-bounce">
                  ⚠️ {String(errors.password.message)} ⚠️
                </p>
              )}
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="flex justify-between items-center my-6">
              <label className="flex items-center text-yellow-300 font-bold animate-pulse">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-yellow-400 text-yellow-400 focus:ring-yellow-500 bg-black/50"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                💎 Remember me 💎
              </label>

              <Link href={"/forgot-password"} className="text-green-400 hover:text-green-300 text-sm font-bold underline animate-bounce">
                🔥 Forgot Password? 🔥
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center text-lg font-bold py-4 rounded-xl bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 text-black hover:from-yellow-300 hover:via-green-300 hover:to-blue-300 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-2xl animate-pulse transform hover:scale-105"
              disabled={loginMutation.isPending}
            >
              {loginMutation?.isPending ? (
                <div className="w-6 h-6 border-3 border-t-transparent border-black rounded-full animate-spin"></div>
              ) : (
                <span className="flex items-center gap-2 animate-bounce">
                  🚀 SIGN IN & GET RICH! 🚀
                </span>
              )}
            </button>



            {/* Success Message */}
            {serverSuccess && (
              <div className="mt-4 p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 border-2 border-green-400 rounded-xl backdrop-blur-sm animate-pulse">
                <p className="text-green-300 text-sm font-bold animate-bounce">✅ {serverSuccess} ✅</p>
              </div>
            )}

            {/* Error Message */}
            {serverError && (
              <div className="mt-4 p-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-400 rounded-xl backdrop-blur-sm animate-pulse">
                <p className="text-red-300 text-sm font-bold animate-bounce">❌ {serverError} ❌</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
