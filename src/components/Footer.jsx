/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiFacebook, FiTwitter, FiInstagram, FiGithub } from "react-icons/fi";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-gray-100 text-gray-700 mt-16 border-t"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">BLOGGING</h2>
          <p className="text-sm">
            The perfect platform to share your ideas, passions, and discoveries.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-green-600">Home</Link></li>
            <li><Link to="/about" className="hover:text-green-600">About</Link></li>
            <li><Link to="/create" className="hover:text-green-600">Create a Post</Link></li>
            <li><Link to="/team" className="hover:text-green-600">Our Team</Link></li>
            <li><Link to="#" className="hover:text-green-600">Shop</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl text-gray-600">
            <a href="#" className="hover:text-green-600" aria-label="Facebook">
              <FiFacebook />
            </a>
            <a href="#" className="hover:text-green-600" aria-label="Twitter">
              <FiTwitter />
            </a>
            <a href="#" className="hover:text-green-600" aria-label="Instagram">
              <FiInstagram />
            </a>
            <a href="#" className="hover:text-green-600" aria-label="GitHub">
              <FiGithub />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BLOGGING. All rights reserved.
      </div>
    </motion.footer>
  );
}