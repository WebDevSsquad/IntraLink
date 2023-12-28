import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./landing_page.css";
import Contact from "./sub/contact/contact";
import Hero from "./sub/hero/hero";
import Navbar from "./sub/navbar/navbar";
import Pricing from "./sub/pricing/pricing";
import Services from "./sub/services/services";
export default function LandingPage() {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      navigate("/home");
    }
  }, [loggedIn, navigate]);
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
