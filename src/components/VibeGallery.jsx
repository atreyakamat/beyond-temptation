import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import InteractiveGridPattern from "./InteractiveGridPattern.jsx";

export default function VibeGallery() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const scrollRef = useRef(null);

  const vibes = [
    {
      id: 1,
      image: "/images/reading-nook.jpg",
      name: "Reading Nook",
      description: "Perfect for book lovers"
    },
    {
      id: 2,
      image: "/images/sunlit-bench.jpg",
      name: "Sunlit Bench",
      description: "Morning coffee spot"
    },
    {
      id: 3,
      image: "/images/work-corner.jpg",
      name: "Work Corner",
      description: "Productive workspace"
    },
    {
      id: 4,
      image: "/images/cozy-couch.jpg",
      name: "Cozy Couch",
      description: "Relax and unwind"
    },
    {
      id: 5,
      image: "/images/window-seat.jpg",
      name: "Window Seat",
      description: "Watch the world go by"
    },
    {
      id: 6,
      image: "/images/group-table.jpg",
      name: "Group Table",
      description: "Perfect for meetings"
    }
  ];

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 300;
    
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Interactive Grid Pattern Background */}
      <InteractiveGridPattern
        className="absolute inset-0 z-0"
        width={80}
        height={80}
        numSquares={20}
        maxOpacity={0.1}
        duration={5}
        repeatDelay={2}
      />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-black mb-4">Our Vibe</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-yellow to-yellow/60 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Discover your perfect spot in our café</p>
        </motion.div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-yellow text-black p-3 rounded-full shadow-lg hover:bg-yellow/90 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-yellow text-black p-3 rounded-full shadow-lg hover:bg-yellow/90 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Horizontal Scroll Gallery */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-12 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {vibes.map((vibe, index) => (
              <motion.div
                key={vibe.id}
                className="flex-shrink-0 w-80 h-96 relative rounded-2xl overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={vibe.image}
                  alt={vibe.name}
                  className="w-full h-full object-cover transition-transform duration-500"
                  style={{ 
                    transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
                    filter: hoveredIndex === index ? 'brightness(0.7)' : 'brightness(0.9)'
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                
                {/* Content */}
                <motion.div
                  className="absolute bottom-6 left-6 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: hoveredIndex === index ? 1 : 0.8, 
                    y: hoveredIndex === index ? 0 : 10 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold mb-2">{vibe.name}</h3>
                  <p className="text-sm text-gray-200">{vibe.description}</p>
                </motion.div>

                {/* Hover Heart */}
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute top-4 right-4 bg-yellow text-black p-2 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
