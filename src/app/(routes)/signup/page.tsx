
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
        // Error handling is done in the UI below
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
      // Small delay to show success message
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    },
    onError: (error: AxiosError) => {
      // Error handling is done in the UI below
      console.error("OTP verification error:", error);
    }

});


  const onSubmit = (data: FormData) => {
    signupMutation.mutate(data);
    // handle Signup logic here
  };


  useEffect(() => {
    let interval: NodeJS.Timeout;
    let textIndex = 0;
    let dotIndex = 0;
    let currentText = "";

            const firstMessage = "Creating your Global Investments account";
            const secondMessage = "Sending your OTP to your email";

    if (signupMutation.isPending) {
      // Step 1: show spinner for 1.5 seconds
      setShowSpinner(true);
      setSignupButtonText(""); // hide text while spinner shows

      const spinnerTimer = setTimeout(() => {
        setShowSpinner(false);
        let message = firstMessage;

        interval = setInterval(() => {
          // Typewriter logic
          if (textIndex < message.length) {
            currentText += message[textIndex];
            textIndex++;
          } else {
            // Blink dots after typing full message
            dotIndex = (dotIndex + 1) % 4;
            const dots = ".".repeat(dotIndex);
            currentText = message + dots;
          }

          setSignupButtonText(currentText);

          // Switch to second message after finishing first message + 3 cycles of dots
          if (textIndex === message.length && dotIndex === 3 && message === firstMessage) {
            message = secondMessage;
            textIndex = 0;
            currentText = "";
            dotIndex = 0;
          }
        }, 150);

      }, 1500); // spinner duration

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
    <div className="w-full py-10 min-h-[85vh] relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-green-900 animate-gradient-x">
      {/* CRAZY Animated money background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating money symbols */}
        <div className="absolute top-10 left-10 text-6xl animate-money-bounce text-yellow-400 drop-shadow-lg">💰</div>
        <div className="absolute top-20 right-20 text-5xl animate-pulse text-green-400 drop-shadow-lg">💎</div>
        <div className="absolute bottom-20 left-1/4 text-4xl animate-crazy-spin text-blue-400 drop-shadow-lg">📈</div>
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
        💰 JOIN THE MONEY REVOLUTION! 💰
      </h1>

      <p className="text-center text-xl font-bold py-3 text-yellow-300 animate-bounce drop-shadow-lg">
        🚀 Create Your Wealth-Building Account! 🚀
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
            🔥 CREATE WEALTH ACCOUNT 🔥
          </h3>


          <p className="text-center text-yellow-300 mb-6 font-bold animate-bounce">
          Already have an account? {" "}
            <Link href={"/login"} className="text-green-400 hover:text-green-300 font-bold underline animate-pulse">
            🚀 SIGN IN TO RICHES! 🚀
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
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm font-medium">{googleError}</p>
            </div>
          )}

          {googleSuccess && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-700 text-sm font-medium">{googleSuccess}</p>
            </div>
          )}

          <div className="flex items-center my-6 text-yellow-300 text-sm font-bold">
            <div className="flex-1 border-t-2 border-yellow-400 animate-pulse" />
            <span className="px-4 bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">💎 or continue with email 💎</span>
            <div className="flex-1 border-t-2 border-yellow-400 animate-pulse" />
          </div>


              {!showOtp  ? (

                  <form onSubmit={handleSubmit(onSubmit)}>
           {/* name */}
           <label className="block text-yellow-300 mb-2 font-bold animate-pulse">👤 Full Name 👤</label>
            <input
              type="text"
              placeholder="Enter your money-making name..."
              className="w-full p-4 border-2 border-yellow-400/50 bg-black/50 text-white placeholder-gray-300 outline-0 rounded-xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/30 transition-all duration-300 mb-4 backdrop-blur-sm animate-glow"
              {...register("name", {
                required: "Name is required",

              })}
            />
            {errors.name && (
              <p className="text-red-400 text-sm mb-4 font-bold animate-bounce">
                ⚠️ {String(errors.name.message)} ⚠️
              </p>
            )}

            {/* Email */}
            <label className="block text-yellow-300 mb-2 font-bold animate-pulse">💰 Email Address 💰</label>
            <input
              type="email"
              placeholder="Enter your wealth-building email..."
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
            <div className="relative mb-6">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Create your secret wealth code (min. 6 chars)..."
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



            {/* Submit */}
            <button
            type="submit"
            disabled={signupMutation.isPending}
            className="w-full text-lg font-bold py-4 rounded-xl bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 text-black hover:from-yellow-300 hover:via-green-300 hover:to-blue-300 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-2xl animate-pulse transform hover:scale-105 flex justify-center items-center gap-2"
          >
            {showSpinner ? (
              <div className="w-6 h-6 border-3 border-t-transparent border-black rounded-full animate-spin"></div>
            ) : (
              <span className="flex items-center gap-2 animate-bounce">
                {signupButtonText || "🚀 CREATE WEALTH ACCOUNT! 🚀"}
              </span>
            )}
          </button>

          {/* Signup Error Message */}
          {signupMutation.isError && signupMutation.error instanceof AxiosError && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm font-medium">
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
                  <h3 className="text-xl font-semibold text-center mb-4">
                      Enter OTP
                    </h3>
                    <div className="flex justify-center gap-6"   >
                      {otp?.map((digit, index)  => (
                        <input
                        key={index}
                        type="text"
                        ref={(el) =>{
                          if (el) inputRefs.current[index] = el;
                        }}
                          maxLength={1}
                          className="w-12 h-12 text-center border border-gray-300 outline-none !rounded"
                          value={digit}
                          onChange={(e) => handleOtpChange(index,e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index,e)}


                          />
                      )) }


                    </div>
                          <button
                          className="w-full mt-4 text-lg cursor-pointer bg-blue-500 text-white py-2 rounded-lg"
                          disabled={verifyOtpMutation.isPending}
                          onClick={() => verifyOtpMutation.mutate()}
                          >
                            {verifyOtpMutation.isPending ? "Verifying..." : "Verify OTP"}
                          </button>
                          <p
                          className="text-center text-sm mt-4"
                          >
                            {canResend ? (
                              <button
                              onClick={resendOtp}
                              className=" text-blue-500 cursor-pointer"
                              >
                                  Resend OTP
                              </button>
                            ) :(
                              `Resend OTP in ${timer}s`
                            )
                          }
                          </p>

                            {/* Signup Error Message */}
                            {signupMutation.isError && signupMutation.error instanceof AxiosError && (
                              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-red-700 text-sm font-medium">
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

                            {/* OTP Verification Error Message */}
                            {verifyOtpMutation?.isError &&
                              verifyOtpMutation.error instanceof AxiosError && (
                                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                                  <p className="text-red-700 text-sm font-medium text-center">
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

              )};

        </div>
      </div>
    </div>
  );
};

export default Signup;
