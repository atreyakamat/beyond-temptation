import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`flex items-center justify-between whitespace-nowrap border-b border-solid border-b-accent-light px-10 py-3 fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-white'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4 text-primary">
        <motion.div 
          className="size-8"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill={scrolled ? "#FFD700" : "currentColor"}></path>
          </svg>
        </motion.div>
        <motion.a 
          href="/" 
          className={`text-lg font-bold leading-tight tracking-[-0.015em] ${scrolled ? 'text-yellow' : 'text-primary'}`}
          whileHover={{ scale: 1.05 }}
        >
          Beyond Temptation Café
        </motion.a>
      </div>
      
      <div className="flex flex-1 justify-end gap-8">
        <div className="hidden md:flex items-center gap-9">
          {[
            { name: "Home", href: "/" },
            { name: "Menu", href: "/menu" },
            { name: "Gallery", href: "/gallery" },
            { name: "Events", href: "/events" },
            { name: "Visit", href: "/visit" },
            { name: "Contact", href: "/contact" }
          ].map((item, index) => (
            <motion.a 
              key={item.name}
              href={item.href} 
              className={`text-sm font-medium leading-normal transition-colors duration-300 ${
                scrolled ? 'text-white hover:text-yellow' : 'text-primary hover:text-accent-dark'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.name}
            </motion.a>
          ))}
        </div>
        
        <motion.a
          href="/events"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-yellow text-black text-sm font-bold leading-normal tracking-[0.015em] shadow-lg hover:shadow-yellow/50 transition-all duration-300"
        >
          <span className="truncate">🎊 Host at Beyond</span>
        </motion.a>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 transition-colors ${scrolled ? 'text-white hover:text-yellow' : 'text-primary hover:text-accent-dark'}`}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md ${isOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col py-4">
          {[
            { name: "Home", href: "/" },
            { name: "Menu", href: "/menu" },
            { name: "Gallery", href: "/gallery" },
            { name: "Events", href: "/events" },
            { name: "Visit", href: "/visit" },
            { name: "Contact", href: "/contact" }
          ].map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="text-white hover:text-yellow px-10 py-3 transition-colors"
              onClick={() => setIsOpen(false)}
              whileHover={{ x: 10 }}
            >
              {item.name}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.header>
  );
}
