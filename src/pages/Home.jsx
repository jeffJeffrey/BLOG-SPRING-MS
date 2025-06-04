/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaTag,
} from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../utils/axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";
import Hero from "../components/Hero";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const taglines = ["Discover", "Explore", "Inspire"];

  // Fetch posts and categories
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/POST-SERVICE/api/posts");
        setPosts(response.data.content || []);
      } catch (error) {
        toast.error("Failed to load posts.", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setIsLoadingPosts(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get("/POST-SERVICE/api/categories");
        setCategories([{ id: 0, name: "All" }, ...(response.data || [])]);
      } catch (error) {
        toast.error("Failed to load categories.", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchPosts();
    fetchCategories();
  }, []);

  // Rotate tagline every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [taglines.length]);

  // Filter posts based on category and search query
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category.name === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Mock featured stories (unchanged for now)
  const featuredStories = [
    {
      id: 1,
      title: "Inspiration Naturelle",
      description: "Découvrez comment la nature inspire l'art et l'innovation.",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      title: "Voyage Créatif",
      description: "Un voyage à travers les esprits les plus créatifs du monde.",
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  if (isLoadingPosts || isLoadingCategories) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Hero />

      <section className="flex-grow max-w-screen-xl mx-auto px-6 sm:px-12 py-16 w-full">
        {/* Header Section with Tagline */}
        <motion.div
          className="bg-gray-100 rounded-xl shadow-md p-8 mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            <motion.h2
              key={taglineIndex}
              className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {taglines[taglineIndex]} Stories That Inspire
            </motion.h2>
          </AnimatePresence>

          {/* Category Tabs */}
          <motion.nav
            className="flex flex-wrap gap-2 mb-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === category.name
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-green-100"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.nav>

          {/* Search Bar */}
          <motion.div
            className="relative w-full max-w-md mx-auto"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white text-gray-900 border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 shadow-sm text-base"
            />
          </motion.div>
        </motion.div>

        {/* Posts Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.3 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPosts.length === 0 ? (
            <motion.p
              className="text-center text-gray-600 col-span-full text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No posts found. Try adjusting your search or filter.
            </motion.p>
          ) : (
            filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative bg-white rounded-lg shadow-md">
                  <PostCard
                    id={post.id}
                    image={post.media[0]?.url_media || "https://via.placeholder.com/1200x800"}
                    title={post.title}
                    description={post.content}
                    author={`${post.user.firstName} ${post.user.lastName}`}
                    username={post.user.username || `${post.user.firstName}${post.user.lastName}`}
                    date={new Date(post.createdOn).toLocaleDateString()}
                    readTime="2 min read" // Placeholder, as not provided in API
                    views="N/A" // Placeholder, as not provided in API
                    category={post.category.name}
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                    <FaTag />
                    {post.category.name}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <button className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg transition-all text-lg font-semibold">
            View More Articles
          </button>
        </motion.div>
      </section>

      {/* Featured Stories Section with Carousel */}
      <section className="bg-gray-100 max-w-screen-xl mx-auto px-6 sm:px-12 py-20 w-full relative">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-center text-gray-900 mb-12"
        >
          Featured Stories
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.4 },
            },
          }}
        >
          {featuredStories.map((story) => (
            <motion.div
              key={story.id}
              className="relative rounded-xl overflow-hidden shadow-lg group"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                className="h-72 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${story.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{story.title}</h3>
                <p className="text-lg">{story.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="absolute inset-y-0 left-0 flex items-center">
          <motion.button
            className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronLeft className="h-6 w-6" />
          </motion.button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <motion.button
            className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronRight className="h-6 w-6" />
          </motion.button>
        </div>
      </section>

    </div>
  );
}