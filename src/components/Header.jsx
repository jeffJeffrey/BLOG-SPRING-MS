import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      {/* Barre supérieure */}
      <header className="w-full bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-3xl font-extrabold tracking-widest text-green-700">
            BLOGGING
          </Link>

          {/* Menu principal */}
          <nav className="space-x-8 text-sm font-semibold text-gray-700 hidden md:flex">
            <Link to="/" className="hover:text-green-600 transition">Home</Link>
            <Link to="/create" className="hover:text-green-600 transition">Create Post</Link>
            <Link to="/about" className="hover:text-green-600 transition">About Us</Link>
            <Link to="/team" className="hover:text-green-600 transition">Team</Link>
            <Link to="#" className="hover:text-green-600 transition">Official Store</Link>
          </nav>

          {/* Actions à droite : recherche + user */}
          <div className="flex items-center space-x-4 relative">
            {/* Bouton recherche */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-gray-600 hover:text-black focus:outline-none"
              aria-label="Toggle search"
            >
              🔍
            </button>

            {/* Barre de recherche */}
            {showSearch && (
              <input
                type="search"
                placeholder="Search posts..."
                className="absolute right-12 top-full mt-2 w-60 px-4 py-2 border border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
                onBlur={() => setShowSearch(false)}
              />
            )}

            {/* Icône utilisateur */}
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="relative focus:outline-none"
              aria-label="User menu"
            >
              <span className="inline-block w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center font-bold cursor-pointer select-none">
                U
              </span>
            </button>

            {/* Menu utilisateur */}
            {showUserMenu && (
              <div
                className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-20"
                onMouseLeave={() => setShowUserMenu(false)}
              >
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-green-100 transition"
                  onClick={() => setShowUserMenu(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-gray-700 hover:bg-green-100 transition"
                  onClick={() => setShowUserMenu(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-gray-700 hover:bg-green-100 transition"
                  onClick={() => setShowUserMenu(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Barre secondaire */}
      <div className="bg-white border-b border-gray-300">
        <div className="relative max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="space-x-10 text-sm font-semibold text-gray-600 hidden md:flex">
            <Link to="/" className="hover:text-green-700 transition">All Posts</Link>
         
          </div>
        </div>
      </div>
    </>
  );
}
