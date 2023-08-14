import React, { useContext, useEffect } from "react";
import { Messages } from "./Messages";
import { ChatInput } from "./ChatInput";
import { ChatContext } from "../../Context/ChatContext";
import "./styles.css";

export const MainChat = () => {
  const { data } = useContext(ChatContext);

  // useEffect(()=>{

  // },[data])

  return (
    <div className="chat">
      {data.chatId!=='null' ? (
        <>
          <Messages />
          <ChatInput />
        </>
      ) : (
        <div className="emptyStateConversation">Select a chat to start conversation</div>
      )}
    </div>
  );
};
