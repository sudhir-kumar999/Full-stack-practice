import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import User from "../models/user.model.js"; 
import bcrypt from "bcrypt";


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate 6 digit OTP (string)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    user.resetOtpExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    });

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const resetPasswordWithOtp = async (req, res) => {
  try {
    let { email, otp, newPassword } = req.body;

    // ✅ validations
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ trim & ensure string
    otp = otp.toString().trim();

    const hashedOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    const user = await User.findOne({
      email,
      resetOtp: hashedOtp,
      resetOtpExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
