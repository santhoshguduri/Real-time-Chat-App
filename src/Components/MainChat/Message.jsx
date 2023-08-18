import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";

export const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [messageTime, setMessageTime] = useState("");

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    const minutesUntilNow = Math.floor(
      Math.abs(new Date() - new Date(message.date.seconds * 1000)) / (1000 * 60)
    );
    if (minutesUntilNow < 1) {
      setMessageTime("Just now");
    } else if (minutesUntilNow < 60) {
      setMessageTime(`${minutesUntilNow}m ago`);
    } else if (minutesUntilNow < 60 * 24) {
      setMessageTime(`${Math.floor(minutesUntilNow / 24)}h ago`);
    } else if (minutesUntilNow >= 60 * 24) {
      setMessageTime(`${Math.floor(minutesUntilNow / (60 * 24))}d ago`);
    }
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.userInfo.photoURL
          }
          alt=""
        />
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
        <span>{messageTime}</span>
      </div>
    </div>
  );
};
