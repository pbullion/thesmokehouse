import React from "react";
import { Container, Typography } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import pic1 from "./wifiPics/1.png";
import pic2 from "./wifiPics/2.png";

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

  return (
    <React.Fragment>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom style={{ marginTop: "4rem" }}>
              WiFi Instructions
            </Typography>
          </Container>
        </div>
        <Container
          maxWidth="lg"
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: 10,
          }}>
          <ul style={{ listStyle: "outside", margin: "0px 2rem" }}>
            <li>Power off the ticker</li>
            <li>Remove the Micro SD card from the Rasperberry Pi</li>
            <li>Use the Micro SD to USB adapter and plug into a computer</li>
            <li>Open the 'bootfs' drive</li>
            <li>Open the 'Wifi Instructions' folder and open the file 'wpa_supplicant.conf'</li>
            <li>Replace the WiFi name and password and hit save.</li>
            <li>COPY that file and paste it in the main bootfs level.</li>
            <li>(Make sure you copy the file over, once the pi powers on and connects to the wifi it deletes that file.)</li>
            <li>Eject the disk</li>
            <li>Pop it back in the Pi and power it up!</li>
          </ul>
        </Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: 10,
          }}>
          <img src={pic1} width={200} alt="WiFi Instructions" />
          <img src={pic2} width={200} alt="WiFi Instructions" />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <video id="video" muted loop style={{ width: "50%" }} controls>
            <source src={"https://i.imgur.com/I1WDGAy.mp4"} type="video/mp4"></source>
          </video>
        </div>
      </main>
    </React.Fragment>
  );
}
export default withStyles(styles, { withTheme: true })(WiFiInstructions);
