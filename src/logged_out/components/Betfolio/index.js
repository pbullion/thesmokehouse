import * as React from "react";
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
import myBets from "./mybets.js";

export default function Betfolio(props) {
  React.useEffect(() => {
    props.selectBetfolio();
  }, [props.selectBetfolio]);
  const [email, setEmail] = React.useState("btb151");
  const [password, setPassword] = React.useState("PATb");
  const [isLoading, setIsLoading] = React.useState(false);
  const [bearer, setBearer] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [bettingWebsite, setBettingWebsite] = React.useState("steam22");
  const [token, setToken] = React.useState("");
  const [todaysGames, setTodaysGames] = React.useState([]);
  const [todaysNFLGames, setTodaysNFLGames] = React.useState([]);
  const [todaysNBAGames, setTodaysNBAGames] = React.useState([]);
  const [todaysNHLGames, setTodaysNHLGames] = React.useState([]);
  const [todaysXFLGames, setTodaysXFLGames] = React.useState([]);
  const [todaysNCAAFootballGames, setTodaysNCAAFootballGames] = React.useState([]);
  const [todaysNCAABasketballGames, setTodaysNCAABasketballGames] = React.useState([]);
  const [todaysNCAABaseballGames, setTodaysNCAABaseballGames] = React.useState([]);
  const [todaysSoccerGames, setTodaysSoccerGames] = React.useState([]);
  const [allTodaysBets, setAllTodaysBets] = React.useState([]);
  const allTodaysBetsRef = React.useRef(allTodaysBets);
  allTodaysBetsRef.current = allTodaysBets;

  const allGames = {
    nba: todaysNBAGames,
    nhl: todaysNHLGames,
    mlb: todaysGames,
    nfl: todaysNFLGames,
    xfl: todaysXFLGames,
    ncaafootball: todaysNCAAFootballGames,
    ncaabasketball: todaysNCAABasketballGames,
    ncaabaseball: todaysNCAABaseballGames,
    soccer: todaysSoccerGames,
  };
  async function getAllData() {
    try {
      // await fetch(`http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?groups=81&limit=900`)
      //   .then((response) => {
      //     return response.json();
      //   })
      //   .then((data) => {
      //     setTodaysNCAAFCSFootballGames(data.events);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      // await fetch(`http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?groups=80&limit=900`)
      //   .then((response) => {
      //     return response.json();
      //   })
      //   .then((data) => {
      //     setTodaysNCAAFootballGames(data.events);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      // await fetch(`https://site.api.espn.com/apis/site/v2/sports/football/xfl/scoreboard`)
      //   .then((response) => {
      //     return response.json();
      //   })
      //   .then((data) => {
      //     setTodaysXFLGames(data.events);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      await fetch(`http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?groups=50&limit=900`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setTodaysNCAABasketballGames(data.events);
        })
        .catch((error) => {
          console.log(error);
        });
      // await fetch(`https://site.api.espn.com/apis/site/v2/sports/baseball/college-baseball/scoreboard`)
      //   .then((response) => {
      //     return response.json();
      //   })
      //   .then((data) => {
      //     setTodaysNCAABaseballGames(data.events);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      await fetch(`http://site.api.espn.com/apis/site/v2/sports/soccer/all/scoreboard`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setTodaysSoccerGames(data.events);
        })
        .catch((error) => {
          console.log(error);
        });
      await fetch(`http://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setTodaysNHLGames(data.events);
        })
        .catch((error) => {
          console.log(error);
        });
      await fetch(`http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setTodaysGames(data.events);
        })
        .catch((error) => {
          console.log(error);
        });
      // await fetch(`http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard`)
      //   .then((response) => {
      //     return response.json();
      //   })
      //   .then((data) => {
      //     setTodaysNFLGames(data.events);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      await fetch(`http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setTodaysNBAGames(data.events);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log("catch errorrrrrrrr");
      console.warn("e", e);
    } finally {
    }
  }
  async function syncWithSportsWebsite(fetchedToken) {
    const bets = myBets.Items.map((item) => {
      let totalWin = 0;
      let totalRisk = 0;
      if (item.Wagers.length > 1) {
        item.Wagers.map((x) => {
          totalWin += x.TotalWin;
          totalRisk += x.TotalRisk;
        });
      }
      return {
        parlay: item.Description.includes("Parlay") || item.Description.includes("Teaser"),
        risk: totalRisk > 0 ? totalRisk.toFixed(2) : item.Wagers[0].TotalRisk,
        win: totalWin > 0 ? totalWin.toFixed(2) : item.Wagers[0].TotalWin,
        bets: item.Wagers[0].Details,
      };
    });
    if (bets.length > 0) {
      bets.forEach((bet) => {
        let webParlays = [];
        bet.bets.forEach((betGame) => {
          const leagueName = betGame.LeagueName ? betGame.LeagueName : betGame.SportSubTypeWeb;
          if (
            leagueName === "WNBA" ||
            leagueName === "International Baseball" ||
            leagueName === "Tennis" ||
            leagueName === "Major Soccer" ||
            leagueName === "Contest Wager" ||
            leagueName === "Golf" ||
            leagueName === "Boxing" ||
            betGame.SportType === "Other Sports" ||
            betGame.LeagueTypeName === "Props" ||
            betGame.Description === "Heads" ||
            betGame.Header === "Super Bowl LVII - Coin toss to land Heads or Tails"
          ) {
            return;
          }
          const league =
            betGame.LeagueName === "NCAA Basketball"
              ? 2
              : betGame.LeagueName === "MLB"
              ? 3
              : betGame.LeagueName === "NBA"
              ? 1
              : betGame.LeagueName === "NHL"
              ? 4
              : betGame.LeagueName === "NFL"
              ? 6
              : betGame.LeagueName === "NCAA Football"
              ? 7
              : leagueName === "XFL Main"
              ? 8
              : 5;
          const game = allGames[leagueName.toLowerCase().replace(" ", "")].find((x) => {
            if (
              x.competitions[0].competitors[1].team.location === betGame.Team1 ||
              x.competitions[0].competitors[0].team.location === betGame.Team1 ||
              x.competitions[0].competitors[0].team.location === betGame.Team2 ||
              x.competitions[0].competitors[1].team.location === betGame.Team2
            ) {
              return x;
            } else if (
              (betGame.Team1 === "FAU" || betGame.Team2 === "FAU") &&
              (x.competitions[0].competitors[1].team.location === "Florida Atlantic" ||
                x.competitions[0].competitors[0].team.location === "Florida Atlantic")
            ) {
              return x;
            } else if (
              (betGame.Team1 === "Morehead St" || betGame.Team2 === "Morehead St") &&
              (x.competitions[0].competitors[1].team.location === "Morehead State" ||
                x.competitions[0].competitors[0].team.location === "Morehead State")
            ) {
              return x;
            } else if (
              (betGame.Team1 === "St. Francis PA" || betGame.Team2 === "St. Francis PA") &&
              (x.competitions[0].competitors[1].team.location === "St. Francis (PA)" ||
                x.competitions[0].competitors[0].team.location === "St. Francis (PA)")
            ) {
              return x;
            } else if (
              (betGame.Team1 === "Montana St" || betGame.Team2 === "Montana St") &&
              (x.competitions[0].competitors[1].team.location === "Montana State" ||
                x.competitions[0].competitors[0].team.location === "Montana State")
            ) {
              return x;
            } else if (
              (betGame.Team1 === "Missouri St" || betGame.Team2 === "Missouri St") &&
              (x.competitions[0].competitors[1].team.location === "Missouri State" ||
                x.competitions[0].competitors[0].team.location === "Missouri State")
            ) {
              return x;
            } else if (
              (betGame.Team1 === "Colorado St" || betGame.Team2 === "Colorado St") &&
              (x.competitions[0].competitors[1].team.location === "Colorado State" ||
                x.competitions[0].competitors[0].team.location === "Colorado State")
            ) {
              return x;
            } else if (
              (betGame.Team1 === "Youngstown St" || betGame.Team2 === "Youngstown St") &&
              (x.competitions[0].competitors[1].team.location === "Youngstown State" ||
                x.competitions[0].competitors[0].team.location === "Youngstown State")
            ) {
              return x;
            } else if (
              (betGame.Team1 === "Coastal Car" || betGame.Team2 === "Coastal Car") &&
              (x.competitions[0].competitors[1].team.location === "Coastal Carolina" ||
                x.competitions[0].competitors[0].team.location === "Coastal Carolina")
            ) {
              return x;
            } else if (
              (betGame.Team1 === "E Illinois" || betGame.Team2 === "E Illinois") &&
              (x.competitions[0].competitors[1].team.location === "Eastern Illinois" ||
                x.competitions[0].competitors[0].team.location === "Eastern Illinois")
            ) {
              return x;
            }
            // } else if (
            //   (betGame.Team1 === "S Illinois" || betGame.Team2 === "S Illinois") &&
            //   (x.competitions[0].competitors[1].team.location === "Southern Illinois" ||
            //     x.competitions[0].competitors[0].team.location === "Southern Illinois")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "IPFW" || betGame.Team2 === "IPFW") &&
            //   (x.competitions[0].competitors[1].team.location === "Purdue Fort Wayne" ||
            //     x.competitions[0].competitors[0].team.location === "Purdue Fort Wayne")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "N Illinois" || betGame.Team2 === "N Illinois") &&
            //   (x.competitions[0].competitors[1].team.location === "Northern Illinois" ||
            //     x.competitions[0].competitors[0].team.location === "Northern Illinois")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Grambling St" || betGame.Team2 === "Grambling St") &&
            //   (x.competitions[0].competitors[1].team.location === "Grambling" || x.competitions[0].competitors[0].team.location === "Grambling")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "TX A&M-CC" || betGame.Team2 === "TX A&M-CC") &&
            //   (x.competitions[0].competitors[1].team.location === "Texas A&M-Corpus Christi" ||
            //     x.competitions[0].competitors[0].team.location === "Texas A&M-Corpus Christi")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Kent St" || betGame.Team2 === "Kent St") &&
            //   (x.competitions[0].competitors[1].team.location === "Kent State" ||
            //     x.competitions[0].competitors[0].team.location === "Kent State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Saint Peters" || betGame.Team2 === "Saint Peters") &&
            //   (x.competitions[0].competitors[1].team.location === "Saint Peter's" ||
            //     x.competitions[0].competitors[0].team.location === "Saint Peter's")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Saint Josephs" || betGame.Team2 === "Saint Josephs") &&
            //   (x.competitions[0].competitors[1].team.location === "Saint Josephs Long Island" ||
            //     x.competitions[0].competitors[0].team.location === "Saint Josephs Long Island")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Connecticut" || betGame.Team2 === "Connecticut") &&
            //   (x.competitions[0].competitors[1].team.location === "UConn" || x.competitions[0].competitors[0].team.location === "UConn")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "FIU" || betGame.Team2 === "FIU") &&
            //   (x.competitions[0].competitors[1].team.location === "Florida International" ||
            //     x.competitions[0].competitors[0].team.location === "Florida International")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Appalachian St" || betGame.Team2 === "Appalachian St") &&
            //   (x.competitions[0].competitors[1].team.location === "Appalachian State" ||
            //     x.competitions[0].competitors[0].team.location === "Appalachian State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "E Kentucky" || betGame.Team2 === "E Kentucky") &&
            //   (x.competitions[0].competitors[1].team.location === "Eastern Kentucky" ||
            //     x.competitions[0].competitors[0].team.location === "Eastern Kentucky")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "W Kentucky" || betGame.Team2 === "W Kentucky") &&
            //   (x.competitions[0].competitors[1].team.location === "Western Kentucky" ||
            //     x.competitions[0].competitors[0].team.location === "Western Kentucky")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "N Kentucky" || betGame.Team2 === "N Kentucky") &&
            //   (x.competitions[0].competitors[1].team.location === "Northern Kentucky" ||
            //     x.competitions[0].competitors[0].team.location === "Northern Kentucky")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "North Dakota St" || betGame.Team2 === "North Dakota St") &&
            //   (x.competitions[0].competitors[1].team.location === "North Dakota State" ||
            //     x.competitions[0].competitors[0].team.location === "North Dakota State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Alabama St" || betGame.Team2 === "Alabama St") &&
            //   (x.competitions[0].competitors[1].team.location === "Alabama State" ||
            //     x.competitions[0].competitors[0].team.location === "Alabama State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Ark-Pine Bluff" || betGame.Team2 === "Ark-Pine Bluff") &&
            //   (x.competitions[0].competitors[1].team.location === "Arkansas-Pine Bluff" ||
            //     x.competitions[0].competitors[0].team.location === "Arkansas-Pine Bluff")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "S Carolina St" || betGame.Team2 === "S Carolina St") &&
            //   (x.competitions[0].competitors[1].team.location === "South Carolina State" ||
            //     x.competitions[0].competitors[0].team.location === "South Carolina State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "S Dakota St" || betGame.Team2 === "S Dakota St") &&
            //   (x.competitions[0].competitors[1].team.location === "South Dakota State" ||
            //     x.competitions[0].competitors[0].team.location === "South Dakota State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Norfolk St" || betGame.Team2 === "Norfolk St") &&
            //   (x.competitions[0].competitors[1].team.location === "Norfolk State" ||
            //     x.competitions[0].competitors[0].team.location === "Norfolk State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "North Carolina" || betGame.Team2 === "North Carolina") &&
            //   (x.competitions[0].competitors[1].team.location === "North Carolina" ||
            //     x.competitions[0].competitors[0].team.location === "North Carolina")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Coppin St" || betGame.Team2 === "Coppin St") &&
            //   (x.competitions[0].competitors[1].team.location === "Coppin State" ||
            //     x.competitions[0].competitors[0].team.location === "Coppin State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Morgan St" || betGame.Team2 === "Morgan St") &&
            //   (x.competitions[0].competitors[1].team.location === "Morgan State" ||
            //     x.competitions[0].competitors[0].team.location === "Morgan State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Alcorn St" || betGame.Team2 === "Alcorn St") &&
            //   (x.competitions[0].competitors[1].team.location === "Alcorn State" ||
            //     x.competitions[0].competitors[0].team.location === "Alcorn State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Arkansas St" || betGame.Team2 === "Arkansas St") &&
            //   (x.competitions[0].competitors[1].team.location === "Arkansas State" ||
            //     x.competitions[0].competitors[0].team.location === "Arkansas State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Chicago St" || betGame.Team2 === "Chicago St") &&
            //   (x.competitions[0].competitors[1].team.location === "Chicago State" ||
            //     x.competitions[0].competitors[0].team.location === "Chicago State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Fair Dickinson" || betGame.Team2 === "Fair Dickinson") &&
            //   (x.competitions[0].competitors[1].team.location === "Fairleigh Dickinson" ||
            //     x.competitions[0].competitors[0].team.location === "Fairleigh Dickinson")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Kansas St" || betGame.Team2 === "Kansas St") &&
            //   (x.competitions[0].competitors[1].team.location === "Kansas State" ||
            //     x.competitions[0].competitors[0].team.location === "Kansas State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Nicholls St" || betGame.Team2 === "Nicholls St") &&
            //   (x.competitions[0].competitors[1].team.location === "Nicholls State" ||
            //     x.competitions[0].competitors[0].team.location === "Nicholls State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "East Washington" || betGame.Team2 === "East Washington") &&
            //   (x.competitions[0].competitors[1].team.location === "Eastern Washington" ||
            //     x.competitions[0].competitors[0].team.location === "Eastern Washington")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Weber St" || betGame.Team2 === "Weber St") &&
            //   (x.competitions[0].competitors[1].team.location === "Weber State" ||
            //     x.competitions[0].competitors[0].team.location === "Weber State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Idaho St" || betGame.Team2 === "Idaho St") &&
            //   (x.competitions[0].competitors[1].team.location === "Idaho State" ||
            //     x.competitions[0].competitors[0].team.location === "Idaho State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Utah St" || betGame.Team2 === "Utah St") &&
            //   (x.competitions[0].competitors[1].team.location === "Utah State" ||
            //     x.competitions[0].competitors[0].team.location === "Utah State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "UMES" || betGame.Team2 === "UMES") &&
            //   (x.competitions[0].competitors[1].team.location === "Maryland-Eastern Shore" ||
            //     x.competitions[0].competitors[0].team.location === "Maryland-Eastern Shore")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Sam Houston St" || betGame.Team2 === "Sam Houston St") &&
            //   (x.competitions[0].competitors[1].team.location === "Sam Houston" ||
            //     x.competitions[0].competitors[0].team.location === "Sam Houston")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Ball St" || betGame.Team2 === "Ball St") &&
            //   (x.competitions[0].competitors[1].team.location === "Ball State" ||
            //     x.competitions[0].competitors[0].team.location === "Ball State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "St. Johns" || betGame.Team2 === "St. Johns") &&
            //   (x.competitions[0].competitors[1].team.location === "St. John's" ||
            //     x.competitions[0].competitors[0].team.location === "St. John's")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "TX San Antonio" || betGame.Team2 === "TX San Antonio") &&
            //   (x.competitions[0].competitors[1].team.location === "UTSA" || x.competitions[0].competitors[0].team.location === "UTSA")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Oklahoma St" || betGame.Team2 === "Oklahoma St") &&
            //   (x.competitions[0].competitors[1].team.location === "Oklahoma State" ||
            //     x.competitions[0].competitors[0].team.location === "Oklahoma State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Indiana St" || betGame.Team2 === "Indiana St") &&
            //   (x.competitions[0].competitors[1].team.location === "Indiana State" ||
            //     x.competitions[0].competitors[0].team.location === "Indiana State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Wichita St" || betGame.Team2 === "Wichita St") &&
            //   (x.competitions[0].competitors[1].team.location === "Wichita State" ||
            //     x.competitions[0].competitors[0].team.location === "Wichita State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "San Jose St" || betGame.Team2 === "San Jose St") &&
            //   (x.competitions[0].competitors[1].team.location === "San José State" ||
            //     x.competitions[0].competitors[0].team.location === "San José State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "McNeese St" || betGame.Team2 === "McNeese St") &&
            //   (x.competitions[0].competitors[1].team.location === "McNeese" || x.competitions[0].competitors[0].team.location === "McNeese")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Tarleton St" || betGame.Team2 === "Tarleton St") &&
            //   (x.competitions[0].competitors[1].team.location === "Tarleton State" ||
            //     x.competitions[0].competitors[0].team.location === "Tarleton State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "N-Western St" || betGame.Team2 === "N-Western St") &&
            //   (x.competitions[0].competitors[1].team.location === "Northwestern State" ||
            //     x.competitions[0].competitors[0].team.location === "Northwestern State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Ohio St" || betGame.Team2 === "Ohio St") &&
            //   (x.competitions[0].competitors[1].team.location === "Ohio State" ||
            //     x.competitions[0].competitors[0].team.location === "Ohio State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "San Diego St" || betGame.Team2 === "San Diego St") &&
            //   (x.competitions[0].competitors[1].team.location === "San Diego State" ||
            //     x.competitions[0].competitors[0].team.location === "San Diego State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "E Michigan" || betGame.Team2 === "E Michigan") &&
            //   (x.competitions[0].competitors[1].team.location === "Eastern Michigan" ||
            //     x.competitions[0].competitors[0].team.location === "Eastern Michigan")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "W Michigan" || betGame.Team2 === "W Michigan") &&
            //   (x.competitions[0].competitors[1].team.location === "Western Michigan" ||
            //     x.competitions[0].competitors[0].team.location === "Western Michigan")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Cleveland St" || betGame.Team2 === "Cleveland St") &&
            //   (x.competitions[0].competitors[1].team.location === "Cleveland State" ||
            //     x.competitions[0].competitors[0].team.location === "Cleveland State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Sacramento St" || betGame.Team2 === "Sacramento St") &&
            //   (x.competitions[0].competitors[1].team.location === "Sacramento State" ||
            //     x.competitions[0].competitors[0].team.location === "Sacramento State")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "N-Eastern" || betGame.Team2 === "N-Eastern") &&
            //   (x.competitions[0].competitors[1].team.location === "Northeastern" ||
            //     x.competitions[0].competitors[0].team.location === "Northeastern")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Hawaii" || betGame.Team2 === "Hawaii") &&
            //   (x.competitions[0].competitors[1].team.location === "Hawai'i" || x.competitions[0].competitors[0].team.location === "Hawai'i")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Mississippi" || betGame.Team2 === "Mississippi") &&
            //   (x.competitions[0].competitors[1].team.location === "Ole Miss" || x.competitions[0].competitors[0].team.location === "Ole Miss")
            // ) {
            //   return x;
            // } else if (
            //   (betGame.Team1 === "Miami Florida" || betGame.Team2 === "Miami Florida") &&
            //   (x.competitions[0].competitors[1].team.location === "Miami" || x.competitions[0].competitors[0].team.location === "Miami")
            // ) {
            //   return x;
            else if (
              (leagueName === "NFL" || leagueName === "NBA" || leagueName === "MLB" || leagueName === "XFL Main" || leagueName === "NHL") &&
              (x.name.includes(betGame.Team1) || x.name.includes(betGame.Team2))
            ) {
              return x;
            } else if (
              (leagueName === "NCAA Basketball" || leagueName === "NCAA Football") &&
              (x.competitions[0].competitors[1].team.location === betGame.Team1 || x.competitions[0].competitors[1].team.location === betGame.Team2)
            ) {
              return x;
            }
            // else if (
            //   leagueName === "MLB" &&
            //   betGame.Team1.includes("GM #1") &&
            //   (x.name.includes(betGame.Team1.split("GM #")[0]) || x.name.includes(betGame.Team2.split("GM #")[0])) &&
            //   x.competitions[0].notes.length > 0 &&
            //   x.competitions[0].notes[0].headline?.includes("Game 1")
            // ) {
            //   return x;
            // } else if (
            //   leagueName === "MLB" &&
            //   betGame.Team1.includes("GM #2") &&
            //   (x.name.includes(betGame.Team1.split("GM #")[0]) || x.name.includes(betGame.Team2.split("GM #")[0])) &&
            //   x.competitions[0].notes.length > 0 &&
            //   x.competitions[0].notes[0].headline?.includes("Game 2")
            // ) {
            //   return x;
            // } else {
            //   return null;
            // }
          });
          // if (game === undefined) console.log("was undefined", bet.bets[0].Team1);
          // if (game === undefined) console.log("was undefined", bet.bets[0].Team2);
          if (game === undefined) {
            return;
          }
          const wagerType = betGame.WagerType;
          const winner =
            wagerType !== "L" &&
            (betGame.Description.includes(
              betGame.Description.includes("#") ? game.competitions[0].competitors[1].team.name : game.competitions[0].competitors[1].team.location
            ) ||
              betGame.Description === "IPFW" ||
              betGame.Description === "UNC Central" ||
              betGame.Description === "UMES" ||
              betGame.Description === "George Washington" ||
              betGame.Description === "Valparaiso" ||
              betGame.Description === "Wichita St" ||
              betGame.Description === "Missouri St" ||
              betGame.Description === "Kansas St" ||
              betGame.Description === "E Tenn St" ||
              betGame.Description === "S Dakota St" ||
              betGame.Description === "W Carolina" ||
              betGame.Description === "W Kentucky" ||
              betGame.Description === "N Kentucky" ||
              betGame.Description === "N Colorado" ||
              betGame.Description === "Sacramento St" ||
              betGame.Description === "San Diego St" ||
              betGame.Description === "McNeese St" ||
              betGame.Description === "Utah St" ||
              betGame.Description === "Murray St" ||
              betGame.Description === "San Jose St" ||
              betGame.Description === "Texas St" ||
              betGame.Description === "Louisiana Tech" ||
              betGame.Description === "Cleveland St" ||
              betGame.Description === "Alcorn St" ||
              betGame.Description === "Tarleton St" ||
              betGame.Description === "Ohio St" ||
              betGame.Description === "Alabama St" ||
              betGame.Description === "Coastal Car" ||
              betGame.Description === "Illinois St" ||
              betGame.Description === "Florida St" ||
              betGame.Description === "Arkansas St" ||
              betGame.Description === "S Carolina St" ||
              betGame.Description === "S Illinois" ||
              betGame.Description === "Northeastern" ||
              betGame.Description === "St Bonaventure" ||
              betGame.Description === "Coppin St" ||
              betGame.Description === "Middle Tenn" ||
              betGame.Description === "Washington St")
              ? game.competitions[0].competitors[1].team.abbreviation.replace("-", "")
              : game.competitions[0].competitors[0].team.abbreviation.replace("-", "");
          const spread = wagerType === "S" && betGame.Points;
          const spreadType = wagerType === "S" && betGame.Points > 0 ? "plus" : "minus";
          const overUnder = wagerType === "L" && betGame.Points;
          const overUnderType = wagerType === "L" ? (betGame.PointsOU === "O" ? "Over" : "Under") : false;
          const overUnderTeams =
            wagerType === "L" &&
            `${game.competitions[0].competitors[1].team.abbreviation.replace(
              "-",
              ""
            )}/${game.competitions[0].competitors[0].team.abbreviation.replace("-", "")}`;
          if (wagerType === "M") {
            webParlays.push(
              `game-${game.id}-${winner}-${
                league === 2
                  ? "ncaab"
                  : league === 3
                  ? "mlb"
                  : league === 1
                  ? "nba"
                  : league === 4
                  ? "nhl"
                  : league === 6
                  ? "nfl"
                  : league === 7
                  ? "ncaaf"
                  : league === 8
                  ? "xfl"
                  : "ncaabaseball"
              }`
            );
          } else {
            const gameStr = `game-${game.id}-${wagerType === "L" ? "null" : winner}-${
              league === 2
                ? "ncaab"
                : league === 3
                ? "mlb"
                : league === 1
                ? "nba"
                : league === 4
                ? "nhl"
                : league === 6
                ? "nfl"
                : league === 7
                ? "ncaaf"
                : league === 8
                ? "xfl"
                : "ncaabaseball"
            }-${spread < 0 ? spread.toString().split("-")[1] : spread}-${spreadType}-${overUnder}-${overUnderType}-${overUnderTeams}`;
            webParlays.push(gameStr);
          }
        });
        if (bet.parlay) {
          // const parlays = allTodaysBets.push(webParlays);
          setAllTodaysBets((prevValue) => {
            return [...prevValue, webParlays];
          });
        } else {
        }
      });
    }
  }

  const websiteLogin = async () => {
    setIsLoading(true);
    await fetch(`https://sheline-art-website-api.herokuapp.com/patrick/steam-login/${email}/${password}/${bettingWebsite}`)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        return response.json();
      })
      .then((data) => {
        if (data.tokenData.accessToken) {
          console.log("🚀 ~ .then ~ data.tokenData.accessToken:", data.tokenData.accessToken);
          setBearer("Bearer " + data.tokenData.accessToken);
          syncWithSportsWebsite("Bearer " + data.tokenData.accessToken);
        } else {
          setErrorMessage(data.tokenData.error);
          setIsLoading(false);
        }
      });
  };
  React.useEffect(() => {
    getAllData();
  }, []);
  React.useEffect(() => {}, [allTodaysBetsRef]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        flexDirection: "column",
        marginTop: 100,
      }}>
      <Grid container spacing={0} style={{ width: "100%" }} alignItems="flex-end" alignContent="center" justifyContent="center">
        <Grid item>
          <TextField value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: 200 }} label="Username" />
          <TextField value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: 200 }} label="Username" />
        </Grid>
        <Button
          size="small"
          variant="contained"
          style={{
            marginLeft: 10,
            backgroundColor: "lightgreen",
          }}
          onClick={() => websiteLogin()}>
          Sync
        </Button>
      </Grid>
      <div style={{ color: "black", height: "100%" }}>
        {console.log(allTodaysBetsRef)}
        {allTodaysBetsRef.current.length > 0 &&
          allTodaysBetsRef.current.map((parlay, index) => {
            console.log("🚀 ~ allTodaysBetsRef.current.map ~ parlay:", parlay);
            return (
              <div key={index} style={{ border: "1px solid black" }}>
                {parlay.map((game, idx) => {
                  console.log("🚀 ~ {parlay.map ~ game:", game);
                  return <div key={idx}>{game}</div>;
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
}
