import React, { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CourseRecord from "./CourseRecord";
import CourseRecordHighScore from "./CourseRecordHighScore";
import CurrentRound from "./CurrentRound";
import CourseRecordHighest from "./CourseRecordHighest";
import CourseRecordLowest from "./CourseRecordLowest";
import { IconButton, Button } from "@mui/material";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { use } from "react";

function Recap(props) {
  const [, setPlayers] = useState([]);
  const [, setScores] = useState([]);
  const [roundInProgress, setRoundInProgress] = useState(false);
  const [currentRound, setCurrentRound] = useState(null);
  const [courseRecordData, setCourseRecordData] = useState(null);
  const [highScoreData, setHighScoreData] = useState(null);
  const [highestScoresData, setHighestScoresData] = useState(null);
  const [lowestScoresData, setLowestScoresData] = useState(null);
  const [loading, setLoading] = useState(true);
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
    try {
      setLoading(true);
      console.log("-----------------------------");
      const response = await fetch("https://sheline-art-website-api.herokuapp.com/the-links-at-the-smokehouse");
      const data = await response.json();
      const { scores, players } = data;
      setPlayers(players);
      const parsedScoreData = scores
        .map((entry) => {
          const newEntry = { ...entry };
          for (let i = 1; i <= 10; i++) {
            const key = `player_${i}`;
            if (newEntry[key]) {
              try {
                newEntry[key] = JSON.parse(newEntry[key]);
              } catch (e) {}
            }
          }
          if (newEntry.in_progress) {
            setCurrentRound(newEntry);
            setRoundInProgress(true);
          }
          return newEntry;
        })
        .filter((x) => x.final);
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
      setHighestScoresData(playersSortedByScoreHighest.reverse().splice(0, 4));

      // Lowest
      const playersSortedByScoreLowest = getPlayersSortedByScore(parsedScoreData, false);
      playersSortedByScoreLowest.forEach((player, index) => {
        const { first_name: firstName, last_name: lastName } = players?.find((p) => p.id === player.playerID);
        playersSortedByScoreLowest[index].playerName = `${firstName} ${lastName}`;
      });
      setLowestScoresData(playersSortedByScoreLowest.reverse().splice(0, 4));
      setLoading(false);
    } catch (error) {
      console.error("🚀 ~ fetchData ~ error:", error);
      setLoading(false);
    } finally {
      console.log("in the fianlly");
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (roundInProgress) {
    //   setInterval(() => {
    //     fetchData();
    //     console.log("fetching");
    //   });
    //   fetchData();
    // }
    fetchData();
  }, [roundInProgress]);
  if (loading) {
    return null;
  } else if (roundInProgress) {
    return <CurrentRound currentRound={currentRound} holeData={props.holeData} />;
  } else {
    return (
      <Carousel autoPlay={true} animation="slide" indicators={false} interval={10000} stopAutoPlayOnHover={false} show>
        <CourseRecord holeData={props.holeData} courseRecordData={courseRecordData} />
        <CourseRecordHighScore holeData={props.holeData} courseRecordData={highScoreData} />
        <CourseRecordHighest holeData={props.holeData} courseRecordData={highestScoresData} />
        <CourseRecordLowest holeData={props.holeData} courseRecordData={lowestScoresData} />
      </Carousel>
    );
  }
}

export default Recap;
