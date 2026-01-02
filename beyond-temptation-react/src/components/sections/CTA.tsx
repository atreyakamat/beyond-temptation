import { RainbowButton } from "../ui/RainbowButton";

export default function CTA() {
  return (
    <section className="py-32 px-6 relative overflow-hidden flex items-center justify-center text-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      
      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
          Ready to Indulge?
        </h2>
        <p className="text-lg text-gray-300 mb-10">
          Tables fill up fast. Secure your spot for an unforgettable evening.
        </p>
        <RainbowButton className="h-14 px-10 text-lg">
          Book Your Table
        </RainbowButton>
      </div>
    </section>
  );
}
