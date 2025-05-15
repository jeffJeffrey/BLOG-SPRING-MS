/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiMoreVertical } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function PostCard({
  id,
  image,
  title,
  description,
  author,
  date,
  readTime,
  views,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUpdate = () => {
    setMenuOpen(false);
    navigate(`/posts/${id}/edit`);
  };

  const handleDelete = () => {
    setMenuOpen(false);
    if (window.confirm("Are you sure you want to delete this post?")) {
      alert(`Post ${id} deleted (mock)`);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      className="group relative mb-10 rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200 transition-all"
    >
      <Link to={`/posts/${id}`}>
        <div className="overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5 space-y-3">
          <h2 className="text-2xl font-bold text-gray-800 group-hover:text-green-600 transition">
            {title}
          </h2>
          <p className="text-gray-600 line-clamp-2">{description}</p>
          <div className="flex flex-wrap justify-between text-sm text-gray-500">
            <span>{author}</span>
            <span>{date}</span>
            <span>{readTime}</span>
            <span>{views} vues</span>
          </div>
        </div>
      </Link>

      {/* Menu contextuel */}
      <div ref={menuRef} className="absolute top-3 right-3">
        <button
          onClick={(e) => {
            e.preventDefault();
            setMenuOpen(!menuOpen);
          }}
          aria-label="Open menu"
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition text-gray-700"
        >
          <FiMoreVertical className="text-xl" />
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-20"
            >
              <button
                onClick={handleUpdate}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-green-100"
              >
                <FiEdit className="mr-2" /> Modifier
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-100"
              >
                <FiTrash2 className="mr-2" /> Supprimer
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
