import React from "react";
import { Container, Typography, Grid } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import pic1 from "./wifiPics/onboarding/1.png";
import pic2 from "./wifiPics/onboarding/2.png";
import pic3 from "./wifiPics/onboarding/3.png";
import pic4 from "./wifiPics/onboarding/4.png";
import pic5 from "./wifiPics/onboarding/5.png";
import calculateSpacing from "../home/calculateSpacing";
import useWidth from "../../../shared/functions/useWidth";

const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0, 0, 0),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
    justifyContent: "center",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
});

function WiFiInstructions(props) {
  const { classes } = props;

  const { theme } = props;
  const width = useWidth();
  return (
    <React.Fragment>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h2"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
              style={{ marginTop: "4rem" }}>
              WiFi Instructions
            </Typography>
            <Typography
              component="h6"
              variant="h6"
              align="center"
              color="textPrimary"
              gutterBottom
              style={{ marginTop: "1rem" }}>
              NOTE: On iPhone, Safari will not let you connect using bluetooth. You'll need to
              download Chrome in the AppStore
            </Typography>
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
              style={{ marginTop: "1rem" }}>
              <a
                href={`https://app.remote.it`}
                target="_blank"
                style={{ fontSize: "3rem" }}
                rel="noreferrer">
                app.remote.it
              </a>
            </Typography>
          </Container>
        </div>
        <div>
          <Grid container spacing={calculateSpacing(width, theme)}>
            {[1, 2, 3, 4, 5].map((element) => {
              const pics = [pic1, pic2, pic3, pic4, pic5];
              const headlines = [
                "Create an Account",
                "Choose Raspberry Pi",
                "Click Onboard via Bluetooth",
                "Select your device on the popup",
                "Choose your WiFi Network and enter your password",
              ];
              return (
                <Grid item xs={12} md={4} data-aos="zoom-in-up" key={element}>
                  <Typography
                    component="h6"
                    variant="h6"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                    style={{ marginTop: "1rem" }}>
                    {headlines[element - 1]}
                  </Typography>
                  <img
                    src={pics[element - 1]}
                    alt={`${element}`}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
        {/* <Container
          maxWidth="lg"
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: 10,
          }}>
          <ul style={{ listStyle: "outside", margin: "0px 2rem" }}>
            <li>Power off the ticker</li>
          </ul>
        </Container> */}
      </main>
    </React.Fragment>
  );
}
export default withStyles(styles, { withTheme: true })(WiFiInstructions);
