/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUpload, FaTrash } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Mock data (replace with API or global context)
const postsData = [
  {
    id: "1",
    title: "The Pursuit of Beauty & Aesthetics and Its Impact on Our Work",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    description: "The pursuit of beauty has been an integral aspect...",
    content:
      "Here's the detailed content for post 1... you can add anything you want.",
  },
  {
    id: "2",
    title:
      "Herbariums: TerraLiving's Modern Take on Botanical Treasure & Legacy With Stylish Terrariums",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    description: "Explore how TerraLiving redefines traditional herbariums...",
    content:
      "Here's the detailed content for post 2... you can add anything you want.",
  },
];

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Find the post to edit
  const post = postsData.find((p) => p.id === id);

  // Form states
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImagePreview(post.image);
      setDescription(post.description);
      setContent(post.content);
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Post not found.</p>
      </div>
    );
  }

  // Handle file upload
  const handleFile = (file) => {
    if (file && !file.type.startsWith("image/")) {
      setErrors({
        ...errors,
        image: "Please upload an image file (PNG, JPG, GIF).",
      });
      return;
    }
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : post.image);
    setErrors({ ...errors, image: "" });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleChangeFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setErrors({ ...errors, image: "" });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!title.trim() || title.length < 5) {
      newErrors.title = "Title is required and must be at least 5 characters";
    }

    if (!content.trim() || content.length < 20) {
      newErrors.content =
        "Content is required and must be at least 20 characters";
    }

    if (description.length > 200) {
      newErrors.description = "Description must be 200 characters or less";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log({ id, title, imageFile, description, content });
      navigate(`/posts/${id}`);
    }
  };

  const handleCancel = () => {
    navigate(`/posts/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <motion.div
        className="sticky top-0 z-50 bg-white shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      ></motion.div>

      <main className="flex-grow max-w-5xl mx-auto px-8 sm:px-12 py-12 bg-white rounded-xl shadow-lg mt-10 mb-20 w-full">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-extrabold mb-10 text-center text-gray-900"
        >
          Edit Post
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <label
              htmlFor="title"
              className="block mb-3 text-lg font-semibold text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors({ ...errors, title: "" });
              }}
              required
              placeholder="Enter post title"
              className={`w-full rounded-lg border border-gray-300 px-5 py-4 text-gray-900 placeholder-gray-400 shadow-sm focus:border-green-600 focus:ring-2 focus:ring-green-600 transition ${
                errors.title ? "border-red-500" : ""
              }`}
              aria-describedby={errors.title ? "title-error" : undefined}
            />
            <AnimatePresence>
              {errors.title && (
                <motion.p
                  id="title-error"
                  className="text-red-600 text-sm mt-2"
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

          {/* Image Upload with Drag & Drop */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label
              htmlFor="image"
              className="block mb-3 text-lg font-semibold text-gray-700"
            >
              Image Upload
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => inputRef.current.click()}
              className={`cursor-pointer relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 ${
                dragActive
                  ? "border-green-600 bg-green-50"
                  : "border-gray-300 bg-gray-50 hover:border-green-600"
              }`}
            >
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-60 rounded-md object-contain"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage();
                    }}
                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                    aria-label="Remove image"
                  >
                    <FaTrash />
                  </button>
                </div>
              ) : (
                <>
                  <FaUpload className="h-12 w-12 text-green-600 mb-3" />
                  <p className="text-green-600 font-medium">
                    Drag & drop an image or click to select
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </>
              )}
              <input
                id="image"
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleChangeFile}
                className="hidden"
              />
            </div>
            <AnimatePresence>
              {errors.image && (
                <motion.p
                  className="text-red-600 text-sm mt-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.image}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label
              htmlFor="description"
              className="block mb-3 text-lg font-semibold text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors({ ...errors, description: "" });
              }}
              rows={4}
              placeholder="Short description"
              className={`w-full rounded-lg border border-gray-300 px-5 py-4 text-gray-900 placeholder-gray-400 shadow-sm focus:border-green-600 focus:ring-2 focus:ring-green-600 transition resize-none ${
                errors.description ? "border-red-500" : ""
              }`}
              aria-describedby={
                errors.description ? "description-error" : undefined
              }
            />
            <AnimatePresence>
              {errors.description && (
                <motion.p
                  id="description-error"
                  className="text-red-600 text-sm mt-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.description}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label
              htmlFor="content"
              className="block mb-3 text-lg font-semibold text-gray-700"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setErrors({ ...errors, content: "" });
              }}
              rows={8}
              required
              placeholder="Write your post content here"
              className={`w-full rounded-lg border border-gray-300 px-5 py-4 text-gray-900 placeholder-gray-400 shadow-sm focus:border-green-600 focus:ring-2 focus:ring-green-600 transition resize-none ${
                errors.content ? "border-red-500" : ""
              }`}
              aria-describedby={errors.content ? "content-error" : undefined}
            />
            <AnimatePresence>
              {errors.content && (
                <motion.p
                  id="content-error"
                  className="text-red-600 text-sm mt-2"
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

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <button
              type="submit"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-12 py-4 rounded-lg shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-bold px-12 py-4 rounded-lg shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-600"
            >
              Cancel
            </button>
          </motion.div>
        </form>
      </main>
    </div>
  );
}
