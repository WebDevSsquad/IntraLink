import React from "react";
import "./Message.css";

export default function Message({ isCurrentUser, text, imgSrc, date, hour }) {
  return (
    <div className={isCurrentUser ? "message" : "receiver-message"}>
      <div className="dateMessage">{date}</div>
      <div className="messageContainer">
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

        <div
          className={`hourMessage ${isCurrentUser ? "hourMessageSender" : ""} `}
        >
          {hour}
        </div>
      </div>
    </div>
  );
}
