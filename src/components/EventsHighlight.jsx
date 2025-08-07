import { motion } from "framer-motion";
import { useState } from "react";

export default function EventsHighlight() {
  const [currentEvent, setCurrentEvent] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      title: "Open Mic Night",
      date: "Every Friday",
      time: "7:00 PM - 10:00 PM",
      image: "/images/open-mic.jpg",
      description: "Share your talent with our community! Poetry, music, comedy - all welcome.",
      gallery: [
        "/images/open-mic-1.jpg",
        "/images/open-mic-2.jpg",
        "/images/open-mic-3.jpg"
      ]
    },
    {
      id: 2,
      title: "Book Club Meetup",
      date: "Every Sunday",
      time: "4:00 PM - 6:00 PM",
      image: "/images/book-club.jpg",
      description: "Join fellow book lovers for discussions, coffee, and great conversations.",
      gallery: [
        "/images/book-club-1.jpg",
        "/images/book-club-2.jpg",
        "/images/book-club-3.jpg"
      ]
    },
    {
      id: 3,
      title: "Latte Art Workshop",
      date: "Every Saturday",
      time: "11:00 AM - 1:00 PM",
      image: "/images/latte-art.jpg",
      description: "Learn the art of creating beautiful designs in your coffee.",
      gallery: [
        "/images/latte-art-1.jpg",
        "/images/latte-art-2.jpg",
        "/images/latte-art-3.jpg"
      ]
    },
    {
      id: 4,
      title: "Study Sessions",
      date: "Monday - Thursday",
      time: "2:00 PM - 8:00 PM",
      image: "/images/study-session.jpg",
      description: "Quiet, focused environment perfect for studying and productive work.",
      gallery: [
        "/images/study-1.jpg",
        "/images/study-2.jpg",
        "/images/study-3.jpg"
      ]
    }
  ];

  const nextEvent = () => {
    setCurrentEvent((prev) => (prev + 1) % events.length);
  };

  const prevEvent = () => {
    setCurrentEvent((prev) => (prev - 1 + events.length) % events.length);
  };

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-4">Events Highlight</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-yellow to-yellow/60 mx-auto mb-4"></div>
          <p className="text-lg text-gray-300">Join our vibrant community events</p>
        </motion.div>

        {/* Event Slider */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentEvent * 100}%)` }}
            >
              {events.map((event) => (
                <div key={event.id} className="w-full flex-shrink-0">
                  <div className="relative h-96 cursor-pointer" onClick={() => setSelectedEvent(event)}>
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    <div className="absolute bottom-8 left-8 right-8">
                      <motion.h3
                        className="text-3xl font-bold mb-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {event.title}
                      </motion.h3>
                      <p className="text-yellow font-semibold mb-2">{event.date} • {event.time}</p>
                      <p className="text-gray-200 text-sm">{event.description}</p>
                    </div>

                    {/* Click indicator */}
                    <motion.div
                      className="absolute top-4 right-4 bg-yellow text-black p-2 rounded-full"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation */}
          <button
            onClick={prevEvent}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-yellow text-black p-3 rounded-full shadow-lg hover:bg-yellow/90 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextEvent}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-yellow text-black p-3 rounded-full shadow-lg hover:bg-yellow/90 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentEvent(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentEvent ? 'bg-yellow' : 'bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Event Modal */}
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="bg-white text-black rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-4">{selectedEvent.title}</h2>
                <div className="text-yellow font-semibold mb-4">{selectedEvent.date} • {selectedEvent.time}</div>
                <p className="text-gray-600 mb-6">{selectedEvent.description}</p>
                
                <div className="grid grid-cols-3 gap-4">
                  {selectedEvent.gallery.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${selectedEvent.title} ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <motion.a
                    href="/events"
                    className="inline-block bg-yellow text-black px-8 py-3 rounded-full font-bold hover:bg-yellow/90 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Join This Event
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
