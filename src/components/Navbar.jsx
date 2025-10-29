import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-2xl font-playfair text-[#1E3A8A]">
          Zeta Haven Apartments
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-[#1E3A8A] font-poppins">
          <Link
            to="/"
            className="hover:text-[#2563EB] transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/apartments"
            className="hover:text-[#2563EB] transition-colors duration-200"
          >
            Apartments
          </Link>
          <Link
            to="/request"
            className="hover:text-[#2563EB] transition-colors duration-200"
          >
            Request
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#1E3A8A] focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Animated Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white shadow-inner flex flex-col items-center py-4 space-y-4 font-poppins text-[#1E3A8A]"
          >
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="hover:text-[#2563EB] transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/apartments"
              onClick={() => setIsOpen(false)}
              className="hover:text-[#2563EB] transition-colors duration-200"
            >
              Apartments
            </Link>
            <Link
              to="/request"
              onClick={() => setIsOpen(false)}
              className="hover:text-[#2563EB] transition-colors duration-200"
            >
              Request
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
