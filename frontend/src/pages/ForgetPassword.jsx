import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { ClipLoader, ClockLoader } from "react-spinners";

function ForgetPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // for-step-1

  const sendOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/sendotp",
        { email },
        { withCredentials: true }
      );
      console.log(result);
      setLoading(false);
      setStep(2);
      toast.success(result.data.message);
    } catch (error) {
      console.log(error, " Error While sending OTP");
      toast.error(error.responce.data.message);
      setLoading(false);
    }
  };

  //step two

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/verifyotp",
        { email, otp },
        { withCredentials: true }
      );
      console.log(result);
      setLoading(false);
      setStep(3);
      toast.success(result.data.message);
    } catch (error) {
      console.log(error, "Error While verifing OTP");
      toast.error(error.responce.data.message);
      setLoading(false);
    }
  };

  //step-3

  const changePassword = async () => {
    setLoading(true);
    try {
      if (newPassword !== conPassword) {
        return toast.error("Password is not Matched");
      }
      const result = await axios.post(
        serverUrl + "/api/auth/resetpassword",
        { email, password: newPassword },
        { withCredentials: true }
      );
      console.log(result);
      setLoading(false);
      navigate("/login");
      toast.success(result.data.message);
    } catch (error) {
      console.log(error, " Error While Changing OTP");
      toast.error(error.responce.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* step-1 */}
      {step == 1 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Forget Your Password?
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Enter your email address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="mt-1 w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus-ring-[black] "
                type="text"
                placeholder="you@examle.com"
                id="email"
                required
              />
            </div>
            <button
              onClick={sendOtp}
              className="w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer"
              disabled={loading}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Send OTP"}
            </button>
          </form>
          <div
            onClick={() => navigate("/login")}
            className="text-sm text-center mt-4 cursor-pointer"
          >
            Back to Login
          </div>
        </div>
      )}

      {/* step-2 */}
      {step == 2 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Enter OTP
          </h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                Please Enter the OTP
              </label>
              <input
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                className="mt-1 w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus-ring-[black] "
                type="text"
                placeholder="* * * *"
                id="otp"
                required
              />
            </div>
            <button
              onClick={verifyOtp}
              className="w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer"
              disabled={loading}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Verify OTP"}
            </button>
          </form>
          <div
            onClick={() => navigate("/login")}
            className="text-sm text-center mt-4 cursor-pointer"
          >
            Back to Login
          </div>
        </div>
      )}

      {/* step-3 */}
      {step == 3 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Reset Your Password
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter a new password below to regain access to your account.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Enter new Password
              </label>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                className="mt-1 w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus-ring-[black] "
                type="text"
                placeholder="Enter new Password"
                id="password"
                required
              />
            </div>
            <div>
              <label
                htmlFor="cpassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                onChange={(e) => setConPassword(e.target.value)}
                value={conPassword}
                className="mt-1 w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus-ring-[black] "
                type="text"
                placeholder="Confirm Password"
                id="cpassword"
                required
              />
            </div>
            <button
              onClick={changePassword}
              className="w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer " disabled={loading}
            >
              {loading ? (
                <ClockLoader size={30} color="white" />
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
          <div
            onClick={() => navigate("/login")}
            className="text-sm text-center mt-4 cursor-pointer"
          >
            Back to Login
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgetPassword;
