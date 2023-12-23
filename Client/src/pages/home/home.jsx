import HomeBar from "./sub/home_bar/home_bar";
import SideBar from "./sub/sidebar/sidebar";
import "./home.css";
export default function Home() {
   return (<>
   <div className="homepage">
      <HomeBar/>
      <SideBar/>
      </div>
   </>);
}