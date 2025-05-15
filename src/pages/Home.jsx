/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaFilter, FaChevronLeft, FaChevronRight, FaTag } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";
import Hero from "../components/Hero";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [taglineIndex, setTaglineIndex] = useState(0);

  const taglines = ["Discover", "Explore", "Inspire"];

  // Mock categories for posts
  const posts = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      title: "The Pursuit of Beauty & Aesthetics and Its Impact on Our Work",
      description:
        "The pursuit of beauty has been an integral aspect of human existence, with its influence spanning various fields, from art and architecture.",
      author: "Terra Living",
      date: "Apr 7, 2023",
      readTime: "2 min read",
      views: "1,011",
      category: "Art",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
      title:
        "Herbariums: TerraLiving's Modern Take on Botanical Treasure & Legacy With Stylish Terrariums",
      description:
        "Explore how TerraLiving redefines traditional herbariums through modern terrarium design blending nature, science, and art.",
      author: "Terra Living",
      date: "Apr 4, 2023",
      readTime: "3 min read",
      views: "894",
      category: "Nature",
    },
  ];

  const featuredStories = [
    {
      id: 1,
      title: "Inspiration Naturelle",
      description: "Découvrez comment la nature inspire l'art et l'innovation.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      title: "Voyage Créatif",
      description: "Un voyage à travers les esprits les plus créatifs du monde.",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  // Filter posts based on category and search query
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Categories for filter
  const categories = ["All", "Art", "Nature", "Technology"];

  // Rotate tagline every 3 seconds
  useState(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <motion.div
        className="sticky top-0 z-50 bg-white shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
      </motion.div>
      <Hero />

      <section className="flex-grow max-w-screen-xl mx-auto px-6 sm:px-12 py-16 w-full">
        {/* Enhanced Header Section */}
        <motion.div
          className="bg-gradient-to-r from-teal-600 to-coral-500 text-white rounded-xl shadow-xl p-8 mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            <motion.h2
              key={taglineIndex}
              className="text-4xl sm:text-5xl font-extrabold text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {taglines[taglineIndex]} Stories That Inspire
            </motion.h2>
          </AnimatePresence>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <motion.div
              className="relative w-full sm:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-coral-500 shadow-sm"
              />
            </motion.div>
            <motion.div
              className="relative w-full sm:w-1/4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-coral-500 shadow-sm appearance-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </motion.div>
          </div>
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
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPosts.length === 0 ? (
            <motion.p
              className="text-center text-gray-600 col-span-full"
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
                whileHover={{ scale: 1.05, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative">
                  <PostCard {...post} />
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-coral-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    <FaTag />
                    {post.category}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-teal-600 to-coral-500 hover:from-teal-700 hover:to-coral-600 text-white rounded-full shadow-xl transition-all text-lg font-semibold">
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
              transition: {
                staggerChildren: 0.4,
              },
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{story.title}</h3>
                <p className="text-lg">{story.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="absolute inset-y-0 left-0 flex items-center">
          <motion.button
            className="p-3 bg-teal-900/50 text-white rounded-full hover:bg-teal-800/70"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronLeft className="h-6 w-6" />
          </motion.button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <motion.button
            className="p-3 bg-teal-900/50 text-white rounded-full hover:bg-teal-800/70"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronRight className="h-6 w-6" />
          </motion.button>
        </div>
      </section>

      <Footer />
    </div>
  );
}