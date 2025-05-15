/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    title: "Exprimez vos idées au monde",
    subtitle: "Un espace pour écrire, partager et inspirer",
    image: "/images/hero1.jpg",
    cta: "Découvrir les histoires",
    link: "#articles",
  },
  {
    title: "Découvrez les pensées des autres",
    subtitle: "Explorez des articles captivants",
    image: "/images/hero2.jpg",
    cta: "Lire maintenant",
    link: "#articles",
  },
  {
    title: "Créez votre propre univers",
    subtitle: "Partagez vos passions sans limites",
    image: "/images/hero3.jpg",
    cta: "Commencer à créer",
    link: "#articles",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const { title, subtitle, image, cta, link } = slides[index];

  return (
    <section className="relative h-[90vh] max-h-[900px] w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
          initial={{ opacity: 0, scale: 1.2, y: 20 }}
          animate={{ opacity: 1, scale: 1.1, y: 0 }}
          exit={{ opacity: 0, scale: 1.2, y: -20 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
      </AnimatePresence>
      
      {/* Diagonal Gradient Overlay with Grain Texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/70 via-teal-800/50 to-coral-500/30" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />

      {/* Navigation Arrows */}
      <div className="absolute inset-0 z-20 flex items-center justify-between px-6 sm:px-12">
        <motion.button
          onClick={prevSlide}
          className="p-3 rounded-full bg-teal-900/50 text-white hover:bg-teal-800/70 transition-all"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronLeft className="h-6 w-6" />
        </motion.button>
        <motion.button
          onClick={nextSlide}
          className="p-3 rounded-full bg-teal-900/50 text-white hover:bg-teal-800/70 transition-all"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronRight className="h-6 w-6" />
        </motion.button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-10 rounded-full transition-all ${
              i === index ? "bg-coral-500" : "bg-white/40 hover:bg-white/60"
            }`}
            whileHover={{ scale: 1.1 }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 max-w-2xl"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.div
          className="mb-6 flex items-center gap-3 rounded-full bg-white/20 px-5 py-2 backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          <FaChevronRight className="h-5 w-5 text-coral-500" />
          <span className="text-sm font-medium text-white">Inspiration Hub</span>
        </motion.div>
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-white/90 mb-8 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {subtitle}
        </motion.p>
        <motion.a
          href={link}
          className="inline-block bg-coral-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-coral-600 transition-all shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {cta}
        </motion.a>
      </motion.div>

      {/* Geometric Bottom Shape */}
      <div className="absolute bottom-0 left-0 right-0 h-24 z-10 bg-teal-900/50" style={{ clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)" }} />
    </section>
  );
}