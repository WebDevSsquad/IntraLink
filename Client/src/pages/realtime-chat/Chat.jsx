import React, { useState, useEffect, useRef } from "react";
import Conversation from "./Conversation";
import Message from "./Message";
import "./Chat.css";

export default function Chat() {
  let id_key = 0;
  const currentUser = { user_id: 19 };
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [otherUserID, setOtherUserID] = useState(0);
  const msgRef = useRef(null);
  useEffect(() => {
    fetch(`http://localhost:8080/chat/last_messages/${currentUser.user_id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.lastMessages);
        setConversations(data.lastMessages);
      });
  }, [currentUser.user_id, messages]);

  useEffect(() => {
    fetch(
      `http://localhost:8080/chat/last_messages/${currentUser.user_id}/${otherUserID}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.messages);
        setMessages(data.messages);
      });
  }, [otherUserID, messages]);

  const handleClickConversation = (el) => {
    setOtherUserID(el.other_id);
  };

  const handleCLickSend = async () => {
    if (inputMessage !== "") {
      await fetch(`http://localhost:8080/chat/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderID: currentUser.user_id,
          receiverID: otherUserID,
          text: inputMessage,
        }),
      }).then(() => {
        setMessages([...messages, inputMessage]);
        setInputMessage("");

        console.log("msg is sent successfully.");
      });
    }
  };

  return (
    <div className="chat">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <h4>chatMenu</h4>
          <input placeholder="Enter receiver name" className="chatMenuInput" />
          {conversations.map((c) => {
            return (
              <div
                onClick={() => {
                  handleClickConversation(c);
                }}
                key={id_key}
              >
                <Conversation
                  key={id_key++}
                  imgSrc={c.picture}
                  name={c.name}
                  content={c.text}
                  date={c.date}
                  isOnline={c.is_online}
                  isCurrentUserSender={c.is_curr_user_sender}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            {messages.map((msg, idx) => {
              let prevDate = idx ? messages[idx - 1].date : "";
              return (
                <Message
                  key={id_key++}
                  isCurrentUser={msg.is_own_message}
                  text={msg.text}
                  imgSrc={msg.sender_picture}
                  date={msg.date === prevDate ? "" : msg.date}
                  hour={msg.hour}
                />
              );
            })}
          </div>
          <div className="chatBoxBottom">
            {otherUserID !== 0 && (
              <>
                <textarea
                  ref={msgRef}
                  placeholder="Write a message"
                  className="chatBoxInput"
                  onChange={(e) => {
                    setInputMessage(e.target.value);
                  }}
                ></textarea>
                <button
                  className="btnSend"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCLickSend();
                    msgRef.current.value = "";
                  }}
                >
                  Send
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
