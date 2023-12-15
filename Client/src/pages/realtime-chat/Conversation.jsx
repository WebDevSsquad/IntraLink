import React from "react";
import "./Conversation.css";

export default function Conversation({
  imgSrc,
  name,
  content,
  date,
  isOnline,
}) {
  return (
    <div className="conversation">
      <div className="imgContainer">
        <img
          className="imgConversation"
          src={imgSrc}
          // src=
          // src=
          alt=""
        />
        <div className={`status ${isOnline ? "online" : "offline"}`}></div>
      </div>
      <div className="conversation-info">
        <span className="nameConversation">{name}</span>
        <div className="text-info">
          <span className="textConversation">{content}</span>
          <span className="dateConversation">{date}</span>
        </div>
      </div>
      {/* Abby Kingston */}
    </div>
  );
}
