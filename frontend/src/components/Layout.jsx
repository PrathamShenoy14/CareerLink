import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Layout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // 🔹 Check if the user is authenticated on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await axios.get("http://localhost:5000/api/auth/check-auth", { withCredentials: true });
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, []);

  // 🔹 Logout Function
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      setIsAuthenticated(false);
      navigate("/");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Logout failed!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <span className="text-2xl font-bold text-blue-600">CareerLink</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
            <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-blue-600 ${isActive ? "text-blue-600" : "text-gray-700"}`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/test"
                className={({ isActive }) =>
                  `hover:text-blue-600 ${isActive ? "text-blue-600" : "text-gray-700"}`
                }
              >
                Test
              </NavLink>

              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  `hover:text-blue-600 ${isActive ? "text-blue-600" : "text-gray-700"}`
                }
              >
                Courses
              </NavLink> 
              
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CareerLink</h3>
              <p className="text-gray-400">Empowering careers through personalized guidance and continuous learning.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@careerlink.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Address: 123 Career Street</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white text-2xl"><i className="fab fa-facebook"></i></a>
                <a href="#" className="text-gray-400 hover:text-white text-2xl"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-gray-400 hover:text-white text-2xl"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} CareerLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
