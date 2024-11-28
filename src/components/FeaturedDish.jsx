import { motion } from "framer-motion";

export default function FeaturedDish({ img, title, description, price }) {
  return (
    <motion.div 
      className="bg-black p-4 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <img 
        src={img} 
        alt={title} 
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h3 className="text-primary text-xl font-bold mb-2">{title}</h3>
      <p className="text-yellow-light mb-3">{description}</p>
      <p className="text-primary font-bold text-lg">{price}</p>
    </motion.div>
  );
} 