import * as React from "react";
import { useContext } from "react";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { AuthContext } from "../../Context/AuthContext";
import Button from "@mui/material/Button";
import "./styles.css";

export const TargetProfile = () => {
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
      <div className="profileInfoWrapper">
        <img src={currentUser.photoURL} alt="profileImage" />
        <div className="profileUsernameWrapper targetProfileNameWrapper">
          <MailOutlineIcon fontSize="small" /><div className="profileRole targerProfileInfo">{currentUser.email}</div>
        </div>
        <div className="profileUsernameWrapper targetProfileNameWrapper">
          <AccountCircleOutlinedIcon fontSize="small" /><div className="profileRole targerProfileInfo">{currentUser.displayName}</div>
        </div>
        <div className="statusWrapper">
          <Button 
            variant="outlined" 
            sx={{ 
              // padding: "6px 30px", 
              color: '#0f4cff', 
              fontSize:'small', 
              textTransform: 'none',
              borderColor: '#0f4cff',
               }}>
            Archive
            <Inventory2OutlinedIcon fontSize="small" sx={{marginLeft: '4px'}} />
          </Button>
        </div>
      </div>
    </div>
  );
};
