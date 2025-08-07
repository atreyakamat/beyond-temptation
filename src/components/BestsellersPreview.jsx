import { motion } from "framer-motion";
import { useState } from "react";
import InteractiveGridPattern from "./InteractiveGridPattern.jsx";

export default function BestsellersPreview() {
  const [favorites, setFavorites] = useState(new Set());

  const bestsellers = [
    {
      id: 1,
      image: "/images/signature-latte.jpg",
      name: "Signature Latte",
      price: "₹180",
      description: "Our special blend with a hint of vanilla"
    },
    {
      id: 2,
      image: "/images/chocolate-croissant.jpg",
      name: "Chocolate Croissant",
      price: "₹120",
      description: "Buttery pastry with rich chocolate filling"
    },
    {
      id: 3,
      image: "/images/avocado-toast.jpg",
      name: "Avocado Toast",
      price: "₹250",
      description: "Fresh avocado on sourdough with herbs"
    },
    {
      id: 4,
      image: "/images/iced-matcha.jpg",
      name: "Iced Matcha Latte",
      price: "₹200",
      description: "Premium matcha with creamy oat milk"
    },
    {
      id: 5,
      image: "/images/berry-pancakes.jpg",
      name: "Berry Pancakes",
      price: "₹280",
      description: "Fluffy pancakes with fresh berries"
    },
    {
      id: 6,
      image: "/images/cold-brew.jpg",
      name: "Cold Brew",
      price: "₹160",
      description: "Smooth, rich coffee served over ice"
    }
  ];

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Interactive Grid Pattern Background */}
      <InteractiveGridPattern
        className="absolute inset-0 z-0"
        width={100}
        height={100}
        numSquares={15}
        maxOpacity={0.08}
        duration={6}
        repeatDelay={3}
      />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-black mb-4">Bestsellers Preview</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-yellow to-yellow/60 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">What our customers love most</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestsellers.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(255, 215, 0, 0.3)"
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                
                {/* Heart Button */}
                <motion.button
                  onClick={() => toggleFavorite(item.id)}
                  className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
                    favorites.has(item.id) 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/80 text-gray-600 hover:bg-yellow hover:text-black'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </motion.button>

                {/* Price Badge */}
                <div className="absolute bottom-4 left-4 bg-yellow text-black px-3 py-1 rounded-full font-bold">
                  {item.price}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                
                <motion.button
                  className="mt-4 w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-yellow hover:text-black transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add to Order
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="/menu"
            className="inline-block bg-yellow text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow/90 transition-all duration-300 shadow-lg"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(255, 215, 0, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            View Full Menu
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
