import { motion } from "framer-motion";

export default function Card({ title, body, href, img }) {
  return (
    <li className="list-none flex p-1 bg-accent-light rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <a href={href} className="flex flex-col md:flex-row w-full h-full">
        {img && (
          <div className="flex-shrink-0 w-full md:w-40 h-40 overflow-hidden rounded-lg">
            <img src={img} alt={title} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110" />
          </div>
        )}
        <motion.div 
          className="flex flex-col justify-center p-4 flex-1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            {title}
            <span className="text-accent-dark">&rarr;</span>
          </h2>
          <p className="text-sm text-text-light mt-1">{body}</p>
        </motion.div>
      </a>
    </li>
  );
}
