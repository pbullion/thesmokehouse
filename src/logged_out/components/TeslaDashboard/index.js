import React from "react";
import withStyles from "@mui/styles/withStyles";
import DateTimeWidget from "./DateTime";
import NewsWidget from "./News";
import CurrentWeatherWidget from "./CurrentWeather";
import TimeWidget from "./Time";
import ForecastWeatherWidget from "./ForecastWeather";
import OddsScreen from "./OddsScreen";

const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
});

function TeslaDashboard(props) {
  const { classes, selectTeslaDashboard } = props;

  React.useEffect(() => {
    selectTeslaDashboard();

    const interval = setInterval(() => {
      window.location.reload();
    }, 1000000000);

    return () => clearInterval(interval);
  }, [selectTeslaDashboard]);

  return (
    <React.Fragment>
      <main>
        <div style={{ display: "flex", margin: 10, justifyContent: "space-around" }}>
          <CurrentWeatherWidget />
          <ForecastWeatherWidget />
          <TimeWidget />
          <DateTimeWidget />
        </div>
        <div style={{ display: "flex", margin: 10, justifyContent: "space-around" }}>
          <OddsScreen />
        </div>
        <div style={{ display: "flex", margin: 10, justifyContent: "space-around" }}>
          <NewsWidget />
        </div>
      </main>
    </React.Fragment>
  );
}
export default withStyles(styles, { withTheme: true })(TeslaDashboard);
