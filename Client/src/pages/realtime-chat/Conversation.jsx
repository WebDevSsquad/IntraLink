import React from "react";
import "./Conversation.css";

export default function Conversation({
  imgSrc,
  name,
  content,
  date,
  isOnline,
  isCurrentUserSender,
}) {
  return (
    <div className="conversation">
      <div className="imgContainer">
        <img className="imgConversation" src={imgSrc} alt="" />
        <div className={`status ${isOnline ? "online" : ""}`}></div>
      </div>
      <div className="conversation-info">
        <span className="nameConversation">{name}</span>
        <div className="text-info">
          <span className="textConversation">
            {(isCurrentUserSender ? "You : " : "") + content}
          </span>
          <span className="dateConversation">{date}</span>
        </div>
      </div>
    </div>
  );
}
