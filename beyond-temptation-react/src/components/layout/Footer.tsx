export default function Footer() {
  return (
    <footer className="bg-secondary py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-serif font-bold text-white mb-2">
            BEYOND TEMPTATION
          </h3>
          <p className="text-muted-foreground text-sm">
            Experience the taste of luxury.
          </p>
        </div>
        
        <div className="flex gap-6">
           {/* Social placeholders */}
           <div className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary/20 transition-colors flex items-center justify-center cursor-pointer">IG</div>
           <div className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary/20 transition-colors flex items-center justify-center cursor-pointer">FB</div>
        </div>

        <div className="text-center md:text-right text-sm text-muted-foreground">
          <p>123 Culinary Avenue, Food District</p>
          <p>&copy; {new Date().getFullYear()} Beyond Temptation.</p>
        </div>
      </div>
    </footer>
  );
}
