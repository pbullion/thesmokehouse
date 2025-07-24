import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  Typography,
  FormControl,
  Switch,
  ListItemText,
  ListItemSecondaryAction,
  List,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slider,
  Box,
} from "@mui/material";
import { WiDaySunny, WiDayCloudy, WiThunderstorm, WiSnow } from "weather-icons-react";
import { useParams, useHistory } from "react-router-dom";
import ReactLoading from "react-loading";
import SettingsIcon from "@mui/icons-material/Settings";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import "./oddsScreen.css";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { parseISO, formatDistanceToNow } from "date-fns";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import browserDetect from "browser-detect";
import moment from "moment";
import momentTimezone from "moment-timezone";
import basesLoaded from "./baseballBases/basesLoaded.png";
import first from "./baseballBases/first.png";
import firstAndSecond from "./baseballBases/firstAndSecond.png";
import secondAndThird from "./baseballBases/secondAndThird.png";
import firstAndThird from "./baseballBases/firstAndThird.png";
import second from "./baseballBases/second.png";
import third from "./baseballBases/third.png";
import { number } from "prop-types";
import { NumbersOutlined } from "@mui/icons-material";

function OddsScreen(props) {
  const history = useHistory();
  const browserData = browserDetect();
  const { email, defaultFontSize } = useParams();
  const { selectOddsDisplay } = props;
  const [textSize, setTextSize] = useState(1.75);
  const [politicsData, setPoliticsData] = useState({});
  const [screenWidth, setScreenWidth] = useState(500);
  const [screenHeight, setScreenHeight] = useState(500);
  const [allGames, setAllGames] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [numOfColumns, setNumOfColumns] = useState(2);
  // const [numOfColumns, setNumOfColumns] = useState(3);
  const [onlyOneColumn, setOnlyOneColumn] = useState(false);
  const [justTop25Basketball, setJustTop25Basketball] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userTimezone, setUserTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [isBehindTheScenesLoading, setIsBehindTheScenesLoading] = useState(false);
  const [user, setUser] = useState(email);
  const [lastUpdated, setLastUpdated] = useState(moment().format("h:mm:ss"));
  const [sports_to_display, setSportsToDisplay] = useState(["NFL", "NBA", "NCAABASKETBALL", "NHL", "MLB"]);
  const isLoadingRef = useRef(isLoading);
  const sportsToDisplayRef = useRef(sports_to_display);
  const [sessionID, setSessionID] = useState("");
  const sessionIDRef = useRef(sessionID);
  sessionIDRef.current = sessionID;
  sportsToDisplayRef.current = sports_to_display;
  isLoadingRef.current = isLoading;

  useEffect(() => {
    if (user) {
      handleResize();
    }
  }, [user]);
  function convertToDate(dateStr) {
    const currentYear = new Date().getFullYear();
    const formattedDateStr = `${dateStr} ${currentYear}`;
    return new Date(formattedDateStr);
  }
  function convertToMonthDayString(dateStr) {
    const currentYear = new Date().getFullYear();
    const formattedDateStr = `${dateStr} ${currentYear}`;
    const jsDate = new Date(formattedDateStr);
    return moment(jsDate).format("MMMM D");
  }
  function formatDate(dateString) {
    const [month, day] = dateString.split("/").map(Number);
    const year = new Date().getFullYear(); // Get the current year
    // Create a Date object
    const date = new Date(year, month - 1, day);
    // Options for formatting the date
    const options = {
      weekday: "short",
      month: "long",
      day: "numeric",
    };
    // Format the date
    let formattedDate = date.toLocaleDateString("en-US", options);
    // Add the suffix to the day
    const dayOfMonth = date.getDate();
    let suffix = "th";
    if (dayOfMonth % 10 === 1 && dayOfMonth !== 11) {
      suffix = "st";
    } else if (dayOfMonth % 10 === 2 && dayOfMonth !== 12) {
      suffix = "nd";
    } else if (dayOfMonth % 10 === 3 && dayOfMonth !== 13) {
      suffix = "rd";
    }

    formattedDate = formattedDate.replace(/\d+/, dayOfMonth + suffix);

    return formattedDate;
  }
  const renderRunnersMLB = (theGame) => {
    if (theGame.inProgress && (theGame.sport === "MLB" || theGame.sport === "ncaabaseball")) {
      const onFirst = theGame.onFirst;
      const onSecond = theGame.onSecond;
      const onThird = theGame.onThird;
      if (onFirst && onSecond && onThird) {
        return <img alt={"bases"} style={{ marginBottom: 0, height: 18, width: 18 }} src={basesLoaded} />;
      } else if (onFirst && !onSecond && !onThird) {
        return <img alt={"bases"} style={{ marginBottom: 0, height: 18, width: 18 }} src={first} />;
      } else if (!onFirst && onSecond && !onThird) {
        return <img alt={"bases"} style={{ marginBottom: 0, height: 18, width: 18 }} src={second} />;
      } else if (!onFirst && !onSecond && onThird) {
        return <img alt={"bases"} style={{ marginBottom: 0, height: 18, width: 18 }} src={third} />;
      } else if (onFirst && onSecond && !onThird) {
        return <img alt={"bases"} style={{ marginBottom: 0, height: 18, width: 18 }} src={firstAndSecond} />;
      } else if (onFirst && !onSecond && onThird) {
        return <img alt={"bases"} style={{ marginBottom: 0, height: 18, width: 18 }} src={firstAndThird} />;
      } else if (!onFirst && onSecond && onThird) {
        return <img alt={"bases"} style={{ marginBottom: 0, height: 18, width: 18 }} src={secondAndThird} />;
      }
    }
  };
  useEffect(() => {
    // if (defaultFontSize) {
    //   setTextSize(parseFloat(defaultFontSize));
    // } else {
    //   setTextSize(2.75);
    // }
    if (email === "pbullion@gmail.com") {
      setTextSize(2.75);
    }
    setUserTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  useEffect(() => {
    handleResize();
  }, [sports_to_display]);

  useEffect(() => {
    const getUpdate = () => {
      setIsBehindTheScenesLoading(true);
      checkSubscription(user);
    };
    const intervalId = setInterval(getUpdate, 15000);
    return () => clearInterval(intervalId);
  }, [user]);

  const checkSubscription = async (email) => {
    const url = `https://sheline-art-website-api.herokuapp.com/odds-screen/check-subscription/${email}`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "active") {
          fetchGames();
        } else {
          window.alert(
            `No subscription found for ${email} -  Make sure you are entering the email exactly as you did when you subscribed.`
          );
          history.push("/odds-screen-store");
        }
      });
  };

  useEffect(() => {
    if (user === "null") {
      const emailFromPrompt = window.prompt("Enter your email");
      setUser(emailFromPrompt);
      history.push(`/odds-screen/${emailFromPrompt}`);
    } else if (user) {
      checkSubscription(user);
    }
  }, [user]);

  useEffect(() => {}, [allGames]);

  const isDateToday = (dateStr) => {
    if (dateStr === undefined) return false;
    const today = new Date();
    const [month, day] = dateStr.split(" ");
    return today.getDate() === parseInt(day) && today.toLocaleString("en-us", { month: "long" }) === month;
  };
  const fetchGames = async () => {
    const currentTime = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });
    const centralTime = new Date(currentTime);
    const currentHour = centralTime.getHours();
    const url = `https://sheline-art-website-api.herokuapp.com/patrick/all-data-2/mancavedisplaysllc@gmail.com`;
    // const url = `http://localhost:3001/patrick/all-data-2/mancavedisplaysllc@gmail.com`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const isInTimeFrame = true;
    if (isInTimeFrame || isLoadingRef.current) {
      fetch(url, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("🚀 ~ .then ~ data:", data);
          // setPoliticsData(data[0][1]);
          const filteredData = data
            .filter((x) => {
              if (x[0][0].includes("logo") || x[0][0].includes("ncaa")) return x;
            })
            .map((x) => x.splice(0, 1) && x)
            .map((league) => {
              return league
                .filter((x) => !x[0].includes("final"))
                .filter((x) => !x[0].includes("postponed"))
                .filter((x) => !x[20].includes("TBD"))
                .map((x) => {
                  const league = x[0].split(" ")[2].toUpperCase();
                  const isPregame = x[0].includes("pregame");
                  if (isPregame && (league === "NFL" || league === "NCAAFOOTBALL" || league === "NCAABASKETBALL")) {
                    let date = x[20];
                    const timeFormatted = x[11] === "11:00" || x[11] === "12:00" ? x[11] + " AM" : x[11] + " PM";
                    // if (league === "NCAAFOOTBALL") {
                    //   console.log(x);
                    //   date = formatDate(date);
                    // }
                    const dateParts = date.match(/(\w+), (\w+) (\d+)(?:st|nd|rd|th)/);
                    const dayOfWeek = dateParts[1];
                    const month = dateParts[2];
                    const day = dateParts[3];
                    const year = new Date().getFullYear();
                    const fullDateStr = `${month} ${day}, ${month === "January" ? "2025" : year} ${x[11]}`;
                    const dateStr = `${month} ${day}`;
                    const timeUntilString = new Date(`${dateStr}, ${year} ${timeFormatted}`);
                    const jsDate = new Date(timeUntilString);
                    return {
                      homeTeam: x[10],
                      awayTeam: x[5],
                      homeMoneyLine: x[16],
                      awayMoneyLine: x[15],
                      homeSpread: x[23],
                      awaySpread: x[22],
                      overUnder: x[17],
                      fullDate: jsDate,
                      dateStr: dateStr,
                      time: momentTimezone(moment(timeFormatted, "h:mm A")).tz(userTimezone).format("h:mm A"),
                      date: x[20],
                      sport: league,
                      inProgress: !isPregame,
                      timeUntilString: timeUntilString - new Date(),
                      // timeUntilString: formatDistanceToNow(timeUntilString, { addSuffix: false }),
                      conferences: x[24],
                      tvChannel: x[25].replace("New York", "NY"),
                      id: x[29],
                      weather: x[26],
                      temperature: x[27],
                      indoors: x[28],
                    };
                  } else if (!isPregame && (league === "NFL" || league === "NCAAFOOTBALL")) {
                    return {
                      homeTeam: x[10],
                      awayTeam: x[5],
                      homeSpread: x[20],
                      awaySpread: x[19],
                      homeScore: x[13],
                      awayScore: x[12],
                      quarter: x[11] === "TIME" ? "HALF" : x[11].includes("of") ? "End" : x[14],
                      clock: x[11] === "TIME" ? "TIME" : x[11].includes("of") ? x[11].split("of ")[1] : x[11],
                      homeMoneyLine: x[23],
                      awayMoneyLine: x[22],
                      overUnder: x[21],
                      time: momentTimezone(moment(x[11], "h:mm A")).tz(userTimezone).format("h:mm"),
                      sport: league,
                      inProgress: !isPregame,
                      tvChannel: x[25],
                      id: x[26],
                    };
                  } else if (!isPregame && league === "NCAABASKETBALL") {
                    return {
                      homeTeam: x[10],
                      awayTeam: x[5],
                      homeSpread: x[23],
                      awaySpread: x[22],
                      homeScore: x[13],
                      awayScore: x[12],
                      quarter: x[11] === "TIME" ? "HALF" : x[11].includes("of") ? "End" : x[14],
                      clock: x[11] === "TIME" ? "TIME" : x[11].includes("of") ? x[11].split("of ")[1] : x[11],
                      homeMoneyLine: x[20],
                      awayMoneyLine: x[19],
                      overUnder: x[21],
                      time: momentTimezone(moment(x[11], "h:mm A")).tz(userTimezone).format("h:mm"),
                      sport: league,
                      inProgress: !isPregame,
                      conferences: x[24],
                      tvChannel: x[25],
                      id: x[26],
                    };
                  } else if (isPregame && league === "NBA") {
                    const dateParts = x[20].match(/(\w+), (\w+) (\d+)(?:st|nd|rd|th)/);
                    const dayOfWeek = dateParts[1];
                    const month = dateParts[2];
                    const day = dateParts[3];
                    const year = new Date().getFullYear();
                    const fullDateStr = `${month} ${day}, ${month === "January" ? "2025" : year} ${x[11]}`;
                    const dateStr = `${month} ${day}`;
                    const jsDate = new Date(fullDateStr);
                    const timeUntilString = new Date(`${dateStr}, ${year} ${x[11]} PM`);
                    return {
                      homeTeam: x[10],
                      awayTeam: x[5],
                      homeSpread: x[23],
                      awaySpread: x[22],
                      homeMoneyLine: x[16],
                      awayMoneyLine: x[15],
                      overUnder: x[17],
                      time: momentTimezone(moment(x[11], "h:mm A")).tz(userTimezone).format("h:mm"),
                      sport: league,
                      fullDate: jsDate,
                      dateStr: dateStr,
                      inProgress: !isPregame,
                      timeUntilString: formatDistanceToNow(timeUntilString, { addSuffix: false }),
                      tvChannel: x[25],
                      id: x[29],
                    };
                  } else if (!isPregame && league === "NBA") {
                    return {
                      homeTeam: x[10],
                      awayTeam: x[5],
                      homeMoneyLine: x[20],
                      awayMoneyLine: x[19],
                      homeScore: x[13],
                      awayScore: x[12],
                      quarter: x[11] === "TIME" ? "HALF" : x[11].includes("of") ? "End" : x[14],
                      clock: x[11] === "TIME" ? "TIME" : x[11].includes("of") ? x[11].split("of ")[1] : x[11],
                      homeSpread: x[23],
                      awaySpread: x[22],
                      overUnder: x[21],
                      time: momentTimezone(moment(x[11], "h:mm A")).tz(userTimezone).format("h:mm"),
                      sport: league,
                      inProgress: !isPregame,
                      tvChannel: x[25],
                      id: x[26],
                    };
                  } else if (isPregame && league === "NHL") {
                    const dateParts = x[20].match(/(\w+), (\w+) (\d+)(?:st|nd|rd|th)/);
                    const dayOfWeek = dateParts[1];
                    const month = dateParts[2];
                    const day = dateParts[3];
                    const year = new Date().getFullYear();
                    const fullDateStr = `${month} ${day}, ${month === "January" ? "2025" : year} ${x[11]}`;
                    const dateStr = `${month} ${day}`;
                    const jsDate = new Date(fullDateStr);
                    const timeUntilString = new Date(`${dateStr}, ${year} ${x[11]} PM`);
                    return {
                      homeTeam: x[10],
                      awayTeam: x[5],
                      homeSpread: x[23],
                      awaySpread: x[22],
                      homeMoneyLine: x[16],
                      awayMoneyLine: x[15],
                      overUnder: x[17],
                      time: momentTimezone(moment(x[11], "h:mm A")).tz(userTimezone).format("h:mm"),
                      sport: league,
                      fullDate: jsDate,
                      dateStr: dateStr,
                      inProgress: !isPregame,
                      tvChannel: x[25],
                      id: x[29],
                      date: x[20],
                      timeUntilString: formatDistanceToNow(timeUntilString, { addSuffix: false }),
                    };
                  } else if (!isPregame && league === "NHL") {
                    return {
                      homeTeam: x[10],
                      awayTeam: x[5],
                      homeMoneyLine: x[20],
                      awayMoneyLine: x[19],
                      homeScore: x[13],
                      awayScore: x[12],
                      quarter: x[11] === "TIME" ? "HALF" : x[11].includes("of") ? "End" : x[14],
                      clock: x[11] === "TIME" ? "TIME" : x[11].includes("of") ? x[11].split("of ")[1] : x[11],
                      homeSpread: x[23],
                      awaySpread: x[22],
                      overUnder: x[21],
                      time: momentTimezone(moment(x[11], "h:mm A")).tz(userTimezone).format("h:mm"),
                      sport: league,
                      tvChannel: x[25],
                      id: x[26],
                      inProgress: !isPregame,
                    };
                  } else if (isPregame && league === "MLB") {
                    return {
                      homeTeam: x[10],
                      awayTeam: x[5],
                      homeSpread: x[23],
                      awaySpread: x[22],
                      homeMoneyLine: x[16],
                      awayMoneyLine: x[15],
                      overUnder: x[17],
                      time: momentTimezone(moment(x[11], "h:mm A")).tz(userTimezone).format("h:mm"),
                      sport: league,
                      fullDate: convertToDate(x[20] + " " + x[11]),
                      dateStr: convertToMonthDayString(x[20] + " " + x[11]),
                      inProgress: !isPregame,
                      tvChannel: x[25],
                      id: x[29],
                      date: x[20],
                      awayStartingPitcher: x[18],
                      homeStartingPitcher: x[19],
                    };
                  } else if (!isPregame && league === "MLB") {
                    return {
                      homeTeam: x[10],
                      awayTeam: x[5],
                      homeMoneyLine: x[27],
                      awayMoneyLine: x[26],
                      homeScore: x[13],
                      awayScore: x[12],
                      quarter: x[11] === "TIME" ? "HALF" : x[11].includes("of") ? "End" : x[11],
                      clock: x[22] + " out",
                      homeSpread: x[21],
                      awaySpread: "",
                      overUnder: x[28],
                      time: momentTimezone(moment(x[11], "h:mm A")).tz(userTimezone).format("h:mm"),
                      sport: league,
                      tvChannel: x[25],
                      id: x[26],
                      inProgress: !isPregame,
                      onFirst: x[31],
                      onSecond: x[32],
                      onThird: x[33],
                    };
                  } else {
                    return null;
                    // return {
                    // homeTeam: x[5],
                    // awayTeam: x[10],
                    // homeSpread: x[23],
                    // awaySpread: x[22],
                    // homeScore: 23,
                    // awayScore: 44,
                    // quarter: "1st",
                    // clock: "11:21",
                    // homeMoneyLine: x[16],
                    // awayMoneyLine: x[15],
                    // overUnder: x[17],
                    // time: momentTimezone(moment(x[11], "h:mm A")).tz(userTimezone).format("h:mm"),
                    // sport: league,
                    // tvChannel: x[25],
                    // id: x[26],
                    // inProgress: !isPregame,
                    // };
                  }
                });
            });
          const sorted = []
            .concat(...filteredData)
            .filter((x) => x !== null)
            .sort((a, b) => {
              if (a.inProgress && !b.inProgress) {
                return -1;
              } else if (!a.inProgress && b.inProgress) {
                return 1;
              }
              if (a.fullDate < b.fullDate) {
                return -1;
              } else if (a.fullDate > b.fullDate) {
                return 1;
              }
              return a.timeUntilString > b.timeUntilString ? -1 : 1;
            })
            .filter((x) => x.awayTeam !== "TBD" && x.homeTeam !== "TBD");
          setAllGames(sorted);
          let formattedTimeInUserTimezone = momentTimezone.tz(new Date(), userTimezone).format("h:mm:ss");
          setLastUpdated(formattedTimeInUserTimezone);
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
          setIsBehindTheScenesLoading(false);
        });
    }
    if (sessionIDRef.current === "") {
      const urlTracking = `https://sheline-art-website-api.herokuapp.com/odds-screen/tracking/${user}`;
      const requestOptionsTracking = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ os: browserData.os, browser: browserData.name }),
      };
      fetch(urlTracking, requestOptionsTracking)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setSessionID(data.id);
        });
    } else {
      const urlTracking = `https://sheline-art-website-api.herokuapp.com/odds-screen/tracking/${sessionIDRef.current}/${
        isInTimeFrame ? "true" : "false"
      }`;
      const requestOptionsTracking = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      };
      fetch(urlTracking, requestOptionsTracking).then((response) => {
        return response.json();
      });
    }
  };

  const handleResize = () => {
    const screenWidthHalf = window.innerWidth / 2;
    const screenHeight = window.innerHeight;
    setScreenWidth(Math.floor(screenWidthHalf) - 100);
    setScreenHeight(screenHeight);
  };

  window.addEventListener("resize", handleResize);

  useEffect(() => {
    selectOddsDisplay();
  }, [selectOddsDisplay]);

  const handleSwitchChange = (sport) => {
    setSportsToDisplay((prevValue) => {
      if (prevValue.includes(sport)) {
        return prevValue.filter((s) => s !== sport);
      } else {
        return [...prevValue, sport];
      }
    });
  };

  const handleFormat = (event, newSports) => {
    setSportsToDisplay(newSports);
  };

  const getWeatherIcon = (weather) => {
    if (weather === undefined) return null;
    if (weather === null) return null;
    if (weather.includes("Sunny") || weather.includes("sun")) {
      return <WiDaySunny size={22} color={"#fffd01"} style={{ marginLeft: 3, marginRight: 3 }} />;
    } else if (weather.includes("cloudy") || weather.includes("Cloudy") || weather.includes("clouds")) {
      return <WiDayCloudy size={22} color={"#fffd01"} style={{ marginLeft: 3, marginRight: 3 }} />;
    } else if (
      weather.includes("rain") ||
      weather.includes("Rain") ||
      weather.includes("storms") ||
      weather.includes("Showers")
    ) {
      return <WiThunderstorm size={22} color={"#fffd01"} style={{ marginLeft: 3, marginRight: 3 }} />;
    } else if (weather.includes("snow") || weather.includes("Snow")) {
      return <WiSnow size={22} color={"#fffd01"} style={{ marginLeft: 3, marginRight: 3 }} />;
    }
  };
  const getPoliticianOdds = (person) => {
    const odds = politicsData.bookmakers[0].markets[0].outcomes.find((x) => x.name === person).price;
    return odds > 0 ? "+" + odds : odds;
  };
  const getColor = (idx) => {
    if (
      idx === 0 ||
      idx === 4 ||
      idx === 8 ||
      idx === 3 ||
      idx === 7 ||
      idx === 11 ||
      idx === 12 ||
      idx === 15 ||
      idx === 16 ||
      idx === 19 ||
      idx === 20 ||
      idx === 24 ||
      idx === 28 ||
      idx === 32 ||
      idx === 36 ||
      idx === 40 ||
      idx === 41 ||
      idx === 44 ||
      idx === 48 ||
      idx === 52
    ) {
      return "#4cff00";
    } else {
      return "#fffd01";
    }
  };
  if (isLoading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: "black",
          overflow: "hidden",
          alignContent: "center",
          alignItems: "center",
          color: "white",
        }}>
        <ReactLoading type={"spin"} color={"#4cff00"} height={100} width={100} />
        {/* <Typography
          variant={"h3"}
          style={{
            fontFamily: "'Baloo Bhaijaan', cursive",
            fontWeight: 400,
            fontSize: "1.5rem",
            marginTop: 25,
          }}
          color={"white"}>
          Click on a game to display JUST that game
        </Typography> */}
        {/* <img
          alt={"bases"}
          style={{ height: 300 }}
          src={`${process.env.PUBLIC_URL}/images/oddsScreen/gameScreenPic.png`}
          alt={"pic"}
        /> */}
        <Typography
          variant={"h3"}
          style={{
            fontFamily: "'Baloo Bhaijaan', cursive",
            fontWeight: 400,
            fontSize: "1.5rem",
            marginTop: 25,
          }}
          color={"white"}>
          Only Top 25 NCAA Football is selected by default, uncheck that in the settings to show all NCAA Football
        </Typography>
        <Typography
          variant={"h3"}
          style={{
            fontFamily: "'Baloo Bhaijaan', cursive",
            fontWeight: 400,
            fontSize: "1.5rem",
            marginTop: 25,
          }}
          color={"white"}>
          Click the settings icons on the bottom right to choose what sports to display
        </Typography>
        <Typography
          variant={"h3"}
          style={{
            fontFamily: "'Baloo Bhaijaan', cursive",
            fontWeight: 400,
            fontSize: "1.5rem",
            marginTop: 25,
          }}
          color={"white"}>
          Change the font size using the settings as well
        </Typography>
        <Typography
          variant="h6"
          style={{
            fontFamily: "'Baloo Bhaijaan', cursive",
            fontWeight: 400,
            fontSize: "1.5rem",
            marginTop: 25,
          }}>
          SEE THE SETTINGS FOR SOME MORE USEFUL TIPS
        </Typography>
      </div>
    );
  } else {
    return (
      <div
        style={{
          backgroundColor: "black",
          display: "flex",
          width: "100%",
          height: "100vh",
          flexDirection: "column",
          borderRadius: 10,
          overflow: "hidden",
          justifyContent: "space-between",
        }}>
        {/* {email === "pbullion@gmail.com" && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              color: "white",
            }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
              }}>
              <img
                style={{ height: 600 }}
                src={`${process.env.PUBLIC_URL}/images/oddsScreen/maya.png`}
                alt={"pic"}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "white",
                }}>
                <Typography
                  variant={"h3"}
                  style={{
                    fontFamily: "'Baloo Bhaijaan', cursive",
                    fontWeight: 400,
                    fontSize: "7rem",
                    color: getPoliticianOdds("Kamala Harris").toString().includes("+")
                      ? "#4cff00"
                      : "red",
                  }}
                  color={"white"}>
                  HARRIS
                </Typography>
                <Typography
                  variant={"h3"}
                  style={{
                    fontFamily: "'Baloo Bhaijaan', cursive",
                    fontWeight: 400,
                    fontSize: "7rem",
                    textAlign: "right",
                    color: getPoliticianOdds("Kamala Harris").toString().includes("+")
                      ? "#4cff00"
                      : "red",
                  }}
                  color={"white"}>
                  {getPoliticianOdds("Kamala Harris")}
                </Typography>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                color: "white",
              }}>
              <img
                style={{ height: 700 }}
                src={`${process.env.PUBLIC_URL}/images/oddsScreen/trump.png`}
                alt={"pic"}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "white",
                }}>
                <Typography
                  variant={"h3"}
                  style={{
                    fontFamily: "'Baloo Bhaijaan', cursive",
                    fontWeight: 400,
                    fontSize: "7rem",
                    color: getPoliticianOdds("Donald Trump").toString().includes("+")
                      ? "#4cff00"
                      : "red",
                  }}
                  color={"white"}>
                  TRUMP
                </Typography>
                <Typography
                  variant={"h3"}
                  style={{
                    fontFamily: "'Baloo Bhaijaan', cursive",
                    fontWeight: 400,
                    fontSize: "7rem",
                    color: getPoliticianOdds("Donald Trump").toString().includes("+")
                      ? "#4cff00"
                      : "red",
                  }}
                  color={"white"}>
                  {getPoliticianOdds("Donald Trump")}
                </Typography>
              </div>
            </div>
          </div>
        )} */}
        <div
          style={{
            backgroundColor: "black",
            borderRadius: 10,
            padding: "0px 10px",
            display: "grid",
            gridTemplateColumns: numOfColumns === 3 ? "1fr 1fr 1fr" : numOfColumns === 2 ? "1fr 1fr" : "1fr",
            gridGap: 8,
            gap: 3,
            overflow: "hidden",
            width: "100%",
          }}>
          {allGames
            .filter((x) => sportsToDisplayRef.current.includes(x.sport))
            .filter((x) => {
              if (
                justTop25Basketball &&
                (x.sport === "NCAABASKETBALL" || x.sport === "NCAAFOOTBALL") &&
                (x.homeTeam.includes("#") || x.awayTeam.includes("#"))
              ) {
                return x;
              } else if (x.sport !== "NCAABASKETBALL" && x.sport !== "NCAAFOOTBALL") {
                return x;
              } else if (!justTop25Basketball) {
                return x;
              }
            })
            .map((game, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (game.sport === "MLB") return;
                    history.push(`/game-screen/${email}`, { game: game });
                  }}
                  style={{ cursor: "pointer", color: getColor(idx) }}>
                  <Grid container>
                    <Grid item xs={1} style={{ display: "flex", alignItems: "center" }}>
                      {game.sport === "NFL" || game.sport === "NCAAFOOTBALL" ? (
                        <SportsFootballIcon style={{ fontSize: `${textSize}rem`, color: "white" }} />
                      ) : game.sport === "NBA" || game.sport === "NCAABASKETBALL" ? (
                        <SportsBasketballIcon style={{ fontSize: `${textSize}rem`, color: "white" }} />
                      ) : game.sport === "MLB" ? (
                        <SportsBaseballIcon style={{ fontSize: `${textSize}rem`, color: "white" }} />
                      ) : (
                        <SportsHockeyIcon style={{ fontSize: `${textSize}rem`, color: "white" }} />
                      )}
                    </Grid>
                    <Grid item xs={5}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          variant={"h6"}
                          style={{
                            fontSize: `${textSize}rem`,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                          }}>
                          {game.awayTeam.length > 35 && numOfColumns === 3 ? `${game.awayTeam.slice(0, 35)}` : game.awayTeam}
                        </Typography>
                        {parseInt(game.awayScore) > parseInt(game.homeScore) ? (
                          <ArrowLeftIcon
                            style={{
                              fontSize: `${textSize}rem`,
                              color: idx % 2 === 0 ? "red" : "red",
                            }}
                          />
                        ) : null}
                      </div>
                    </Grid>
                    {game.awayScore ? (
                      <React.Fragment>
                        <Grid item xs={1}>
                          <Typography variant={"h6"} style={{ fontSize: `${textSize}rem`, textAlign: "center" }}>
                            {game.awayScore}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={1}
                          style={{
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "center",
                          }}>
                          <Typography
                            variant={"h6"}
                            style={{
                              display: "flex",
                              alignItems: "flex-end",
                              fontSize: `${
                                game.quarter === "HALF" || game.quarter === "TIME"
                                  ? textSize - 0.2
                                  : game.sport === "MLB"
                                  ? textSize - 0.23
                                  : textSize
                              }rem`,
                            }}
                            color={idx % 2 === 0 ? "orange" : "#00b4dd"}>
                            {game.quarter
                              .replace("Top", "T")
                              .replace("Bot", "B")
                              .replace("Mid", "M")
                              .replace("End", "E")
                              .replace(" ", "")}
                          </Typography>
                        </Grid>
                      </React.Fragment>
                    ) : game.sport === "MLB" ? (
                      <>
                        <Grid item xs={1}>
                          <Typography variant={"h6"} style={{ textAlign: "right", fontSize: `${textSize - 0.4}rem` }}>
                            {game.awayStartingPitcher &&
                              game.awayStartingPitcher
                                .replace(/\d+(\.\d+)?/g, "")
                                .trim()
                                .replace(/\s+/g, " ")
                                .replace("-", "")
                                .split(".")[1]}
                          </Typography>
                        </Grid>
                        <Grid item xs={1}></Grid>
                      </>
                    ) : (
                      <Grid item xs={2} style={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
                        {/* <Typography variant={"h6"} style={{ fontSize: `${textSize - 0.2}rem`, textAlign: "center" }} color={"red"}>
                          {!game.timeUntilString.includes("day") &&
                            game.timeUntilString.replace("about ", "").replace("minutes", "min").replace("minute", "min")}
                        </Typography> */}
                        {game.sport === "NFL" && !game.indoors && (
                          <Typography
                            variant={"h6"}
                            style={{ fontSize: `${textSize - 0.2}rem`, textAlign: "center" }}
                            color={"#fffd01"}>
                            {game.temperature}
                            {game.temperature !== null && "°"}
                          </Typography>
                        )}
                        {game.sport === "NFL" && !game.indoors && getWeatherIcon(game.weather)}
                        {game.sport === "NFL" && !game.indoors && (
                          <Typography
                            variant={"h6"}
                            style={{ fontSize: `${textSize - 0.2}rem`, textAlign: "center" }}
                            color={"#fffd01"}>
                            {game.weather !== null &&
                              game.weather
                                .toUpperCase()
                                .replace("PARTLY ", "")
                                .replace(" W/ SHOWERS", "")
                                .replace("INTERMITTENT ", "")
                                .replace("MOSTLY ", "")
                                .replace("HAZY ", "")
                                .replace("THUNDERSTORMS", "STORMS")}
                          </Typography>
                        )}
                      </Grid>
                    )}
                    <Grid item xs={1}>
                      <Typography
                        variant={"h6"}
                        style={{ textAlign: "center", fontSize: `${textSize}rem` }}
                        color={game.sport === "MLB" ? "orange" : idx % 2 === 0 ? "#4cff00" : "#fffd01"}>
                        {game.sport === "MLB" && renderRunnersMLB(game)}
                        {game.sport !== "MLB" && game.awaySpread === "" ? "-" : game.awaySpread}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        variant={"h6"}
                        style={{
                          textAlign: "center",
                          fontSize: `${game.awayMoneyLine && game.awayMoneyLine.length > 4 ? textSize - 0.2 : textSize}rem`,
                        }}>
                        {game.awayMoneyLine === "" ? "-" : game.awayMoneyLine}
                      </Typography>
                    </Grid>
                    <Grid item xs={1} style={{ display: "flex", alignItems: "flex-end" }}>
                      <Typography variant={"h6"} style={{ textAlign: "left", fontSize: `${textSize}rem` }}>
                        O/U
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container style={{ alignItems: "center" }}>
                    <Grid item xs={1}>
                      <Typography
                        variant={"h6"}
                        style={{
                          fontSize: `${
                            game.clock === undefined &&
                            game.clock !== game.time &&
                            momentTimezone(moment(new Date(), "mm/dd")).tz(userTimezone).format("ddd") ===
                              momentTimezone(moment(game.fullDate, "mm/dd")).tz(userTimezone).format("ddd")
                              ? textSize - 0.2
                              : game.clock === undefined && game.clock !== game.time
                              ? textSize - 0.5
                              : textSize - 0.5
                          }rem`,
                          lineHeight: 1,
                        }}
                        color={game.clock === undefined && game.clock !== game.time ? "red" : "#00b4dd"}>
                        {game.clock === undefined && game.clock !== game.time
                          ? `${
                              momentTimezone(moment(new Date(), "mm/dd")).tz(userTimezone).format("ddd") !==
                              momentTimezone(moment(game.fullDate, "mm/dd")).tz(userTimezone).format("ddd")
                                ? momentTimezone(moment(game.fullDate, "mm/dd")).tz(userTimezone).format("ddd")
                                : ""
                            } ${game.time.replace(" AM", "").replace(" PM", "")}`
                          : game.tvChannel &&
                            game.tvChannel
                              .replace("NHLPP|", "")
                              .replace("USA Net", "USA")
                              .replace("CW NETWORK", "CW")
                              .replace("BIG12|", "")
                              .replace("NHL NET", "NHLN")
                              .replace("Peacock", "PEA")
                              .replace("NBA TV", "NBAT")
                              .slice(0, 6)}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          variant={"h6"}
                          style={{
                            fontSize: `${textSize}rem`,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                          }}>
                          {game.homeTeam.length > 35 && numOfColumns === 3 ? `${game.homeTeam.slice(0, 35)}` : game.homeTeam}
                        </Typography>
                        {parseInt(game.homeScore) > parseInt(game.awayScore) ? (
                          <ArrowLeftIcon
                            style={{
                              fontSize: `${textSize}rem`,
                              color: idx % 2 === 0 ? "red" : "red",
                            }}
                          />
                        ) : null}
                      </div>
                    </Grid>
                    <Grid item xs={1}>
                      {game.homeScore ? (
                        <Typography variant={"h6"} style={{ textAlign: "center", fontSize: `${textSize}rem` }}>
                          {game.homeScore}
                        </Typography>
                      ) : game.homeStartingPitcher ? (
                        <Typography variant={"h6"} style={{ textAlign: "right", fontSize: `${textSize - 0.4}rem` }}>
                          {game.homeStartingPitcher &&
                            game.homeStartingPitcher
                              .replace(/\d+(\.\d+)?/g, "")
                              .trim()
                              .replace(/\s+/g, " ")
                              .replace("-", "")
                              .split(" ")[1]}
                        </Typography>
                      ) : (
                        <Typography
                          variant={"h6"}
                          style={{ textAlign: "right", fontSize: `${textSize - 0.25}rem` }}
                          color={"#00b4dd"}>
                          {game.tvChannel &&
                            game.tvChannel
                              .replace(" ", "")
                              .replace("NHLPP|", "")
                              .replace("USA Net", "USA")
                              .replace("CW NETWORK", "CW")
                              .replace("BIG12|", "")
                              .slice(0, 6)}
                        </Typography>
                      )}
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "flex-start",
                      }}>
                      <Typography
                        variant={"h6"}
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          fontSize:
                            game.clock === "HALF" ||
                            game.clock === "TIME" ||
                            (game.clock !== undefined &&
                              game.clock.length > 4 &&
                              textSize > 1 &&
                              allGames.filter((x) => sportsToDisplayRef.current.includes(x.sport)).length > 13)
                              ? `${textSize - 0.25}rem`
                              : `${textSize}rem`,
                        }}
                        color={idx % 2 === 0 ? "orange" : "#00b4dd"}>
                        {game.clock}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography
                        variant={"h6"}
                        style={{ textAlign: "center", fontSize: `${textSize}rem` }}
                        color={game.sport === "MLB" ? "orange" : idx % 2 === 0 ? "#4cff00" : "#fffd01"}>
                        {game.homeSpread === "" ? "-" : game.homeSpread}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        variant={"h6"}
                        style={{
                          textAlign: "center",
                          fontSize: `${game.homeMoneyLine && game.homeMoneyLine.length > 4 ? textSize - 0.2 : textSize}rem`,
                        }}>
                        {game.homeMoneyLine === "" ? "-" : game.homeMoneyLine}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography
                        variant={"h6"}
                        style={{
                          textAlign: "left",
                          fontSize: `${game.overUnder && game.overUnder.length > 4 ? textSize - 0.2 : textSize}rem`,
                        }}>
                        {game.overUnder === "" ? "-" : game.overUnder}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              );
            })}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <Typography
              variant={"h3"}
              style={{
                fontFamily: "'Baloo Bhaijaan', cursive",
                fontWeight: 400,
                fontSize: "1.5rem",
              }}
              color={"white"}>
              {lastUpdated}
            </Typography>
            {/* {isBehindTheScenesLoading ? <ReactLoading type={"spin"} color={"#4cff00"} height={25} width={25} /> : null} */}
          </div>
          <div style={{ display: "flex" }}>
            <Typography
              variant={"h3"}
              style={{
                fontFamily: "'Baloo Bhaijaan', cursive",
                fontWeight: 400,
                fontSize: "1.5rem",
              }}
              color={"white"}>
              Odds by BETMGM
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
            <SettingsIcon style={{ fontSize: 25, color: "white", marginLeft: 10 }} onClick={() => setIsSettingsOpen(true)} />
            <Typography
              variant={"h3"}
              onClick={() => setIsSettingsOpen(true)}
              style={{
                fontFamily: "'Baloo Bhaijaan', cursive",
                fontWeight: 400,
                fontSize: "1.5rem",
              }}
              color={"white"}>
              mancavedisplays.com
            </Typography>
          </div>
        </div>
        <Dialog open={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} maxWidth="xxl" fullWidth>
          <DialogTitle>Select Sports to Display</DialogTitle>
          <DialogContent>
            <ToggleButtonGroup
              color="secondary"
              value={sports_to_display}
              onChange={handleFormat}
              aria-label="text formatting"
              style={{ flexWrap: "wrap" }}>
              {["NFL", "MLB", "NBA", "NCAAFOOTBALL", "NCAABASKETBALL", "NHL"].map((sport, index) => (
                <ToggleButton key={index} value={sport} aria-label={sport}>
                  {sport}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <List disablePadding>
              <ListItem disableGutters>
                <ListItemText>
                  <Typography variant="body2">Only Show Top 25 NCAA</Typography>
                </ListItemText>
                <FormControl variant="outlined">
                  <ListItemSecondaryAction style={{ paddingRight: 2 }}>
                    <Switch
                      color="secondary"
                      checked={justTop25Basketball}
                      onClick={() => setJustTop25Basketball(!justTop25Basketball)}
                    />
                  </ListItemSecondaryAction>
                </FormControl>
              </ListItem>
            </List>
            <Typography variant="h6" style={{ marginTop: 10 }}>
              Number of Columns
            </Typography>
            <Box sx={{}}>
              <Slider
                aria-label="Small steps"
                defaultValue={1}
                step={1}
                marks
                min={1}
                max={3}
                valueLabelDisplay="auto"
                value={numOfColumns}
                onChange={(e, value) => setNumOfColumns(value)}
              />
            </Box>
            <Typography variant="h6" style={{ marginTop: 10 }}>
              Font Size
            </Typography>
            <Box sx={{}}>
              <Slider
                aria-label="Small steps"
                defaultValue={1}
                step={0.25}
                marks
                min={0.25}
                max={3}
                valueLabelDisplay="auto"
                value={textSize}
                onChange={(e, value) => setTextSize(value)}
              />
            </Box>
            <List disablePadding>
              <ListItem disableGutters>
                <ListItemText>
                  <Typography variant="body2">Only Show One Column (vertical displays)</Typography>
                </ListItemText>
              </ListItem>
            </List>
            <Typography variant="h6" style={{ marginTop: 10 }}>
              TIPS
            </Typography>
            <Typography variant="h6" style={{ fontSize: "0.8rem" }}>
              - Bookmark {window.location.href} so you don't have to login everytime
            </Typography>
            <Typography variant="h6" style={{ fontSize: "0.8rem" }}>
              - Add '/2.5' (any number, but probably no larger than 3.5) after the url to autochange the font size if your
              screen always loads small text *** ex. {window.location.href}
              /2.5
            </Typography>
          </DialogContent>
          <DialogActions>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <Button href="https://billing.stripe.com/p/login/28obJ7eCL7RIcGQ5kk" variant="contained" color="secondary">
                Manage Subscription
              </Button>
              <Button onClick={() => window.location.reload()}>Refresh</Button>
              <Button onClick={() => setIsSettingsOpen(false)}>Close</Button>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default OddsScreen;
