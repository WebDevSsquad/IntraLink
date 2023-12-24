import { useSelector } from "react-redux";
import "./home.css";
import Feed from "./sub/feed/feed";
import HomeBar from "./sub/home_bar/home_bar";
import SideBar from "./sub/sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Home() {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const fetch = useSelector((state) => state.user.fetch);
  const expires = useSelector((state) => state.user.expires);
  const navigate = useNavigate();
  useEffect(() => {
    if ((!loggedIn && fetch) || expires) {
      navigate("/");
    }
  }, [loggedIn, navigate, fetch, expires]);
  return (
    <>
      <div className="homepage">
        <HomeBar />
        <SideBar />
        <Feed />
      </div>
    </>
  );
}
