/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function PostCard({
  id,
  image,
  title,
  description,
  author,
  username,
  date,
  readTime,
  views,
  category,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      className="group relative mb-10 rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200 transition-all"
    >
      <Link to={`/posts/${id}`}>
        <div className="overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5 space-y-3">
          <h2 className="text-2xl font-bold text-gray-800 group-hover:text-green-600 transition">
            {title}
          </h2>
          <p className="text-gray-600 line-clamp-2">{description}</p>
          <div className="flex flex-wrap justify-between text-sm text-gray-500">
            <span>{username}</span>
            <span>{category}</span>
            <span>{date}</span>
            <span>{readTime}</span>
            <span>{views} vues</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}