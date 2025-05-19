/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBook, FaPen, FaEye, FaEdit } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Profile() {
  // Mock user info
  const user = {
    name: "MEFIRE HAMED",
    email: "mefirehamed936@gmail.com",
    bio: "Passionate about design, gardening, and writing.",
    avatar: "https://i.pravatar.cc/150?img=12",
  };

  // Mock posts
  const publishedPosts = [
    {
      id: 1,
      title: "My first article on sustainable design",
      date: "2024-05-01",
      views: 342,
      thumbnail:
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      title: "Urban gardening: tips and tricks",
      date: "2024-04-15",
      views: 198,
      thumbnail:
        "https://images.unsplash.com/photo-1466692476868-a545e82e2e69?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const drafts = [
    {
      id: 101,
      title: "Draft: ideas for an organic vegetable garden",
      lastEdited: "2024-05-10",
      thumbnail:
        "https://images.unsplash.com/photo-1516257984-b91b4a971d65?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const [activeTab, setActiveTab] = useState("posts"); // 'posts' or 'drafts'

  // Calculate stats
  const totalPosts = publishedPosts.length;
  const totalViews = publishedPosts.reduce((sum, post) => sum + post.views, 0);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <motion.div
        className="sticky top-0 z-50 bg-white shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      ></motion.div>

      <section className="flex-grow max-w-5xl mx-auto px-6 sm:px-12 py-16 w-full">
        {/* User Info Card */}
        <motion.section
          className="bg-gray-100 rounded-xl shadow-md p-8 mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <motion.img
              src={user.avatar}
              alt="User avatar"
              className="w-40 h-40 rounded-full object-cover shadow-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            <div className="text-center md:text-left flex-1">
              <motion.h1
                className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {user.name}
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
                {user.bio}
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
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
              <FaPen className="text-green-600 text-xl" />
              <div>
                <p className="text-gray-900 font-semibold">{totalPosts}</p>
                <p className="text-gray-600 text-sm">Published Posts</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
              <FaEye className="text-green-600 text-xl" />
              <div>
                <p className="text-gray-900 font-semibold">{totalViews}</p>
                <p className="text-gray-600 text-sm">Total Views</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Tabs */}
        <motion.div
          className="border-b border-gray-300 mb-8 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <nav className="flex gap-8" aria-label="Tabs">
            <motion.button
              onClick={() => setActiveTab("posts")}
              className={`flex items-center gap-2 py-4 px-2 text-base font-semibold ${
                activeTab === "posts"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-green-600 hover:border-b-2 hover:border-green-600"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaBook />
              Published Posts
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("drafts")}
              className={`flex items-center gap-2 py-4 px-2 text-base font-semibold ${
                activeTab === "drafts"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-green-600 hover:border-b-2 hover:border-green-600"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEdit />
              Drafts
            </motion.button>
          </nav>
          <AnimatePresence>
            {activeTab === "posts" && (
              <motion.div
                className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-green-600"
                initial={{ x: 0 }}
                animate={{ x: 0 }}
                exit={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
            {activeTab === "drafts" && (
              <motion.div
                className="absolute bottom-0 left-1/2 w-1/2 h-0.5 bg-green-600"
                initial={{ x: 0 }}
                animate={{ x: 0 }}
                exit={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Tab Content */}
        {activeTab === "posts" && (
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
            {publishedPosts.length === 0 ? (
              <motion.div
                className="text-center p-8 bg-gray-100 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-600 text-lg mb-4">
                  No published posts yet.
                </p>
                <a
                  href="#write"
                  className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all text-base font-semibold"
                >
                  Write Your First Post
                </a>
              </motion.div>
            ) : (
              <ul className="space-y-6">
                {publishedPosts.map(({ id, title, date, views, thumbnail }) => (
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
                        src={thumbnail}
                        alt={title}
                        className="w-full sm:w-32 h-32 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          Published on {new Date(date).toLocaleDateString()} ·{" "}
                          {views} views
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
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.section>
        )}

        {activeTab === "drafts" && (
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
            {drafts.length === 0 ? (
              <motion.div
                className="text-center p-8 bg-gray-100 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-600 text-lg mb-4">
                  No drafts at the moment.
                </p>
                <a
                  href="#write"
                  className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all text-base font-semibold"
                >
                  Start a New Draft
                </a>
              </motion.div>
            ) : (
              <ul className="space-y-6">
                {drafts.map(({ id, title, lastEdited, thumbnail }) => (
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
                        src={thumbnail}
                        alt={title}
                        className="w-full sm:w-32 h-32 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          Last edited on{" "}
                          {new Date(lastEdited).toLocaleDateString()}
                        </p>
                        <div className="mt-3">
                          <a
                            href={`/edit/${id}`}
                            className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-semibold"
                          >
                            <FaEdit /> Edit Draft
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.section>
        )}
      </section>
    </div>
  );
}
