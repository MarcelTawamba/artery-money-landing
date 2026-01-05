
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Details } from './components/Details';

function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-lilac/20 selection:text-lilac">
      <Navbar />

      <main>
        <Hero />
        <Features />
        <Details />
      </main>

      <Footer />
    </div>
  );
}

export default App;
