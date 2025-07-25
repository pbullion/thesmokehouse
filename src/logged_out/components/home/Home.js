import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

const containerStyle = {
  position: "relative",
  backgroundImage: `url(/images/smokehouse_background.jpg)`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  width: "100%",
  color: "white",
};

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 1,
};

const contentStyle = {
  position: "relative",
  zIndex: 2,
  height: "100%",
};

function Home(props) {
  const { selectHome } = props;
  const history = useHistory();

  useEffect(() => {
    selectHome();
  }, [selectHome]);
  return (
    <div style={containerStyle}>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            height: "100%",
          }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#5bc957ff", color: "white", width: 425, padding: 10, borderRadius: 10 }}
              onClick={() => {
                history.push(`/smokehouseStock`);
              }}>
              <p style={{ fontFamily: "'Baloo Bhaijaan', cursive", fontSize: 20 }}>Check / Update the Kitchen Stock</p>
            </Button>
          </div>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#5bc957ff", color: "white", width: 425, padding: 10, borderRadius: 10 }}
              onClick={() => {
                history.push(`/new-round`);
              }}>
              <p style={{ fontFamily: "'Baloo Bhaijaan', cursive", fontSize: 20 }}>Play Golf</p>
            </Button>
          </div>
          <Button
            variant="contained"
            style={{ backgroundColor: "#5bc957ff", color: "white", width: 425, padding: 10, borderRadius: 10 }}
            onClick={() => {
              history.push(`/golf-leaderboard`);
            }}>
            <p style={{ fontFamily: "'Baloo Bhaijaan', cursive", fontSize: 20 }}>Golf Leaderboard</p>
          </Button>
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  selectHome: PropTypes.func.isRequired,
};

export default Home;
