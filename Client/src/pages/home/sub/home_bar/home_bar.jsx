import userphoto from "/assets/jogosaturu.jpeg";
import rankiconPM from "/assets/rankPM.svg";
import rankiconTM from "/assets/rankTM.svg";
import searchicon from "/assets/search.svg";
import "./home_bar.css";
export default function HomeBar() {
  return (
    <>
      <div className="homeBar">
        <div className="username_rank">
          <div className="homeBar_username">Ichigo</div>
          <div className="homeBar_rank">
            <div className="rankname taskmanager">TM</div>
            <img src={rankiconTM} className="rank_icon" />
            <div className="homebar_user_rank">50</div>
          </div>
          <div className="homeBar_rank">
            <div className="rankname  projectmanager">PM</div>
            <img src={rankiconPM} className="rank_icon" />
            <div className="homebar_user_rank">48</div>
          </div>
        </div>
        <div className="homebar_search">
          <img src={searchicon} className="search_icon" />
          <input className="search_input" type="text" placeholder="Search..." />
        </div>
        <div className="userphoto">
          <img src={userphoto} />
        </div>
      </div>
    </>
  );
}
