import React from "react";
import {
  Box,
  TextField,
  Grid,
  Container,
  Button,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  ListItemText,
  ListItemSecondaryAction,
  List,
  ListItem,
  Accordion,
  AccordionSummary,
  OutlinedInput,
  AccordionDetails,
} from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Bordered from "../../../shared/components/Bordered";
import { TroubleshootRounded } from "@mui/icons-material";

const styles = (theme) => ({
  numberInput: {
    width: 110,
  },
  numberInputInput: {
    padding: "9px 34px 9px 14.5px",
  },
  dBlock: { display: "block" },
  listItemLeftPadding: {
    paddingRight: theme.spacing(3),
  },
  misc: { display: "flex", flexDirection: "column", alignItems: "center" },
  accordionDetails: {
    paddintTop: theme.spacing(0),
    display: "flex",
    justifyContent: "flex-end",
  },
  paper: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400,
    textAlign: "center",
  },
  toolbar: { justifyContent: "space-between" },
  scaleMinus: {
    transform: "scaleX(-1)",
  },
  "@keyframes spin": {
    from: { transform: "rotate(359deg)" },
    to: { transform: "rotate(0deg)" },
  },
  spin: { animation: "$spin 2s infinite linear" },
  listItemSecondaryAction: { paddingRight: theme.spacing(1) },
});
function LEDSettings(props) {
  const { classes, theme, pushMessageToSnackbar } = props;
  const { user } = useParams();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showErrorAlert, setShowErrorAlert] = React.useState(false);
  const [name, setName] = React.useState("");
  const [stocks_during_the_week, setShowStocksDuringTheWeek] = React.useState(false);
  const [show_weather, setShowWeather] = React.useState(false);
  const [show_dow, setShowDow] = React.useState(false);
  const [show_nasdaq, setShowNasdaq] = React.useState(false);
  const [show_stocks, setShowStocks] = React.useState(false);
  const [show_commodities, setShowCommodities] = React.useState(false);
  const [just_stocks, setShowOnlyStocks] = React.useState(false);
  const [time_zone, setTimeZone] = React.useState("");
  const [just_stocks_splice_value, setGainersDeclinersSpliceValue] = React.useState("15");
  const [show_only_live, setShowOnlyLive] = React.useState(false);
  const [show_custom_headline, setShowCustomHeadline] = React.useState(false);
  const [with_onboarding, setWithOnboarding] = React.useState(false);
  const [email, setEmail] = React.useState(user);
  const [zip_code, setZipCode] = React.useState("77008");
  const [rss_feeds, setRss_feeds] = React.useState([]);
  const [rankings, setRankings] = React.useState([]);
  const [stockSymbol, setStockSymbol] = React.useState("");
  const [stock_symbols, setStockSymbols] = React.useState([]);
  const [custom_headline, setCustomHeadline] = React.useState("");
  const [custom_headline_2, setCustomHeadline2] = React.useState(
    email !== "example" ? "" : "Enter your custom headline here!"
  );
  const [custom_headline_3, setCustomHeadline3] = React.useState(
    email !== "example" ? "" : "Enter your custom headline here!"
  );
  const [custom_headline_4, setCustomHeadline4] = React.useState(
    email !== "example" ? "" : "Enter your custom headline here!"
  );
  const [tickerArr, setTickerArr] = React.useState([]);
  const [sports_to_display, setSportsToDisplay] = React.useState([]);

  React.useEffect(() => {
    if (email === "null") {
      const email = window.prompt("Enter your username");
      setEmail(email);
    }
    if (email && email !== "example") {
      const url = `https://sheline-art-website-api.herokuapp.com/patrick/led-options/${email}`;
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      fetch(url, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setName(data.name);
          setZipCode(data.zip_code);
          setRss_feeds(JSON.parse(data.rss_feeds));
          setStockSymbols(JSON.parse(data.stock_symbols));
          setRankings(JSON.parse(data.rankings) || []);
          setSportsToDisplay(JSON.parse(data.sports_to_display) || []);
          setShowDow(data.show_dow);
          setShowCommodities(data.show_commodities);
          setShowNasdaq(data.show_nasdaq);
          setShowOnlyLive(data.show_only_live);
          setShowStocksDuringTheWeek(data.stocks_during_the_week);
          setShowStocks(data.show_stocks);
          setShowOnlyStocks(data.just_stocks);
          setGainersDeclinersSpliceValue(data.just_stocks_splice_value);
          setTimeZone(data.time_zone);
          setShowWeather(data.show_weather);
          setCustomHeadline(data.custom_headline);
          setCustomHeadline2(data.custom_headline_2);
          setCustomHeadline3(data.custom_headline_3);
          setCustomHeadline4(data.custom_headline_4);
          setShowCustomHeadline(data.show_custom_headline);
          setWithOnboarding(data.with_onboarding);
        })
        .catch((error) => console.error(error));
    } else {
      setName("Example");
    }
  }, [email]);

  const getStockInfo = async (symbol) => {
    const stockURL = `https://finnhub.io/api/v1/quote?token=bri2e6vrh5rep8a5fkm0&symbol=`;
    return await fetch(stockURL + symbol).then((response) => response.json());
  };
  const handleAddStockSymbol = async (stockSymbol) => {
    const { d } = await getStockInfo(stockSymbol);
    !d && setErrorMessage("Not a valid stock symbol");
    d ? setStockSymbols([...stock_symbols, stockSymbol]) : setShowErrorAlert(true);
  };
  const startRunning = () => {
    // const url = `https://sheline-art-website-api.herokuapp.com/golf/update`;
    const url = `http://localhost:3001/golf/teeTimes`;
    console.log(url);
    const requestOptions = {
      method: "GET",
    };
    fetch(url, requestOptions)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  const handleUpdateRunning = () => {
    // const url = `https://sheline-art-website-api.herokuapp.com/golf/update`;
    const url = `http://localhost:3001/golf/update`;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch(url, requestOptions)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  //   {/* <MenuItem value="rankingsBasketball">
  //     NCAA Basketball Rankings
  //   </MenuItem> */}
  //   {/* <MenuItem value="top25Basketball">
  //     NCAA Basketball TOP 25
  //   </MenuItem> */}
  const sports = [
    { value: "pga", disabled: false, name: "PGA Tour" },
    { value: "mlb", disabled: false, name: "MLB" },
    { value: "nfl", disabled: false, name: "NFL" },
    { value: "fantasy", disabled: false, name: "Top Fantasy Football Players" },
    { value: "nhl", disabled: false, name: "NHL" },
    { value: "nba", disabled: false, name: "NBA" },
    { value: "englishPremierLeague", disabled: false, name: "English Premier League" },
    { value: "rankings", disabled: false, name: "NCAA Football Rankings" },
    { value: "top25", disabled: false, name: "NCAA Football Top 25" },
    { value: "big12", disabled: false, name: "Big 12 Football" },
    { value: "sec", disabled: false, name: "SEC Football" },
    { value: "acc", disabled: false, name: "ACC Football" },
    { value: "big10", disabled: false, name: "Big 10 Football" },
    { value: "pac12", disabled: false, name: "Pac 12 Football" },
    { value: "aac", disabled: false, name: "AAC Football" },
    { value: "mls", disabled: false, name: "MLS" },
    { value: "ufc", disabled: false, name: "UFC" },
    { value: "f1", disabled: false, name: "F1" },
    { value: "olympicMedals", disabled: false, name: "Olympic Medal Count" },
    { value: "top25Basketball", disabled: true, name: "NCAA Basketball" },
    { value: "liv", disabled: true, name: "LIV Golf" },
  ];
  const news = [
    { value: "cowboysWire", name: "Cowboys Wire" },
    { value: "bloggingTheBoys", name: "Blogging The Boys (Dallas Cowboys)" },
    { value: "espnTopStories", name: "ESPN Top Stories" },
    { value: "espnNBA", name: "ESPN NBA" },
    { value: "espnNFL", name: "ESPN NFL" },
    { value: "espnMLB", name: "ESPN MLB" },
    { value: "astrosNews", name: "Houston Astros" },
    { value: "espnGolf", name: "ESPN Golf" },
    { value: "espnCollegeBasketball", name: "ESPN College Basketball" },
    { value: "espnCollegeFootball", name: "ESPN College Football" },
    { value: "cnn", name: "CNN News" },
    { value: "foxNews", name: "Fox News" },
    { value: "abcHouston", name: "ABC Houston" },
    { value: "marketWatch", name: "Market Watch" },
    { value: "investingDotCom", name: "Investing.com" },
  ];

  const handleSubmit = () => {
    const user = email;
    const url = `https://sheline-art-website-api.herokuapp.com/patrick/${user}`;
    // const url = `http://localhost:3001/patrick/${email}`;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user,
        zip_code,
        show_weather,
        show_dow,
        show_nasdaq,
        show_only_live,
        just_stocks,
        just_stocks_splice_value,
        time_zone,
        stock_symbols,
        rss_feeds,
        rankings,
        sports_to_display,
        custom_headline,
        custom_headline_2,
        custom_headline_3,
        custom_headline_4,
        show_custom_headline,
        show_commodities,
        stocks_during_the_week,
        show_stocks,
      }),
    };
    fetch(url, requestOptions)
      .then((response) => {
        pushMessageToSnackbar({
          text: "Your settings have been updated!",
        });
      })
      .catch((err) => {
        console.error(err);
        pushMessageToSnackbar({
          text: "ERROR",
        });
      });
  };

  // const checkZipCodeValid = () => {
  //   const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip_code);
  //   return isValidZip;
  // };
  if (email) {
    return (
      <React.Fragment>
        <Container sx={{ pt: 10, width: "100%", overflow: "auto" }}>
          <Box sx={{ pt: 1, width: "100%" }}>
            <Typography
              className={classes.brandText}
              style={{ textAlign: "center" }}
              variant="h5"
              component="h2">
              LED OPTIONS FOR
            </Typography>
            <Typography
              className={classes.brandText}
              style={{ textAlign: "center", marginBottom: 5 }}
              variant="h4"
              component="h2">
              {email}
            </Typography>
            <Typography
              className={classes.brandText}
              style={{ textAlign: "center", marginBottom: 10 }}
              variant="h5"
              component="h6">
              You can bookmark this directly{" "}
              <a
                href={`https://www.mancavedisplays.com/settings/${email}`}
                style={{ fontSize: 11 }}>
                https://www.mancavedisplays.com/settings/{email}
              </a>
            </Typography>
            {email === "pbullion@gmail.com" && (
              <Typography
                className={classes.brandText}
                style={{ textAlign: "center", marginBottom: 0 }}
                variant="h5"
                component="h6">
                <a
                  href={`https://sheline-art-website-api.herokuapp.com/patrick/all-data-2/pbullion@gmail.com`}
                  target="_blank"
                  style={{ fontSize: 11 }}>
                  Check the API
                </a>
              </Typography>
            )}
            {email === "pbullionnnn@gmail.com" && (
              <Grid
                container
                spacing={0}
                sx={{ width: "100%" }}
                alignItems="center"
                justifyContent="center">
                <Typography
                  style={{
                    textAlign: "center",
                    paddingBottom: 10,
                    borderBottom: "1px solid black",
                    width: "100%",
                  }}
                  variant="h5"
                  component="h2">
                  Golf
                </Typography>
                <Grid item>
                  <Button
                    size="small"
                    variant="contained"
                    style={{
                      margin: 10,
                      marginBottom: 30,
                      backgroundColor: "lightgreen",
                    }}
                    onClick={() => handleUpdateRunning()}>
                    Turn On
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    style={{
                      margin: 10,
                      marginBottom: 30,
                      backgroundColor: "lightgreen",
                    }}
                    onClick={() => startRunning()}>
                    Start
                  </Button>
                </Grid>
              </Grid>
            )}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h4" className={classes.brandText} color="primary">
                  SPORTS
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.dBlock}>
                <List disablePadding>
                  <Bordered disableVerticalPadding disableBorderRadius>
                    {sports.map((sport, index) => (
                      <ListItem
                        className="listItemLeftPadding"
                        disableGutters
                        divider
                        key={index}
                        style={{ backgroundColor: sport.disabled && "lightgrey" }}>
                        <ListItemText>
                          <Typography variant="body2">{sport.name}</Typography>
                        </ListItemText>
                        <FormControl variant="outlined">
                          <ListItemSecondaryAction className={classes.ListItemSecondaryAction}>
                            <Switch
                              color="secondary"
                              checked={sports_to_display.includes(sport.value)}
                              disabled={sport.disabled}
                              onClick={() => {
                                if (sports_to_display.includes(sport.value)) {
                                  setSportsToDisplay(
                                    sports_to_display.filter((s) => s !== sport.value)
                                  );
                                } else {
                                  setSportsToDisplay((prevValue) => [...prevValue, sport.value]);
                                }
                              }}
                            />
                          </ListItemSecondaryAction>
                        </FormControl>
                      </ListItem>
                    ))}
                  </Bordered>
                </List>
                <FormGroup style={{ alignItems: "center" }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={show_only_live}
                        onChange={() => setShowOnlyLive(!show_only_live)}
                      />
                    }
                    label="Show ONLY live games"
                  />
                </FormGroup>
              </AccordionDetails>
              <AccordionDetails className={classes.accordionDetails}>
                <Button variant="contained" color="secondary" onClick={() => handleSubmit()}>
                  Update
                </Button>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h4" className={classes.brandText} color="primary">
                  NEWS
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.dBlock}>
                <List disablePadding>
                  <Bordered disableVerticalPadding disableBorderRadius>
                    {news.map((x, index) => (
                      <ListItem className="listItemLeftPadding" disableGutters divider key={index}>
                        <ListItemText>
                          <Typography variant="body2">{x.name}</Typography>
                        </ListItemText>
                        <FormControl variant="outlined">
                          <ListItemSecondaryAction className={classes.ListItemSecondaryAction}>
                            <Switch
                              color="secondary"
                              checked={rss_feeds.includes(x.value)}
                              onClick={() => {
                                if (rss_feeds.includes(x.value)) {
                                  setRss_feeds(rss_feeds.filter((s) => s !== x.value));
                                } else {
                                  setRss_feeds((prevValue) => [...prevValue, x.value]);
                                }
                              }}
                            />
                          </ListItemSecondaryAction>
                        </FormControl>
                      </ListItem>
                    ))}
                  </Bordered>
                </List>
              </AccordionDetails>
              <AccordionDetails className={classes.accordionDetails}>
                <Button variant="contained" color="secondary" onClick={() => handleSubmit()}>
                  Update
                </Button>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h4" className={classes.brandText} color="primary">
                  CUSTOM HEADLINES
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.dBlock}>
                <Grid item style={{ width: "100%" }}>
                  <OutlinedInput
                    value={custom_headline_2}
                    onChange={(e) => setCustomHeadline2(e.target.value.toUpperCase())}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end" onClick={() => setCustomHeadline2(" ")}>
                          <DeleteForeverIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    style={{ width: "100%", marginTop: 20 }}
                    label="Enter Custom Headline"
                  />
                </Grid>
                <Grid item style={{ width: "100%" }}>
                  <OutlinedInput
                    value={custom_headline_3}
                    onChange={(e) => setCustomHeadline3(e.target.value.toUpperCase())}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end" onClick={() => setCustomHeadline3(" ")}>
                          <DeleteForeverIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    style={{ width: "100%", marginTop: 20 }}
                    label="Enter Custom Headline"
                  />
                </Grid>
                <Grid item style={{ width: "100%" }}>
                  <OutlinedInput
                    value={custom_headline_4}
                    onChange={(e) => setCustomHeadline4(e.target.value.toUpperCase())}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end" onClick={() => setCustomHeadline4(" ")}>
                          <DeleteForeverIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    style={{ width: "100%", marginTop: 20 }}
                    label="Enter Custom Headline"
                  />
                </Grid>
              </AccordionDetails>
              <AccordionDetails className={classes.accordionDetails}>
                <Button variant="contained" color="secondary" onClick={() => handleSubmit()}>
                  Update
                </Button>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h4" className={classes.brandText} color="primary">
                  STOCKS
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.dBlock}>
                <List disablePadding>
                  <Bordered disableVerticalPadding disableBorderRadius>
                    <Grid
                      container
                      spacing={0}
                      sx={{ width: "100%" }}
                      alignItems="center"
                      justifyContent="center"
                      direction="column">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={show_stocks}
                              onChange={() => setShowStocks(!show_stocks)}
                            />
                          }
                          label="Show Stocks"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={stocks_during_the_week}
                              onChange={() => setShowStocksDuringTheWeek(!stocks_during_the_week)}
                            />
                          }
                          label="Only Show During the Week"
                        />
                      </FormGroup>
                    </Grid>
                    <Grid
                      container
                      spacing={0}
                      style={{ width: "100%" }}
                      alignItems="flex-end"
                      alignContent="center"
                      justifyContent="center">
                      <Grid item>
                        <TextField
                          value={stockSymbol}
                          onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
                          style={{ width: 200 }}
                          label="Stock Symbol"
                        />
                      </Grid>
                      <Button
                        size="small"
                        variant="contained"
                        style={{
                          marginLeft: 10,
                          backgroundColor: "lightgreen",
                        }}
                        onClick={() => {
                          handleAddStockSymbol(stockSymbol);
                        }}>
                        Add
                      </Button>
                    </Grid>
                    <Grid
                      container
                      spacing={0}
                      style={{ width: "100%", marginTop: 15 }}
                      alignItems="center"
                      alignContent="center"
                      direction="row"
                      justifyContent="center">
                      {/* <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={show_dow}
                      onChange={() => setShowDow(!show_dow)}
                    />
                  }
                  label="Show Dow Jones Ind"
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={show_nasdaq}
                      onChange={() => setShowNasdaq(!show_nasdaq)}
                    />
                  }
                  label="Show NASDAQ"
                />
              </FormGroup> */}
                      <Grid
                        container
                        spacing={0}
                        style={{ width: "100%", marginBottom: 15 }}
                        alignItems="center"
                        alignContent="center"
                        justifyContent="center">
                        {stock_symbols.map((symbol, idx) => {
                          return (
                            <Chip
                              key={idx}
                              color="primary"
                              style={{ marginRight: 10 }}
                              label={symbol}
                              onDelete={() => {
                                const filtered = stock_symbols.filter((x) => x !== symbol);
                                setStockSymbols([...filtered]);
                              }}
                            />
                          );
                        })}
                      </Grid>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={show_commodities}
                              onChange={() => setShowCommodities(!show_commodities)}
                            />
                          }
                          label="Show Commodities"
                        />
                      </FormGroup>
                      <Grid
                        container
                        spacing={0}
                        style={{ width: "100%", marginTop: 15 }}
                        alignItems="center"
                        alignContent="center"
                        direction="row"
                        justifyContent="center">
                        <FormGroup style={{ alignItems: "center" }}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={just_stocks}
                                onChange={() => setShowOnlyStocks(!just_stocks)}
                              />
                            }
                            label="Show the top gainers and decliners"
                          />
                          <FormControl style={{ width: 200, marginBottom: 20 }}>
                            <Typography variant="p" color="primary">
                              Amount to show
                            </Typography>
                            <Select
                              value={just_stocks_splice_value}
                              onChange={(e) => setGainersDeclinersSpliceValue(e.target.value)}
                              input={
                                <OutlinedInput
                                  labelWidth={0}
                                  className={classes.numberInput}
                                  classes={{ input: classes.numberInputInput }}
                                />
                              }
                              style={{ width: 200 }}
                              MenuProps={{ disableScrollLock: true }}>
                              <MenuItem value={"5"}>5</MenuItem>
                              <MenuItem value={"10"}>10</MenuItem>
                              <MenuItem value={"15"}>15</MenuItem>
                              <MenuItem value={"20"}>20</MenuItem>
                              <MenuItem value={"30"}>30</MenuItem>
                            </Select>
                          </FormControl>
                        </FormGroup>
                      </Grid>
                    </Grid>
                  </Bordered>
                </List>
              </AccordionDetails>
              <AccordionDetails className={classes.accordionDetails}>
                <Button variant="contained" color="secondary" onClick={() => handleSubmit()}>
                  Update
                </Button>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h4" className={classes.brandText} color="primary">
                  MISC
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.misc} style={{ textAlign: "center" }}>
                <FormControl style={{ width: 200, marginBottom: 20 }}>
                  <Typography variant="p" color="primary">
                    Time Zone
                  </Typography>
                  <Select
                    value={time_zone}
                    onChange={(e) => {
                      setTimeZone(e.target.value);
                    }}
                    input={
                      <OutlinedInput
                        labelWidth={0}
                        className={classes.numberInput}
                        classes={{ input: classes.numberInputInput }}
                      />
                    }
                    style={{ width: 200, marginBottom: 10 }}
                    MenuProps={{ disableScrollLock: true }}>
                    <MenuItem value={"America/Chicago"}>Central</MenuItem>
                    <MenuItem value={"America/New_York"}>Eastern</MenuItem>
                    <MenuItem value={"America/Denver"}>Mountain</MenuItem>
                    <MenuItem value={"America/Los_Angeles"}>Pacific</MenuItem>
                  </Select>
                  <Button variant="contained" color="secondary" onClick={() => handleSubmit()}>
                    Update
                  </Button>
                </FormControl>
                <Link
                  key={"wifi"}
                  to={with_onboarding ? "/wifi-onboarding" : "/wifi"}
                  className={classes.noDecoration}>
                  <Button color="secondary" size="large" classes={{ text: classes.menuButtonText }}>
                    WiFi Instructions
                  </Button>
                </Link>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Container>
      </React.Fragment>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}>
        <Typography component="h1" variant="h1" align="center" color="primary" gutterBottom>
          <LinearProgress color="primary" style={{ marginBottom: 20 }} />
          Mancave Displays
          <LinearProgress color="primary" style={{ marginTop: 20 }} />
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(LEDSettings);
