import React from "react";
import Conversation from "./Conversation";
import "./Chat.css";
import Message from "./Message";

const recipientsUsers = [
  {
    ImageSource:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW9kZWx8ZW58MHx8MHx8fDA%3D",
    Name: "Abby Kingston",
    LastMessageContent: "I love you <3. I can't wait.",
    MessaageDate: "5:40PM",
    isUserOnline: true,
  },
  {
    ImageSource:
      "https://e1.pxfuel.com/desktop-wallpaper/577/168/desktop-wallpaper-gentleman-jacket-person-clothing-smile-man-suit-professional-male-formal-wear-businessperson-trevor-noah-the-daily-show-white-collar-worker-business-executive-2048x1334-men-business.jpg",
    Name: "John Doe",
    LastMessageContent: "Finish Your mission ASAP.",
    MessaageDate: "12/14/2023",
    isUserOnline: false,
  },
  {
    ImageSource:
      "https://scontent.fcai19-5.fna.fbcdn.net/v/t39.30808-6/362618094_5959108207527896_7594719120317047650_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeHipQtOPEBgLUNapXjavmy1LgFprCy-RKIuAWmsLL5EoudY9sbgpXtFmJCrxUZa0ehC8-aD_z88faiDbmzV-WcW&_nc_ohc=wFJLnI_LCGQAX-Sgcih&_nc_ht=scontent.fcai19-5.fna&oh=00_AfB5QkuW6xzFBFZW03doMOxl7XeQ2CUP867QXHCamlqxGg&oe=6581CA4C",
    Name: "Muhammad Amr",
    LastMessageContent: "それが俺の忍道だ!",
    MessaageDate: "10/07/2023",
    isUserOnline: true,
  },
];

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
      "https://scontent.fcai19-5.fna.fbcdn.net/v/t39.30808-6/362618094_5959108207527896_7594719120317047650_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeHipQtOPEBgLUNapXjavmy1LgFprCy-RKIuAWmsLL5EoudY9sbgpXtFmJCrxUZa0ehC8-aD_z88faiDbmzV-WcW&_nc_ohc=wFJLnI_LCGQAX-Sgcih&_nc_ht=scontent.fcai19-5.fna&oh=00_AfB5QkuW6xzFBFZW03doMOxl7XeQ2CUP867QXHCamlqxGg&oe=6581CA4C",
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
      "https://scontent.fcai19-5.fna.fbcdn.net/v/t39.30808-6/362618094_5959108207527896_7594719120317047650_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeHipQtOPEBgLUNapXjavmy1LgFprCy-RKIuAWmsLL5EoudY9sbgpXtFmJCrxUZa0ehC8-aD_z88faiDbmzV-WcW&_nc_ohc=wFJLnI_LCGQAX-Sgcih&_nc_ht=scontent.fcai19-5.fna&oh=00_AfB5QkuW6xzFBFZW03doMOxl7XeQ2CUP867QXHCamlqxGg&oe=6581CA4C",
  },
];

export default function Chat() {
  let id_key = 0;
  return (
    <div className="chat">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <h4>chatMenu</h4>
          <input placeholder="Enter receiver name" className="chatMenuInput" />
          {recipientsUsers.map((user) => {
            return (
              <Conversation
                key={id_key++}
                imgSrc={user.ImageSource}
                name={user.Name}
                content={user.LastMessageContent}
                date={user.MessaageDate}
                isOnline={user.isUserOnline}
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
