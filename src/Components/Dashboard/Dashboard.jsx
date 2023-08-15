import { useEffect, useState, useContext, useRef } from "react";
import { MainChat } from "../MainChat/MainChat";
import { Sidebar } from "../Sidebar/Sidebar";
import { Submenu } from "../Submenu/Submenu";
import { ChatContext } from "../../Context/ChatContext";
import "./styles.css";

export const Dashboard = () => {
  const [hide, setHide] = useState(false);
  const { data } = useContext(ChatContext);

  const hideStateRef = useRef(hide);
  const setHideState = (data) => {
    hideStateRef.current = data;
    setHide(data);
  };

  const handleResize = (e) => {
    if (e.target.outerWidth < 750 && !hideStateRef.current) {
      setHideState(true);
    } else if (hideStateRef.current && e.target.outerWidth > 749) {
      setHideState(false);
    }
  };

  useEffect(() => {
    if (window.outerWidth < 750) {
      setHideState(true);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="dashboardContainer">
      <div
        className={`subMenuWrapper ${data.chatId !== "null" && hide && "hide"}`}
      >
        <Submenu />
      </div>
      <div
        className={`mainChatWrapper ${
          data.chatId === "null" && hide && "hide"
        }`}
      >
        <MainChat hide={hide} />
      </div>
      <div className="sidebarWrapper">
        <Sidebar />
      </div>
    </div>
  );
};
