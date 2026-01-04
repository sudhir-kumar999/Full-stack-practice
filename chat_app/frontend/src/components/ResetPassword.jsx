import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { useState } from "react";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const handleReset = async () => {
    if (!email || !otp || !password) {
      alert("All fields required");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/auth/reset-password", {
        email: email.trim(),
        otp: otp.trim(),
        newPassword: password,
      });

      alert("Password reset successful");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
      console.log(error)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center">
          Reset Password
        </h2>

        <div className="mt-4 space-y-4">
          <input
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="password"
            placeholder="New Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <button
            onClick={handleReset}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
