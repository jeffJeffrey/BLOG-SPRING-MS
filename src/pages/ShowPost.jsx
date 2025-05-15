/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaComment, FaCalendarAlt, FaEye } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ShowPost() {
  const { id } = useParams();

  const posts = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      title: "The Pursuit of Beauty & Aesthetics and Its Impact on Our Work",
      description:
        "The pursuit of beauty has been an integral aspect of human existence, influencing various fields from art to architecture.",
      author: "Terra Living",
      date: "Apr 7, 2023",
      readTime: "2 min read",
      views: "1,011",
      content:
        "The pursuit of beauty has shaped human culture for centuries, influencing art, architecture, design, and even technology. From the intricate patterns of ancient mosaics to the sleek lines of modern skyscrapers, aesthetics drive innovation and emotional connection. This article explores how beauty impacts our work, fostering creativity and inspiring meaningful outcomes across disciplines.",
      comments: [
        { id: 1, author: "Alice", content: "Super article ! Loved the insights." },
        { id: 2, author: "Bob", content: "Thanks for sharing this perspective." },
      ],
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
      title:
        "Herbariums: TerraLiving's Modern Take on Botanical Treasure & Legacy With Stylish Terrariums",
      description:
        "Explore how TerraLiving redefines traditional herbariums through modern terrarium design blending nature, science, and art.",
      author: "Terra Living",
      date: "Apr 4, 2023",
      readTime: "3 min read",
      views: "894",
      content:
        "TerraLiving reimagines the traditional herbarium by combining botanical preservation with contemporary terrarium design. This fusion of nature, science, and art creates living sculptures that celebrate biodiversity and aesthetic harmony. Learn how these innovative designs are shaping the future of botanical art and sustainable decor.",
      comments: [
        { id: 1, author: "Charlie", content: "Very informative and inspiring!" },
        { id: 2, author: "Diane", content: "I adore this topic! Great read." },
      ],
    },
  ];

  const post = posts.find((p) => p.id === id);
  const [comments, setComments] = useState(post ? post.comments : []);
  const [newComment, setNewComment] = useState("");

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-700">Post not found.</p>
      </div>
    );
  }

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    const comment = {
      id: comments.length + 1,
      author: "Anonymous",
      content: newComment.trim(),
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <motion.div
        className="sticky top-0 z-50 bg-white shadow-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
      </motion.div>

      <main className="  max-w-screen-xl mx-auto px-6 sm:px-12 py-16 w-full">
        <article>
          <motion.h1
            className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {post.title}
          </motion.h1>
          <motion.div
            className="flex flex-wrap items-center text-gray-600 mb-8 text-sm sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="flex items-center mr-4">
              <FaUser className="mr-2 text-indigo-600" />
              {post.author}
            </span>
            <span className="flex items-center mr-4">
              <FaCalendarAlt className="mr-2 text-indigo-600" />
              {post.date}
            </span>
            <span className="flex items-center mr-4">
              <FaEye className="mr-2 text-indigo-600" />
              {post.views} views
            </span>
            <span className="flex items-center">
              <FaComment className="mr-2 text-indigo-600" />
              {post.readTime}
            </span>
          </motion.div>
          <motion.img
            src={post.image}
            alt={post.title}
            className="w-full rounded-xl shadow-lg mb-8 object-cover h-96"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.p
            className="text-lg text-gray-700 leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {post.content}
          </motion.p>
        </article>

        <section className="mb-12">
          <motion.h2
            className="text-3xl font-semibold text-gray-900 mb-6 flex items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FaComment className="mr-3 text-indigo-600" />
            Comments ({comments.length})
          </motion.h2>
          {comments.length === 0 ? (
            <motion.p
              className="text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              No comments yet. Be the first to comment!
            </motion.p>
          ) : (
            <motion.ul
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.3,
                  },
                },
              }}
            >
              {comments.map(({ id, author, content }) => (
                <motion.li
                  key={id}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <FaUser className="text-indigo-600" />
                    </div>
                    <p className="font-semibold text-gray-900">{author}</p>
                  </div>
                  <p className="text-gray-700">{content}</p>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </section>

        <motion.form
          onSubmit={handleAddComment}
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm resize-none"
            rows={5}
            required
          />
          <motion.button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Post Comment
          </motion.button>
        </motion.form>
      </main>

      <Footer />
    </div>
  );
}