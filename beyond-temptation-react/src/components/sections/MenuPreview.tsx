import { motion } from "framer-motion";

const dishes = [
  {
    name: "Truffle Risotto",
    desc: "Wild mushrooms, parmesan crisp, truffle oil.",
    price: "$24",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Seared Scallops",
    desc: "Cauliflower purée, crispy pancetta, lemon butter.",
    price: "$32",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=2058&auto=format&fit=crop"
  },
  {
    name: "Wagyu Burger",
    desc: "Brioche bun, aged cheddar, caramelized onions.",
    price: "$28",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop"
  }
];

export default function MenuPreview() {
  return (
    <section id="menu" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Signature Dishes</h2>
          <p className="text-muted-foreground">A glimpse into our culinary world.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dishes.map((dish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-xl bg-card border border-white/5"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={dish.image} 
                  alt={dish.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-serif font-bold text-white">{dish.name}</h3>
                  <span className="text-primary font-medium">{dish.price}</span>
                </div>
                <p className="text-muted-foreground text-sm">{dish.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-8 py-3 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300">
            View Full Menu
          </button>
        </div>
      </div>
    </section>
  );
}
