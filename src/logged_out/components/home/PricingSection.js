import React from "react";
import classNames from "classnames";
import { Grid, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import PriceCard from "./PriceCard";
import calculateSpacing from "./calculateSpacing";
import useMediaQuery from "@mui/material/useMediaQuery";
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

function PricingSection(props) {
  const { classes, theme } = props;
  const width = useWidth();
  const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Typography variant="h3" align="center" className={classes.brandText}>
        LED Tickers
      </Typography>
      <Typography variant="h6" align="center" className={classes.brandText}>
        Current Shipping Est. 2-3 weeks from purchase
      </Typography>
      <div className={classNames("container-fluid", classes.containerFix)}>
        <Grid container spacing={calculateSpacing(width, theme)} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} lg={3} className={classes.cardWrapper} data-aos="zoom-in-up">
            <PriceCard
              title="Single-A"
              pricing={<span>$700</span>}
              btnLink="https://buy.stripe.com/4gw2bldaqdHM8Le00A"
              features={[
                "4 ft x 5 in x 3.5 in",
                "4 mm pitch LED's",
                "1st year subscription free",
                "Shipping to USA/Canada",
              ]}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            lg={3}
            data-aos="zoom-in-up"
            className={classes.cardWrapper}
            data-aos-delay="200">
            <PriceCard
              title="Double-A"
              pricing={<span>$1050</span>}
              btnLink="https://buy.stripe.com/5kA4jt1rI8nsd1u00G"
              features={[
                "6 ft x 6 in x 3.5 in",
                "5 mm pitch LED's",
                "1st year subscription free",
                "Shipping to USA/Canada",
              ]}
            />
          </Grid>
          <Grid
            item
            className={classes.cardWrapperHighlighted}
            xs={12}
            sm={6}
            lg={3}
            data-aos="zoom-in-up"
            data-aos-delay={isWidthUpMd ? "400" : "0"}>
            <PriceCard
              highlighted
              title="Triple-A"
              pricing={<span>$1300</span>}
              btnLink="https://buy.stripe.com/14k03d3zQavA3qU3cR"
              features={[
                "8 ft x 6 in x 3.5 in",
                "5 mm pitch LED's",
                "1st year subscription free",
                "Shipping to USA/Canada",
              ]}
            />
          </Grid>
          <Grid
            item
            className={classes.cardWrapper}
            xs={12}
            sm={6}
            lg={3}
            data-aos="zoom-in-up"
            data-aos-delay={isWidthUpMd ? "600" : "200"}>
            <PriceCard
              title="Major League"
              pricing={<span>$1800</span>}
              btnLink="https://buy.stripe.com/eVaeY7daqfPU7Ha9B8"
              features={["12.5 ft x 6 in x 3.5 in", "5 mm pitch LED's", "Shipping to USA/Canada"]}
            />
          </Grid>
        </Grid>
      </div>
      <div className="lg-p-top" style={{ backgroundColor: "#FFFFFF" }}>
        <Typography variant="h3" align="center" className={classes.brandText}>
          Subscriptions
        </Typography>
        <Typography variant="h6" align="center" className={classes.brandText}>
          (only needed after the first year)
        </Typography>
        <div className={classNames("container-fluid", classes.containerFix)}>
          <Grid
            container
            spacing={calculateSpacing(width, theme)}
            className={classes.gridContainer}>
            <Grid
              item
              className={classes.cardWrapper}
              xs={12}
              sm={6}
              lg={3}
              data-aos="zoom-in-up"
              data-aos-delay={isWidthUpMd ? "600" : "200"}>
              <PriceCard
                title="Monthly"
                pricing={
                  <span>
                    $10
                    <Typography display="inline"> / month</Typography>
                  </span>
                }
                btnLink="https://buy.stripe.com/8wMeY78Ua1Z4d1u7t3"
                features={[]}
              />
            </Grid>
            <Grid
              item
              className={classes.cardWrapper}
              xs={12}
              sm={6}
              lg={3}
              data-aos="zoom-in-up"
              data-aos-delay={isWidthUpMd ? "600" : "200"}>
              <PriceCard
                title="Yearly"
                pricing={
                  <span>
                    $100
                    <Typography display="inline"> / year</Typography>
                  </span>
                }
                btnLink="https://buy.stripe.com/9AQaHRfiy6fkbXq8x8"
                features={[]}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

PricingSection.propTypes = {};

export default withStyles(styles, { withTheme: true })(PricingSection);
