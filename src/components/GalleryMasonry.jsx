import { motion } from "framer-motion";
import { useState } from "react";

export default function GalleryMasonry() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  const images = [
    {
      id: 1,
      src: "/images/gallery/food-1.jpg",
      category: "Food",
      caption: "Signature Latte Art",
      date: "2024-01-15",
      tags: ["coffee", "art", "signature"]
    },
    {
      id: 2,
      src: "/images/gallery/events-1.jpg",
      category: "Events",
      caption: "Open Mic Night",
      date: "2024-01-20",
      tags: ["music", "community", "night"]
    },
    {
      id: 3,
      src: "/images/gallery/vibes-1.jpg",
      category: "Vibes",
      caption: "Cozy Reading Corner",
      date: "2024-01-10",
      tags: ["reading", "cozy", "books"]
    },
    // Add more images...
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
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            className="break-inside-avoid mb-6 group cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <img
                src={image.src}
                alt={image.caption}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Heart Button */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(image.id);
                }}
                className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                  favorites.has(image.id) 
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

              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white font-bold text-lg mb-1">{image.caption}</h3>
                <p className="text-yellow text-sm">{image.category}</p>
              </div>

              {/* Zoom Icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-yellow text-black p-3 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="relative max-w-5xl max-h-[90vh] w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-yellow transition-colors z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <img
              src={selectedImage.src}
              alt={selectedImage.caption}
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
            />

            {/* Image Info */}
            <div className="bg-white rounded-b-lg p-6">
              <h2 className="text-2xl font-bold text-black mb-2">{selectedImage.caption}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="bg-yellow text-black px-3 py-1 rounded-full font-medium">
                  {selectedImage.category}
                </span>
                <span>{selectedImage.date}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedImage.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
