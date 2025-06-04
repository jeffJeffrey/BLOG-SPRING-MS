/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

export default function VerifyEmailPrompt() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <motion.div
        className="bg-white max-w-md w-full p-10 rounded-2xl shadow-lg text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-2xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Verify Your Email
        </motion.h1>
        <p className="text-gray-600 mb-4">
          We've sent an email to your registered email address. Please check your inbox (and spam/junk folder) for a verification link to activate your account.
        </p>
        <p className="text-gray-600">
          The verification link is valid for 30 minutes.
        </p>
      </motion.div>
    </main>
  );
}