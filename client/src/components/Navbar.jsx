// src/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
   const {isLoggedIn, logout,} = useAuthContext()
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutMenuOpen, setLogoutMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">
          MyApp
        </Link>
        <div className="relative">
          <button
            className="text-white block md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Signup
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Home
                  </Link>
                  <Link
                    to="/add-medication"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Add Medication
                  </Link>
                  <Link
                    to="/reports"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Reports
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => setLogoutMenuOpen(!logoutMenuOpen)}
                  >
                    Logout
                  </button>
                  {logoutMenuOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 md:left-auto md:right-0">
                      <button
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                        onClick={() => logout("current")}
                      >
                        Logout from Current Device
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                        onClick={() => logout("other")}
                      >
                        Logout from Other Devices
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                        onClick={() => logout("all")}
                      >
                        Logout from All Devices
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        <div className="hidden md:flex space-x-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-white">
                Login
              </Link>
              <Link to="/signup" className="text-white">
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="text-white">
                Home
              </Link>
              <Link to="/add-medication" className="text-white">
                Add Medication
              </Link>
              <Link to="/reports" className="text-white">
                Reports
              </Link>
          
              <div className="relative">
                <button
                  className="text-white"
                  onClick={() => setLogoutMenuOpen(!logoutMenuOpen)}
                >
                  Logout
                </button>
                {logoutMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={() => logout("current")}
                    >
                      Logout from Current Device
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={() => logout("other")}
                    >
                      Logout from Other Devices
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={() => logout("all")}
                    >
                      Logout from All Devices
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
