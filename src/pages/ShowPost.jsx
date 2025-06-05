/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaComment, FaCalendarAlt, FaEye, FaSpinner } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import api from "../utils/axios";

export default function ShowPost() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Fetch post details
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/POST-SERVICE/api/posts/${id}`);
        setPost(response.data);
        setComments(response.data.comments || []);
      } catch (err) {
        setError("Failed to load post.");
        toast.error("Failed to load post.", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setIsLoadingPost(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    if (!user) {
      toast.error("Please log in to comment.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post("/COMMENT-SERVICE/comments", {
        content: newComment.trim(),
        postId: parseInt(id),
        userId: user.id, // Assuming user.id is available
      });

      const newCommentData = {
        id: response.data.id || Date.now(), // Fallback ID if not returned
        content: newComment.trim(),
        user: {
          id: user.id,
          username: user.username || `${user.firstName} ${user.lastName}`,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      };

      setComments([...comments, newCommentData]);
      setNewComment("");
      toast.success("Comment posted successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      window.location.reload();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to post comment.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || isLoadingPost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-700">Post not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">

      <main className="max-w-screen-xl mx-auto px-6 sm:px-12 py-16 w-full">
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
              {post.user?.username || `${post.user?.firstName} ${post.user?.lastName}`}
            </span>
            <span className="flex items-center mr-4">
              <FaCalendarAlt className="mr-2 text-indigo-600" />
              {new Date(post.createdOn).toLocaleDateString()}
            </span>
            <span className="flex items-center mr-4">
              <FaEye className="mr-2 text-indigo-600" />
              N/A views {/* Placeholder, as views not in API */}
            </span>
            <span className="flex items-center">
              <FaComment className="mr-2 text-indigo-600" />
              2 min read {/* Placeholder, as readTime not in API */}
            </span>
          </motion.div>
          <motion.img
            src={post.media[0]?.url_media || "https://via.placeholder.com/1200x800"}
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
                  transition: { staggerChildren: 0.3 },
                },
              }}
            >
              {comments.map((comment) => (
                <motion.li
                  key={comment.id}
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
                    <p className="font-semibold text-gray-900">
                      {comment.user?.username || `${comment.user?.firstName} ${comment.user?.lastName}`}
                    </p>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
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
            disabled={isSubmitting}
          />
          <motion.button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>Posting...</span>
              </>
            ) : (
              <span>Post Comment</span>
            )}
          </motion.button>
        </motion.form>
      </main>

    </div>
  );
}