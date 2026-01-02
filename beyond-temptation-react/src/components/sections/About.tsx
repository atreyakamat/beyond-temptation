import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-24 px-6 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop" 
              alt="Chef plating" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary p-6 rounded-xl border border-white/10 hidden md:flex items-center justify-center text-center">
             <p className="font-serif text-xl italic text-primary">"Food is our love language."</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            More Than Just <br/> A Restaurant
          </h2>
          <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
            Beyond Temptation was born from a desire to create a space where food, art, and community intersect. We aren't just serving meals; we are curating experiences.
          </p>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            From our locally sourced ingredients to our carefully crafted playlists, every detail is designed to transport you. Whether it's a casual coffee or a celebratory dinner, we invite you to indulge.
          </p>
          
          <a href="#story" className="text-primary hover:text-white transition-colors border-b border-primary pb-1 inline-block">
            Read Our Story
          </a>
        </motion.div>

      </div>
    </section>
  );
}
