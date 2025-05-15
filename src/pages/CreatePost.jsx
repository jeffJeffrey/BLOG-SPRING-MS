/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const inputRef = useRef(null);

  // Gérer le drop ou sélection de fichier
  const handleFile = (file) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ici tu peux envoyer imageFile au serveur via FormData par exemple
    console.log({
      title,
      imageFile,
      description,
      content,
    });

    setTitle("");
    setImageFile(null);
    setImagePreview(null);
    setDescription("");
    setContent("");
  };

  return (
    <>
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-12 bg-white rounded-xl shadow-lg mt-10 mb-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold mb-8 text-center text-gray-900"
        >
          Create a New Post
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
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
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter post title"
              className="w-full rounded-lg border border-gray-300 px-5 py-4 text-gray-900 placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400 transition"
            />
          </motion.div>

          {/* Image Upload with Drag & Drop */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <label className="block mb-3 text-lg font-semibold text-gray-700">
              Image Upload
            </label>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => inputRef.current.click()}
              className={`cursor-pointer relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10
                ${
                  dragActive
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 bg-gray-50 hover:border-green-400"
                }
              `}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-48 rounded-md object-contain"
                />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-green-400 mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16V4m0 0L3 8m4-4l4 4m6 8v4m0 0l-4-4m4 4l4-4"
                    />
                  </svg>
                  <p className="text-green-600 font-medium">
                    Drag & drop an image or click to select
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </>
              )}

              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleChangeFile}
                className="hidden"
              />
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
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
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Short description"
              className="w-full rounded-lg border border-gray-300 px-5 py-4 text-gray-900 placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400 transition resize-none"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
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
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              required
              placeholder="Write your post content here"
              className="w-full rounded-lg border border-gray-300 px-5 py-4 text-gray-900 placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400 transition resize-none"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <button
              type="submit"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-10 py-4 rounded-full shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400"
            >
              Create Post
            </button>
          </motion.div>
        </form>
      </main>

      <Footer />
    </>
  );
}
