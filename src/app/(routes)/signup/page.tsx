"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import GoogleButton from "../../../shared/components/google-button";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState(["","","","","",""]);
  const [showOtp, setShowOtp] = useState(false);
  const [userData, setUserData] = useState<FormData | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null )[] >([]);
  const [signupButtonText, setSignupButtonText] = useState("Sign up");
  const [showSpinner, setShowSpinner] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);
  const [googleSuccess, setGoogleSuccess] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const startResendTimer = () => {
    const interval = setInterval (() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  const signupMutation = useMutation({
    mutationFn: async (data:FormData) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user-registration`,
        data
      );
      return response.data;
    },
    onSuccess: (data, formData) => {
      const successMessage = data.message || "Registration successful! OTP sent to your email.";
      setUserData(formData);
      setShowOtp(true);
      setCanResend(false);
      setTimer(60);
      startResendTimer();
    },
    onError: (error: AxiosError) => {
      console.error("Signup error:", error);
    }
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async () => {
      if(!userData) return;
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/verify-user`,
      {
        ...userData,
        otp: otp.join(""),
      }
      );
      return response.data;
    },
    onSuccess: (data) => {
      const successMessage = data.message || "Account verified successfully! Redirecting to login...";
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    },
    onError: (error: AxiosError) => {
      console.error("OTP verification error:", error);
    }
  });

  const onSubmit = (data: FormData) => {
    signupMutation.mutate(data);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let textIndex = 0;
    let dotIndex = 0;
    let currentText = "";

    const firstMessage = "Creating your Global Investments account";
    const secondMessage = "Sending your OTP to your email";

    if (signupMutation.isPending) {
      setShowSpinner(true);
      setSignupButtonText("");

      const spinnerTimer = setTimeout(() => {
        setShowSpinner(false);
        let message = firstMessage;

        interval = setInterval(() => {
          if (textIndex < message.length) {
            currentText += message[textIndex];
            textIndex++;
          } else {
            dotIndex = (dotIndex + 1) % 4;
            const dots = ".".repeat(dotIndex);
            currentText = message + dots;
          }

          setSignupButtonText(currentText);

          if (textIndex === message.length && dotIndex === 3 && message === firstMessage) {
            message = secondMessage;
            textIndex = 0;
            currentText = "";
            dotIndex = 0;
          }
        }, 150);
      }, 1500);

      return () => {
        clearTimeout(spinnerTimer);
        clearInterval(interval);
      };
    } else {
      setShowSpinner(false);
      setSignupButtonText("Sign up");
    }
  }, [signupMutation.isPending]);

  const handleOtpChange = (index:number, value:string)=> {
    if(!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value  && index < inputRefs.current.length - 1){
      inputRefs.current[index + 1] ?.focus();
    }
  };

  const handleOtpKeyDown  = (index:number, e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key=== "Backspace" && !otp[index] && index >0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const resendOtp = () => {
    if (userData) {
      signupMutation.mutate(userData);
    }
  };

  return (
    <div className="w-full py-10 min-h-[85vh] relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-green-900">
      {/* Moving Wave Background */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="signup-wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
              <stop offset="50%" stopColor="rgba(147, 51, 234, 0.6)" />
              <stop offset="100%" stopColor="rgba(34, 197, 94, 0.6)" />
            </linearGradient>
            <linearGradient id="signup-wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(34, 197, 94, 0.4)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.4)" />
              <stop offset="100%" stopColor="rgba(147, 51, 234, 0.4)" />
            </linearGradient>
            <linearGradient id="signup-wave-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(147, 51, 234, 0.3)" />
              <stop offset="50%" stopColor="rgba(34, 197, 94, 0.3)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)" />
            </linearGradient>
            <linearGradient id="signup-wave-gradient-4" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 215, 0, 0.2)" />
              <stop offset="50%" stopColor="rgba(255, 20, 147, 0.2)" />
              <stop offset="100%" stopColor="rgba(0, 255, 255, 0.2)" />
            </linearGradient>
          </defs>
          
          <path 
            d="M0,400 C300,200 600,600 1200,400 L1200,800 L0,800 Z" 
            fill="url(#signup-wave-gradient-1)"
            className="animate-wave-1"
          />
          
          <path 
            d="M0,500 C400,300 800,700 1200,500 L1200,800 L0,800 Z" 
            fill="url(#signup-wave-gradient-2)"
            className="animate-wave-2"
          />
          
          <path 
            d="M0,600 C200,400 800,800 1200,600 L1200,800 L0,800 Z" 
            fill="url(#signup-wave-gradient-3)"
            className="animate-wave-3"
          />
          
          <path 
            d="M0,350 C500,150 700,550 1200,350 L1200,800 L0,800 Z" 
            fill="url(#signup-wave-gradient-4)"
            className="animate-wave-1"
            style={{ animationDelay: '1s' }}
          />
        </svg>
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-3 h-3 bg-blue-400 rounded-full animate-float opacity-80 shadow-lg"></div>
          <div className="absolute top-40 right-20 w-4 h-4 bg-purple-400 rounded-full animate-float-reverse opacity-60 shadow-lg"></div>
          <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-float opacity-70 delay-300 shadow-lg"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-90 shadow-lg"></div>
          <div className="absolute bottom-1/3 right-10 w-3 h-3 bg-pink-400 rounded-full animate-float opacity-50 delay-500 shadow-lg"></div>
          <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-70 delay-700 shadow-lg"></div>
          <div className="absolute top-60 right-1/2 w-2 h-2 bg-orange-400 rounded-full animate-float opacity-60 delay-1000 shadow-lg"></div>
          <div className="absolute bottom-40 left-1/2 w-3 h-3 bg-indigo-400 rounded-full animate-float-reverse opacity-50 delay-1200 shadow-lg"></div>
        </div>
      </div>

      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
          Join Global Investments
        </h1>

        <p className="text-center text-xl font-medium py-3 text-blue-100">
          Create your investment account today
        </p>

        <div className="w-full flex justify-center">
          <div className="md:w-[480px] p-8 bg-black/20 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 animate-gradient-border"></div>
            <div className="absolute inset-[1px] rounded-2xl bg-black/40 backdrop-blur-xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Create Account
              </h3>

              <p className="text-center text-blue-200 mb-6">
              Already have an account? {" "}
                <Link href={"/login"} className="text-green-400 hover:text-green-300 font-medium underline transition-colors">
                Sign In
                </Link>
              </p>

              <GoogleButton
                mode="signup"
                onSuccess={() => {
                  setGoogleError(null);
                  setGoogleSuccess("Google signup successful! Redirecting...");
                  setTimeout(() => {
                    router.push("/");
                  }, 1000);
                }}
                onError={(error) => {
                  setGoogleError(error);
                  setGoogleSuccess(null);
                }}
              />

              {googleError && (
                <div className="mt-3 p-3 bg-red-500/20 border border-red-400/50 rounded-xl backdrop-blur-sm">
                  <p className="text-red-300 text-sm font-medium">{googleError}</p>
                </div>
              )}

              {googleSuccess && (
                <div className="mt-3 p-3 bg-green-500/20 border border-green-400/50 rounded-xl backdrop-blur-sm">
                  <p className="text-green-300 text-sm font-medium">{googleSuccess}</p>
                </div>
              )}

              <div className="flex items-center my-6 text-blue-200 text-sm">
                <div className="flex-1 border-t border-white/20" />
                <span className="px-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium">or continue with email</span>
                <div className="flex-1 border-t border-white/20" />
              </div>

              {!showOtp ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label className="block text-blue-200 mb-2 font-medium flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full p-4 border border-white/20 bg-white/5 text-white placeholder-gray-300 outline-0 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-300 mb-4 backdrop-blur-sm"
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mb-4 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {String(errors.name.message)}
                    </p>
                  )}

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
                  <div className="relative mb-6">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Create a password (min. 6 characters)"
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

                  <button
                    type="submit"
                    disabled={signupMutation.isPending}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg text-base bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 hover:from-blue-600 hover:via-purple-600 hover:to-green-600 text-white transform hover:scale-[1.02]"
                  >
                    {showSpinner ? (
                      <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                    ) : (
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        {signupButtonText || "Create Account"}
                      </span>
                    )}
                  </button>

                  {signupMutation.isError && signupMutation.error instanceof AxiosError && (
                    <div className="mt-3 p-3 bg-red-500/20 border border-red-400/50 rounded-xl backdrop-blur-sm">
                      <p className="text-red-300 text-sm font-medium">
                        {(() => {
                          const error = signupMutation.error;
                          if (error.response?.data) {
                            const responseData = error.response.data as any;
                            return responseData?.message ||
                                   responseData?.error ||
                                   `Error: ${error.response.status}`;
                          } else if (error.request) {
                            return "Network error. Please check your connection and try again.";
                          }
                          return error.message || "An error occurred. Please try again.";
                        })()}
                      </p>
                    </div>
                  )}
                </form>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold text-center mb-4 text-blue-200">
                    Enter OTP
                  </h3>
                  <div className="flex justify-center gap-6">
                    {otp?.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        ref={(el) => {
                          if (el) inputRefs.current[index] = el;
                        }}
                        maxLength={1}
                        className="w-12 h-12 text-center border border-white/20 bg-white/5 text-white outline-none rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-300 backdrop-blur-sm"
                        value={digit}
                        onChange={(e) => handleOtpChange(index,e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index,e)}
                      />
                    ))}
                  </div>
                  <button
                    className="w-full mt-4 text-lg cursor-pointer bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 hover:from-blue-600 hover:via-purple-600 hover:to-green-600 text-white py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02]"
                    disabled={verifyOtpMutation.isPending}
                    onClick={() => verifyOtpMutation.mutate()}
                  >
                    {verifyOtpMutation.isPending ? "Verifying..." : "Verify OTP"}
                  </button>
                  <p className="text-center text-sm mt-4 text-blue-200">
                    {canResend ? (
                      <button
                        onClick={resendOtp}
                        className="text-green-400 hover:text-green-300 cursor-pointer font-medium underline transition-colors"
                      >
                        Resend OTP
                      </button>
                    ) : (
                      `Resend OTP in ${timer}s`
                    )}
                  </p>

                  {signupMutation.isError && signupMutation.error instanceof AxiosError && (
                    <div className="mt-3 p-3 bg-red-500/20 border border-red-400/50 rounded-xl backdrop-blur-sm">
                      <p className="text-red-300 text-sm font-medium">
                        {(() => {
                          const error = signupMutation.error;
                          if (error.response?.data) {
                            const responseData = error.response.data as any;
                            return responseData?.message ||
                                   responseData?.error ||
                                   `Error: ${error.response.status}`;
                          } else if (error.request) {
                            return "Network error. Please check your connection and try again.";
                          }
                          return error.message || "An error occurred. Please try again.";
                        })()}
                      </p>
                    </div>
                  )}

                  {verifyOtpMutation?.isError &&
                    verifyOtpMutation.error instanceof AxiosError && (
                      <div className="mt-3 p-3 bg-red-500/20 border border-red-400/50 rounded-xl backdrop-blur-sm">
                        <p className="text-red-300 text-sm font-medium text-center">
                          {(() => {
                            const error = verifyOtpMutation.error;
                            if (error.response?.data) {
                              const responseData = error.response.data as any;
                              return responseData?.message ||
                                     responseData?.error ||
                                     `Error: ${error.response.status}`;
                            } else if (error.request) {
                              return "Network error. Please check your connection and try again.";
                            }
                            return error.message || "OTP verification failed. Please try again.";
                          })()}
                        </p>
                      </div>
                    )
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;