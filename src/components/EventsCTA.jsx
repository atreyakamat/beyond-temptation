import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function EventsCTA() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Simple confetti animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 400;

    const confetti = [];
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];

    for (let i = 0; i < 50; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 + 1,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 5 - 2.5
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      confetti.forEach((particle) => {
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation * Math.PI / 180);
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size/2, -particle.size/2, particle.size, particle.size);
        ctx.restore();

        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;

        if (particle.y > canvas.height) {
          particle.y = -particle.size;
          particle.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-yellow via-yellow/80 to-orange-400 py-20 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-6xl md:text-7xl font-bold text-black mb-6">
            Plan your next
            <br />
            <span className="text-white">chill session</span>
            <br />
            or mini-party with us!
          </h1>
          
          <p className="text-xl md:text-2xl text-black/80 mb-8 max-w-2xl mx-auto">
            From intimate gatherings to creative meetups, we've got the perfect space for your event
          </p>

          <motion.a
            href="#reservation-form"
            className="inline-block bg-black text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-800 transition-all duration-300 shadow-2xl"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 40px rgba(0,0,0,0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            🪄 Reserve a Space
          </motion.a>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 text-6xl"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 3,
          ease: "easeInOut"
        }}
      >
        🎉
      </motion.div>

      <motion.div
        className="absolute top-32 right-20 text-5xl"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2.5,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        🎈
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-20 text-4xl"
        animate={{ 
          y: [0, -10, 0],
          x: [0, 10, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 4,
          ease: "easeInOut",
          delay: 1
        }}
      >
        ✨
      </motion.div>
    </section>
  );
}
