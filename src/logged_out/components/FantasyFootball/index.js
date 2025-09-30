// MatchupView.jsx
import React, { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ESPNMatchup from "./ESPNMatchup";

function FantasyFootball({ selectFF }) {
  useEffect(() => {
    selectFF();
  }, [selectFF]);
  const [week] = useState(4);
  useEffect(() => {
    setTimeout(() => {
      window.location.reload();
    }, 30000);
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "0.5rem", // space between items
        padding: "0.5rem",
        color: "white",
        backgroundColor: "#391e1eff",
        height: "100vh",
      }}>
      <div style={{ padding: 5, borderRadius: 10, backgroundColor: "#59005dff" }}>
        <ESPNMatchup
          leagueName="The League"
          url={`https://sheline-art-website-api.herokuapp.com/espn-fantasy-football/${week}/5/1429051163`}
        />
      </div>
      <div style={{ padding: 5, borderRadius: 10, backgroundColor: "#0D47A1" }}>
        <ESPNMatchup
          leagueName="Opportune"
          url={`https://sheline-art-website-api.herokuapp.com/espn-fantasy-football/${week}/7/204792412`}
        />
      </div>
      <div style={{ padding: 5, borderRadius: 10, backgroundColor: "#795548" }}>
        <ESPNMatchup
          leagueName="BIGGER dynasty"
          url={`https://sheline-art-website-api.herokuapp.com/sleeper-fantasy-football/${week}/UrineSumTrouble/1180568250419814400`}
        />
      </div>
      <div style={{ padding: 5, borderRadius: 10, backgroundColor: "#263238" }}>
        <ESPNMatchup
          leagueName="OG Dirtbag Dynasty"
          url={`https://sheline-art-website-api.herokuapp.com/sleeper-fantasy-football/${week}/UrineSumTrouble/1180567903047315456`}
        />
      </div>
    </div>
  );
}

export default FantasyFootball;
