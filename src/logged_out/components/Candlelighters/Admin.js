import * as React from "react";
import CandlelightersLogo from "./pics/candlelighters_logo.png";
import MargLogo from "./pics/marg_logo.png";
import { Typography, Button, Box, Slider, OutlinedInput, TextField } from "@mui/material";
import { useParams } from "react-router-dom";

export default function Candlelighters(props) {
  const { selectCandlelightersAdmin } = props;
  const [judges, setJudges] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [booths, setBooths] = React.useState([]);

  React.useEffect(() => {
    selectCandlelightersAdmin();
  }, [selectCandlelightersAdmin]);

  React.useEffect(() => {
    const urlJudges = `https://sheline-art-website-api.herokuapp.com/candlelighters/judges`;
    // const urlJudges = `http://localhost:3001/candlelighters/judges/${user}`;
    const requestOptionsJudges = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(urlJudges, requestOptionsJudges)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("🚀 ~ .then ~ data:", data);
        const allJudges = data.map((judge) => {
          return {
            ...judge,
            scores: JSON.parse(judge.scores),
          };
        });
        setJudges(allJudges);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
    const url = `https://sheline-art-website-api.herokuapp.com/candlelighters/restaurants`;
    // const url = `http://localhost:3001/candlelighters/restaurants`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(url, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("🚀 ~ .then ~ data:", data);
        setBooths(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const colors = [
    "rgb(0, 181, 204)", // Cyan: Bright and inviting
    "rgb(220, 53, 69)", // Red: Bold and attention-grabbing
    "rgb(40, 167, 69)", // Green: Nature-inspired, easy on thef
    "rgb(255, 87, 34)", // Deep Orange: Warm and energetic
    "rgb(102, 16, 242)", // Purple: Rich and elegant
    "rgb(253, 126, 20)", // Bright Orange: Lively and playful
    "rgb(255, 193, 7)", // Yellow: Cheerful and bright
    "rgb(52, 58, 64)", // Charcoal: Sophisticated and versatile
    "rgb(25, 25, 25)", // Dark Gray: Strong contrast, modern
  ];
  const questions = [
    { id: 1, name: "Best Booth Décor", years: ["2024"] },
    { id: 2, name: "Best Overall Theme", years: ["2024"] },
    { id: 3, name: "Most Festive Bartenders", years: ["2024"] },
    { id: 4, name: "Friendliest Bartenders", years: ["2024"] },
    { id: 5, name: "Most Spirited Award", years: ["2024"] },
    { id: 6, name: "Hot Tamale Award", years: ["2024"] },
    { id: 7, name: "Best Appetizer Presentation", years: ["2024"] },
    { id: 8, name: "Best Cold Appetizer", years: ["2024"] },
    { id: 9, name: "Best Hot Appetizer", years: ["2024"] },
    { id: 10, name: "Best Margarita Presentation", years: ["2024"] },
    { id: 11, name: "Most Unique Margarita Garnish", years: ["2024"] },
    { id: 12, name: "Most Refreshing Margarita", years: ["2024"] },
    { id: 13, name: "Most Unforgettable Margarita", years: ["2024"] },
    { id: 14, name: "Most Buzzworthy Margarita", years: ["2024"] },
    { id: 15, name: "Best Use of Fresh Ingredients", years: ["2024"] },
    { id: 16, name: "Most Exotic Margarita Flavor", years: ["2024"] },
    { id: 17, name: "Smoothest Margarita", years: ["2024"] },
    { id: 18, name: "Most Unique Margarita", years: ["2024"] },
    { id: 19, name: "Best Traditional Margarita Recipe", years: ["2024"] },
    // { id: 20, name: "Veteran Award", years: ["2024"] },
    // { id: 21, name: "Best NEW Restaurant Margarita", years: ["2024"] },
    // { id: 22, name: "Best NEW Restaurant Appetizer", years: ["2024"] },
    // { id: 23, name: "Community Award", years: ["2024"] },
    // { id: 24, name: "Don Julio Critics Choice", years: ["2024"] },
  ];
  const getTopTen = (id) => {
    // console.log("====================================");
    // console.log("🚀 ~ getTopTen ~ id:", id);
    // console.log("🚀 ~ getTopTen ~ booths:", booths);
    // console.log("🚀 ~ getTopTen ~ judges:", judges);
    // console.log("🚀 ~ Candlelighters ~ questions:", questions);
    const scores = [];
    booths.forEach((booth) => {
      let runningScore = 0;
      judges.forEach((judge) => {
        const score = judge.scores[booth.id.toString()].find((question) => question.questionID === id).score;
        runningScore += score;
      });
      scores.push({ name: booth.name, score: runningScore });
    });
    console.log("🚀 ~ getTopTen ~ scores:", scores);
    scores.sort((a, b) => b.score - a.score);
    return scores.map((score, index) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <Typography
            style={{ color: "white", fontFamily: "'Baloo Bhaijaan', cursive", margin: 0, textAlign: "left", fontWeight: 200 }}
            variant="p"
            component="p">
            {score.name}
          </Typography>
          <Typography
            style={{ color: "white", fontFamily: "'Baloo Bhaijaan', cursive", margin: 0, textAlign: "left", fontWeight: 200 }}
            variant="p"
            component="p">
            {score.score}
          </Typography>
        </div>
      );
    });
  };
  const Card = ({ question }) => {
    return (
      <div
        style={{
          display: "flex",
          width: 350,
          height: 450,
          flexDirection: "column",
          backgroundColor: colors[Math.floor(Math.random() * 9)],
          justifyContent: "flex-start",
          alignItems: "center",
          borderRadius: 10,
          margin: 10,
        }}>
        <Typography
          style={{ color: "white", fontFamily: "'Baloo Bhaijaan', cursive", margin: 0, textAlign: "center", fontWeight: 400 }}
          variant="h5"
          component="h5">
          {question.name}
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 10,
          }}>
          {getTopTen(question.id)}
        </div>
      </div>
    );
  };
  return (
    !isLoading && (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100vh",
          flexDirection: "row",
          backgroundColor: "white",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}>
        {questions.map((question) => (
          <Card question={question} />
        ))}
      </div>
    )
  );
}
