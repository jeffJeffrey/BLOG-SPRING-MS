/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiSearch, FiUser } from "react-icons/fi";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuLinks = [
    { to: "/", label: "Home" },
    { to: "/create", label: "Create Post" },
    { to: "/about", label: "About Us" },
    { to: "/team", label: "Team" },
    { to: "#", label: "Official Store" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-md"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-3xl font-extrabold tracking-widest text-green-600">
            BLOGGING
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden md:flex space-x-8 text-sm font-semibold text-gray-700">
            {menuLinks.map((link) => (
              <Link key={link.label} to={link.to} className="hover:text-green-600 transition">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4 relative">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-gray-600 hover:text-black focus:outline-none text-lg"
              aria-label="Toggle search"
            >
              <FiSearch />
            </button>

            {showSearch && (
              <motion.input
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                type="search"
                placeholder="Search posts..."
                className="absolute right-12 top-full mt-2 w-60 px-4 py-2 border border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
                onBlur={() => setShowSearch(false)}
              />
            )}

            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="text-white bg-green-600 w-8 h-8 rounded-full flex items-center justify-center focus:outline-none"
              aria-label="User menu"
            >
              <FiUser />
            </button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-20"
                  onMouseLeave={() => setShowUserMenu(false)}
                >
                  <Link to="/profile" className="block px-4 py-2 hover:bg-green-100">Profile</Link>
                  <Link to="/login" className="block px-4 py-2 hover:bg-green-100">Login</Link>
                  <Link to="/register" className="block px-4 py-2 hover:bg-green-100">Register</Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Menu burger mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="text-2xl text-gray-700"
              >
                {isMobileMenuOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Menu Mobile Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white mt-[72px] shadow-md border-b border-gray-200 md:hidden px-6 py-4 space-y-4 z-40"
          >
            {menuLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="block text-gray-700 text-base font-semibold hover:text-green-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to push content below fixed navbar */}
      <div className="h-[72px]" />
    </>
  );
}
