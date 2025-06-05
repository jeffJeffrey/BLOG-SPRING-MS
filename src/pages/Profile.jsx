/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBook, FaEye, FaEdit, FaTrash, FaSpinner } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import api from "../utils/axios";

export default function Profile() {
  const { user, loading: authLoading } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [error, setError] = useState(null);

  // Calculate total posts
  const totalPosts = posts.length;

  // Get initials from firstName and lastName
  const getInitials = () => {
    if (!user || !user.firstName || !user.lastName) return "";
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  };

  // Fetch user posts
  useEffect(() => {
    if (!user) return;
    const fetchPosts = async () => {
      try {
        const response = await api.get(`/POST-SERVICE/api/posts/user/${user.id}`);
        setPosts(response.data || []);
      } catch (err) {
        setError("Failed to load posts.");
        toast.error("Failed to load posts.", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setIsLoadingPosts(false);
      }
    };
    fetchPosts();
  }, [user]);

  // Handle post deletion
  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await api.delete(`/POST-SERVICE/api/posts/${postId}`);
      setPosts(posts.filter((post) => post.id !== postId));
      toast.success("Post deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to delete post.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (authLoading || isLoadingPosts) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <FaSpinner className="animate-spin text-green-600 text-4xl" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <section className="flex-grow max-w-5xl mx-auto px-6 sm:px-12 py-16 w-full">
        {/* User Info Card */}
        <motion.section
          className="bg-gray-100 rounded-xl shadow-md p-8 mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <motion.div
              className="w-40 h-40 rounded-full bg-green-600 text-white flex items-center justify-center text-4xl font-bold shadow-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {getInitials()}
            </motion.div>
            <div className="text-center md:text-left flex-1">
              <motion.h1
                className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {user.firstName} {user.lastName}
              </motion.h1>
              <motion.p
                className="text-gray-600 text-lg mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {user.email}
              </motion.p>
              <motion.p
                className="text-gray-700 text-lg max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {user.bio || "No bio provided."}
              </motion.p>
              <motion.button
                className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all text-base font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Edit Profile
              </motion.button>
            </div>
          </div>
          {/* Stats Section */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
              <FaBook className="text-green-600 text-xl" />
              <div>
                <p className="text-gray-900 font-semibold">{totalPosts}</p>
                <p className="text-gray-600 text-sm">Published Posts</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Posts Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.3 },
            },
          }}
        >
          <motion.h2
            className="text-2xl font-semibold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Published Posts
          </motion.h2>
          {posts.length === 0 ? (
            <motion.div
              className="text-center p-8 bg-gray-100 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-600 text-lg mb-4">No published posts yet.</p>
              <a
                href="/create"
                className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all text-base font-semibold"
              >
                Write Your First Post
              </a>
            </motion.div>
          ) : (
            <ul className="space-y-6">
              {posts.map(({ id, title, createdOn, media }) => (
                <motion.li
                  key={id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img
                      src={media[0]?.url_media || "https://via.placeholder.com/400x400"}
                      alt={title}
                      className="w-full sm:w-32 h-32 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        Published on {new Date(createdOn).toLocaleDateString()}
                      </p>
                      <div className="mt-3 flex gap-3">
                        <a
                          href={`/posts/${id}`}
                          className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-semibold"
                        >
                          <FaEye /> View
                        </a>
                        <a
                          href={`/posts/${id}/edit`}
                          className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-semibold"
                        >
                          <FaEdit /> Edit
                        </a>
                        <button
                          onClick={() => handleDelete(id)}
                          className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-semibold"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.section>
      </section>
    </div>
  );
}