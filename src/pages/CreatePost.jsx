/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaSave, FaSpinner } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import api from "../utils/axios";
import { toast } from "react-toastify";

export default function CreatePost() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category_id: "",
  });
  const [mediaFile, setMediaFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/POST-SERVICE/api/categories");
        setCategories(response.data);
      } catch (error) {
        toast.error("Failed to load categories.", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setIsLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.content) newErrors.content = "Content is required";
    if (!formData.category_id) newErrors.category_id = "Please select a category";
    if (!mediaFile) newErrors.media = "Please upload a media file";
    else {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4", "video/mov", "video/avi"];
      if (!allowedTypes.includes(mediaFile.type)) {
        newErrors.media = "File must be an image (jpg, jpeg, png, gif) or video (mp4, mov, avi)";
      }
      if (mediaFile.size > 4 * 1024 * 1024) {
        newErrors.media = "File size must not exceed 4MB";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!user) {
      toast.error("Please log in to create a post.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/login");
      return;
    }

    setIsSubmitting(true);
    try {
      // Create post
      const postResponse = await api.post("/POST-SERVICE/api/posts", {
        title: formData.title,
        content: formData.content,
        user_id: user.id, // Assuming user.id is available
        category_id: parseInt(formData.category_id),
      });

      const postId = postResponse.data.id; // Assuming the response includes the post ID

      // Upload media
      const mediaFormData = new FormData();
      mediaFormData.append("url_media", mediaFile);
      mediaFormData.append("post_id", postId);

      await api.post("/api/media", mediaFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Post and media created successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      navigate("/profile");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to create post or upload media.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
      setErrors({ api: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e) => {
    setMediaFile(e.target.files[0]);
    if (errors.media) setErrors({ ...errors, media: "" });
  };

  if (authLoading || isLoadingCategories) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <main className="flex-grow max-w-3xl mx-auto px-6 sm:px-12 py-16 w-full">
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Create a New Post
          </motion.h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter post title"
                className={`w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition ${
                  errors.title ? "border-red-500" : ""
                }`}
                disabled={isSubmitting}
              />
              <AnimatePresence>
                {errors.title && (
                  <motion.p
                    className="text-red-600 text-sm mt-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.title}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Category */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Category
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition ${
                  errors.category_id ? "border-red-500" : ""
                }`}
                disabled={isSubmitting}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <AnimatePresence>
                {errors.category_id && (
                  <motion.p
                    className="text-red-600 text-sm mt-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.category_id}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Content
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your post content..."
                rows="8"
                className={`w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition ${
                  errors.content ? "border-red-500" : ""
                }`}
                disabled={isSubmitting}
              />
              <AnimatePresence>
                {errors.content && (
                  <motion.p
                    className="text-red-600 text-sm mt-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.content}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Media Upload */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Upload Media (Image/Video)
              </label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif,video/mp4,video/mov,video/avi"
                onChange={handleFileChange}
                className={`w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition ${
                  errors.media ? "border-red-500" : ""
                }`}
                disabled={isSubmitting}
              />
              <AnimatePresence>
                {errors.media && (
                  <motion.p
                    className="text-red-600 text-sm mt-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.media}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* API Error */}
            <AnimatePresence>
              {errors.api && (
                <motion.p
                  className="text-red-600 text-sm text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.api}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all shadow-md flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <FaSave />
                  <span>Create Post</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}