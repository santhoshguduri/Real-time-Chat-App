import TargetProfile from "../ProfileInfo/TargetProfile";
import { Chart } from "react-google-charts";
import { AnalyticCard } from "./AnalyticCard";
import Button from "@mui/material/Button";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import "./styles.css";

export const Sidebar = () => {
  const data = [
    ["Element", "Density", { role: "style" }],
    ["Mon", 10.94, "#0f4cff"],
    ["Tue", 19.49, "#0f4cff"],
    ["Wed", 16.3, "#0f4cff"],
    ["Thu", 13.45, "#0f4cff"],
    ["Fri", 10.45, "#0f4cff"],
    ["Sat", 7.45, "#0f4cff"],
    ["Sun", 5.45, "#0f4cff"],
  ];

  const handleInvite = () => {
    navigator.clipboard
      .writeText("https://real-time-chat-app-nine.vercel.app/")
      .then(() => alert("Invite link copied!!!"));
  };

  return (
    <>
      <div>
        <TargetProfile />
      </div>
      <div className="analyticsContainer">
        <div className="analyticWrapper">
          <AnalyticCard
            themeColor="#0f4cff"
            iconName="AccessTime"
            primaryText="13h"
            secondaryText="Time"
          />
          <AnalyticCard
            themeColor="#24bb9d"
            iconName="PeopleAltOutlined"
            primaryText="188"
            secondaryText="Attended"
          />
          <AnalyticCard
            themeColor="#705cc4"
            iconName="DateRangeRounded"
            primaryText="199"
            secondaryText="Meetings"
          />
          <AnalyticCard
            themeColor="#fc5524"
            iconName="CancelPresentationOutlined"
            primaryText="41"
            secondaryText="Rejected"
          />
        </div>
        <div className="chartHeader">Current week activity</div>
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="180px"
          data={data}
        />
      </div>
      <div className="inviteWrapper">
        <div>Onboard Clients</div>
        <Button
          variant="contained"
          sx={{
            // padding: "6px 30px",
            color: "white",
            backgroundColor: "#0f4cff",
            fontSize: "small",
            textTransform: "none",
          }}
          onClick={() => handleInvite()}
        >
          Copy link
          <InsertLinkOutlinedIcon fontSize="small" sx={{ marginLeft: "4px" }} />
        </Button>
      </div>
    </>
  );
};
