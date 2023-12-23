import { useState } from "react";
import "./sidebar.css";
import "./sidebar_ball.css";
import Ball from "./sub/ball/ball";
export default function SideBar() {
  const [show, setShow] = useState("hide");
  const updateShow = () => {
    setShow(show==="hide"?"show":"hide");
  };
  return (
    <>
      <div className="sideBar-container">
        <div className={`Side_Bar `} onClick={updateShow}>
          <img src={`/assets/Options.svg`} className="sspecific_icon" />
          <div className="sball_name">Options</div>
        </div>
        <Ball specific="Home" speed={1} display={show} />
        <Ball specific="Projects" speed={2} display={show} />
        <Ball specific="Hire" speed={3} display={show} />
        <Ball specific="Market" speed={4} display={show} />
        <Ball specific="Chat" speed={5} display={show} />
        <Ball specific="Dark" speed={6} display={show} />
      </div>
    </>
  );
}
