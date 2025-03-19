import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
// Import the local image
import login from "./assets/login.svg"; // Adjust path if needed

const AuthPage = () => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });
      alert(res.data.message);
      setMode("login");
    } catch (error) {
      alert("Signup failed! " + error.response?.data?.message || "Unknown error");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed! " + error.response?.data?.message || "Unknown error");
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="flex h-screen bg-gray-900 justify-center items-center">
        <div className="w-2/6 mx-6 flex flex-col justify-center items-center bg-gray-900 text-white p-8 border-2 border-gray-700 rounded-2xl shadow-2xl transform transition-all duration-300 hover:shadow-3xl">
          {mode === "login" ? (
            <LoginForm setMode={setMode} email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleLogin={handleLogin} />
          ) : (
            <SignupForm setMode={setMode} email={email} setEmail={setEmail} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} handleSignup={handleSignup} />
          )}

          <div className="flex items-center w-full my-5">
            <hr className="flex-grow border-gray-600" />
            <span className="mx-3 text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          <div className="w-full">
            <div className="w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-2">
              <GoogleLogin
                onSuccess={handleLogin}
                onError={() => alert("Google login failed!")}
                className="w-full"
              />
            </div>
          </div>
        </div>
        <div className="w-4/6 h-screen">
          <img src={login} alt="Auth" className="w-full h-full object-cover rounded-lg shadow-xl" />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default AuthPage;