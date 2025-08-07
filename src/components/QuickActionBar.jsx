import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function QuickActionBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 200;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const actions = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      label: "Menu",
      href: "/menu",
      color: "bg-yellow"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      label: "Book",
      href: "/events",
      color: "bg-green-500"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Visit",
      href: "/visit",
      color: "bg-blue-500"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Contact",
      href: "/contact",
      color: "bg-purple-500"
    }
  ];

  return (
    <motion.div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden ${isVisible ? 'block' : 'hidden'}`}
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {actions.map((action, index) => (
            <motion.a
              key={action.label}
              href={action.href}
              className={`flex flex-col items-center p-3 rounded-lg ${action.color} text-white min-w-[60px]`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {action.icon}
              <span className="text-xs mt-1 font-medium">{action.label}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
