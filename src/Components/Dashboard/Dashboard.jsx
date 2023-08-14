import { MainChat } from "../MainChat/MainChat"
import { Sidebar } from "../Sidebar/Sidebar"
import { Submenu } from "../Submenu/Submenu"
import './styles.css';

export const Dashboard = () =>{
  return (
    <div className="dashboardContainer">
      <div className="subMenuWrapper">
        <Submenu />
      </div>
      <div className="mainChatWrapper">
        <MainChat />
      </div>
      <div className="sidebarWrapper">
        <Sidebar />
      </div>
    </div>
  )
}