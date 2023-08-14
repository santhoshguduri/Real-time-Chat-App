import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import { db } from "../../firebase";
import { ProfileInfo } from "../ProfileInfo/ProfileInfo";
import { SearchUser } from "./SearchUser";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./styles.css";

export const Submenu = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState("");
  const [isActiveExpanded, setActiveExpanded] = useState(true);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    setSelectedChat(u.uid);
  };

  return (
    <div className="chats">
      <ProfileInfo />
      <SearchUser />
      <div className="activeHeaderWrapper" onClick={()=>setActiveExpanded(!isActiveExpanded)}>
        <div className="activeHeader">
          Active Conversations
          <div className="chatCount">{Object.entries(chats).length}</div>
        </div>
        <div style={{display:'flex'}}>
          {!isActiveExpanded ? (
            <KeyboardArrowDownIcon fontSize="small" />
          ) : (
            <KeyboardArrowUpIcon fontSize="small" />
          )}
        </div>
      </div>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className={`userChat ${
              selectedChat === chat[1].userInfo.uid && "chatSelected"
            } ${!isActiveExpanded && 'hideChats'}`}
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
            </div>
          </div>
        ))}
    </div>
  );
};
