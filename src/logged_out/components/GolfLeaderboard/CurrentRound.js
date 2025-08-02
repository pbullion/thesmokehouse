import React, { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";
import moment from "moment";

function CurrentRound(props) {
  const { holeData, currentRound } = props;
  const [data, setData] = useState(currentRound);
  const [isDay, setIsDay] = useState(true);
  useEffect(() => {
    const filteredPlayers = Object.fromEntries(Object.entries(currentRound).filter(([key, value]) => value !== null));
    const sortedPlayers = getPlayersSortedByScore(filteredPlayers, false);
    setData(sortedPlayers);
  }, [isDay, holeData, currentRound]);
  const getHoleScore = (hole, score) => {
    if (isDay) {
      const { par } = holeData.day[hole];
      if (score === par) return par;
      else if (score === par + 1) return <span className="score-square">{score}</span>;
      else if (score === par - 1) return <span className="score-circle">{score}</span>;
      else if (score < par - 1)
        return (
          <span className="score-circle-outer">
            <span className="score-circle">{score}</span>
          </span>
        );
      else if (score > par + 1)
        return (
          <span className="outer-square">
            <span className="inner-square">{score}</span>
          </span>
        );
      else {
        return "-";
      }
    } else {
      return "-";
    }
  };
  const fillRemainingHoles = (scores, currentHole) => {
    const result = [];
    for (let i = 1; i <= 9; i++) {
      if (i <= currentHole) {
        result.push(scores[i - 1] ?? "-");
      } else {
        result.push("-");
      }
    }
    return result;
  };
  const getPlayerScoreToPar = (player) => {
    const day = holeData.day;
    let totalPar = 0;
    for (let i = 1; i <= currentRound.current_hole - 1; i++) {
      const hole = day[i];
      if (hole && hole.par) {
        totalPar += hole.par;
      }
    }
    const total = player.scores.reduce((sum, val) => sum + (val === "-" ? 0 : val), 0);
    const score = total - totalPar;
    if (score === 0) return "E";
    if (score > 0) return `+${score}`;
    if (score < 0) return score.toString();
  };
  const getPlayersSortedByScore = (data, highest) => {
    const players = [];
    const { current_hole, id, date } = data;
    Object.keys(data)
      .filter((key) => key.startsWith("player_") && data[key] !== null)
      .forEach((key) => {
        const player = data[key];
        console.log("🚀 ~ getPlayersSortedByScore ~ player:", player);
        const scores = Array.from({ length: current_hole - 1 }, (_, i) => player[`hole${i + 1}`]);
        const total = scores.reduce((sum, val) => sum + val, 0);
        players.push({
          currentHole: current_hole,
          round: id,
          date: date,
          playerName: player.first_name + " " + player.last_name,
          playerID: player.playerID,
          scores: fillRemainingHoles(scores, current_hole),
          total,
        });
      });
    return players.sort((a, b) => a.total - b.total);
  };
  return (
    <div
      style={{
        width: "100%",
        fontFamily: "'azalea', cursive",
        color: "white",
        height: "100vh",
        backgroundColor: "#2B6649",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}>
      <img
        style={{ height: 300, top: 0, left: 0, position: "absolute" }}
        src={`${process.env.PUBLIC_URL}/images/smokehouse/logo.png`}
        alt={"smokehouse"}
      />
      <img
        style={{ height: 300, top: 0, right: 0, position: "absolute" }}
        src={`${process.env.PUBLIC_URL}/images/smokehouse/logo.png`}
        alt={"smokehouse"}
      />
      <h1 style={{ margin: 0, fontSize: "8rem", marginBottom: "150px" }}>Current Round</h1>
      <TableContainer component={Paper} style={{ width: "90%", backgroundColor: "transparent" }}>
        <Table>
          <TableBody>
            {/* Hole Numbers */}
            <TableRow>
              <TableCell style={{ color: "white", fontSize: "2.5rem" }}>
                <strong>Hole</strong>
              </TableCell>
              {[...Array(9)].map((_, idx) => (
                <TableCell key={`hole-${idx}`} align="center" style={{ color: "white", fontSize: "2.5rem" }}>
                  {idx + 1}
                </TableCell>
              ))}
              <TableCell style={{ color: "white", fontSize: "2.5rem" }} align="center">
                <strong>Total</strong>
              </TableCell>
            </TableRow>
            {/* Par Row */}
            <TableRow>
              <TableCell style={{ color: "white", fontSize: "2.5rem" }}>
                <strong>Par</strong>
              </TableCell>
              {Object.keys(holeData[isDay ? "day" : "night"]).map((p, idx) => (
                <TableCell style={{ color: "white", fontSize: "2.5rem" }} key={`par-${idx}`} align="center">
                  {holeData[isDay ? "day" : "night"][p].par}
                </TableCell>
              ))}
              <TableCell style={{ color: "white", fontSize: "2.5rem" }} align="center">
                <strong>27</strong>
              </TableCell>
            </TableRow>
            {/* Player Row */}
            {data?.length > 0 &&
              data.map((player, idx) => {
                return (
                  <TableRow key={`player-${idx}`}>
                    <TableCell style={{ color: "white", fontSize: "3rem" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          onError={(e) => {
                            e.target.onerror = null; // prevent infinite loop
                            e.target.src = "";
                            e.target.style.backgroundColor = player.picture_link;
                          }}
                          src={`${process.env.PUBLIC_URL}/images/smokehouse/players/${player?.playerName.replace(
                            " ",
                            ""
                          )}.jpg`}
                          alt=""
                          style={{ height: 100, borderRadius: "50%", marginRight: 15 }}
                        />
                        <strong>{player?.playerName}</strong>
                      </div>
                    </TableCell>
                    {player?.scores.map((score, idx) => (
                      <TableCell style={{ color: "white", fontSize: "3rem" }} key={`score-${idx}`} align="center">
                        {getHoleScore(idx + 1, score)}
                      </TableCell>
                    ))}
                    <TableCell style={{ color: "white", fontSize: "3rem", textAlign: "right" }} align="center">
                      <strong>
                        {player?.total} ({getPlayerScoreToPar(player)})
                      </strong>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CurrentRound;
