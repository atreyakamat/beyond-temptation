import { motion } from "framer-motion";
import { useState } from "react";

export default function MenuGrid() {
  const [favorites, setFavorites] = useState(new Set());

  const menuItems = [
    {
      id: 1,
      name: "Signature Latte",
      price: "₹180",
      description: "Our special blend with a hint of vanilla and caramel",
      image: "/images/signature-latte.jpg",
      category: "Coffee",
      mood: "Sweet"
    },
    {
      id: 2,
      name: "Americano",
      price: "₹120",
      description: "Bold espresso with hot water, simple and strong",
      image: "/images/americano.jpg",
      category: "Coffee",
      mood: "Light"
    },
    {
      id: 3,
      name: "Cappuccino",
      price: "₹150",
      description: "Perfect balance of espresso, steamed milk, and foam",
      image: "/images/cappuccino.jpg",
      category: "Coffee",
      mood: "Light"
    },
    {
      id: 4,
      name: "Chai Masala",
      price: "₹100",
      description: "Traditional Indian spiced tea with milk",
      image: "/images/chai-masala.jpg",
      category: "Teas",
      mood: "Spicy"
    },
    {
      id: 5,
      name: "Green Tea",
      price: "₹80",
      description: "Fresh and light, perfect for a healthy break",
      image: "/images/green-tea.jpg",
      category: "Teas",
      mood: "Light"
    },
    {
      id: 6,
      name: "Avocado Toast",
      price: "₹250",
      description: "Fresh avocado on sourdough with herbs and lime",
      image: "/images/avocado-toast.jpg",
      category: "Appetizers",
      mood: "Light"
    },
    {
      id: 7,
      name: "Chicken Sandwich",
      price: "₹320",
      description: "Grilled chicken with lettuce, tomato, and mayo",
      image: "/images/chicken-sandwich.jpg",
      category: "Mains",
      mood: "Hearty"
    },
    {
      id: 8,
      name: "Pasta Arrabbiata",
      price: "₹380",
      description: "Spicy tomato pasta with herbs and parmesan",
      image: "/images/pasta-arrabbiata.jpg",
      category: "Mains",
      mood: "Spicy"
    },
    {
      id: 9,
      name: "Chocolate Cake",
      price: "₹220",
      description: "Rich, moist chocolate cake with ganache",
      image: "/images/chocolate-cake.jpg",
      category: "Desserts",
      mood: "Sweet"
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {menuItems.map((item, index) => (
        <motion.div
          key={item.id}
          className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ 
            scale: 1.02,
            y: -5,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
          }}
        >
          <div className="relative overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
              {item.category}
            </div>

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

            {/* Mood Badge */}
            <div className="absolute bottom-4 right-4 bg-white/90 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
              {item.mood}
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-black mb-2 group-hover:text-yellow transition-colors duration-300">
              {item.name}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.description}</p>
            
            <div className="flex gap-2">
              <motion.button
                className="flex-1 bg-yellow text-black py-2 rounded-lg font-medium hover:bg-yellow/90 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Add to Cart
              </motion.button>
              
              <motion.button
                className="px-4 py-2 border-2 border-gray-300 text-gray-600 rounded-lg hover:border-yellow hover:text-yellow transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
