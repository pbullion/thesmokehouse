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
import Clock from "react-clock";

function OddsScreen(props) {
  const history = useHistory();
  const browserData = browserDetect();
  const { email, defaultFontSize } = useParams();
  const { selectOddsDisplay } = props;
  const [textSize, setTextSize] = useState(1);
  const [screenWidth, setScreenWidth] = useState(500);
  const [screenHeight, setScreenHeight] = useState(500);
  const [allGames, setAllGames] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [onlyOneColumn, setOnlyOneColumn] = useState(false);
  const [justTop25Basketball, setJustTop25Basketball] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [standings, setStandings] = useState({ americanLeague: [], nationalLeague: [] });
  const [userTimezone, setUserTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [isBehindTheScenesLoading, setIsBehindTheScenesLoading] = useState(false);
  const [user, setUser] = useState(email);
  const [lastUpdated, setLastUpdated] = useState(moment().format("h:mm:ss"));
  const [sports_to_display, setSportsToDisplay] = useState(["MLB", "NBA", "NHL", "NCAABASKETBALL"]);
  const isLoadingRef = useRef(isLoading);
  const sportsToDisplayRef = useRef(sports_to_display);
  const [sessionID, setSessionID] = useState("");
  const sessionIDRef = useRef(sessionID);
  sessionIDRef.current = sessionID;
  sportsToDisplayRef.current = sports_to_display;
  isLoadingRef.current = isLoading;
  const [clockValue, setClockValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setClockValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
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

  useEffect(() => {
    if (defaultFontSize) {
      setTextSize(parseFloat(defaultFontSize));
    } else {
      setTextSize(1);
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
          fetchStandings();
        } else {
          window.alert(
            `No subscription found for ${email} -  Make sure you are entering the email exactly as you did when you subscribed.`
          );
          history.push("/odds-screen-store");
        }
      });
  };
  const fetchStandings = async () => {
    const url = `https://sheline-art-website-api.herokuapp.com/patrick/mlb-standings`;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const standings = data.flat();
        setStandings(standings);
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

  const getFinalScores = async (date) => {
    return await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard?dates=${moment(
        date
      ).format("YYYYMMDD")}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.events;
      });
  };
  const fetchGames = async () => {
    const currentTime = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });
    const centralTime = new Date(currentTime);
    const currentHour = centralTime.getHours();
    const scoresMLB = await getFinalScores(moment().format("YYYYMMDD"));
    const url = `https://sheline-art-website-api.herokuapp.com/patrick/all-data-2/mancavedisplaysllc@gmail.com`;
    // const url = `http://localhost:3001/patrick/all-data-2/mancavedisplaysllc@gmail.com`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const isInTimeFrame = currentHour >= 11;
    if (isInTimeFrame || isLoadingRef.current) {
      fetch(url, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const filteredData = data
            .filter((x) => {
              if (x[0][0].includes("logo") || x[0][0].includes("ncaa")) return x;
            })
            .map((x) => x.splice(0, 1) && x)
            .map((league) => {
              return league
                .filter((x) => !x[0].includes("postponed"))
                .map((x) => {
                  const league = x[0].split(" ")[2].toUpperCase();
                  const isPregame = x[0].includes("pregame");
                  if (
                    isPregame &&
                    (league === "NFL" || league === "NCAAFOOTBALL" || league === "NCAABASKETBALL")
                  ) {
                    const dateParts = x[20].match(/(\w+), (\w+) (\d+)(?:st|nd|rd|th)/);
                    const dayOfWeek = dateParts[1];
                    const month = dateParts[2];
                    const day = dateParts[3];
                    const year = new Date().getFullYear();
                    const fullDateStr = `${month} ${day}, ${month === "January" ? "2024" : year} ${
                      x[11]
                    }`;
                    const dateStr = `${month} ${day}`;
                    const timeUntilString = new Date(`${dateStr}, ${year} ${x[11]} PM`);
                    const jsDate = new Date(fullDateStr);
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
                      time: momentTimezone(moment(x[11], "h:mm A")).tz(userTimezone).format("h:mm"),
                      date: x[20],
                      sport: league,
                      inProgress: !isPregame,
                      timeUntilString: formatDistanceToNow(timeUntilString, { addSuffix: false }),
                      conferences: x[24],
                      tvChannel: x[25],
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
                      clock:
                        x[11] === "TIME"
                          ? "TIME"
                          : x[11].includes("of")
                          ? x[11].split("of ")[1]
                          : x[11],
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
                      clock:
                        x[11] === "TIME"
                          ? "TIME"
                          : x[11].includes("of")
                          ? x[11].split("of ")[1]
                          : x[11],
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
                    const fullDateStr = `${month} ${day}, ${month === "January" ? "2024" : year} ${
                      x[11]
                    }`;
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
                      clock:
                        x[11] === "TIME"
                          ? "TIME"
                          : x[11].includes("of")
                          ? x[11].split("of ")[1]
                          : x[11],
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
                    const fullDateStr = `${month} ${day}, ${month === "January" ? "2024" : year} ${
                      x[11]
                    }`;
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
                      clock:
                        x[11] === "TIME"
                          ? "TIME"
                          : x[11].includes("of")
                          ? x[11].split("of ")[1]
                          : x[11],
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
                      id: x[34],
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
              // First, sort by inProgress status, putting true values before false
              if (a.inProgress && !b.inProgress) {
                return -1;
              } else if (!a.inProgress && b.inProgress) {
                return 1;
              }

              // Then, sort by fullDate
              if (a.fullDate < b.fullDate) {
                return -1;
              } else if (a.fullDate > b.fullDate) {
                return 1;
              }

              // If fullDate is equal, sort by time (assuming time is in 'hh:mm' format)
              // You might need to adjust this if your time format is different
              let aTime = a.time.split(":").map(Number);
              let bTime = b.time.split(":").map(Number);
              aTime = aTime[0] * 60 + aTime[1]; // Convert time to minutes for easier comparison
              bTime = bTime[0] * 60 + bTime[1]; // Convert time to minutes for easier comparison

              return aTime - bTime;
            })
            .filter((x) => x.awayTeam !== "TBD" && x.homeTeam !== "TBD");
          setAllGames(
            sorted.map((bet) => {
              console.log("🚀 ~ sorted.map ~ scoresMLB:", scoresMLB);
              const score = scoresMLB?.find((x) => x.id === bet.id);
              return { ...bet, score };
            })
          );
          let formattedTimeInUserTimezone = momentTimezone
            .tz(new Date(), userTimezone)
            .format("h:mm:ss");
          setLastUpdated(formattedTimeInUserTimezone);
          setTimeout(() => {
            setIsLoading(false);
          }, 0);
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
      const urlTracking = `https://sheline-art-website-api.herokuapp.com/odds-screen/tracking/${
        sessionIDRef.current
      }/${isInTimeFrame ? "true" : "false"}`;
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
  const colors = {
    darkRed: "#A43036",
    lightRed: "#FF4F4B",
    yellow: "#FFD301",
    lightGreen: "#7BB662",
    midGreen: "#639754",
    darkGreen: "#006B3D",
    pregame: "#003366",
    lightPurple: "#da8ee7",
    darkPurple: "#bb28bf",
  };

  const getBaseImgSrc = (score) => {
    const { onFirst, onSecond, onThird } = score.competitions[0].situation;
    if (onFirst && onSecond && onThird) {
      return (
        <img alt="baseImage" style={{ height: 30, width: 30, marginLeft: 0 }} src={basesLoaded} />
      );
    } else if (onFirst && !onSecond && !onThird) {
      return <img alt="baseImage" style={{ height: 30, width: 30, marginLeft: 0 }} src={first} />;
    } else if (!onFirst && onSecond && !onThird) {
      return <img alt="baseImage" style={{ height: 30, width: 30, marginLeft: 0 }} src={second} />;
    } else if (!onFirst && !onSecond && onThird) {
      return <img alt="baseImage" style={{ height: 30, width: 30, marginLeft: 0 }} src={third} />;
    } else if (onFirst && onSecond && !onThird) {
      return (
        <img
          alt="baseImage"
          style={{ height: 30, width: 30, marginLeft: 0 }}
          src={firstAndSecond}
        />
      );
    } else if (onFirst && !onSecond && onThird) {
      return (
        <img alt="baseImage" style={{ height: 30, width: 30, marginLeft: 0 }} src={firstAndThird} />
      );
    } else if (!onFirst && onSecond && onThird) {
      return (
        <img
          alt="baseImage"
          style={{ height: 30, width: 30, marginLeft: 0 }}
          src={secondAndThird}
        />
      );
    }
  };
  const getInningBackgroundColor = (game, index, type) => {
    if (
      game.status.type.name === "STATUS_IN_PROGRESS" &&
      index === game.status.period &&
      type === "away" &&
      game.status.type.detail.toLowerCase().includes("top")
    ) {
      return { backgroundColor: colors.darkPurple, color: "white" };
    } else if (
      game.status.type.name === "STATUS_IN_PROGRESS" &&
      index === game.status.period &&
      type === "home" &&
      game.status.type.detail.toLowerCase().includes("bot")
    ) {
      return { backgroundColor: colors.darkPurple, color: "white" };
    } else if (
      game.status.type.name === "STATUS_IN_PROGRESS" &&
      index === game.status.period &&
      type === "home" &&
      game.status.type.detail.toLowerCase().includes("top")
    ) {
      return { backgroundColor: "transparent", color: "transparent" };
    } else if (game.status.type.name === "STATUS_IN_PROGRESS" && index > game.status.period) {
      return { backgroundColor: "transparent", color: "transparent" };
    } else {
      return { backgroundColor: null, color: "white" };
    }
  };
  const getLinescore = (linescore, bet) => {
    if (bet.competitions[0].format.regulation.periods === 9) {
      if (linescore?.length > 8) {
        return linescore.map((x) => x.value);
      } else if (linescore?.length < 9) {
        const bets = new Array(9 - linescore?.length).fill("-");
        bets.unshift(...linescore.map((x) => x.value));
        return bets;
      } else {
        const bets = new Array(9).fill("-");
        return bets;
      }
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
        <ReactLoading type={"spin"} color={"green"} height={100} width={100} />
        <Typography
          variant={"h3"}
          style={{
            fontFamily: "'Baloo Bhaijaan', cursive",
            fontWeight: 400,
            fontSize: "1.5rem",
            marginTop: 25,
          }}
          color={"white"}>
          Click on a game to display JUST that game
        </Typography>
        <img
          style={{ height: 300 }}
          src={`${process.env.PUBLIC_URL}/images/oddsScreen/gameScreenPic.png`}
          alt={"pic"}
        />
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
          SEE THE SETTINGS FOR SOME MORE USEFULL TIPS
        </Typography>
      </div>
    );
  } else {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: "black",
          overflow: "hidden",
          alignContent: "center",
          alignItems: "center",
          color: "black",
        }}>
        <div
          style={{
            height: "18rem",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "black",
            overflow: "hidden",
            alignContent: "center",
            alignItems: "center",
            color: "black",
          }}>
          <div
            style={{
              height: "16rem",
              width: "16rem",
              borderRadius: 150,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              backgroundColor: "white",
              overflow: "hidden",
              backgroundColor: "#003920",
              alignContent: "center",
              zIndex: 1001,
              alignItems: "center",
              color: "white",
            }}>
            <Clock
              value={clockValue}
              size={"14rem"}
              renderSecondHand={false}
              renderMinuteMarks={false}
              hourHandWidth={12}
              minuteHandWidth={6}
              hourMarksWidth={8}
            />
          </div>
        </div>
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            marginTop: "-9rem",
            flexDirection: "column",
            textAlign: "center",
            overflow: "hidden",
            borderRadius: 75,
            alignContent: "center",
            alignItems: "center",
            color: "white",
          }}>
          <div
            style={{
              width: "75%",
              height: "15%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              textAlign: "center",
              backgroundColor: "#003920",
              overflow: "hidden",
              borderRadius: 75,
              zIndex: 1000,
              alignContent: "center",
              alignItems: "center",
              color: "white",
            }}>
            <Typography
              variant={"h3"}
              style={{
                fontWeight: 900,
                fontSize: "4rem",
              }}
              color={"white"}>
              MANCAVE
            </Typography>
            <Typography
              variant={"h3"}
              style={{
                fontWeight: 900,
                fontSize: "4rem",
              }}
              color={"white"}>
              DISPLAYS
            </Typography>
          </div>
          <div
            style={{
              height: "100%",
              width: "100%",
              marginTop: "-50px",
              paddingBottom: 50,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              textAlign: "center",
              backgroundColor: "#003920",
              overflow: "hidden",
              borderRadius: 75,
              alignContent: "center",
              alignItems: "center",
              color: "white",
            }}>
            {[1, 2, 3].map((column) => {
              const mlbGames = allGames.filter((game) => game.sport === "MLB");
              const midpoint = Math.ceil(mlbGames.length / 2);
              const firstHalf = mlbGames.slice(0, midpoint);
              const secondHalf = mlbGames.slice(midpoint);
              const splitGames = column === 1 ? firstHalf : secondHalf;
              if (column === 2) {
                return (
                  <div
                    style={{
                      height: "100%",
                      width: "50%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      marginTop: "120px",
                      textAlign: "center",
                      backgroundColor: "#003920",
                      overflow: "hidden",
                      alignContent: "flex-start",
                      alignItems: "flex-start",
                      color: "white",
                    }}>
                    <div>
                      {[
                        "National League East",
                        "National League Central",
                        "National League West",
                        "American League East",
                        "American League Central",
                        "American League West",
                      ].map((division) => {
                        return (
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-start",
                              alignContent: "center",
                              alignItems: "center",
                              color: "white",
                              marginBottom: "0.5rem",
                            }}>
                            <div
                              style={{
                                height: "100%",
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                color: "white",
                              }}>
                              <div
                                style={{
                                  height: "100%",
                                  width: "100%",
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  color: "white",
                                }}>
                                <Typography
                                  variant={"h3"}
                                  style={{
                                    fontWeight: 900,
                                    fontSize: "0.9rem",
                                    textAlign: "left",
                                    width: "6rem",
                                  }}
                                  color={"white"}>
                                  {division
                                    .replace("American League", "AL")
                                    .replace("National League", "NL")}
                                </Typography>
                                <Typography
                                  variant={"h3"}
                                  style={{
                                    fontWeight: 900,
                                    fontSize: "0.5rem",
                                    textAlign: "left",
                                    width: "2.5rem",
                                  }}
                                  color={"white"}></Typography>
                                <Typography
                                  variant={"h3"}
                                  style={{
                                    fontWeight: 900,
                                    fontSize: "0.5rem",
                                    textAlign: "left",
                                    width: "2.5rem",
                                  }}
                                  color={"white"}></Typography>
                                <Typography
                                  variant={"h3"}
                                  style={{
                                    fontWeight: 900,
                                    fontSize: "0.5rem",
                                    textAlign: "left",
                                    width: "2.5rem",
                                  }}
                                  color={"white"}></Typography>
                                <Typography
                                  variant={"h3"}
                                  style={{
                                    fontWeight: 900,
                                    fontSize: "0.5rem",
                                    textAlign: "right",
                                    width: "2.5rem",
                                  }}
                                  color={"white"}></Typography>
                                <Typography
                                  variant={"h3"}
                                  style={{
                                    fontWeight: 900,
                                    fontSize: "0.5rem",
                                    textAlign: "left",
                                    width: "2.5rem",
                                    marginLeft: 10,
                                  }}
                                  color={"white"}></Typography>
                              </div>
                            </div>
                            {standings
                              .find((x) => x.name === division)
                              .teams.sort(
                                (a, b) =>
                                  a.stats.find((x) => x.name === "divisionGamesBehind").value -
                                  b.stats.find((x) => x.name === "divisionGamesBehind").value
                              )
                              .map((team) => {
                                return (
                                  <div
                                    style={{
                                      height: "100%",
                                      width: "100%",
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "flex-start",
                                      alignItems: "flex-start",
                                      color: "white",
                                    }}>
                                    <div
                                      style={{
                                        height: "100%",
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "space-between",
                                        color: "white",
                                      }}>
                                      <Typography
                                        variant={"h3"}
                                        style={{
                                          fontWeight: 900,
                                          fontSize: "1rem",
                                          textAlign: "left",
                                          width: "6rem",
                                        }}
                                        color={"white"}>
                                        {team.name === "Diamondbacks" ? "D-Backs" : team.name}
                                      </Typography>
                                      <Typography
                                        variant={"h3"}
                                        style={{
                                          fontWeight: 900,
                                          fontSize: "1rem",
                                          textAlign: "left",
                                          width: "2.5rem",
                                        }}
                                        color={"white"}>
                                        {team.stats.find((x) => x.name === "wins").value}
                                      </Typography>
                                      <Typography
                                        variant={"h3"}
                                        style={{
                                          fontWeight: 900,
                                          fontSize: "1rem",
                                          textAlign: "left",
                                          width: "2.5rem",
                                        }}
                                        color={"white"}>
                                        {team.stats.find((x) => x.name === "losses").value}
                                      </Typography>
                                      <Typography
                                        variant={"h3"}
                                        style={{
                                          fontWeight: 900,
                                          fontSize: "1rem",
                                          textAlign: "left",
                                          width: "2.5rem",
                                        }}
                                        color={"white"}>
                                        {team.stats
                                          .find((x) => x.name === "winPercent")
                                          .value.toFixed(3)
                                          .slice(1)}
                                      </Typography>
                                      <Typography
                                        variant={"h3"}
                                        style={{
                                          fontWeight: 900,
                                          fontSize: "1rem",
                                          textAlign: "right",
                                          width: "2.5rem",
                                        }}
                                        color={"white"}>
                                        {team.stats.find((x) => x.name === "divisionGamesBehind")
                                          .value === 0
                                          ? "-"
                                          : team.stats.find((x) => x.name === "divisionGamesBehind")
                                              .value}
                                      </Typography>
                                      <Typography
                                        variant={"h3"}
                                        style={{
                                          fontWeight: 900,
                                          fontSize: "1rem",
                                          textAlign: "left",
                                          width: "2.5rem",
                                          marginLeft: 10,
                                        }}
                                        color={"white"}>
                                        {
                                          team.stats.find((x) => x.name === "Last Ten Games")
                                            .displayValue
                                        }
                                      </Typography>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              } else
                return (
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      textAlign: "center",
                      backgroundColor: "#003920",
                      marginTop: "100px",
                      overflow: "hidden",
                      alignContent: "center",
                      marginLeft: 25,
                      alignItems: "center",
                      color: "white",
                    }}>
                    {splitGames.map((game) => {
                      console.log("🚀 ~ {splitGames.map ~ game:", game);
                      return (
                        <div
                          style={{
                            borderTop: "1px solid white",
                            height: "8rem",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            textAlign: "center",
                            backgroundColor: "#003920",
                            overflow: "hidden",
                            alignContent: "center",
                            alignItems: "center",
                            color: "white",
                          }}>
                          {["away", "home"].map((team) => {
                            const linescores = getLinescore(
                              game.score.competitions[0].competitors[team === "home" ? 0 : 1]
                                .linescores,
                              game.score
                            );
                            return (
                              <div
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "flex-start",
                                  backgroundColor: "#003920",
                                  alignItems: "center",
                                  overflow: "hidden",
                                  alignContent: "center",
                                  color: "white",
                                }}>
                                <Typography
                                  variant={"h3"}
                                  style={{
                                    fontWeight: 900,
                                    fontSize: "1.2rem",
                                    textAlign: "right",
                                    width: "6rem",
                                  }}
                                  color={"white"}>
                                  {team === "away" ? game.awayMoneyLine : game.homeMoneyLine}
                                </Typography>
                                <Typography
                                  variant={"h3"}
                                  style={{
                                    fontWeight: 900,
                                    fontSize: "1.2rem",
                                    textAlign: "right",
                                    width: "6rem",
                                  }}
                                  color={"white"}>
                                  {team === "away" ? "O/U" : game.overUnder}
                                </Typography>
                                <Typography
                                  variant={"h3"}
                                  style={{
                                    fontWeight: 900,
                                    fontSize: "1rem",
                                    textAlign: "left",
                                    width: "300px",
                                    marginLeft: "1rem",
                                    marginRight: "1rem",
                                  }}
                                  color={"white"}>
                                  {team === "away" ? game.awayTeam : game.homeTeam}
                                </Typography>
                                {game.inProgress && team === "away" && (
                                  <div style={{ marginRight: 10 }}>{getBaseImgSrc(game.score)}</div>
                                )}
                                {game.inProgress && team === "home" && (
                                  <div style={{ marginRight: 10, display: "flex" }}>
                                    <p
                                      style={{
                                        marginRight: 2,
                                        fontSize: "0.4rem",
                                        color:
                                          game.clock.includes("1") || game.clock.includes("2")
                                            ? "red"
                                            : "white",
                                      }}>
                                      ⬤
                                    </p>
                                    <p
                                      style={{
                                        marginRight: 2,
                                        fontSize: "0.4rem",
                                        color: game.clock.includes("2") ? "red" : "white",
                                      }}>
                                      ⬤
                                    </p>
                                    <p
                                      style={{
                                        marginRight: 2,
                                        fontSize: "0.4rem",
                                        color: "white",
                                      }}>
                                      ⬤
                                    </p>
                                  </div>
                                )}
                                {linescores.map((inn, idx) => {
                                  const inning = idx + 1;
                                  return (
                                    <div
                                      style={{
                                        height: "100%",
                                        borderRight:
                                          inning === 3 || inning === 6 ? "1px solid white" : "none",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}>
                                      <div
                                        style={{
                                          width: "2rem",
                                          backgroundColor: getInningBackgroundColor(
                                            game.score,
                                            inning,
                                            team
                                          ).backgroundColor,
                                          height: "2.5rem",
                                          display: "flex",
                                          flexDirection: "row",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}>
                                        <Typography
                                          variant={"h3"}
                                          style={{
                                            fontWeight: 900,
                                            fontSize: "1.2rem",
                                            textAlign: "left",
                                          }}
                                          color={"white"}>
                                          {inn}
                                        </Typography>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                          {!game.inProgress && (
                            <Typography
                              variant={"h3"}
                              style={{
                                fontWeight: 900,
                                fontSize: "1.2rem",
                                textAlign: "center",
                              }}
                              color={"white"}>
                              {game.time}
                            </Typography>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default OddsScreen;
