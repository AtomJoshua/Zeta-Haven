import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      className="relative h-[90vh] bg-center bg-cover flex items-center justify-center text-white"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-4"
      >
        <h1 className="font-allura text-7xl md:text-8xl font-playfair mb-4">
          Zeta Haven Apartments
        </h1>
        <p className="text-l md:text-xl text-gray-200 mb-8 max-w-xl mx-auto">
          A peaceful retreat where elegance meets comfort. Your home away from home.
        </p>

        <Link
          to="/apartments"
          className="bg-linear-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1E3A8A] transition-all px-8 py-3 rounded-full text-white font-semibold shadow-lg"
        >
          Book Now
        </Link>
      </motion.div>
    </section>
  );
}
