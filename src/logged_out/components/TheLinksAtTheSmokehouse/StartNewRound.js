import React, { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useParams, useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { set } from "date-fns";
import { Button } from "react-bootstrap";
function StartNewRound(props) {
  const history = useHistory();
  const { holeData } = props;
  const [isDay, setIsDay] = useState("day");
  const [players, setPlayers] = useState([]);
  const [names, setNames] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showAddNewPlayer, setShowAddNewPlayer] = useState(false);

  const handleChange = (event, newAlignment) => {
    setIsDay(newAlignment);
  };
  const fetchPlayers = async () => {
    const response = await fetch("https://sheline-art-website-api.herokuapp.com/the-links-at-the-smokehouse");
    const data = await response.json();
    const { players } = data;
    setPlayers(
      players.sort((a, b) => {
        if (a.last_name === "Bullion") return -1;
        if (b.last_name === "Bullion") return 1;
        return a.last_name.localeCompare(b.last_name);
      })
    );
  };
  useEffect(() => {
    fetchPlayers();
  }, [isDay, holeData]);
  function getRandomColor() {
    const colors = ["red", "blue", "lightgreen", "orange", "purple", "yellow", "pink", "brown", "gray", "black"];
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
  }
  const handleStartRound = async () => {
    const players = selectedPlayers.map(
      (p) =>
        `{"playerID":${p.id},"hole1":0,"hole2":0,"hole3":0,"hole4":0,"hole5":0,"hole6":0,"hole7":0,"hole8":0,"hole9":0,"playoff1":0,"playoff2":0,"playoff3":0}`
    );
    const url = "https://sheline-art-website-api.herokuapp.com/the-links-at-the-smokehouse/start-new-round";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isDay, players }),
    });
    const data = await response.json();
    console.log("🚀 ~ handleStartRound ~ data:", data);
    const { id } = data;
    history.push(`/the-links-at-the-smokehouse/scorecard/${id}`);
  };
  const handleAddNewPlayer = async () => {
    const newPlayer = {
      firstName,
      lastName,
      picture_link: getRandomColor(),
    };
    const url = "https://sheline-art-website-api.herokuapp.com/the-links-at-the-smokehouse/add-player";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlayer),
    });
    const data = await response.json();
    fetchPlayers();
    setShowAddNewPlayer(false);
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
        style={{ height: "9rem", top: 0, left: 0, position: "absolute" }}
        src={`${process.env.PUBLIC_URL}/images/smokehouse/logo.png`}
        alt={"smokehouse"}
      />
      <img
        style={{ height: "9rem", top: 0, right: 0, position: "absolute" }}
        src={`${process.env.PUBLIC_URL}/images/smokehouse/logo.png`}
        alt={"smokehouse"}
      />
      <h1 style={{ margin: 0, fontSize: "4.5rem" }}>Let's Pound Some Balls</h1>
      <ToggleButtonGroup
        value={isDay}
        style={{ backgroundColor: "white" }}
        exclusive
        onChange={handleChange}
        aria-label="Platform">
        <ToggleButton value="day">Day Course</ToggleButton>
        <ToggleButton value="night">Night Course</ToggleButton>
      </ToggleButtonGroup>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#5bc957ff", color: "white", padding: "10px 30px", marginTop: 20, borderRadius: 10 }}
          onClick={() => {
            showAddNewPlayer ? setShowAddNewPlayer(false) : setShowAddNewPlayer(true);
          }}>
          <p style={{ fontFamily: "'Baloo Bhaijaan', cursive", fontSize: 20 }}>New Player</p>
        </Button>
        <Button
          variant="contained"
          disabled={selectedPlayers.length === 0}
          style={{ backgroundColor: "#5bc957ff", color: "white", padding: "10px 30px", marginTop: 20, borderRadius: 10 }}
          onClick={() => {
            handleStartRound();
          }}>
          <p style={{ fontFamily: "'Baloo Bhaijaan', cursive", fontSize: 20 }}>START ROUND</p>
        </Button>
      </div>
      {showAddNewPlayer && (
        <>
          {" "}
          <Box component="form" sx={{ "& > :not(style)": { m: 1, width: "25ch" } }} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
              label="First Name"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                color: "white",
                input: { color: "white" },
                label: { color: "white" },
              }}
              style={{ color: "white" }}
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                  color: "white",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                  color: "white",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                  color: "white",
                },
                color: "white",
                label: { color: "white" },
                input: { color: "white" },
              }}
            />
          </Box>
          <Button
            variant="contained"
            style={{ backgroundColor: "#5bc957ff", color: "white", padding: 10, borderRadius: 10 }}
            onClick={() => {
              handleAddNewPlayer();
            }}>
            <p style={{ fontFamily: "'Baloo Bhaijaan', cursive", fontSize: 20 }}>Add New Player</p>
          </Button>
        </>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 15,
          width: "100%",
          flexWrap: "wrap",
        }}>
        {players.map((player) => {
          const name = player.first_name + " " + player.last_name;
          return (
            <div
              key={player.id}
              onClick={() => {
                if (selectedPlayers.includes(player)) {
                  setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id));
                } else {
                  setSelectedPlayers([...selectedPlayers, player]);
                }
              }}
              style={{
                width: 175,
                justifyContent: "center",
                alignContent: "center",
                padding: 15,
                margin: 5,
                borderRadius: 10,
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                backgroundColor: selectedPlayers.includes(player) ? "#5bc957ff" : "",
              }}>
              <Avatar sx={{ width: 100, height: 100 }}>
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
              <div style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
                <h4 style={{ fontSize: "2rem", margin: 0 }}>{player.first_name}</h4>
                <h4 style={{ fontSize: "2rem", margin: 0 }}>{player.last_name}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StartNewRound;
