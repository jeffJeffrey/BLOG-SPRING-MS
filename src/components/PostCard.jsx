// src/components/PostCard.jsx
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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

  // Fermer le menu si clic en dehors
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handler update et delete
  const handleUpdate = () => {
    setMenuOpen(false);
    navigate(`/posts/${id}/edit`);
  };

  const handleDelete = () => {
    setMenuOpen(false);
    // Pour l'instant juste un alert, à remplacer par ta logique delete
    if (window.confirm("Are you sure you want to delete this post?")) {
      alert(`Post ${id} deleted (mock)`);
      // Ici tu peux appeler une API ou mettre à jour le state global
    }
  };

  return (
    <div className="mb-8 border rounded-md overflow-hidden shadow-sm hover:shadow-lg transition relative">
      <Link to={`/posts/${id}`}>
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600 mb-2">{description}</p>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{author}</span>
            <span>{date}</span>
            <span>{readTime}</span>
            <span>{views} views</span>
          </div>
        </div>
      </Link>

      {/* Menu à trois points */}
      <div className="absolute top-2 right-2" ref={menuRef}>
        <button
          onClick={(e) => {
            e.preventDefault();
            setMenuOpen(!menuOpen);
          }}
          aria-label="Open menu"
          className="text-gray-600 hover:text-black focus:outline-none text-2xl font-bold select-none"
        >
          ⋮
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-10">
             <Link to={`/posts/${id}/edit`}>
            <button
              onClick={handleUpdate}
              className="block w-full text-left px-4 py-2 hover:bg-green-100"
            >
              Update
            </button>
            </Link>
            <button
              onClick={handleDelete}
              className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
