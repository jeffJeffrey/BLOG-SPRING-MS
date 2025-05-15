/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaUser, FaCode, FaServer, FaUsers } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";


const teamMembers = [
  {
    name: "MEFIRE HAMED",
    role: "Frontend/Backend Developer, Microservices Specialist",
    photo: "https://randomuser.me/api/portraits/men/55.jpg",
    icon: <FaCode />,
  },
  {
    name: "LEKANE VERHEZ",
    role: "Backend Developer, Microservices Specialist, DevOps",
    photo: "https://randomuser.me/api/portraits/men/44.jpg",
    icon: <FaServer />,
  },
  {
    name: "JEFF KENFACK ",
    role: "API Integration, Fullstack Developer, Microservices Specialist",
    photo: "/images/jeffrey.jpeg",
    icon: <FaCode />,
  },
];

export default function Team() {
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

      <main className="max-w-screen-xl mx-auto px-6 sm:px-12 py-16 w-full text-gray-800">
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FaUsers className="mr-3 text-indigo-600" />
          Our Team
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We are a group of passionate Master’s students specializing in Artificial Intelligence.
          Our team has worked collaboratively on this project as part of our Middleware course,
          aiming to explore microservices architecture in practice.
        </motion.p>
        <motion.p
          className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Each member has contributed to different aspects of the project, including frontend development,
          backend microservices, API design, and integration.
        </motion.p>
        <motion.p
          className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Together, we have built a scalable and modular application to demonstrate the power of modern distributed systems.
        </motion.p>

        <section className="mt-12">
          <motion.h2
            className="text-3xl font-semibold text-gray-900 mb-8 flex items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FaUsers className="mr-3 text-indigo-600" />
            Team Members
          </motion.h2>
          <motion.ul
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
            {teamMembers.map(({ name, role, photo, icon }) => (
              <motion.li
                key={name}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={photo}
                      alt={name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-indigo-600"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-indigo-100 rounded-full p-1">
                      {icon}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-gray-900">{name}</p>
                    <p className="text-gray-600 text-sm">{role}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}