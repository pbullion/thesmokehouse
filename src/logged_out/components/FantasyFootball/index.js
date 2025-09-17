// MatchupView.jsx
import React, { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ESPNMatchup from "./ESPNMatchup";

function FantasyFootball({ selectFF }) {
  useEffect(() => {
    selectFF();
  }, [selectFF]);
  const [week, setWeek] = useState(3);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "0.5rem", // space between items
        padding: "0.5rem",
      }}>
      <ESPNMatchup
        leagueName="The League"
        url={`https://sheline-art-website-api.herokuapp.com/espn-fantasy-football/${week}/9/1429051163`}
      />
      <ESPNMatchup
        leagueName="Opportune"
        url={`https://sheline-art-website-api.herokuapp.com/espn-fantasy-football/${week}/7/204792412`}
      />
      <ESPNMatchup
        leagueName="BIGGER dynasty"
        url={`https://sheline-art-website-api.herokuapp.com/sleeper-fantasy-football/${week}/UrineSumTrouble/1180568250419814400`}
      />
      <ESPNMatchup
        leagueName="OG Dirtbag Dynasty"
        url={`https://sheline-art-website-api.herokuapp.com/sleeper-fantasy-football/${week}/UrineSumTrouble/1180567903047315456`}
      />
    </div>
  );
}

export default FantasyFootball;
