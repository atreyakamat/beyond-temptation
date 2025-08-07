import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import InteractiveGridPattern from "./InteractiveGridPattern.jsx";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  const backgroundImages = [
    {
      url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Coffee Craftsmanship",
      subtitle: "Where every cup tells a story"
    },
    {
      url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Creative Spaces",
      subtitle: "Inspiring minds, one sip at a time"
    },
    {
      url: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Community Vibes",
      subtitle: "Where connections brew naturally"
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Background Slider */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.1
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
              y: y
            }}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.3)' }}
            />
            {/* Animated overlay gradients */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-yellow/20 via-transparent to-black/60"
              animate={{ 
                background: [
                  "linear-gradient(45deg, rgba(255,215,0,0.2) 0%, transparent 50%, rgba(0,0,0,0.6) 100%)",
                  "linear-gradient(135deg, rgba(255,215,0,0.1) 0%, transparent 50%, rgba(0,0,0,0.7) 100%)",
                  "linear-gradient(45deg, rgba(255,215,0,0.2) 0%, transparent 50%, rgba(0,0,0,0.6) 100%)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        ))}
        
        {/* Interactive Grid Pattern Overlay */}
        <InteractiveGridPattern
          className="absolute inset-0 z-10"
          width={60}
          height={60}
          numSquares={30}
          maxOpacity={0.3}
          duration={3}
          repeatDelay={1}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <motion.div 
        className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto"
        style={{ opacity }}
      >
        {/* Animated Background Title */}
        <motion.div
          className="absolute -top-20 left-1/2 transform -translate-x-1/2 text-yellow/10 font-bold text-[20rem] pointer-events-none select-none"
          animate={{ 
            rotateY: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear"
          }}
        >
          CAFÉ
        </motion.div>

        {/* Main Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 100 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <motion.h1
            className="text-7xl md:text-9xl font-bold mb-8 leading-none"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(255,215,0,0.5)",
                "0 0 40px rgba(255,215,0,0.8)",
                "0 0 20px rgba(255,215,0,0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            More than
            <br />
            <motion.span 
              className="text-yellow relative inline-block"
              animate={{ 
                scale: [1, 1.05, 1],
                rotateX: [0, 5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              coffee
              {/* Glowing effect */}
              <motion.div
                className="absolute inset-0 bg-yellow blur-xl opacity-30"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.span>
            <br />
            <motion.span
              className="bg-gradient-to-r from-white via-yellow to-white bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              It's a vibe.
            </motion.span>
          </motion.h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.p
            className="text-2xl md:text-3xl mb-12 text-gray-200 font-light tracking-wide"
            animate={{ 
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {backgroundImages[currentSlide].subtitle}
          </motion.p>
        </motion.div>

        {/* Dynamic Action Buttons */}
        <motion.div
          className="flex flex-col lg:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.a
            href="/menu"
            className="group relative bg-yellow text-black px-10 py-5 rounded-full font-bold text-xl overflow-hidden"
            whileHover={{ 
              scale: 1.08,
              rotateX: 5,
              boxShadow: "0 20px 40px rgba(255, 215, 0, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow via-white to-yellow"
              animate={{ 
                x: ["-100%", "100%"],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ opacity: 0.3 }}
            />
            <span className="relative z-10 flex items-center gap-3">
              ☕ View Menu
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.a>
          
          <motion.a
            href="/visit"
            className="group border-3 border-white text-white px-10 py-5 rounded-full font-bold text-xl backdrop-blur-sm bg-white/10"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.2)",
              borderColor: "#FFD700"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-3">
              📍 Visit Us
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📍
              </motion.span>
            </span>
          </motion.a>
          
          <motion.a
            href="/events"
            className="group relative bg-black/80 backdrop-blur-sm text-white px-10 py-5 rounded-full font-bold text-xl border-2 border-yellow/50 overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              borderColor: "#FFD700",
              boxShadow: "0 0 30px rgba(255, 215, 0, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow/20 to-transparent"
              animate={{ 
                x: ["-100%", "100%"],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <span className="relative z-10 flex items-center gap-3">
              🪄 Reserve a Spot
              <motion.span
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ✨
              </motion.span>
            </span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Slide Indicators */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        {backgroundImages.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-12 h-1 rounded-full transition-all duration-500 ${
              index === currentSlide ? 'bg-yellow' : 'bg-white/40'
            }`}
            whileHover={{ scale: 1.2, height: 4 }}
            animate={{ 
              width: index === currentSlide ? 48 : 12
            }}
          />
        ))}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 right-8 text-white flex flex-col items-center gap-3"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-sm font-medium tracking-wider rotate-90 origin-center mb-8">
          SCROLL
        </span>
        <motion.div 
          className="w-6 h-12 border-2 border-white rounded-full flex justify-center"
          whileHover={{ borderColor: "#FFD700" }}
        >
          <motion.div 
            className="w-1 h-3 bg-yellow rounded-full mt-2"
            animate={{ 
              y: [0, 16, 0],
              opacity: [1, 0.3, 1]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>

      {/* Dynamic Background Elements */}
      <motion.div
        className="absolute top-20 left-20 text-8xl opacity-20"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          ease: "linear"
        }}
      >
        ☕
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-32 text-6xl opacity-20"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        ✨
      </motion.div>
    </section>
  );
}
