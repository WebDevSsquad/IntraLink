import "./landing_page.css";
import Contact from "./sub/contact/contact";
import Hero from "./sub/hero/hero";
import Navbar from "./sub/navbar/navbar";
import Pricing from "./sub/pricing/pricing";
import Services from "./sub/services/services";

export default function LandingPage() {
  return (
    <>
      <div className="landing_page">
        <Navbar />
        <Hero />
        <Services />
        <Pricing />
        <Contact />
      </div>
    </>
  );
}
