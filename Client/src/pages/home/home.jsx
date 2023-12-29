import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Market from "../market/market";
import Dashboard from "../projectDashBoard/dashboard";
import "./home.css";
import Feed from "./sub/feed/feed";
import HomeBar from "./sub/home_bar/home_bar";
import SideBar from "./sub/sidebar/sidebar";
export default function Home() {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const fetch = useSelector((state) => state.user.fetch);
  const expires = useSelector((state) => state.user.expires);
  const navigate = useNavigate();

  useEffect(() => {
    if ((!loggedIn && fetch) || expires) {
      console.log("Fetched");
      navigate("/");
    }
  }, [loggedIn, navigate, fetch, expires]);
  return (
    <>
      <div className="homepage" id="homepage">
        <HomeBar />
        <SideBar />
        {location.pathname === "/home" ? (
          <Feed />
        ) : location.pathname === "/market" ? (
          <Market />
        ) : (
          <Dashboard />
        )}
      </div>
    </>
  );
}
