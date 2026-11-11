import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Carousel from "./components/Carousel";
import About from "./components/About";
import Ministries from "./components/Ministries";
import Verse from "./components/Verse";
import Beliefs from "./components/Beliefs";
import NextStep from "./components/NextStep";
import Location from "./components/Location";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CursorRing from "./components/CursorRing";
import { useReveal } from "./lib/useReveal";

export default function App() {
  useReveal();
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] bg-gold px-4 py-2 text-xs tracking-widest text-charcoal uppercase focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <CursorRing />
      <Nav />
      <main id="main">
        <Hero />
        <Ticker />
        <Carousel />
        <About />
        <Ministries />
        <Verse />
        <Beliefs />
        <NextStep />
        <Location />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
