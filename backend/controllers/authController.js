import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { uploadPDF, deletePDF } from "../utils/cloudinary.js";
import { sendEmailWithPDF } from "../utils/email.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({ name, email, password: hashedPassword });
    res.json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  // ✅ Store token in a secure, HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true, // Prevents JavaScript access (XSS protection)
    secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    sameSite: "Strict", // Prevent CSRF attacks
    maxAge: 3600000, // 1 hour expiration
  });

  res.json({ message: "Login successful" });
};

const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, sub: googleId } = ticket.getPayload();
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email, googleId });
    }

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // ✅ Store token in a secure, HTTP-only cookie
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600000, // 1 hour expiration
    });

    res.json({ message: "Google login successful" });
  } catch (error) {
    res.status(400).json({ error: "Google authentication failed" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.json({ message: "Logged out successfully" });
};

const uploadUserReport = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 🔹 Step 1: Delete existing PDF if it exists
    if (user.reportURL) {
      const publicId = user.reportURL.split("/").pop().split(".")[0]; // Extract filename
      await deletePDF(publicId);
    }

    // 🔹 Step 2: Upload new PDF
    const pdfBuffer = req.file.buffer;
    const cloudinaryURL = await uploadPDF(pdfBuffer);

    // 🔹 Step 3: Save new report URL
    user.reportURL = cloudinaryURL;
    await user.save();

    // 🔹 Step 4: Send Email with PDF
    await sendEmailWithPDF(
      user.email,
      "Your Career Personality Report",
      "Attached is your career aptitude test result.",
      cloudinaryURL
    );

    res.json({ message: "PDF uploaded & emailed successfully", reportURL: cloudinaryURL });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteUserReport = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || !user.reportURL) return res.status(404).json({ message: "Report not found" });

    const publicId = user.reportURL.split("/").pop().split(".")[0]+".pdf"; // Extract Cloudinary ID
    await deletePDF(publicId);

    user.reportURL = null;
    await user.save();

    res.json({ message: "PDF deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { register, login, googleLogin, logout, uploadUserReport, deleteUserReport};
