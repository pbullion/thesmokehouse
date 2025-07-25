import React, { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Avatar from "@mui/material/Avatar";
import { IconButton, Button } from "@mui/material";

function ScoreCard(props) {
  const [currentHole, setCurrentHole] = useState(1);
  const [isDay, setIsDay] = useState(true);
  const [roundData, setRoundData] = useState([]);
  const [data, setData] = useState({
    date: "2025-07-12",
  });
  const images = Array.from({ length: 9 }, (_, i) => ({
    original: `${process.env.PUBLIC_URL}/images/smokehouse/holes/${i + 1}.png`,
  }));
  const [holeData, setHoleData] = useState({
    day: {
      1: { par: 3 },
      2: { par: 4 },
      3: { par: 3 },
      4: { par: 2 },
      5: { par: 3 },
      6: { par: 4 },
      7: { par: 3 },
      8: { par: 2 },
      9: { par: 2 },
    },
    night: {
      1: { par: 3 },
      2: { par: 4 },
      3: { par: 3 },
      4: { par: 2 },
      5: { par: 3 },
      6: { par: 4 },
      7: { par: 3 },
      8: { par: 2 },
      9: { par: 2 },
    },
  });
  const [players, setPlayers] = useState([
    {
      name: "Patrick",
      lineScore: [],
    },
    {
      name: "Taylor",
      lineScore: [],
    },
    {
      name: "Ryan",
      lineScore: [],
    },
    {
      name: "Collin",
      lineScore: [],
    },
    {
      name: "Carlo",
      lineScore: [],
    },
    {
      name: "John",
      lineScore: [],
    },
  ]);
  const fetchData = async () => {
    console.log("🚀 ~ fetchData ~ props.roundID:", props.roundID);
    const response = await fetch(
      `https://sheline-art-website-api.herokuapp.com/the-links-at-the-smokehouse/round/${props.roundID}`
    );
    const data = await response.json();
    console.log("🚀 ~ fetchData ~ data:", data);
    const { players, round } = data;
    console.log("🚀 ~ fetchData ~ round:", round);
    // console.log("🚀 ~ fetchData ~ round:", round[0]);
    console.log("🚀 ~ fetchData ~ players:", players);
    const parsedRoundData = Object.entries(round[0])
      .filter(([key, value]) => key.startsWith("player_") && value !== null)
      .map(([key, value]) => ({
        playerKey: key,
        ...JSON.parse(value),
      }))
      .map((x) => {
        const player = players.find((p) => p.id === x.playerID);
        console.log("🚀 ~ parsedRoundData.map ~ player:", player);
        return {
          ...player,
          ...x,
        };
      });
    console.log("🚀 ~ fetchData ~ parsedRoundData:", parsedRoundData);
    setRoundData(parsedRoundData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getScore = (lineScore) => {
    const total = lineScore.splice(0, currentHole).reduce((acc, score) => acc + score, 0);
    const { par } = holeData[isDay ? "day" : "night"][currentHole];
    const score = total - par;
    if (score === 0) return "E";
    if (score < 0) return `-${Math.abs(score)}`;
    if (score > 0) return `+${score}`;
    return score;
  };
  const updatePlayerScore = (player, change) => {
    // console.log("🚀 ~ updatePlayerScore ~ player, change:", player, change);
    // const newLineScore = [...player.lineScore];
    // console.log("🚀 ~ updatePlayerScore ~ newLineScore:", newLineScore);
    // newLineScore[currentHole - 1] += change;
    // console.log("🚀 ~ updatePlayerScore ~ newLineScore:", newLineScore);
    // setPlayers((prevPlayers) => prevPlayers.map((p) => (p.name === player.name ? { ...p, lineScore: newLineScore } : p)));
  };
  return (
    <div
      style={{
        width: "100%",
        fontFamily: "'azalea', cursive",
        color: "white",
        height: "100vh",
        display: "flex",
        justifyContent: "space-around",
        textAlign: "center",
        backgroundColor: "#2B6649",
      }}>
      <img
        style={{ height: 150, top: 0, right: 0, position: "absolute" }}
        src={`${process.env.PUBLIC_URL}/images/smokehouse/logo.png`}
        alt={"smokehouse"}
      />
      <img src={images[currentHole - 1].original} style={{ borderRadius: 10 }} alt="hole-layout" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}>
        <h1
          style={{
            fontSize: "5rem",
            margin: 0,
          }}>
          Hole {currentHole}
        </h1>
        <h1
          style={{
            fontSize: "5rem",
            margin: 0,
            marginBottom: 50,
          }}>
          Par {currentHole}
        </h1>
        {roundData.map((player, index) => {
          const name = player.first_name + " " + player.last_name;
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}>
              <Avatar sx={{ width: 75, height: 75 }}>
                <img
                  onError={(e) => {
                    e.target.onerror = null; // prevent infinite loop
                    e.target.src = "";
                    e.target.style.backgroundColor = player.picture_link;
                  }}
                  src={`${process.env.PUBLIC_URL}/images/smokehouse/players/${name.replace(" ", "")}.jpg`}
                  alt=""
                  style={{ width: "100%", height: "100%", background: player.color }}
                />
              </Avatar>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <h1
                  style={{
                    fontSize: "2rem",
                    margin: 0,
                    marginRight: "1rem",
                    paddingLeft: 30,
                  }}>
                  {name}
                </h1>
                <h4
                  style={{
                    fontSize: "1.1rem",
                    margin: 0,
                    marginRight: "1rem",
                  }}>
                  {/* ({getScore(player.lineScore)}) */}
                </h4>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <IconButton onClick={() => updatePlayerScore(player, -1)} style={{ color: "white" }} size="large">
                  <RemoveIcon style={{ fontSize: "3rem" }} />
                </IconButton>
                <h1
                  style={{
                    fontSize: "1.5rem",
                    margin: 0,
                    fontFamily: "'scoreboard', cursive",
                    color: "white",
                  }}>
                  {/* {player.lineScore[currentHole - 1]} */}
                </h1>
                <IconButton onClick={() => updatePlayerScore(player, 1)} style={{ color: "white" }} size="large">
                  <AddIcon style={{ fontSize: "3rem" }} />
                </IconButton>
              </div>
            </div>
          );
        })}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 20px" }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#5bc957ff" }}
            onClick={() => setCurrentHole((prev) => (prev < 9 ? prev + 1 : 10))}>
            Previous Hole
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "#5bc957ff" }}
            onClick={() => setCurrentHole((prev) => (prev < 9 ? prev + 1 : 10))}>
            Next Hole
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ScoreCard;
