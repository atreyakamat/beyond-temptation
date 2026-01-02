import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import MenuPreview from "./components/sections/MenuPreview";
import Gallery from "./components/sections/Gallery";
import Events from "./components/sections/Events";
import CTA from "./components/sections/CTA";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <About />
        <MenuPreview />
        <Gallery />
        <Events />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
