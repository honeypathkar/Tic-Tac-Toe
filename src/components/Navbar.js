import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link to="/Tic-Tac-Toe/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-500 text-lg">
                  Tic Tac Toe
                </span>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3 ">
            <Link
              to="/login"
              className="py-2 px-2 font-medium"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="py-2 px-2 font-medium btn btn-outline-dark"
            >
              Sign Up
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button"
              onClick={toggleMenu}
            >
              <svg
                className=" w-6 h-6 text-gray-500 hover:text-green-500 "
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden ${isOpen ? "" : "hidden"}`}>
        <ul className="mobile-menu">
          <li>
            <Link
              to="/login"
              className="block text-sm px-2 py-4 hover:bg-gray-500 transition duration-300"
            >
              Log In
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="block text-sm px-2 py-4 hover:bg-gray-500 transition duration-300"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
