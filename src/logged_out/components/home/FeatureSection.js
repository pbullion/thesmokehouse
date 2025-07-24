import React from "react";
import { Grid, Typography } from "@mui/material";
import MeassageIcon from "@mui/icons-material/Message";
import calculateSpacing from "./calculateSpacing";
import useMediaQuery from "@mui/material/useMediaQuery";
import { withTheme } from "@mui/styles";
import withStyles from "@mui/styles/withStyles";
import FeatureCard from "./FeatureCard";
import useWidth from "../../../shared/functions/useWidth";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import SavingsIcon from "@mui/icons-material/Savings";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import ShowChartIcon from "@mui/icons-material/ShowChart";
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
    color: "#00C853",
    headline: "Sports",
    text: "NFL, NCAA, MLB, NBA, NHL, PGA, LIV, UFC pre/live/final scores with odds",
    icon: <SportsFootballIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0",
  },
  {
    color: "#6200EA",
    headline: "Headlines",
    text: "Choose from different news sources sports related or not.",
    icon: <NewspaperIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200",
  },
  {
    color: "#0091EA",
    headline: "Buy Now / Pay Later",
    text: "Afterpay / Klarna / Clearpay / Affirm",
    icon: <SavingsIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "0",
  },
  {
    color: "#d50000",
    headline: "Settings Page",
    text: "Have your own settings page to update what sports, stocks or headlines to display",
    icon: <SettingsSuggestIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "200",
  },
  {
    color: "#DD2C00",
    headline: "Custom Headlines",
    text: "Create up to 3 custom headlines of your choosing using your settings page.",
    icon: <MeassageIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "0",
  },
  {
    color: "#64DD17",
    headline: "Stocks and Commodities",
    text: "Live stock quotes",
    icon: <ShowChartIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "200",
  },
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
              <Grid item xs={6} md={4} data-aos="zoom-in-up" data-aos-delay={isWidthUpMd ? element.mdDelay : element.smDelay} key={element.headline}>
                <FeatureCard Icon={element.icon} color={element.color} headline={element.headline} text={element.text} />
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
