import React, { useContext } from "react";
import { Messages } from "./Messages";
import { ChatInput } from "./ChatInput";
import { ChatContext } from "../../Context/ChatContext";
import "./styles.css";

export const MainChat = () => {
  // const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <Messages />
      <ChatInput />
    </div>
  );
};
