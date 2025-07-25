import React, { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CourseRecord from "./CourseRecord";
import CourseRecordHighScore from "./CourseRecordHighScore";
import CourseRecordHighest from "./CourseRecordHighest";
import CourseRecordLowest from "./CourseRecordLowest";
import { IconButton, Button } from "@mui/material";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { use } from "react";

function Recap(props) {
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState([]);
  const [courseRecordData, setCourseRecordData] = useState(null);
  const [highScoreData, setHighScoreData] = useState(null);
  const [highestScoresData, setHighestScoresData] = useState(null);
  const [lowestScoresData, setLowestScoresData] = useState(null);
  const getLowestTotalPlayer = (data) => {
    let lowest = {
      playerID: null,
      total: Infinity,
      date: null,
      scores: [],
    };
    for (const match of data) {
      for (let i = 1; i <= 10; i++) {
        const player = match[`player_${i}`];
        if (player) {
          const scores = [];
          for (let h = 1; h <= 9; h++) {
            scores.push(player[`hole${h}`] ?? 0);
          }
          const total = scores.reduce((sum, s) => sum + s, 0);

          if (total < lowest.total) {
            lowest = {
              playerID: player.playerID,
              total,
              date: match.date,
              scores,
            };
          }
        }
      }
    }
    return lowest;
  };
  const getHighestTotalPlayer = (data) => {
    let highest = {
      playerID: null,
      total: -Infinity,
      date: null,
      scores: [],
    };

    for (const match of data) {
      for (let i = 1; i <= 10; i++) {
        const player = match[`player_${i}`];
        if (player) {
          const scores = [];
          for (let h = 1; h <= 9; h++) {
            scores.push(player[`hole${h}`] ?? 0);
          }
          const total = scores.reduce((sum, val) => sum + val, 0);

          if (total > highest.total) {
            highest = {
              playerID: player.playerID,
              total,
              date: match.date,
              scores,
            };
          }
        }
      }
    }

    return highest;
  };
  const getPlayersSortedByScore = (data, highest) => {
    const players = [];
    data.forEach((round) => {
      for (let i = 1; i <= 10; i++) {
        const player = round[`player_${i}`];
        if (player) {
          const scores = [];
          for (let h = 1; h <= 9; h++) {
            scores.push(player[`hole${h}`] ?? 0);
          }
          const total = scores.reduce((sum, val) => sum + val, 0);
          players.push({
            round: round.id,
            date: round.date,
            playerID: player.playerID,
            scores,
            total,
          });
        }
      }
    });
    return highest ? players.sort((a, b) => a.total - b.total) : players.sort((a, b) => b.total - a.total);
  };
  const fetchData = async () => {
    const response = await fetch("https://sheline-art-website-api.herokuapp.com/the-links-at-the-smokehouse");
    const data = await response.json();
    const { scores, players } = data;
    setPlayers(players);
    const parsedScoreData = scores.map((entry) => {
      const newEntry = { ...entry };
      for (let i = 1; i <= 10; i++) {
        const key = `player_${i}`;
        if (newEntry[key]) {
          try {
            newEntry[key] = JSON.parse(newEntry[key]);
          } catch (e) {
            console.warn(`Could not parse ${key} in entry ID ${entry.id}`);
          }
        }
      }
      return newEntry;
    });
    setScores(parsedScoreData);
    const result = getLowestTotalPlayer(parsedScoreData);
    const { first_name, last_name } = players?.find((p) => p.id === result.playerID);
    result.playerName = `${first_name} ${last_name}`;
    setCourseRecordData(result);
    const highestResult = getHighestTotalPlayer(parsedScoreData);
    const { first_name: highestFirstName, last_name: highestLastName } = players?.find(
      (p) => p.id === highestResult.playerID
    );
    highestResult.playerName = `${highestFirstName} ${highestLastName}`;
    setHighScoreData(highestResult);

    // Highest
    const playersSortedByScoreHighest = getPlayersSortedByScore(parsedScoreData, true);
    playersSortedByScoreHighest.forEach((player, index) => {
      const { first_name: firstName, last_name: lastName } = players?.find((p) => p.id === player.playerID);
      playersSortedByScoreHighest[index].playerName = `${firstName} ${lastName}`;
    });
    console.log("🚀 ~ fetchData ~ playersSortsdfsdfsdfsdfsdfsdfsdfedByScoreHighest:", playersSortedByScoreHighest);
    setHighestScoresData(playersSortedByScoreHighest.reverse().splice(0, 4));

    // Lowest
    const playersSortedByScoreLowest = getPlayersSortedByScore(parsedScoreData, false);
    playersSortedByScoreLowest.forEach((player, index) => {
      const { first_name: firstName, last_name: lastName } = players?.find((p) => p.id === player.playerID);
      playersSortedByScoreLowest[index].playerName = `${firstName} ${lastName}`;
    });
    console.log("🚀 ~ fetchData ~ playersSortedByScoreLowest:", playersSortedByScoreLowest);
    setLowestScoresData(playersSortedByScoreLowest.reverse().splice(0, 4));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Carousel autoPlay={true} animation="slide" indicators={false} interval={5000} stopAutoPlayOnHover={false} show>
      <CourseRecord holeData={props.holeData} courseRecordData={courseRecordData} />
      <CourseRecordHighScore holeData={props.holeData} courseRecordData={highScoreData} />
      <CourseRecordHighest holeData={props.holeData} courseRecordData={highestScoresData} />
      <CourseRecordLowest holeData={props.holeData} courseRecordData={lowestScoresData} />
    </Carousel>
  );
}

export default Recap;
