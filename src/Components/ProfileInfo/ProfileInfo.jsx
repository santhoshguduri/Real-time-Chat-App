import * as React from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useContext } from "react";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import { AuthContext } from "../../Context/AuthContext";
import { Toggle } from "./Toggle";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import "./styles.css";

export const ProfileInfo = () => {
  const { currentUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="profileContainer">
      <div className="profileHeader">
        <div className="appIconWrapper">
          <BoltIcon fontSize="large" />
        </div>
        <div className="appNameWrapper">QuickChat</div>
      </div>
      <div className="profileInfoWrapper">
        <img src={currentUser.photoURL} alt="profileImage" />
        <div className="profileUsernameWrapper">
          <div className="profileUsername">{currentUser.displayName}</div>
          <SettingsIcon
            fontSize="small"
            sx={{ cursor: "pointer" }}
            onClick={handleClick}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button"
            }}
          >
            <MenuItem onClick={() => signOut(auth)}>Logout</MenuItem>
          </Menu>
        </div>
        <div className="profileRole">{`Senior Software Developer`}</div>
        <div className="statusWrapper">
          <Toggle />
          Active
        </div>
      </div>
    </div>
  );
};
