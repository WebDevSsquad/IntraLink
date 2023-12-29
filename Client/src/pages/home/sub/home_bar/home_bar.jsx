import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  updateConRank,
  updateManagerRank,
  updateTaskRank,
} from "../../../../slices/userReducer";
import "./home_bar.css";
import rankiconPM from "/assets/rankPM.svg";
import rankiconTM from "/assets/rankTM.svg";
import searchicon from "/assets/search.svg";
export default function HomeBar() {
  const userName = useSelector((state) => state.user.userName);
  const userPhoto = useSelector((state) => state.user.picture);
  const managerRank = useSelector((state) => state.user.managerRank);
  const taskRank = useSelector((state) => state.user.taskRank);
  const conRank = useSelector((state) => state.user.conRank);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      fetch("http://localhost:8080/auth/rank", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error getting post`);
          }
          return res.json();
        })
        .then((data) => {
          console.log(data.managerRank);
          console.log(data.taskRank);
          console.log(data.conRank);
          dispatch(updateManagerRank(data.managerRank));
          dispatch(updateTaskRank(data.taskRank));
          dispatch(updateConRank(data.conRank));
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <>
      <div className="homeBar">
        <div className="username_rank">
          <div className="homeBar_username">{userName}</div>
          <div className="homeBar_rank">
            <div className="rankname taskmanager">TM</div>
            <img src={rankiconTM} className="rank_icon" />
            <div className="homebar_user_rank">
              {taskRank != undefined ? taskRank : 0}
            </div>
          </div>
          <div className="homeBar_rank">
            <div className="rankname  projectmanager">PM</div>
            <img src={rankiconPM} className="rank_icon" />
            <div className="homebar_user_rank">
              {managerRank != undefined ? managerRank : 0}
            </div>
          </div>
          <div className="homeBar_rank">
            <div className="rankname  projectmanager">CM</div>
            <img src={rankiconPM} className="rank_icon" />
            <div className="homebar_user_rank">
              {conRank != undefined ? conRank : 0}
            </div>
          </div>
        </div>
        <div className="homebar_search">
          <img src={searchicon} className="search_icon" />
          <input className="search_input" type="text" placeholder="Search..." />
        </div>
        <div
          className="userphoto"
          onClick={() => {
            navigate("/profile");
          }}
        >
          <img src={userPhoto} />
        </div>
      </div>
    </>
  );
}
