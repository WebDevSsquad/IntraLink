import "./landing_page.css";
import Contact from "./sub/contact/contact";
import Home from "./sub/home/home";
import Navbar from "./sub/navbar/navbar";
import Pricing from "./sub/pricing/pricing";
import Services from "./sub/services/services";

export default function LandingPage() {
  return (
    <>
      <div className="landing_page">
        <Navbar />
        <Home />
        <Services />
        <Pricing />
        <Contact />
      </div>
    </>
  );
}
