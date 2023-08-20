import React, { useContext, useEffect } from "react";
import { Messages } from "./Messages";
import { ChatInput } from "./ChatInput";
import { ChatContext } from "../../Context/ChatContext";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./styles.css";

export const MainChat = (props) => {
  const { data, chatDispatch } = useContext(ChatContext);

  // useEffect(()=>{

  // },[data])

  return (
    <>
      {props.hide && (
        <div
          className="backNavigationBtn"
          onClick={() => chatDispatch({ type: "SET_DEFAULT" })}
        >
          <KeyboardBackspaceIcon
            sx={{ marginRight: "16px" }}
            fontSize="small"
          />
          Chats
        </div>
      )}
      <div className="chat">
        {data.chatId !== "null" ? (
          <>
            <Messages hide={props.hide} />
            <ChatInput />
          </>
        ) : (
          <div className="emptyStateConversation">
            Select a chat to start conversation
          </div>
        )}
      </div>
    </>
  );
};
