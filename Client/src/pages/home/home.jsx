import "./home.css";
import Feed from "./sub/feed/feed";
import HomeBar from "./sub/home_bar/home_bar";
import SideBar from "./sub/sidebar/sidebar";
export default function Home() {
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
