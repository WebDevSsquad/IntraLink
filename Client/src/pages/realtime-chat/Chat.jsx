import React from "react";
import Conversation from "./Conversation";
import "./Chat.css";

export default function Chat() {
  return (
    <div className="chat">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <h4>chatMenu</h4>
          <input placeholder="Enter receiver name" className="chatMenuInput" />
          <Conversation
            imgSrc="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW9kZWx8ZW58MHx8MHx8fDA%3D"
            name="Abby Kingston"
            content="lvu<3"
            date="5:40PM"
            isOnline={true}
          />
          <Conversation
            imgSrc="https://e1.pxfuel.com/desktop-wallpaper/577/168/desktop-wallpaper-gentleman-jacket-person-clothing-smile-man-suit-professional-male-formal-wear-businessperson-trevor-noah-the-daily-show-white-collar-worker-business-executive-2048x1334-men-business.jpg"
            name="John Doe"
            content="ASAP"
            date="12/14/2023"
            isOnline={false}
          />
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">chatBox</div>
      </div>
      {/* <div className="chatOnline">
        <div className="chatOnlineWrapper">chatOnline</div>
      </div> */}
    </div>
  );
}
