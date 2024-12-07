import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-xl font-bold text-gray-800 cursor-pointer">Share your thoughts</div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
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
          </div>

          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-8 text-gray-500">
            <li>
              <a href="#" className="hover:text-gray-900">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                My Posts
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Compose New
              </a>
            </li>
          </ul>

          {/* Logout Button */}
          <button className="hidden md:block bg-green-700 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-green-900">
            Logout
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <ul className="md:hidden text-gray-500 flex flex-col items-center py-4 gap-y-4">
            <li>
              <a href="#" className="block hover:text-gray-900">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block hover:text-gray-900">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="block hover:text-gray-900">
                My Posts
              </a>
            </li>
            <li>
              <a href="#" className="block hover:text-gray-900">
                Compose New
              </a>
            </li>
            <button className="block bg-green-700 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-green-900">
              Logout
            </button>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
