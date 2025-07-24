import React from "react";
import classNames from "classnames";
import { Grid, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import PriceCard from "./PriceCard";
import HeadSection from "./HeadSection";
import FeatureSection from "./FeatureSection";
import calculateSpacing from "./calculateSpacing";
import useWidth from "../../../shared/functions/useWidth";

const styles = (theme) => ({
  containerFix: {
    [theme.breakpoints.down("lg")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    overflow: "hidden",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400,
  },
  cardWrapper: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 340,
    },
  },
  cardWrapperHighlighted: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 360,
    },
  },
});

function OddsScreenStore(props) {
  const { classes, theme } = props;
  const width = useWidth();

  return (
    <>
      <HeadSection />
      <FeatureSection />
      <div className="lg-p-top" style={{ backgroundColor: "#FFFFFF" }}>
        <Typography variant="h3" align="center" className={classes.brandText}>
          *******NEW ******
        </Typography>
        <Typography variant="h3" align="center" className={classes.brandText}>
          Live Odds Screen
        </Typography>
        <div className={classNames("container-fluid", classes.containerFix)}>
          <Grid container spacing={calculateSpacing(width, theme)} className={classes.gridContainer}>
            <Grid item xs={12} sm={6} lg={3} className={classes.cardWrapper} data-aos="zoom-in-up">
              <PriceCard
                title="Monthly"
                pricing={<span>$4.99</span>}
                btnLink="https://buy.stripe.com/5kA4jtgmC47c7HaeVF"
                features={["7 Day Free Trial"]}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3} data-aos="zoom-in-up" className={classes.cardWrapper} data-aos-delay="200">
              <PriceCard
                title="Yearly"
                pricing={<span>$45</span>}
                btnLink="https://buy.stripe.com/4gwcPZc6meLQbXqeVE"
                features={["7 Day Free Trial"]}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

OddsScreenStore.propTypes = {};

export default withStyles(styles, { withTheme: true })(OddsScreenStore);
