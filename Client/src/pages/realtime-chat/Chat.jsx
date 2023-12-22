import React, { useState, useEffect } from "react";
import Conversation from "./Conversation";
import Message from "./Message";
import "./Chat.css";

const messagesList = [
  {
    isCurrUser: true,
    msgText: `This is a message. Lorem ipsum dolor sit amet consectetur
    adipisicing elit. Omnis est magni tempore recusandae vero. Nulla
    enim aut dolores alias iure quis cum, maiores sequi at illo,
    aliquid cumque sunt impedit!Lorem ipsum dolor sit amet
    consectetur adipisicing elit. Omnis est magni tempore recusandae
    vero. Nulla enim aut dolores alias iure quis cum, maiores sequi
    at illo, aliquid cumque sunt impedit!`,
    imageSrc:
      "https://w0.peakpx.com/wallpaper/10/338/HD-wallpaper-naruto-uzumaki-naruto-anime.jpg",
  },
  {
    isCurrUser: false,
    msgText: `This is a message. Lorem ipsum dolor sit amet consectetur
    adipisicing elit. Omnis est magni tempore recusandae vero. Nulla
    enim aut dolores alias iure quis cum, maiores sequi at illo,
    aliquid cumque sunt impedit!Lorem ipsum dolor sit amet
    consectetur adipisicing elit. Omnis est magni tempore recusandae
    vero. Nulla enim aut dolores alias iure quis cum, maiores sequi
    at illo, aliquid cumque sunt impedit!`,
    imageSrc:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW9kZWx8ZW58MHx8MHx8fDA%3D",
  },
  {
    isCurrUser: true,
    msgText: `This is a message. Lorem ipsum dolor sit amet consectetur
    adipisicing elit. Omnis est magni tempore recusandae vero. Nulla
    enim aut dolores alias iure quis cum, maiores sequi at illo,
    aliquid cumque sunt impedit!Lorem ipsum dolor sit amet
    consectetur adipisicing elit. Omnis est magni tempore recusandae
    vero. Nulla enim aut dolores alias iure quis cum, maiores sequi
    at illo, aliquid cumque sunt impedit!`,
    imageSrc:
      "https://w0.peakpx.com/wallpaper/10/338/HD-wallpaper-naruto-uzumaki-naruto-anime.jpg",
  },
];

export default function Chat() {
  let id_key = 0;
  const currentUser = { user_id: 19 };
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8080/chat/last_messages/${currentUser.user_id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.lastMessages);
        setConversations(data.lastMessages);
      });
  }, [currentUser.user_id]);
  return (
    <div className="chat">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <h4>chatMenu</h4>
          <input placeholder="Enter receiver name" className="chatMenuInput" />
          {conversations.map((c) => {
            return (
              <Conversation
                key={id_key++}
                imgSrc={c.picture}
                name={c.name}
                content={c.text}
                date={c.timestamp}
                isOnline={c.is_online}
                isCurrentUserSender={c.is_curr_user_sender}
              />
            );
          })}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            {messagesList.map((msg) => {
              return (
                <Message
                  key={id_key++}
                  isCurrentUser={msg.isCurrUser}
                  text={msg.msgText}
                  imgSrc={msg.imageSrc}
                />
              );
            })}
          </div>
          <div className="chatBoxBottom">
            <textarea
              placeholder="Write a message"
              className="chatBoxInput"
            ></textarea>
            <button className="btnSend">Send</button>
          </div>
        </div>
      </div>
      {/* <div className="chatOnline">
        <div className="chatOnlineWrapper">chatOnline</div>
      </div> */}
    </div>
  );
}
