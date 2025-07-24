import React from "react";

const BottleLevel = ({ fillPercent }) => {
  const containerStyle = {
    width: "20px",
    height: "80px",
    border: "2px solid #444",
    borderRadius: "20px",
    background: "linear-gradient(to top, #f0f0f0, #ccc)",
    position: "relative",
    overflow: "hidden",
    margin: 5,
    boxShadow: "inset 0 0 5px rgba(0,0,0,0.3)",
  };
  const getColor = (percent) => {
    if (percent > 75) return "#2ecc71"; // Green
    if (percent > 50) return "#f1c40f"; // Yellow
    return "#e74c3c"; // Red
  };
  const fillStyle = {
    position: "absolute",
    bottom: 0,
    width: "100%",
    background: getColor(fillPercent),
    transition: "height 0.3s ease",
    height: `${fillPercent}%`,
  };

  return (
    <div style={containerStyle}>
      <div style={fillStyle} />
    </div>
  );
};

export default BottleLevel;
