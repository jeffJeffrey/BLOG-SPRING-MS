/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import api from "../utils/axios"
export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const hash = searchParams.get("hash");
    if (!hash) {
      setStatus("error");
      setErrorMessage("Invalid activation link");
      return;
    }

    const activateAccount = async () => {
      try {
        await api.post("/USER-SERVICE/api/v1/activate", { activationHash: hash });
        setStatus("success");
        toast.success("Account activated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        setStatus("error");
        setErrorMessage(error.response?.data?.message || "Activation failed. The link may have expired or is invalid.");
        toast.error("Account activation failed!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };

    activateAccount();
  }, [searchParams, navigate]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <motion.div
        className="bg-white max-w-md w-full p-10 rounded-2xl shadow-lg text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {status === "verifying" && (
          <motion.h1
            className="text-2xl font-bold text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Verifying your account...
          </motion.h1>
        )}

        {status === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-green-600 mb-4">
              Account Activated!
            </h1>
            <p className="text-gray-600">
              Your account has been successfully activated. You will be redirected to the login page shortly.
            </p>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Activation Failed
            </h1>
            <p className="text-gray-600">
              {errorMessage}
            </p>
            <a
              href="/signup"
              className="text-green-600 font-semibold hover:underline mt-4 inline-block"
            >
              Try signing up again
            </a>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}