import React, { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton, Button } from "@mui/material";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";
import moment from "moment";

function CourseRecord(props) {
  const { holeData, courseRecordData } = props;
  console.log("🚀 ~ CourseRecord ~ courseRecordData:", courseRecordData);
  const [isDay, setIsDay] = useState(true);
  useEffect(() => {}, [isDay, holeData]);
  const getHoleScore = (hole, score) => {
    if (isDay) {
      const par = holeData.day[hole].par;
      if (score === par) return par;
      if (score === par + 1) return <span className="score-square">{score}</span>;
      if (score === par - 1) return <span className="score-circle">{score}</span>;
      if (score === par - 2) return <span className="score-circle">{score}</span>;
      if (score > par + 1)
        return (
          <span className="outer-square">
            <span className="inner-square">{score}</span>
          </span>
        );
    } else {
      return holeData.night[hole].score;
    }
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
      <h1 style={{ margin: 0, fontSize: "6rem" }}>Course Record</h1>
      <div>
        <img
          style={{ height: 300, borderRadius: "50%" }}
          src={`https://thelinksatthesmokehouse.s3.us-east-1.amazonaws.com/profile_pics/${courseRecordData?.playerName.replace(
            " ",
            ""
          )}.jpg`}
          alt={"profilePic"}
        />
        <h1 style={{ margin: 0, fontSize: "8rem" }}>{courseRecordData?.playerName}</h1>
      </div>
      <h1 style={{ margin: 0, fontSize: "5.5rem" }}>{moment(courseRecordData?.date).format("MMMM Do, YYYY")}</h1>
      <TableContainer component={Paper} style={{ width: "80%", backgroundColor: "transparent" }}>
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
            <TableRow>
              <TableCell style={{ color: "white", fontSize: "3rem" }}>
                <strong>{courseRecordData?.playerName}</strong>
              </TableCell>
              {courseRecordData?.scores.map((score, idx) => (
                <TableCell style={{ color: "white", fontSize: "3rem" }} key={`score-${idx}`} align="center">
                  {getHoleScore(idx + 1, score)}
                </TableCell>
              ))}
              <TableCell style={{ color: "white", fontSize: "3rem" }} align="center">
                <strong>
                  {courseRecordData?.total} ({courseRecordData?.total - 27})
                </strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CourseRecord;
