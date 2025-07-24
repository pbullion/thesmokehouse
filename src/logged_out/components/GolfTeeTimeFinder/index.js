import React, { useState } from "react";
import { Box, TextField, Select, MenuItem, Typography, Button, InputLabel } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { format, addDays } from "date-fns";

function InputForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [numPlayers, setNumPlayers] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(addDays(new Date(), 1));
  const [message, setMessage] = useState("");
  const [course, setCourse] = useState("memorial");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        phoneNumber,
        startTime: format(startTime, "HH:mm"),
        endTime: format(endTime, "HH:mm"),
        numPlayers,
        name,
        email,
        date: format(date, "MM-dd-yyyy"),
        course,
      };
      const response = await fetch("https://sheline-art-website-api.herokuapp.com/golf/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      if (response.ok) {
        setMessage("Success! Your tee time has been scheduled.");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Box
      style={{ marginTop: 75 }}
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Typography
          style={{
            textAlign: "center",
            fontFamily: "'Baloo Bhaijaan', cursive",
            fontWeight: 400,
            margin: 0,
            marginBottom: 10,
            textAlign: "center",
          }}
          variant="h5"
          component="h2">
          Tee Time Tracker
        </Typography>
        <InputLabel id="demo-simple-select-label">Course</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          style={{ width: "25ch", color: "black" }}
          value={course}
          onChange={(e) => setCourse(e.target.value)}>
          <MenuItem value={"memorial"}>Memorial</MenuItem>
          <MenuItem value={"gus wortham"}>Gus Wortham</MenuItem>
        </Select>
        <TextField
          style={{ width: "25ch" }}
          required
          id="outlined-required"
          label="Name"
          autoComplete="name"
          defaultValue=""
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          style={{ width: "25ch" }}
          required
          id="outlined-required"
          label="Email"
          autoComplete="email"
          defaultValue=""
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          style={{ width: "25ch" }}
          required
          id="outlined-required"
          label="Phone Number"
          autoComplete="tel"
          defaultValue=""
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns} style={{ width: "25ch" }}>
          <DatePicker
            style={{ width: "100%" }}
            value={date}
            onChange={(value) => setDate(value)}
            label="Date"
          />
          <TimePicker
            style={{ width: "100%" }}
            onChange={(value) => setStartTime(value)}
            label="Start Time"
          />
          <TimePicker
            style={{ width: "100%" }}
            onChange={(value) => setEndTime(value)}
            label="End Time"
          />
        </LocalizationProvider>
        <InputLabel id="demo-simple-select-label">Num. of Players</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          style={{ width: "25ch", color: "black" }}
          value={numPlayers}
          onChange={(e) => setNumPlayers(e.target.value)}>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
        <Button
          onClick={handleSubmit}
          width="100%"
          variant="contained"
          color="secondary"
          type="submit"
          size="large"
          sx={[{ mt: 3 }]}
          disabled={false}>
          Start
        </Button>
        <p style={{ textAlign: "center", fontSize: 10 }}>
          By pressing 'Start', I consent to provide my name, email address, and phone number to
          Mancave Displays and receive a one-time message. I understand that my information will be
          used solely for this purpose and will be deleted immediately after the message is sent.
        </p>
        <div>{message}</div>
      </div>
    </Box>
  );
}

export default InputForm;
