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
  const images = Array.from({ length: 9 }, (_, i) => ({
    original: `${process.env.PUBLIC_URL}/images/smokehouse/holes/${i + 1}.png`,
  }));
  const [holeData, setHoleData] = useState({
    day: {
      1: { par: 2 },
      2: { par: 3 },
      3: { par: 4 },
      4: { par: 3 },
      5: { par: 4 },
      6: { par: 2 },
      7: { par: 3 },
      8: { par: 3 },
      9: { par: 3 },
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
  useEffect(() => {}, [roundData]);
  const goToNextHole = async () => {
    try {
      console.log("🚀 ~ goToNextHole ~ roundData:", roundData);
      const allTheData = { current_hole: currentHole + 1, players: roundData };
      console.log("🚀 ~ goToNextHole ~ allTheData:", allTheData);
      const response = await fetch(
        `https://sheline-art-website-api.herokuapp.com/the-links-at-the-smokehouse/update-score/${props.roundID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(allTheData),
        }
      );
      const data = await response.json();
      const { round } = data;
      const parsedRoundData = Object.entries(round[0])
        .filter(([key, value]) => key.startsWith("player_") && value !== null)
        .map(([key, value]) => ({
          playerKey: key,
          ...JSON.parse(value),
        }));
      parsedRoundData.map((x) => {
        const newData = {
          ...x,
          [`hole${currentHole + 1}`]: holeData.day[currentHole].par,
        };
        return newData;
      });
      setRoundData((prev) => parsedRoundData);
      setCurrentHole((prev) => (prev < 9 ? prev + 1 : 10));
    } catch (error) {}
  };
  const fetchData = async () => {
    const response = await fetch(
      `https://sheline-art-website-api.herokuapp.com/the-links-at-the-smokehouse/round/${props.roundID}`
    );
    const data = await response.json();
    const { players, round } = data;
    const parsedRoundData = Object.entries(round[0])
      .filter(([key, value]) => key.startsWith("player_") && value !== null)
      .map(([key, value]) => ({
        playerKey: key,
        ...JSON.parse(value),
      }))
      .map((x) => {
        const player = players.find((p) => p.id === x.playerID);
        return {
          ...player,
          ...x,
        };
      });
    setRoundData(parsedRoundData);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        style={
          roundData.length > 5
            ? { height: 200, bottom: 0, left: 0, position: "absolute", display: currentHole === 3 ? "none" : "block" }
            : { height: 150, top: 0, right: 0, position: "absolute" }
        }
        src={`${process.env.PUBLIC_URL}/images/smokehouse/logo.png`}
        alt={"smokehouse"}
      />
      <div
        style={{ position: "absolute", top: "52vh", left: "17vw", color: "green", backgroundColor: "white", padding: 10 }}>
        <h3 style={{ margin: 0 }}>Course Record</h3>
        <h3 style={{ margin: 0 }}>John Hill (-4)</h3>
      </div>
      <img src={images[currentHole - 1].original} style={{ borderRadius: 10, height: "100vh" }} alt="hole-layout" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}>
        <div
          style={{
            display: "flex",
            flexDirection: roundData.length > 5 ? "row" : "column",
            alignContent: "center",
            justifyContent: "center",
            marginBottom: roundData.length > 5 ? 20 : 0,
          }}>
          <h1
            style={{
              fontSize: roundData.length > 5 ? "3rem" : "5rem",
              lineHeight: 1.0,
              margin: 0,
            }}>
            Hole {currentHole}
          </h1>
          <h1
            style={{
              fontSize: roundData.length > 5 ? "3rem" : "5rem",
              lineHeight: 1.0,
              margin: 0,
              marginBottom: 10,
              marginLeft: roundData.length > 5 ? 40 : 0,
            }}>
            Par {holeData[isDay ? "day" : "night"][currentHole].par}
          </h1>
        </div>
        {roundData.map((player, index) => {
          const name = player.first_name + " " + player.last_name;
          const totalScore = Object.keys(player)
            .filter((key) => key.startsWith("hole"))
            .reduce((acc, key) => acc + (player[key] || 0), 0);
          const toPar = totalScore - 27;
          const formattedScore = toPar > 0 ? `+${toPar}` : toPar === 0 ? "Even" : toPar;
          return (
            <div
              key={index}
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
                    e.target.onerror = null;
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
                  flexDirection: "column",
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
                    fontSize: "1.5rem",
                    margin: 0,
                    marginRight: "1rem",
                  }}>
                  {formattedScore}
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
                <IconButton
                  onClick={() =>
                    setRoundData((prev) =>
                      prev.map((p) =>
                        p.playerKey === player.playerKey
                          ? { ...p, [`hole${currentHole}`]: Math.max(0, (p[`hole${currentHole}`] || 0) - 1) }
                          : p
                      )
                    )
                  }
                  style={{ color: "white" }}
                  size="large">
                  <RemoveIcon style={{ fontSize: "3rem" }} />
                </IconButton>
                <h1
                  style={{
                    fontSize: "1.5rem",
                    margin: 0,
                    fontFamily: "'scoreboard', cursive",
                    color: "white",
                  }}>
                  {player[`hole${currentHole}`] || 0}
                </h1>
                <IconButton
                  onClick={() =>
                    setRoundData((prev) =>
                      prev.map((p) =>
                        p.playerKey === player.playerKey
                          ? { ...p, [`hole${currentHole}`]: Math.max(0, (p[`hole${currentHole}`] || 0) + 1) }
                          : p
                      )
                    )
                  }
                  style={{ color: "white" }}
                  size="large">
                  <AddIcon style={{ fontSize: "3rem" }} />
                </IconButton>
              </div>
            </div>
          );
        })}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 20px",
            bottom: roundData.length > 5 ? 40 : "auto",
            left: roundData.length > 5 ? 150 : "auto",
            position: roundData.length > 5 ? "absolute" : "relative",
          }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#5bc957ff" }}
            onClick={() => setCurrentHole((prev) => (prev < 9 ? prev - 1 : 10))}>
            Previous Hole
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "#5bc957ff", marginLeft: roundData.length > 5 ? 30 : "auto" }}
            onClick={() => goToNextHole()}>
            {currentHole < 9 ? `Next Hole` : "Finish Round"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ScoreCard;
