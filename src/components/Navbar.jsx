import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-accent-light px-10 py-3 bg-white fixed w-full top-0 z-50">
      <div className="flex items-center gap-4 text-primary">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
          </svg>
        </div>
        <motion.a 
          href="/" 
          className="text-primary text-lg font-bold leading-tight tracking-[-0.015em]"
          whileHover={{ scale: 1.05 }}
        >
          Beyond Temptation Cafe
        </motion.a>
      </div>
      
      <div className="flex flex-1 justify-end gap-8">
        <div className="hidden md:flex items-center gap-9">
          {[
            { name: "Home", href: "/" },
            { name: "Menu", href: "/menu" },
            { name: "Gallery", href: "/gallery" },
            { name: "Events", href: "/book-event" },
            { name: "Visit", href: "/location" },
            { name: "Contact", href: "/contact" }
          ].map((item) => (
            <motion.a 
              key={item.name}
              href={item.href} 
              className="text-primary text-sm font-medium leading-normal hover:text-accent-dark transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              {item.name}
            </motion.a>
          ))}
        </div>
        
        <motion.a
          href="/book-event"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-accent text-primary text-sm font-bold leading-normal tracking-[0.015em]"
        >
          <span className="truncate">Host at Beyond</span>
        </motion.a>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-primary hover:text-accent-dark p-2"
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

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-accent-light md:hidden">
          <div className="flex flex-col p-4 space-y-4">
            {[
              { name: "Home", href: "/" },
              { name: "Menu", href: "/menu" },
              { name: "Gallery", href: "/gallery" },
              { name: "Events", href: "/book-event" },
              { name: "Visit", href: "/location" },
              { name: "Contact", href: "/contact" }
            ].map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                className="text-primary text-sm font-medium leading-normal hover:text-accent-dark transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
} 