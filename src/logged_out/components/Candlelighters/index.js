import * as React from "react";
import CandlelightersLogo from "./pics/candlelighters_logo.png";
import MargLogo from "./pics/marg_logo.png";
import { Typography, Button, Box, Slider, OutlinedInput, TextField } from "@mui/material";
import { useParams } from "react-router-dom";

export default function Candlelighters(props) {
  const { user } = useParams();
  const { selectCandlelighters } = props;
  const [judge, setJudge] = React.useState(null);
  const [selectedBooth, setSelectedBooth] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [finalize, setFinalize] = React.useState(false);
  const [updatedScores, setUpdatedScores] = React.useState(null);
  const [edited, setEdited] = React.useState(false);
  const [booths, setBooths] = React.useState([]);

  React.useEffect(() => {
    selectCandlelighters();
  }, [selectCandlelighters]);

  React.useEffect(() => {
    // if (judge === "null") {
    //   const judge = window.prompt("Enter your Clipboard Number");
    //   setJudge(judge);
    // }
    if (user) {
      const urlJudges = `https://sheline-art-website-api.herokuapp.com/candlelighters/judges/${user}`;
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
          setLoggedIn(true);
          const user = { ...data, scores: JSON.parse(data.scores) };
          console.log("🚀 ~ .then ~ user:", user);
          setJudge(user);
          setUpdatedScores(JSON.parse(data.scores));
        })
        .catch((error) => console.error(error));
    }
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
  const handleSave = async () => {
    const data = { scores: updatedScores, id: judge.id };
    const urlJudges = `https://sheline-art-website-api.herokuapp.com/candlelighters/update-score`;
    // const urlJudges = `http://localhost:3001/candlelighters/update-score`;
    const requestOptionsJudges = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch(urlJudges, requestOptionsJudges)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        return response;
      })
      .then((data) => {
        console.log("🚀 ~ .then ~ data:", data);
        if (data.status === 200) {
          setEdited(false);
          setSelectedBooth(null);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleLogin = () => {
    const user = window.prompt("Enter your Clipboard Number");
    if (user) {
      const urlJudges = `https://sheline-art-website-api.herokuapp.com/candlelighters/judges/${user}`;
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
          setLoggedIn(true);
          const user = { ...data, scores: JSON.parse(data.scores) };
          console.log("🚀 ~ .then ~ user:", user);
          setJudge(user);
          setUpdatedScores(JSON.parse(data.scores));
        })
        .catch((error) => console.error(error));
    }
  };
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
  const getRemaining = (booth) => {
    console.log("🚀 ~ getRemaining ~ booth:", booth);
    const { id } = booth;
    console.log("🚀 ~ getRemaining ~ id:", id);
    console.log("🚀 ~ getRemaining ~ updatedScores:", updatedScores);
    const boothScores = updatedScores[id.toString()];
    let remaining = 0;
    boothScores.forEach((x) => x.score === 0 && remaining++);
    if (remaining === 0) {
      return "Done";
    }
    return remaining + " Remaining";
  };
  return loggedIn && judge ? (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        paddingBottom: 100,
        flexDirection: "column",
        backgroundColor: "white",
        justifyContent: "flex-start",
        alignItems: "center",
      }}>
      <div style={{ marginTop: 5, display: "flex", justifyContent: "space-around" }}>
        <div style={{ marginTop: 20, display: "flex", flexDirection: "column" }}>
          <Typography
            style={{ fontFamily: "'Baloo Bhaijaan', cursive", margin: 0, textAlign: "left", marginLeft: 10, fontWeight: 400 }}
            variant="h6"
            component="h2">
            {judge.name}
          </Typography>
          {selectedBooth && (
            <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
              <Button
                size="small"
                variant="contained"
                style={{
                  marginTop: 5,
                  marginLeft: 10,
                  backgroundColor: "#81C841",
                }}
                onClick={() => setSelectedBooth(null)}>
                Back
              </Button>
            </div>
          )}
          {/* {!selectedBooth && !finalize && (
            <div style={{ display: "flex", width: "100%", justifyContent: "flex-start" }}>
              <Button
                size="small"
                variant="contained"
                style={{
                  marginTop: 5,
                  marginLeft: 10,
                  backgroundColor: "#81C841",
                }}
                onClick={() => setFinalize(true)}>
                FINALIZE
              </Button>
            </div>
          )} */}
          {/* <Typography style={{ fontFamily: "'Baloo Bhaijaan', cursive", margin: 0, textAlign: "right", fontWeight: 400 }} variant="h6" component="h2">
            {judge.type}
          </Typography> */}
        </div>
        <img src={MargLogo} alt="MargLogo" style={{ width: "25%" }} />
      </div>

      {selectedBooth && (
        <div
          style={{
            display: "flex",
            width: "98%",
            flexDirection: "column",
            backgroundColor: "white",
            justifyContent: "flex-start",
            alignItems: "center",
          }}>
          <Typography
            style={{ fontFamily: "'Baloo Bhaijaan', cursive", margin: 0, textAlign: "center", fontWeight: 400 }}
            variant="h3"
            component="h2">
            {selectedBooth.name}
          </Typography>
          {questions.map((question, idx) => {
            return (
              <div style={{ padding: 10, marginTop: 10, width: "100%" }} onClick={() => {}}>
                <Typography
                  style={{ fontFamily: "'Baloo Bhaijaan', cursive", margin: 0, textAlign: "center", fontWeight: 400 }}
                  variant="h6"
                  component="h2">
                  {question.name}
                </Typography>
                <Typography
                  style={{ fontFamily: "'Baloo Bhaijaan', cursive", margin: 0, textAlign: "center", fontWeight: 400 }}
                  variant="h6"
                  component="h2">
                  {updatedScores[selectedBooth.id.toString()].find((x) => x.questionID === question.id).score} / 10
                </Typography>
                <Slider
                  aria-label="Small steps"
                  defaultValue={1}
                  step={0.5}
                  marks
                  min={0}
                  max={10}
                  valueLabelDisplay="auto"
                  value={updatedScores[selectedBooth.id.toString()].find((x) => x.questionID === question.id).score}
                  onChange={(e, value) => {
                    console.log("🚀 ~ {questions.map ~ selectedBooth:", selectedBooth);
                    updatedScores[selectedBooth.id.toString()].find((x) => x.questionID === question.id).score = value;
                    setUpdatedScores({ ...updatedScores });
                    setEdited(true);
                  }}
                />
                {/* <TextField
                  style={{ width: "100%" }}
                  id="outlined-textarea"
                  multiline
                  value={boothScore.find((booth) => booth.id === x.id).notes}
                  onChange={(e, value) => {
                    setBoothScore((prev) => prev.map((y, i) => (y.id === x.id ? { ...y, notes: value } : y)));
                  }}
                />  */}
              </div>
            );
          })}
          <Button
            size="large"
            variant="contained"
            style={{
              margin: 10,
              marginBottom: 30,
              backgroundColor: "#81C841",
            }}
            disabled={!edited}
            onClick={() => handleSave()}>
            Save
          </Button>
        </div>
      )}
      {finalize && (
        <div>
          <div
            style={{
              display: "flex",
              width: "98%",
              flexDirection: "column",
              backgroundColor: "white",
              justifyContent: "flex-start",
              alignItems: "center",
            }}>
            {questions.map((x, idx) => {
              return (
                <div style={{ padding: 10, marginTop: 10 }} onClick={() => {}}>
                  <Typography
                    style={{ color: "black", fontFamily: "'Baloo Bhaijaan', cursive", margin: 0, textAlign: "center", fontWeight: 400 }}
                    variant="h6"
                    component="h2">
                    {x.question}
                  </Typography>
                  <div>
                    {[1, 2, 3, 4, 5].map((y, idx) => {
                      return (
                        <Typography
                          style={{ color: "black", fontFamily: "'Baloo Bhaijaan', cursive", margin: 0, textAlign: "center", fontWeight: 400 }}
                          variant="h6"
                          component="h2">
                          {y}
                        </Typography>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <Button
              size="large"
              variant="contained"
              style={{
                margin: 10,
                marginBottom: 30,
                backgroundColor: "#81C841",
              }}
              onClick={() => {}}>
              Save
            </Button>
          </div>
        </div>
      )}
      {!selectedBooth && !finalize && booths.length > 0 && updatedScores && (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100vh",
            flexDirection: "column",
            backgroundColor: "white",
            justifyContent: "flex-start",
            alignItems: "center",
          }}>
          {booths.map((booth, idx) => {
            return (
              <div
                style={{ backgroundColor: idx % 2 === 0 ? "#54AFF2" : "#81C841", width: "90%", padding: 10, marginTop: 10, borderRadius: 90 }}
                onClick={() => {
                  setSelectedBooth(booth);
                }}>
                <Typography
                  style={{ color: "white", fontFamily: "'Baloo Bhaijaan', cursive", margin: 0, textAlign: "center", fontWeight: 400 }}
                  variant="h5"
                  component="h5">
                  {booth.name}
                </Typography>
                <Typography
                  style={{ color: "white", fontFamily: "'Baloo Bhaijaan', cursive", margin: 0, textAlign: "center", fontWeight: 200 }}
                  variant="h6"
                  component="h6">
                  {getRemaining(booth)}
                </Typography>
              </div>
            );
          })}
        </div>
      )}
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        flexDirection: "column",
        backgroundColor: "white",
        justifyContent: "flex-start",
        alignItems: "center",
      }}>
      <img src={MargLogo} alt="MargLogo" style={{ width: "75%", marginTop: 20 }} />
      <Typography style={{ fontFamily: "'Baloo Bhaijaan', cursive", fontWeight: 400, textAlign: "center" }} variant="h6" component="h2">
        Questions Call
      </Typography>
      <Typography style={{ fontFamily: "'Baloo Bhaijaan', cursive", fontWeight: 400, textAlign: "center" }} variant="h6" component="h2">
        Someone at Candlelighters
      </Typography>
      <Typography style={{ fontFamily: "'Baloo Bhaijaan', cursive", fontWeight: 400, textAlign: "center" }} variant="h6" component="h2">
        (409) 833-2668
      </Typography>
      <Button
        size="large"
        variant="contained"
        style={{
          margin: 10,
          marginBottom: 30,
          backgroundColor: "#81C841",
        }}
        onClick={() => handleLogin()}>
        Login
      </Button>
    </div>
  );
}
