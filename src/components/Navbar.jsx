import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-secondary/95 backdrop-blur-sm fixed w-full z-20 top-0 left-0 border-b border-primary shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <motion.a 
          href="/" 
          className="flex items-center group"
          whileHover={{ scale: 1.05 }}
        >
          <span className="self-center text-3xl font-bold whitespace-nowrap text-primary font-serif group-hover:text-yellow-light transition-colors duration-300">
            Beyond Temptation
          </span>
        </motion.a>
        
        <div className="flex items-center md:order-2 space-x-4">
          <motion.a 
            href="#book-event"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-secondary bg-primary hover:bg-yellow-dark font-bold rounded-lg text-sm px-6 py-3 transition-colors duration-300 shadow-md"
          >
            Book Event
          </motion.a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary hover:text-yellow-light p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto transition-all duration-300 ease-in-out`}>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            {["Menu", "About", "Location", "Contact"].map((item) => (
              <motion.li
                key={item}
                whileHover={{ scale: 1.1 }}
                className="relative group"
              >
                <a 
                  href={`/${item.toLowerCase()}`} 
                  className="block py-2 pl-3 pr-4 text-primary hover:text-yellow-light transition-colors duration-300"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
} 