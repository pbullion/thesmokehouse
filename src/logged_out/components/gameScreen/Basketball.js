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
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { parseISO, parse, format, formatDistanceToNow } from "date-fns";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import browserDetect from "browser-detect";
import NorthIcon from "@mui/icons-material/North";

function Basketball(props) {
  const history = useHistory();
  const browserData = browserDetect();
  const { email, defaultFontSize } = useParams();
  const { game } = props;
  const [textSize, setTextSize] = useState(0);
  const [updateInterval, setUpdateInterval] = useState(15000);
  const [screenWidth, setScreenWidth] = useState(500);
  const [screenHeight, setScreenHeight] = useState(500);
  const [allGames, setAllGames] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [onlyOneColumn, setOnlyOneColumn] = useState(false);
  const [justTop25Basketball, setJustTop25Basketball] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBehindTheScenesLoading, setIsBehindTheScenesLoading] = useState(false);
  const [user, setUser] = useState(email);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString().split(", ")[1]);
  const isLoadingRef = useRef(isLoading);
  const [sessionID, setSessionID] = useState("");
  const sessionIDRef = useRef(sessionID);
  sessionIDRef.current = sessionID;
  isLoadingRef.current = isLoading;
  const [gameData, setGameData] = useState(null);
  const [homeTeamData, setHomeTeamData] = useState(null);
  const [awayTeamData, setAwayTeamData] = useState(null);

  useEffect(() => {}, [allGames]);
  useEffect(() => {
    console.log("proplskdjfkljsdlkfjslkdjfksdjfklsjdflksdjfksldfks", props);
    // find browser width and height
    fetchGame();
  }, []);
  useEffect(() => {
    const userAgent = navigator.userAgent;
    // Example check, adjust the condition based on the actual user agent of Fire TV devices
    console.log("🚀 ~ useEffect ~ userAgent:", userAgent);
    if (userAgent.includes("AFT")) {
      console.log("its a firestick");
      console.log("🚀 ~ useEffect ~ userAgent:", userAgent);
    }
  }, []);
  useEffect(() => {
    const getUpdate = () => {
      fetchGame();
      if (showOverlay) {
        setShowOverlay(false);
      }
    };
    const intervalId = setInterval(getUpdate, updateInterval);
    return () => clearInterval(intervalId);
  }, []);
  const teamBackgroundLinks = {
    NFL: [],
    NHL: [],
    NCAABASKETBALL: [
      {
        team: "Baylor Bears",
        homeCourtImage:
          "https://d1nnrx9kca53zl.cloudfront.net/images/2024/1/2/tcu_preview.jpg?width=1920&quality=80&format=jpg",
      },
    ],
    NCAAFOOTBALL: [
      {
        team: "Baylor Bears",
        homeCourtImage:
          "https://media.cnn.com/api/v1/images/stellar/prod/180907121350-08-expensive-college-football-stadiums-restricted.jpg?q=w_3000,h_2000,x_0,y_0,c_fill",
      },
    ],
    NBA: [
      {
        team: "Atlanta Hawks",
        homeCourtImage:
          "https://www.si.com/.image/t_share/MTY4MTk5MDc1NDU0OTIwNjA1/atlanta-hawks-court-design.jpg",
      },
      {
        team: "Boston Celtics",
        homeCourtImage:
          "https://www.usatoday.com/gcdn/-mm-/c6e2110e80db775d97a01f91cc007e28eb969db0/c=0-270-5314-3272/local/-/media/2017/07/14/USATODAY/USATODAY/636356422161757120-GTY-688490038.jpg",
      },
      {
        team: "Brooklyn Nets",
        homeCourtImage:
          "https://res.cloudinary.com/hello-tickets/image/upload/c_limit,f_auto,q_auto,w_768/v1615886593/post_images/new-york-1/NBA-NY/nets_Cropped.jpg",
      },
      {
        team: "Charlotte Hornets",
        homeCourtImage:
          "https://www.charlotteobserver.com/latest-news/xli32x/picture245386640/alternates/FREE_1140/Court%20Image.jpg",
      },
      {
        team: "Chicago Bulls",
        homeCourtImage: "https://cdn.getyourguide.com/img/tour/3a3af9b900e9a46d.png/145.jpg",
      },
      {
        team: "Cleveland Cavaliers",
        homeCourtImage:
          "https://venuecoalition.com/wp-content/uploads/2018/01/Quicken-Loans-Arena-Packed-House.webp",
      },
      {
        team: "Dallas Mavericks",
        homeCourtImage:
          "https://dmn-dallas-news-prod.cdn.arcpublishing.com/resizer/v2/CMJWHCOOG6YIIS26WGEDR2RWYM.jpg?auth=5f4908031fd94264c5339f9aa58af9031a743f07f0f669f3790133d14a44b21c&height=553&width=830&smart=true",
      },
      {
        team: "Houston Rockets",
        homeCourtImage: "https://pbs.twimg.com/media/F-BV19FWIAE3782?format=jpg&name=4096x4096",
      },
      {
        team: "Denver Nuggets",
        homeCourtImage:
          "https://fhsroyalbanner.com/wp-content/uploads/2023/04/ball-arena-900x675.jpg",
      },
      {
        team: "Detroit Pistons",
        homeCourtImage:
          "https://www.freep.com/gcdn/-mm-/57d27fb7ab6e87dc79319cca5217d1da937b6ef1/c=0-0-1086-613/local/-/media/2017/05/17/DetroitFreeP/DetroitFreePress/636306158844890957-Capture2.PNG?width=1086&height=543&fit=crop&format=pjpg&auto=webp",
      },
      {
        team: "Golden State Warriors",
        homeCourtImage:
          "https://www.denverpost.com/wp-content/uploads/2019/08/SJM-L-CHASE-0827-5.jpg?w=620",
      },
      {
        team: "Indiana Pacers",
        homeCourtImage:
          "https://res.cloudinary.com/simpleview/image/upload/v1668708531/clients/indy/Indiana_Pacers_fb87db1b-55b4-45d9-97ee-cce6ffea1ee7.jpg",
      },
      {
        team: "Los Angeles Clippers",
        homeCourtImage:
          "https://www.usatoday.com/gcdn/presto/2022/11/22/USAT/79d2d9a3-9364-4ea5-a912-2c28250b5368-render2_3.jpg?crop=3000,2000,x0,y0",
      },
      {
        team: "Los Angeles Lakers",
        homeCourtImage:
          "https://www.yardbarker.com/media/4/0/408d65a9dadbeb0aa6be7dddc70469fa47a81f75/thumb_16x9/nov-30-2022-los-angeles-california-usa-general.jpg",
      },
      {
        team: "Memphis Grizzlies",
        homeCourtImage:
          "https://fef-cdn.grizzliesapp.com/sites/default/files/styles/event_banner_1536x600/public/1536x530-memphis-grizzlies-court-2.jpg?itok=2o-dtN_p",
      },
      {
        team: "Miami Heat",
        homeCourtImage:
          "https://static.wixstatic.com/media/fff9be_014379482cd4420b93f1f944be7138b2~mv2.jpg/v1/fill/w_1000,h_750,al_c,q_85,usm_0.66_1.00_0.01/fff9be_014379482cd4420b93f1f944be7138b2~mv2.jpg",
      },
      {
        team: "Milwaukee Bucks",
        homeCourtImage:
          "https://newscdn2.weigelbroadcasting.com/9Tkhi-1496425944-51179-blog-9200005_G.jpg",
      },
      {
        team: "Minnesota Timberwolves",
        homeCourtImage:
          "https://d5c1j5k5drfk7.cloudfront.net/wp-content/uploads/2022/04/TW-2021.12.17-Lakers-1813.jpg",
      },
      {
        team: "New Orleans Pelicans",
        homeCourtImage: "https://cdn.getyourguide.com/img/tour/dac26284a07c1a5c.png/145.jpg",
      },
      {
        team: "New York Knicks",
        homeCourtImage:
          "https://cdn.nba.com/teams/uploads/sites/1610612752/2022/06/NYK_031518_0626.jpg",
      },
      {
        team: "Oklahoma City Thunder",
        homeCourtImage:
          "https://okcthunderwire.usatoday.com/wp-content/uploads/sites/36/2022/04/USATSI_15324008.jpg?w=1000&h=600&crop=1",
      },
      {
        team: "Orlando Magic",
        homeCourtImage:
          "https://www.kiacenter.com/assets/img/Orlando-Magic-Tip-Off-2018-slide-cac091c390.jpg",
      },
      {
        team: "Philadelphia 76ers",
        homeCourtImage:
          "https://cloudfront-us-east-1.images.arcpublishing.com/pmn/SKVJDA5NVZGADPRHQIGA33CENA.jpg",
      },
      {
        team: "Phoenix Suns",
        homeCourtImage: "https://www.sportsvideo.org/wp-content/uploads/2021/01/unnamed-1-6.jpg",
      },
      {
        team: "Portland Trail Blazers",
        homeCourtImage:
          "https://katu.com/resources/media2/16x9/full/1015/center/80/55270a24-fbac-46de-9556-dd63fd3a6a64-large16x9_TrailBlazerskickoff2021Season.jpg",
      },
      {
        team: "Sacramento Kings",
        homeCourtImage:
          "https://library.sportingnews.com/styles/crop_style_16_9_desktop/s3/2021-08/kingsarena2-sn-ftr-111016jpg_flpm8u6atw2zz1g2ih339lbq.jpg?itok=lWwxdo0o",
      },
      {
        team: "San Antonio Spurs",
        homeCourtImage:
          "https://media2.sacurrent.com/sacurrent/imager/u/original/30079836/spurs.jpg",
      },
      {
        team: "Toronto Raptors",
        homeCourtImage:
          "https://library.sportingnews.com/styles/crop_style_16_9_desktop/s3/2022-01/toronto-raptors-scotiabank-arena-10092021-nbae-getty-ftr_1jr3ltbt0m5p91i7nqzidpbmxs.jpg?itok=VVsGe-_B",
      },
      {
        team: "Utah Jazz",
        homeCourtImage:
          "https://www.visitutah.com/azure/cmsroot/visitutah/media/site-assets/three-season-photography/wasatch-metro/salt-lake-city-2/utah_jazz-3_salt-lake-city_laegever-jason_2021.jpg?w=1054&h=660&mode=crop&quality=65",
      },
      {
        team: "Washington Wizards",
        homeCourtImage:
          "https://s3.us-east-1.amazonaws.com/vnda-cockpit/www-streetopia-me/2021/02/02/6018b2cbefaa5wizards02.jpg",
      },
    ],
  };

  const getNFLGame = async () => {
    const id = game.id;
    return await fetch(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.events.find((x) => x.id === id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getNHLGame = async () => {
    const id = game.id;
    return await fetch(`https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.events.find((x) => x.id === id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getNBAGame = async () => {
    const id = game.id;
    return await fetch(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.events.find((x) => x.id === id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getNCAAFootballGames = async () => {
    const id = game.id;
    return await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?groups=80`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.events.find((x) => x.id === id);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getNCAAGame = async () => {
    const id = game.id;
    return await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?groups=50&limit=900`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.events.find((x) => x.id === id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchGame = async () => {
    const theGame =
      game.sport === "NCAAFOOTBALL"
        ? await getNCAAFootballGames()
        : game.sport === "NFL"
        ? await getNFLGame()
        : game.sport === "NBA"
        ? await getNBAGame()
        : game.sport === "NHL"
        ? await getNHLGame()
        : await getNCAAGame();
    console.log("🚀 ~ fetchGame ~ game:", theGame);
    setGameData(theGame);
    setHomeTeamData(theGame.competitions[0].competitors[0]);
    setAwayTeamData(theGame.competitions[0].competitors[1]);
    setIsLoading(false);
  };
  const getBackgroundImage = () => {
    const homeTeam = homeTeamData.team.location + " " + homeTeamData.team.name;
    const awayTeam = awayTeamData.team.location + " " + awayTeamData.team.name;
    const team = homeTeam || awayTeam === "Baylor Bears" ? "Baylor Bears" : homeTeam;
    const foundBackground = teamBackgroundLinks[game.sport].find((x) => x.team === team) || null;
    if (foundBackground) {
      return `url(${foundBackground.homeCourtImage})`;
    } else if (game.sport === "NFL") {
      return "url(https://sportshub.cbsistatic.com/i/r/2023/11/08/148dcaaa-8d71-4bca-9a8d-859f19410255/thumbnail/1200x675/8289e894a2b470e7392624dbebe6ae98/sblogo.jpg)";
    } else if (game.sport === "NHL") {
      return "url(https://media.istockphoto.com/id/1177875348/photo/ice-hockey-rink-and-illuminated-indoor-arena-with-fans-face-off-circle-view.jpg?s=612x612&w=0&k=20&c=c2AedC-J5TY1ObHxs2XZgUPy7pk5HbxJv-m1vElHzTo=)";
    } else if (game.sport === "NBA" || game.sport === "NCAABASKETBALL") {
      return "url(https://shupirates.com/images/2020/3/31/7N7A9391.jpg)";
    } else {
      return;
    }
  };
  const getNetworkLogo = (network) => {
    const espnLogo =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/ESPN%27s_Old_Logo.png/320px-ESPN%27s_Old_Logo.png";
    const cbsLogo = "https://www.pngall.com/wp-content/uploads/13/CBS-Logo-PNG-File.png";
    const foxLogo =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/FOX_wordmark.svg/2560px-FOX_wordmark.svg.png";
    const nbcLogo =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/NBC_logo.svg/567px-NBC_logo.svg.png";
    const foxSports1Logo =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/2015_Fox_Sports_1_logo.svg/1200px-2015_Fox_Sports_1_logo.svg.png";
    const nbaTVLogo = "https://seeklogo.com/images/N/nba-tv-logo-9865A907F8-seeklogo.com.png";
    const nhlNetLogo =
      "https://awfulannouncing.com/wp-content/uploads/sites/94/2014/01/NHLNetwork.jpg";
    const peacockLogo =
      "https://www.peacocktv.com/static/peacock-toolkit/0.25.2/logo/peacock-wob.png";
    const ACCNLogo =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/ACC_Network_ESPN_logo.svg/1024px-ACC_Network_ESPN_logo.svg.png";
    const ESPNPlusLogo =
      "https://cnbl-cdn.bamgrid.com/assets/72cfeeec0d56bc88c3a1e501ff9d3e3b141ea52d6af9e9ab417173a2491099f2/original";
    const ESPN2Logo =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/ESPN2_logo.svg/1280px-ESPN2_logo.svg.png";
    const TNTLogo =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/TNT_TV_logo.svg/1200px-TNT_TV_logo.svg.png";
    const SECLogo =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/SEC_Network_logo.svg/2560px-SEC_Network_logo.svg.png";
    const BTNLogo =
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/39/Big_Ten_Network_Logo.svg/1200px-Big_Ten_Network_Logo.svg.png";
    if (network.includes("CBS")) {
      return <img style={{ height: 50 }} src={cbsLogo} alt="network logo" />;
    } else if (network.includes("ESPN+")) {
      return <img style={{ height: 50 }} src={ESPNPlusLogo} alt="network logo" />;
    } else if (network.includes("ESPN2")) {
      return <img style={{ height: 50 }} src={ESPN2Logo} alt="network logo" />;
    } else if (network.includes("ESPN")) {
      return <img style={{ height: 50 }} src={espnLogo} alt="ESPN logo" />;
    } else if (network.includes("FOX")) {
      return <img style={{ height: 50 }} src={foxLogo} alt="network logo" />;
    } else if (network.includes("NBC")) {
      return <img style={{ height: 50 }} src={nbcLogo} alt="network logo" />;
    } else if (network.includes("FS1")) {
      return <img style={{ height: 50 }} src={foxSports1Logo} alt="network logo" />;
    } else if (network.includes("NBA")) {
      return <img style={{ height: 50 }} src={nbaTVLogo} alt="network logo" />;
    } else if (network.includes("NHL")) {
      return <img style={{ height: 50 }} src={nhlNetLogo} alt="network logo" />;
    } else if (network.includes("Peacock")) {
      return <img style={{ height: 50 }} src={peacockLogo} alt="network logo" />;
    } else if (network.includes("ACCN")) {
      return <img style={{ height: 50 }} src={ACCNLogo} alt="network logo" />;
    } else if (network.includes("TNT")) {
      return <img style={{ height: 50 }} src={TNTLogo} alt="network logo" />;
    } else if (network.includes("SEC")) {
      return <img style={{ height: 50 }} src={SECLogo} alt="network logo" />;
    } else if (network.includes("BTN")) {
      return <img style={{ height: 50 }} src={BTNLogo} alt="network logo" />;
    } else return null;
  };
  const subtractHours = (timeStr, zone) => {
    const [hours, minutesPart] = timeStr.split(":");
    const minutes = minutesPart.substring(0, 2);
    const amPm = minutesPart.substring(3);
    let date = new Date();
    date.setHours((hours % 12) + (amPm.toLowerCase() === "pm" ? 12 : 0), minutes, 0);
    date.setHours(date.getHours() - zone.diff);
    let newHours = date.getHours();
    const newMinutes = date.getMinutes();
    const newAmPm = newHours >= 12 ? "PM" : "AM";
    newHours = newHours % 12;
    newHours = newHours ? newHours : 12; // the hour '0' should be '12'

    return `${newHours.toString()}:${newMinutes.toString().padStart(2, "0")} ${newAmPm}`;
  };
  function convertToUserLocalTime(timeStr) {
    console.log("🚀 ~ convertToUserLocalTime ~ timeStr:", timeStr);
    return timeStr;
    // const timezoneMap = {
    //   "America/New_York": { abbr: "EST", diff: 0 },
    //   "America/Chicago": { abbr: "CST", diff: 1 },
    //   "America/Denver": { abbr: "MST", diff: 2 },
    //   "America/Phoenix": { abbr: "MTN", diff: 3 },
    //   "America/Los_Angeles": { abbr: "PST", diff: 4 },
    //   "America/Anchorage": { abbr: "AKST", diff: 5 },
    //   "Pacific/Honolulu": { abbr: "HST", diff: 6 },
    // };
    // const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // const zone = timezoneMap[timeZone] || { abbr: "EST", diff: 0 };
    // console.log("🚀 ~ convertToUserLocalTime ~ zone:", zone);
    // return subtractHours(timeStr.split(" EST")[0], zone);
  }
  function calculateLuminance(rgb) {
    // Calculate the luminance of an RGB color
    var r = rgb.r / 255;
    var g = rgb.g / 255;
    var b = rgb.b / 255;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  function hexToRgb(hex) {
    // Convert a hex color to RGB
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }
  function getContrastingColor(primaryColor, alternateColor) {
    var primaryRgb = hexToRgb(primaryColor);
    var alternateRgb = hexToRgb(alternateColor);

    var primaryLuminance = calculateLuminance(primaryRgb);
    var alternateLuminance = calculateLuminance(alternateRgb);

    var luminanceDifference = Math.abs(primaryLuminance - alternateLuminance);

    if (luminanceDifference < 0.5) {
      return "#ffffff";
    } else {
      return alternateColor;
    }
  }
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
            fontFamily: "'soccer-league', cursive",
            fontWeight: 400,
            fontSize: 1.5 + textSize + "rem",
            marginTop: 25,
          }}
          color={"white"}>
          Click the settings icons on the bottom right to choose what sports to display
        </Typography>
        <Typography
          variant="h6"
          style={{
            fontFamily: "'soccer-league', cursive",
            fontWeight: 400,
            fontSize: 1.5 + textSize + "rem",
            marginTop: 25,
          }}>
          SEE THE SETTINGS FOR SOME MORE USEFULL TIPS
        </Typography>
      </div>
    );
  } else {
    return (
      <div
        onClick={() => {
          history.push(`/odds-screen/${email}`);
        }}
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: getBackgroundImage(),
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
        }}>
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            padding: 20,
          }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              width: "100%",
              height: "100%",
            }}>
            <img
              style={{ height: 275 + textSize * 10, width: 275 + textSize * 10 }}
              src={awayTeamData.team.logo}
              alt="away team logo"
            />
            <div style={{ textAlign: "left" }}>
              <Typography
                variant={"h1"}
                style={{
                  fontFamily: "'soccer-league', cursive",
                  margin: 0,
                  fontWeight: 400,
                  fontSize: 2.7 + textSize + "rem",
                }}
                color={"white"}>
                {awayTeamData.team.location}
              </Typography>
              <Typography
                variant={"h1"}
                style={{
                  fontFamily: "'soccer-league', cursive",
                  margin: 0,
                  fontWeight: 400,
                  fontSize: 4.5 + textSize + "rem",
                }}
                color={"white"}>
                {awayTeamData.team.name}
              </Typography>
              <Typography
                variant={"h1"}
                style={{
                  fontFamily: "'josefin', cursive",
                  margin: 0,
                  fontWeight: 400,
                  fontSize: textSize > 1 ? "2.5rem" : 1.5 + textSize + "rem",
                  marginBottom: 10,
                  marginTop: 10,
                }}
                color={"white"}>
                Overall: ({awayTeamData.records[0]?.summary})
              </Typography>
              {!awayTeamData.leaders &&
                [1, 2, 3].map((x, idx) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      backgroundColor: awayTeamData.team.alternateColor
                        ? "#" + awayTeamData.team.alternateColor
                        : "white",
                      borderRadius: 10,
                      padding: 10,
                      width: 500,
                      marginBottom: 10,
                    }}
                    key={idx}>
                    <div>
                      <img style={{ height: 100 }} src={awayTeamData.team.logo} alt="player pic" />
                    </div>
                    <div>
                      <Typography
                        variant={"h1"}
                        style={{
                          fontFamily: "'josefin', cursive",
                          margin: 0,
                          fontWeight: 400,
                          fontSize: 1.5 + textSize + "rem",
                        }}
                        color={"#" + awayTeamData.team.color}></Typography>
                      <Typography
                        variant={"h1"}
                        style={{
                          fontFamily: "'josefin', cursive",
                          margin: 0,
                          fontWeight: 400,
                          fontSize: 1.7 + textSize + "rem",
                        }}
                        color={"#" + awayTeamData.team.color}></Typography>
                    </div>
                  </div>
                ))}
              {awayTeamData.leaders &&
                awayTeamData.leaders
                  .filter((x) => x.name !== "rating")
                  .map((x, idx) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        backgroundColor: awayTeamData.team.alternateColor
                          ? "#" + awayTeamData.team.alternateColor
                          : "white",
                        borderRadius: 10,
                        padding: 10,
                        width: 500,
                        marginBottom: 10,
                      }}
                      key={idx}>
                      <div>
                        <img
                          style={{ height: 100 }}
                          src={x.leaders[0].athlete.headshot}
                          alt="player pic"
                        />
                      </div>
                      <div>
                        <Typography
                          variant={"h1"}
                          style={{
                            fontFamily: "'josefin', cursive",
                            margin: 0,
                            fontWeight: 400,
                            fontSize: 1.5 + textSize + "rem",
                          }}
                          color={"#" + awayTeamData.team.color}>
                          {x.leaders[0].athlete.displayName}
                        </Typography>
                        <Typography
                          variant={"h1"}
                          style={{
                            fontFamily: "'josefin', cursive",
                            margin: 0,
                            fontWeight: 400,
                            fontSize: 1.7 + textSize + "rem",
                          }}
                          color={"#" + awayTeamData.team.color}>
                          {x.leaders[0].displayValue} {x.shortDisplayName}
                        </Typography>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}>
              {gameData.status.type.name !== "STATUS_FINAL" &&
                gameData.status.type.name !== "STATUS_SCHEDULED" && (
                  <Typography
                    variant={"h1"}
                    style={{
                      fontFamily: "RadleySans",
                      fontWeight: 400,
                      marginTop: 0,
                      marginBottom: 20,
                      textAlign: "center",
                    }}
                    color={"white"}>
                    {getNetworkLogo(game.tvChannel)}
                  </Typography>
                )}
              {gameData.status.type.name === "STATUS_SCHEDULED" && (
                <>
                  <Typography
                    variant={"h1"}
                    style={{
                      fontFamily: "RadleySans",
                      fontWeight: 400,
                      fontSize: textSize > 1 ? "6rem" : 5 + textSize + "rem",
                      marginTop: 100,
                    }}
                    color={"white"}>
                    {format(
                      parse(
                        gameData.status.type.detail.split(" at ")[0],
                        "EEE, MMMM do",
                        new Date()
                      ),
                      "EEE, MMM do"
                    )}
                  </Typography>
                  <Typography
                    variant={"h1"}
                    style={{
                      fontFamily: "RadleySans",
                      fontWeight: 400,
                      fontSize: 5 + textSize + "rem",
                    }}
                    color={"white"}>
                    {convertToUserLocalTime(gameData.status.type.detail.split(" at ")[1])}
                  </Typography>
                  <Typography
                    variant={"h1"}
                    style={{
                      fontFamily: "RadleySans",
                      fontWeight: 400,
                      marginTop: 0,
                      marginBottom: 20,
                      textAlign: "center",
                    }}
                    color={"white"}>
                    {getNetworkLogo(game.tvChannel)}
                  </Typography>
                </>
              )}
              {gameData.status.type.name === "STATUS_END_PERIOD" && (
                <>
                  <Typography
                    variant={"h1"}
                    style={{
                      fontFamily: "RadleySans",
                      fontWeight: 400,
                      fontSize: 5 + textSize + "rem",
                      marginTop: 10,
                    }}
                    color={"white"}>
                    {gameData.status.type.shortDetail}
                  </Typography>
                </>
              )}
              {gameData.status.type.detail === "Halftime" && (
                <Typography
                  variant={"h1"}
                  style={{
                    fontFamily: "RadleySans",
                    fontWeight: 400,
                    fontSize: 10 + textSize + "rem",
                  }}
                  color={"white"}>
                  {gameData.status.type.detail}
                </Typography>
              )}
              {gameData.status.type.name === "STATUS_FINAL" && (
                <Typography
                  variant={"h1"}
                  style={{
                    fontFamily: "RadleySans",
                    fontWeight: 400,
                    fontSize: 7 + textSize + "rem",
                    textAlign: "center",
                    marginTop: 10,
                  }}
                  color={"white"}>
                  {gameData.status.type.shortDetail.toUpperCase()}
                </Typography>
              )}
              {gameData.status.type.name !== "STATUS_SCHEDULED" && (
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                  <Typography
                    variant={"h1"}
                    style={{
                      fontFamily: "fader",
                      fontWeight: 400,
                      fontSize: 9 + textSize + "rem",
                      textAlign: "center",
                      marginTop: 10,
                    }}
                    color={
                      parseInt(awayTeamData.score) > parseInt(homeTeamData.score)
                        ? "#39FF14"
                        : awayTeamData.score === homeTeamData.score
                        ? "yellow"
                        : "red"
                    }>
                    {awayTeamData.score}
                  </Typography>
                  <Typography
                    variant={"h1"}
                    style={{
                      fontFamily: "fader",
                      fontWeight: 400,
                      fontSize: 9 + textSize + "rem",
                      textAlign: "center",
                      marginTop: 10,
                    }}
                    color={
                      parseInt(homeTeamData.score) > parseInt(awayTeamData.score)
                        ? "#39FF14"
                        : awayTeamData.score === homeTeamData.score
                        ? "yellow"
                        : "red"
                    }>
                    {homeTeamData.score}
                  </Typography>
                </div>
              )}
              {gameData.status.type.name === "STATUS_IN_PROGRESS" && (
                <div>
                  <Typography
                    variant={"h1"}
                    style={{
                      fontFamily: "RadleySans",
                      fontWeight: 400,
                      fontSize: 4 + textSize + "rem",
                      textAlign: "center",
                      marginTop: 10,
                    }}
                    color={"white"}>
                    {gameData.status.type.detail.split(" - ")[1]}
                  </Typography>
                  <Typography
                    variant={"h1"}
                    style={{
                      fontFamily: "fader",
                      fontWeight: 400,
                      fontSize: 6 + textSize + "rem",
                      textAlign: "center",
                      marginTop: 20,
                      marginBottom: 10,
                    }}
                    color={"yellow"}>
                    {gameData.status.type.shortDetail.split(" - ")[0]}
                  </Typography>
                </div>
              )}
              {gameData.status.type.name === "STATUS_SCHEDULED" && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                  }}>
                  <Typography
                    variant={"h1"}
                    style={{
                      fontFamily: "RadleySans",
                      fontWeight: 400,
                      marginTop: 200,
                      fontSize: 5 + textSize + "rem",
                      textAlign: "center",
                    }}
                    color={"white"}>
                    O/U {gameData.competitions[0].odds[0].overUnder}
                  </Typography>
                  <Typography
                    variant={"h1"}
                    style={{
                      fontFamily: "RadleySans",
                      fontWeight: 400,
                      marginTop: 10,
                      fontSize: 5 + textSize + "rem",
                      textAlign: "center",
                    }}
                    color={"white"}>
                    {gameData.competitions[0].odds[0].details}
                  </Typography>
                </div>
              )}

              <div>
                {(game.sport === "NBA" || game.sport === "NCAABASKETBALL") &&
                  gameData.status.type.name !== "STATUS_SCHEDULED" &&
                  ["fieldGoal", "threePoint", "freeThrow", "rebounds", "assists"].map((x, idx) => {
                    if (x === "fieldGoal") {
                      const awayData = awayTeamData.statistics.filter((x) =>
                        x.name.includes("fieldGoal")
                      );
                      const homeData = homeTeamData.statistics.filter((x) =>
                        x.name.includes("fieldGoal")
                      );
                      return (
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 0,
                            borderRadius: 10,
                            backgroundColor: "black",
                          }}>
                          <div
                            style={{
                              backgroundColor: awayTeamData.team.alternateColor
                                ? "#" + awayTeamData.team.alternateColor
                                : "white",
                              padding: "15px 70px",
                              width: "100%",
                              borderRadius: 10,
                            }}>
                            <Typography
                              variant={"h1"}
                              style={{
                                fontFamily: "josefin",
                                fontWeight: 400,
                                fontSize: 2.2 + textSize + "rem",
                                textAlign: "center",
                              }}
                              color={"#" + awayTeamData.team.color}>
                              {awayData.find((x) => x.name === "fieldGoalPct").displayValue}%
                            </Typography>
                            <Typography
                              variant={"h1"}
                              style={{
                                fontFamily: "josefin",
                                fontWeight: 400,
                                fontSize: 1.7 + textSize + "rem",
                                textAlign: "center",
                              }}
                              color={"#" + awayTeamData.team.color}>
                              {awayData.find((x) => x.name === "fieldGoalsMade").displayValue}/
                              {awayData.find((x) => x.name === "fieldGoalsAttempted").displayValue}
                            </Typography>
                          </div>
                          <div
                            style={{
                              backgroundColor: "black",
                              padding: 10,
                              borderRadius: 10,
                            }}>
                            <Typography
                              variant={"h1"}
                              style={{
                                fontFamily: "'Baloo Bhaijaan', cursive",
                                fontWeight: 400,
                                fontSize: 1.5 + textSize + "rem",
                                textAlign: "center",
                                marginRight: 20,
                                marginLeft: 20,
                              }}
                              color={"white"}>
                              FG
                            </Typography>
                          </div>
                          <div
                            style={{
                              backgroundColor: homeTeamData.team.alternateColor
                                ? "#" + homeTeamData.team.alternateColor
                                : "white",
                              padding: "15px 70px",
                              width: "100%",
                              borderRadius: 10,
                            }}>
                            <Typography
                              variant={"h1"}
                              style={{
                                fontFamily: "josefin",
                                fontWeight: 400,
                                fontSize: 2.2 + textSize + "rem",
                                textAlign: "center",
                              }}
                              color={"#" + homeTeamData.team.color}>
                              {homeData.find((x) => x.name === "fieldGoalPct").displayValue}%
                            </Typography>
                            <Typography
                              variant={"h1"}
                              style={{
                                fontFamily: "josefin",
                                fontWeight: 400,
                                fontSize: 1.7 + textSize + "rem",
                                textAlign: "center",
                              }}
                              color={"#" + homeTeamData.team.color}>
                              {homeData.find((x) => x.name === "fieldGoalsMade").displayValue}/
                              {homeData.find((x) => x.name === "fieldGoalsAttempted").displayValue}
                            </Typography>
                          </div>
                        </div>
                      );
                    }
                    if (x === "threePoint") {
                      const awayData = awayTeamData.statistics.filter((x) =>
                        x.name.includes("threePoint")
                      );
                      console.log("🚀 :", awayData);
                      const homeData = homeTeamData.statistics.filter((x) =>
                        x.name.includes("threePoint")
                      );
                      console.log("🚀Data:", homeData);
                      return (
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 25,
                            borderRadius: 10,
                            backgroundColor: "black",
                          }}>
                          <div
                            style={{
                              backgroundColor: awayTeamData.team.alternateColor
                                ? "#" + awayTeamData.team.alternateColor
                                : "white",
                              padding: "15px 70px",
                              width: "100%",
                              borderRadius: 10,
                            }}>
                            <Typography
                              variant={"h1"}
                              style={{
                                fontFamily: "josefin",
                                fontWeight: 400,
                                fontSize: 2.2 + textSize + "rem",
                                textAlign: "center",
                              }}
                              color={"#" + awayTeamData.team.color}>
                              {
                                awayData.find((x) => x.name === "threePointFieldGoalPct")
                                  .displayValue
                              }
                              %
                            </Typography>
                            <Typography
                              variant={"h1"}
                              style={{
                                fontFamily: "josefin",
                                fontWeight: 400,
                                fontSize: 1.7 + textSize + "rem",
                                textAlign: "center",
                              }}
                              color={"#" + awayTeamData.team.color}>
                              {
                                awayData.find((x) => x.name === "threePointFieldGoalsMade")
                                  .displayValue
                              }
                              /
                              {
                                awayData.find((x) => x.name === "threePointFieldGoalsAttempted")
                                  .displayValue
                              }
                            </Typography>
                          </div>
                          <div
                            style={{
                              backgroundColor: "black",
                              padding: 10,
                              borderRadius: 10,
                            }}>
                            <Typography
                              variant={"h1"}
                              style={{
                                fontFamily: "'Baloo Bhaijaan', cursive",
                                fontWeight: 400,
                                fontSize: 1.5 + textSize + "rem",
                                textAlign: "center",
                                marginRight: 20,
                                marginLeft: 20,
                              }}
                              color={"white"}>
                              3P
                            </Typography>
                          </div>
                          <div
                            style={{
                              backgroundColor: homeTeamData.team.alternateColor
                                ? "#" + homeTeamData.team.alternateColor
                                : "white",
                              padding: "15px 70px",
                              width: "100%",
                              borderRadius: 10,
                            }}>
                            <Typography
                              variant={"h1"}
                              style={{
                                fontFamily: "josefin",
                                fontWeight: 400,
                                fontSize: 2.2 + textSize + "rem",
                                textAlign: "center",
                              }}
                              color={"#" + homeTeamData.team.color}>
                              {
                                homeData.find((x) => x.name === "threePointFieldGoalPct")
                                  .displayValue
                              }
                              %
                            </Typography>
                            <Typography
                              variant={"h1"}
                              style={{
                                fontFamily: "josefin",
                                fontWeight: 400,
                                fontSize: 1.7 + textSize + "rem",
                                textAlign: "center",
                              }}
                              color={"#" + homeTeamData.team.color}>
                              {
                                homeData.find((x) => x.name === "threePointFieldGoalsMade")
                                  .displayValue
                              }
                              /
                              {
                                homeData.find((x) => x.name === "threePointFieldGoalsAttempted")
                                  .displayValue
                              }
                            </Typography>
                          </div>
                        </div>
                      );
                    }
                    if (x === "freeThrow") {
                      const awayData = awayTeamData.statistics.filter((x) =>
                        x.name.includes("freeThrow")
                      );
                      const homeData = homeTeamData.statistics.filter((x) =>
                        x.name.includes("freeThrow")
                      );
                      return (
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 25,
                            borderRadius: 10,
                            backgroundColor: "black",
                          }}>
                          <div
                            style={{
                              backgroundColor: awayTeamData.team.alternateColor
                                ? "#" + awayTeamData.team.alternateColor
                                : "white",
                              padding: "15px 70px",
                              width: "100%",
                              borderRadius: 10,
                            }}>
                            <Typography
                              variant={"h1"}
                              style={{
                                fontFamily: "josefin",
                                fontWeight: 400,
                                fontSize: 2.2 + textSize + "rem",
                                textAlign: "center",
                              }}
                              color={"#" + awayTeamData.team.color}>
                              {awayData.find((x) => x.name === "freeThrowPct").displayValue}%
                            </Typography>
                            <Typography
                              variant={"h1"}
                              style={{
                                fontFamily: "josefin",
                                fontWeight: 400,
                                fontSize: 1.7 + textSize + "rem",
                                textAlign: "center",
                              }}
                              color={"#" + awayTeamData.team.color}>
                              {awayData.find((x) => x.name === "freeThrowsMade").displayValue}/
                              {awayData.find((x) => x.name === "freeThrowsAttempted").displayValue}
                            </Typography>
                          </div>
                          <div
                            style={{
                              backgroundColor: "black",
                              padding: 10,
                              borderRadius: 10,
                            }}>
                            <Typography
                              variant={"h1"}
                              style={{
                                fontFamily: "'Baloo Bhaijaan', cursive",
                                fontWeight: 400,
                                fontSize: 1.5 + textSize + "rem",
                                textAlign: "center",
                                marginRight: 20,
                                marginLeft: 20,
                              }}
                              color={"white"}>
                              FT
                            </Typography>
                          </div>
                          <div
                            style={{
                              backgroundColor: homeTeamData.team.alternateColor
                                ? "#" + homeTeamData.team.alternateColor
                                : "white",
                              padding: "15px 70px",
                              width: "100%",
                              borderRadius: 10,
                            }}>
                            <Typography
                              variant={"h1"}
                              style={{
                                fontFamily: "josefin",
                                fontWeight: 400,
                                fontSize: 2.2 + textSize + "rem",
                                textAlign: "center",
                              }}
                              color={"#" + homeTeamData.team.color}>
                              {homeData.find((x) => x.name === "freeThrowPct").displayValue}%
                            </Typography>
                            <Typography
                              variant={"h1"}
                              style={{
                                fontFamily: "josefin",
                                fontWeight: 400,
                                fontSize: 1.7 + textSize + "rem",
                                textAlign: "center",
                              }}
                              color={"#" + homeTeamData.team.color}>
                              {homeData.find((x) => x.name === "freeThrowsMade").displayValue}/
                              {homeData.find((x) => x.name === "freeThrowsAttempted").displayValue}
                            </Typography>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div>
                        <Typography
                          variant={"h1"}
                          style={{
                            fontFamily: "'scoreboard', cursive",
                            fontWeight: 400,
                            marginTop: 50,
                            fontSize: 1.5 + textSize + "rem",
                            textAlign: "center",
                          }}
                          color={"white"}></Typography>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
              width: "100%",
              height: "100%",
            }}>
            <img
              style={{ height: 275 + textSize * 10, width: 275 + textSize * 10 }}
              src={homeTeamData.team.logo}
              alt="away team logo"
            />
            <div
              style={{
                textAlign: "right",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}>
              <Typography
                variant={"h1"}
                style={{
                  fontFamily: "'soccer-league', cursive",
                  fontWeight: 400,
                  fontSize: 2.7 + textSize + "rem",
                }}
                color={"white"}>
                {homeTeamData.team.location}
              </Typography>
              <Typography
                variant={"h1"}
                style={{
                  fontFamily: "'soccer-league', cursive",
                  fontWeight: 400,
                  fontSize: 4.5 + textSize + "rem",
                }}
                color={"white"}>
                {homeTeamData.team.name}
              </Typography>
              <Typography
                variant={"h1"}
                style={{
                  fontFamily: "'josefin', cursive",
                  margin: 0,
                  fontWeight: 400,
                  fontSize: textSize > 1 ? "2.5rem" : 1.5 + textSize + "rem",
                  marginBottom: 10,
                  marginTop: 10,
                }}
                color={"white"}>
                Overall: ({homeTeamData.records[0]?.summary})
              </Typography>
              {!homeTeamData.leaders &&
                [1, 2, 3].map((x, idx) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      backgroundColor: homeTeamData.team.alternateColor
                        ? "#" + homeTeamData.team.alternateColor
                        : "white",
                      borderRadius: 10,
                      padding: 10,
                      width: 500,
                      marginBottom: 10,
                    }}
                    key={idx}>
                    <div>
                      <img style={{ height: 100 }} src={homeTeamData.team.logo} alt="player pic" />
                    </div>
                    <div>
                      <Typography
                        variant={"h1"}
                        style={{
                          fontFamily: "'josefin', cursive",
                          margin: 0,
                          fontWeight: 400,
                          fontSize: 1.5 + textSize + "rem",
                        }}
                        color={"#" + homeTeamData.team.color}></Typography>
                      <Typography
                        variant={"h1"}
                        style={{
                          fontFamily: "'josefin', cursive",
                          margin: 0,
                          fontWeight: 400,
                          fontSize: 1.7 + textSize + "rem",
                        }}
                        color={"#" + homeTeamData.team.color}></Typography>
                    </div>
                  </div>
                ))}
              {homeTeamData.leaders &&
                homeTeamData.leaders
                  .filter((x) => x.name !== "rating")
                  .map((x, idx) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        backgroundColor: homeTeamData.team.alternateColor
                          ? "#" + homeTeamData.team.alternateColor
                          : "white",
                        borderRadius: 10,
                        padding: 10,
                        width: 500,
                        marginBottom: 10,
                      }}
                      key={idx}>
                      <div>
                        <Typography
                          variant={"h1"}
                          style={{
                            fontFamily: "'josefin', cursive",
                            margin: 0,
                            fontWeight: 400,
                            fontSize: 1.5 + textSize + "rem",
                          }}
                          color={"#" + homeTeamData.team.color}>
                          {x.leaders[0].athlete.displayName}
                        </Typography>
                        <Typography
                          variant={"h1"}
                          style={{
                            fontFamily: "'josefin', cursive",
                            margin: 0,
                            fontWeight: 400,
                            fontSize: 1.7 + textSize + "rem",
                          }}
                          color={"#" + homeTeamData.team.color}>
                          {x.leaders[0].displayValue}{" "}
                          {x.shortDisplayName !== "RAT" ? x.shortDisplayName : null}
                        </Typography>
                      </div>
                      <div>
                        <img
                          style={{ height: 100 }}
                          src={x.leaders[0].athlete.headshot}
                          alt="player pic"
                        />
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", zIndex: 1000 }}>
          <SettingsIcon
            style={{ fontSize: 25, color: "white", marginLeft: 10 }}
            onClick={() => setIsSettingsOpen(true)}
          />
          <Typography
            variant={"h3"}
            onClick={() => setIsSettingsOpen(true)}
            style={{
              fontFamily: "'Baloo Bhaijaan', cursive",
              fontWeight: 400,
              fontSize: 1.5 + "rem",
              cursor: "pointer",
            }}
            color={"white"}>
            mancavedisplays.com
          </Typography>
        </div>
        {showOverlay && (
          <div
            onClick={() => setIsSettingsOpen(true)}
            style={{
              zIndex: 1000,
              display: "flex",
              cursor: "pointer",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              position: "absolute",
              top: 50,
              left: 0,
              padding: 20,
              backgroundColor: "green",
              color: "white",
              borderRadius: 20,
            }}>
            <NorthIcon style={{ fontSize: 50, color: "white", marginLeft: 10 }} />
            <Typography
              variant={"h3"}
              style={{
                fontFamily: "'Baloo Bhaijaan', cursive",
                fontWeight: 400,
                fontSize: 1.5 + "rem",
                cursor: "pointer",
              }}
              color={"white"}>
              CLICK UP HERE TO CHANGE THE FONT SIZE
            </Typography>
          </div>
        )}
        <Dialog
          open={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          maxWidth="xxl"
          fullWidth>
          <DialogTitle>Font Size</DialogTitle>
          <DialogContent>
            {/* <Typography variant="h6" style={{ marginTop: 10 }}>
              Font Size
            </Typography> */}
            <Box sx={{}}>
              <Slider
                aria-label="Small steps"
                defaultValue={0}
                // getAriaValueText={valuetext}
                step={0.25}
                marks
                min={-2}
                max={4}
                valueLabelDisplay="auto"
                value={textSize}
                style={{ marginTop: 30 }}
                onChange={(e, value) => setTextSize(value)}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <Button
                href="https://billing.stripe.com/p/login/28obJ7eCL7RIcGQ5kk"
                variant="contained"
                color="secondary">
                Manage Subscription
              </Button>
              <Button onClick={() => setIsSettingsOpen(false)}>Close</Button>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default Basketball;
