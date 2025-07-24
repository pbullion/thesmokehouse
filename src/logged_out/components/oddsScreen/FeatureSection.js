import React from "react";
import { Grid } from "@mui/material";
import calculateSpacing from "./calculateSpacing";
import useMediaQuery from "@mui/material/useMediaQuery";
import withStyles from "@mui/styles/withStyles";
import FeatureCard from "./FeatureCard";
import useWidth from "../../../shared/functions/useWidth";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import TvIcon from "@mui/icons-material/Tv";
import ComputerIcon from "@mui/icons-material/Computer";
const iconSize = 30;

const styles = (theme) => ({
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400,
    marginBottom: theme.spacing(2),
  },
});
const features = [
  {
    color: "#0091EA",
    headline: "Easy to Display!!!",
    text: "Use the browser on your smart tv, cast from your computer to a chromecast, or purchase a Fire TV stick and use the browser on it.",
    icon: <TvIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0",
  },
  {
    color: "rgb(255, 193, 7)",
    headline: "Raspberry Pi",
    text: "Optionally purchase a Raspberry Pi (sold seperatly) and set it to automatically load the odds screen on boot. (as cheap as $35)",
    icon: <ComputerIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0",
  },
  {
    color: "#00C853",
    headline: "Sports",
    text: "NFL, NCAA, MLB, NBA, NHL pre/live/final scores with odds",
    icon: <SportsFootballIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200",
  },
  // {
  //   color: "#6200EA",
  //   headline: "Settings Page",
  //   text: "Have your own settings page to update what sports to display",
  //   icon: <SettingsSuggestIcon style={{ fontSize: iconSize }} />,
  //   mdDelay: "400",
  //   smDelay: "0",
  // },
  // {
  //   color: "#0091EA",
  //   headline: "Stocks and Commodities",
  //   text: "Live stock quotes",
  //   icon: <ShowChartIcon style={{ fontSize: iconSize }} />,
  //   mdDelay: "400",
  //   smDelay: "0",
  // },
];

function FeatureSection(props) {
  const { theme } = props;
  const width = useWidth();
  const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container-fluid lg-p-top">
        <div className="container-fluid">
          <Grid container spacing={calculateSpacing(width, theme)}>
            {features.map((element) => (
              <Grid
                item
                xs={6}
                md={4}
                data-aos="zoom-in-up"
                data-aos-delay={isWidthUpMd ? element.mdDelay : element.smDelay}
                key={element.headline}>
                <FeatureCard
                  Icon={element.icon}
                  color={element.color}
                  headline={element.headline}
                  text={element.text}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

FeatureSection.propTypes = {};

export default withStyles(styles, { withTheme: true })(FeatureSection);
