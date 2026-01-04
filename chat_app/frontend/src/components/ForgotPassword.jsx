import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) {
      alert("Please enter email");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:8000/api/auth/forgot-password", {
        email,
      });

      alert("OTP sent to your email");

      // ✅ Redirect to reset password page
      navigate("/reset-password", { state: { email } });

    } catch (error) {
      alert(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          Enter your registered email to receive OTP
        </p>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={handleSendOtp}
          disabled={loading}
          className={`w-full mt-6 py-2 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          OTP will be valid for 10 minutes
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
