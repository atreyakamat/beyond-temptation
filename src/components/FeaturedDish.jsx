import { motion, useMotionValue, useTransform } from "framer-motion";

export default function FeaturedDish({ img, title, description, price }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]); // Reduced rotation range
  const rotateY = useTransform(x, [-100, 100], [-15, 15]); // Reduced rotation range

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Add damping factor to make movement less sensitive
    const dampingFactor = 0.5;
    x.set((event.clientX - centerX) * dampingFactor);
    y.set((event.clientY - centerY) * dampingFactor);
  };

  const handleMouseLeave = () => {
    // Smooth transition back to center
    x.set(0, { duration: 0.5 });
    y.set(0, { duration: 0.5 });
  };

  return (
    <motion.div 
      className="bg-black p-4 rounded-lg shadow-lg perspective-1000"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transition: "transform 0.3s ease-out" // Added smooth transition
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img 
        src={img} 
        alt={title} 
        className="w-full h-64 object-cover rounded-lg mb-4 transform-gpu"
      />
      <h3 className="text-primary text-xl font-bold mb-2">{title}</h3>
      <p className="text-yellow-light mb-3">{description}</p>
      <p className="text-primary font-bold text-lg">{price}</p>
    </motion.div>
  );
}