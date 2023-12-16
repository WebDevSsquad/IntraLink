import React from "react";
import "./Message.css";

export default function Message({ isCurrentUser, text, imgSrc }) {
  return (
    <div className={isCurrentUser ? "message" : "receiver-message"}>
      <div className="dateMessage">12/15/2023</div>
      <div className="topMessage">
        {isCurrentUser ? (
          <>
            <img className="imgMessage sender-img" src={imgSrc} alt="" />
            <div className="wholeMessage">
              <p className="contentMessage content-sender">{text}</p>
              <div className="triangle sender-triangle"></div>
            </div>
          </>
        ) : (
          <>
            <div className="wholeMessage">
              <p className="contentMessage content-receiver">{text}</p>
              <div className="triangle receiver-triangle"></div>
            </div>
            <img className="imgMessage receiver-img" src={imgSrc} alt="" />
          </>
        )}
      </div>
      <div className="hourMessage">5 hours ago</div>
    </div>
  );
}
