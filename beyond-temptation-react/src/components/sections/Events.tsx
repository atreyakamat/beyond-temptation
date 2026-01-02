import { Calendar } from "lucide-react";

export default function Events() {
  return (
    <section id="events" className="py-24 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif font-bold text-white mb-12 text-center">Happenings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Event Card 1 */}
          <div className="bg-card border border-white/5 rounded-2xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-2/5 h-64 md:h-auto bg-gray-800">
               <img 
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover"
                alt="Live Music"
               />
            </div>
            <div className="p-8 flex flex-col justify-center md:w-3/5">
              <div className="flex items-center gap-2 text-primary mb-3">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Every Friday</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Jazz & Cocktails</h3>
              <p className="text-muted-foreground mb-6">Live jazz performances accompanied by our signature mixology menu.</p>
              <button className="text-white font-medium hover:text-primary transition-colors self-start">
                View Details &rarr;
              </button>
            </div>
          </div>

           {/* Event Card 2 */}
           <div className="bg-card border border-white/5 rounded-2xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-2/5 h-64 md:h-auto bg-gray-800">
               <img 
                src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover"
                alt="Tasting Menu"
               />
            </div>
            <div className="p-8 flex flex-col justify-center md:w-3/5">
              <div className="flex items-center gap-2 text-primary mb-3">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Oct 24 - Oct 31</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Autumn Tasting Menu</h3>
              <p className="text-muted-foreground mb-6">A 7-course journey through the flavors of the season.</p>
              <button className="text-white font-medium hover:text-primary transition-colors self-start">
                Book Experience &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
