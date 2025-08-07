import { motion } from "framer-motion";
import { useState } from "react";

export default function GalleryFilter() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Food", "Events", "Vibes"];

  return (
    <motion.div
      className="mb-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-wrap justify-center gap-4">
        {filters.map((filter) => (
          <motion.button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
              activeFilter === filter
                ? 'bg-yellow text-black shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
