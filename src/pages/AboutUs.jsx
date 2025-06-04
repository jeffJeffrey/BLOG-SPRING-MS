/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaInfoCircle, FaCogs, FaRocket, FaNetworkWired } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutUs() {
  const features = [
    {
      icon: <FaCogs className="text-indigo-600 text-3xl" />,
      title: "Microservices Architecture",
      description:
        "Built with independent, scalable services that communicate seamlessly to deliver a cohesive user experience.",
    },
    {
      icon: <FaRocket className="text-indigo-600 text-3xl" />,
      title: "Scalable Design",
      description:
        "Designed for scalability, allowing each service to be developed, deployed, and scaled independently.",
    },
    {
      icon: <FaNetworkWired className="text-indigo-600 text-3xl" />,
      title: "Seamless Integration",
      description:
        "Demonstrates best practices in API design and inter-service communication for robust performance.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <motion.div
        className="sticky top-0 z-50 bg-white shadow-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      ></motion.div>

      <section className="max-w-screen-xl mx-auto px-6 sm:px-12 py-16 w-full text-gray-800">
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FaInfoCircle className="mr-3 text-indigo-600" />
          About Us
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We are Master’s students specializing in Artificial Intelligence,
          currently enrolled in the first year of our program.
        </motion.p>
        <motion.p
          className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          As part of our Middleware course, we were tasked with developing a
          modern web application using a microservices architecture. The goal
          was to gain practical experience with distributed systems and the
          challenges of inter-service communication.
        </motion.p>
        <motion.p
          className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          This project serves as a front-end demonstration that interacts
          seamlessly with multiple microservices, showcasing best practices in
          scalable and maintainable software design.
        </motion.p>
        <motion.p
          className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Through this application, we aim to illustrate how microservices can
          work together to deliver rich user experiences, while allowing
          independent development, deployment, and scalability of each service.
        </motion.p>
        <motion.img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
          alt="Microservices illustration"
          className="w-full h-96 object-cover rounded-xl shadow-lg mt-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        />

        <section className="mt-16">
          <motion.h2
            className="text-3xl font-semibold text-gray-900 mb-8 flex items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FaRocket className="mr-3 text-indigo-600" />
            Project Highlights
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
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
            {features.map(({ icon, title, description }) => (
              <motion.div
                key={title}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="mb-4">{icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </section>
    </div>
  );
}
