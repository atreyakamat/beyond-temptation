import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <nav className="bg-secondary fixed w-full z-20 top-0 left-0 border-b border-primary">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <motion.a 
          href="/" 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
        >
          <span className="self-center text-2xl font-bold whitespace-nowrap text-primary font-serif">
            Golden Plate
          </span>
        </motion.a>
        
        <div className="flex md:order-2">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-secondary bg-primary hover:bg-yellow-dark font-bold rounded-lg text-sm px-6 py-3 transition-colors duration-300"
          >
            Reserve Table
          </motion.button>
        </div>

        <div className="hidden w-full md:block md:w-auto">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            {["Menu", "About", "Location", "Contact"].map((item) => (
              <motion.li
                key={item}
                whileHover={{ scale: 1.1 }}
              >
                <a href={`/${item.toLowerCase()}`} className="block py-2 pl-3 pr-4 text-primary hover:text-yellow-light transition-colors duration-300">
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
} 