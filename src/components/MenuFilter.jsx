import { motion } from "framer-motion";
import { useState } from "react";

export default function MenuFilter() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeMoodFilter, setActiveMoodFilter] = useState("All");

  const categories = ["All", "Coffee", "Teas", "Appetizers", "Mains", "Desserts"];
  const moodFilters = ["All", "Sweet", "Spicy", "Light", "Hearty"];

  return (
    <div className="mb-12">
      {/* Category Filter */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-xl font-bold text-center mb-6">Categories</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-yellow text-black shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Mood Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-xl font-bold text-center mb-6">Mood</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {moodFilters.map((mood) => (
            <motion.button
              key={mood}
              onClick={() => setActiveMoodFilter(mood)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeMoodFilter === mood
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {mood}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
