import * as React from "react";
import { StyleSheet, ActivityIndicator, Image } from "react-native";
import { Slider } from "react-native-elements";
import { MyContext } from "../contexts/MyContext";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "./Themed";
import moment from "moment";
import * as NBAIcons from "../assets/images/logos/nba";
import * as MLBIcons from "../assets/images/logos/mlb";
import * as NFLIcons from "../assets/images/logos/nfl";
import basesLoaded from "../assets/images/baseballBases/basesLoaded.png";
import first from "../assets/images/baseballBases/first.png";
import firstAndSecond from "../assets/images/baseballBases/firstAndSecond.png";
import secondAndThird from "../assets/images/baseballBases/secondAndThird.png";
import firstAndThird from "../assets/images/baseballBases/firstAndThird.png";
import second from "../assets/images/baseballBases/second.png";
import third from "../assets/images/baseballBases/third.png";
import getBackgroundColor from "../utils/getBackgroundColor";
import getBetBackgroundColor from "../utils/getBetBackgroundColor";
import getNCAABetBackgroundColor from "../utils/getNCAABetBackgroundColor";

export default function MatchupCard({ game, betInfo, straightBet, parlay, gameId, winner, league, bet }) {
  const { todaysNBAGames, deviceType, todaysGames, todaysNFLGames, removeForAppStore, todaysNCAABaseballGames } = React.useContext(MyContext);
  const [theGame, setTheGame] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [awayTeam, setAwayTeam] = React.useState();
  const [homeTeam, setHomeTeam] = React.useState();
  const allGames = {
    nba: todaysNBAGames,
    mlb: todaysGames,
    nfl: todaysNFLGames,
    ncaabaseball: todaysNCAABaseballGames,
  };
  const allLogos = {
    nba: NBAIcons,
    nfl: NFLIcons,
    mlb: MLBIcons,
    ncaabaseball: [],
  };

  React.useEffect(() => {
    if (parlay) {
      const theGame = allGames[league].find((x) => {
        return parseInt(x.id) === parseInt(gameId);
      });
      theGame.winner = winner;
      setTheGame(theGame);
      const awayTeam = !theGame.competitions[0].competitors[1].team.abbreviation ? "OOPS" : theGame.competitions[0].competitors[1].team.abbreviation;
      const homeTeam = !theGame.competitions[0].competitors[0].team.abbreviation ? "OOPS" : theGame.competitions[0].competitors[0].team.abbreviation;
      setAwayTeam(awayTeam);
      setHomeTeam(homeTeam);
      setLoading(false);
    } else if ((league === "nfl" || league === "mlb" || league === "nba") && game) {
      setTheGame(game);
      const awayTeam = game.competitions[0].competitors[1].team.abbreviation;
      const homeTeam = game.competitions[0].competitors[0].team.abbreviation;
      setAwayTeam(awayTeam);
      setHomeTeam(homeTeam);
      setLoading(false);
    } else if (game) {
      setTheGame(game);
      const awayTeam = !game.schedule.awayTeam ? "OOPS" : game.schedule.awayTeam.abbreviation;
      const homeTeam = !game.schedule.homeTeam ? "OOPS" : game.schedule.homeTeam.abbreviation;
      setAwayTeam(awayTeam);
      setHomeTeam(homeTeam);
      setLoading(false);
    }
  }, []);

  const renderOdds = () =>
    theGame.status.type.name === "STATUS_SCHEDULED" &&
    theGame.competitions[0].odds && (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "transparent",
          width: "100%",
        }}>
        <Text style={{ color: "white" }}>{theGame.competitions[0].odds[0].details}</Text>
        <Text style={{ color: "white" }}>o/u {theGame.competitions[0].odds[0].overUnder}</Text>
      </View>
    );

  const renderBottom = () => {
    const plusSpread = (score, spread) => score + spread;
    const minusSpread = (score, spread) => score - spread;
    if (league === "nfl" || league === "mlb" || league === "nba" || league === "ncaabaseball") {
      if (theGame.status.type.name === "STATUS_POSTPONED") {
        return <Text style={{ color: "white" }}>PPND</Text>;
      } else if (
        theGame.status.type.name === "STATUS_DELAYED" ||
        theGame.status.type.name === "STATUS_IN_PROGRESS" ||
        theGame.status.type.name === "STATUS_FINAL" ||
        theGame.status.type.name === "STATUS_HALFTIME" ||
        theGame.status.type.name === "STATUS_END_PERIOD"
      ) {
        return (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "transparent",
              flexDirection: "column",
              width: "100%",
            }}>
            <View
              style={{
                justifyContent: "space-around",
                backgroundColor: "transparent",
                flexDirection: "row",
                width: "100%",
              }}>
              <View
                style={{
                  backgroundColor: "transparent",
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <Text style={{ color: "white", ...styles.gameScore }}>{theGame.competitions[0].competitors[1].score}</Text>
                {winner && bet.spread && theGame.competitions[0].competitors[1].team.abbreviation === winner && (
                  <Text
                    style={{
                      color: "white",
                      ...styles.gameScore,
                      fontSize: 13,
                      marginLeft: 3,
                    }}>
                    {bet.spreadType === "plus"
                      ? plusSpread(parseInt(theGame.competitions[0].competitors[1].score), parseFloat(bet.spread))
                      : minusSpread(parseInt(theGame.competitions[0].competitors[1].score), parseFloat(bet.spread))}
                  </Text>
                )}
              </View>
              {renderRunnersMLB()}
              <View
                style={{
                  backgroundColor: "transparent",
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                {winner && bet.spread && theGame.competitions[0].competitors[0].team.abbreviation === winner && (
                  <Text
                    style={{
                      color: "white",
                      ...styles.gameScore,
                      fontSize: 13,
                      marginRight: 3,
                    }}>
                    {bet.spreadType === "plus"
                      ? plusSpread(parseInt(theGame.competitions[0].competitors[0].score), parseFloat(bet.spread))
                      : minusSpread(parseInt(theGame.competitions[0].competitors[0].score), parseFloat(bet.spread))}
                  </Text>
                )}
                <Text style={{ color: "white", ...styles.gameScore }}>{theGame.competitions[0].competitors[0].score}</Text>
              </View>
            </View>
            {theGame.status.type.name === "STATUS_DELAYED" && (
              <View
                style={{
                  backgroundColor: "transparent",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}>
                <Text style={{ textAlign: "center", color: "white", fontSize: 15 }}>DELAY</Text>
                {theGame.status.period > 1 && (
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 15,
                    }}>
                    {theGame.status.period > 1 && theGame.status.period}
                    {theGame.status.period > 1 && theGame.status.period > 4 ? "th" : theGame.status.period === 0 ? "Start" : ""}{" "}
                    {theGame.status.period > 1 && "inning"}
                  </Text>
                )}
              </View>
            )}
          </View>
        );
      } else {
        return (
          <View
            style={{
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text style={{ color: "white" }}>{moment(theGame.date).format("ddd")}</Text>
            <Text style={{ color: "white" }}>{moment(theGame.date).format("h:mm a")}</Text>
          </View>
        );
      }
    } else if (league !== "nfl") {
      if (theGame.playedStatus === "LIVE" || theGame.playedStatus === "COMPLETED" || theGame.playedStatus === "COMPLETED_PENDING_REVIEW") {
        return (
          <>
            <Text style={{ color: "white", ...styles.gameScore }}>{parseInt(theGame.competitions[0].competitors[1].score)}</Text>
            <Text style={{ color: "white", ...styles.gameScore }}>-</Text>
            <Text style={{ color: "white", ...styles.gameScore }}>{parseInt(theGame.competitions[0].competitors[0].score)}</Text>
          </>
        );
      } else if (theGame.playedStatus !== "LIVE") {
        return <Text style={{ color: "white", ...styles.gameTime }}>{moment(theGame.schedule.startTime).format("ddd h:mm a")}</Text>;
      }
    }
  };
  const renderTotalScore = () => {
    if (betInfo && betInfo.overUnder === "false") return null;
    if (bet && bet.overUnder === "false") return null;
    if (league === "nfl" || league === "nhl" || league === "mlb" || league === "nba") {
      if (
        ((betInfo && betInfo.overUnderBet) || (bet && bet.overUnder !== "undefined" && bet.overUnder !== "false" && bet.overUnder)) &&
        (theGame.status.type.name === "STATUS_IN_PROGRESS" || theGame.status.type.name === "STATUS_FINAL") &&
        theGame.status.type.name !== "STATUS_SCHEDULED"
      ) {
        const totalScore = parseInt(theGame.competitions[0].competitors[1].score) + parseInt(theGame.competitions[0].competitors[0].score);
        const theBet = parlay ? bet : betInfo;
        const { overUnderTotal, overUnderType, overUnder } = theBet;
        const isHalfPoint = overUnder % 2;
        const left = overUnderType === "over" ? totalScore - overUnderTotal : overUnderTotal - totalScore;
        let remainingPoints = Math.ceil(overUnderTotal ? overUnderTotal : overUnder) - totalScore;
        const getRemainingPointsText = () => {
          // console.log('----------');
          // console.log(overUnderType);
          // console.log('total', totalScore);
          // console.log('overUnder', overUnder);
          // console.log('overUnderTotal', overUnderTotal);
          // console.log('----------');
          if (overUnderType === "Over" && totalScore > (overUnderTotal ? overUnderTotal : overUnder)) {
            return "Won";
          } else if (totalScore == overUnder || totalScore == overUnderTotal) {
            return "Push";
          } else if (overUnderType === "Over" && totalScore > (overUnderTotal ? overUnderTotal : overUnder)) {
            return "Lost";
          } else {
            if (overUnderType === "Under") {
              return `Left: ${remainingPoints}`;
            } else {
              return `Need: ${Number.isInteger(overUnderTotal ? overUnderTotal : overUnder) ? remainingPoints + 1 : remainingPoints}`;
            }
          }
        };
        if (overUnderType === "Under") {
          Number.isInteger(overUnderTotal ? overUnderTotal : overUnder) ? remainingPoints : (remainingPoints -= 1);
        } else if (overUnderType === "Over") {
          Number.isInteger(overUnderTotal ? overUnderTotal : overUnder) ? (remainingPoints += 1) : remainingPoints;
        }
        return (
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              backgroundColor: "transparent",
              justifyContent: "space-around",
            }}>
            <Text style={{ color: "white", fontSize: 15 }}>Total: {totalScore}</Text>
            <Text style={{ color: "white", fontSize: 15 }}>{getRemainingPointsText()}</Text>
          </View>
        );
      } else if (
        betInfo &&
        betInfo.overUnderBet &&
        (theGame.status.type.name === "STATUS_IN_PROGRESS" || theGame.status.type.name === "STATUS_FINAL")
      ) {
        const totalScore = theGame.competitions[0].competitors[1].score + theGame.competitions[0].competitors[0].score;
        const { overUnderTotal, overUnderType } = betInfo;
        console.log(totalScore);
        const left = overUnderType === "over" ? totalScore - overUnderTotal : overUnderTotal - totalScore;
        return (
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              backgroundColor: "transparent",
              justifyContent: "space-around",
            }}>
            <Text style={{ color: "white", fontSize: 15 }}>Total: {totalScore}</Text>
            <Text style={{ color: "white", fontSize: 15 }}>{getRemainingPointsText()}</Text>
          </View>
        );
      } else {
        return null;
      }
    }
    if (
      betInfo &&
      betInfo.overUnderBet &&
      (theGame.playedStatus === "LIVE" || theGame.playedStatus === "COMPLETED" || theGame.playedStatus === "COMPLETED_PENDING_REVIEW")
    ) {
      const totalScore = parseInt(game.competitions[0].competitors[1].score) + parseInt(game.competitions[0].competitors[0].score);
      const { overUnderTotal, overUnderType } = betInfo;
      const left = overUnderType === "over" ? totalScore - overUnderTotal : overUnderTotal - totalScore;
      return (
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            backgroundColor: "transparent",
            justifyContent: "space-around",
          }}>
          <Text style={{ color: "white", fontSize: 15 }}>Total: {totalScore}</Text>
          <Text style={{ color: "white", fontSize: 15 }}>
            {overUnderType === "Over" ? "Need" : "Left"}: {overUnderType === "Over" ? (Number.isInteger(overUnderTotal) ? left + 1 : left) : left}
          </Text>
        </View>
      );
    } else {
      return null;
    }
  };

  const renderRunnersMLB = () => {
    if (
      (theGame.status.type.name === "STATUS_IN_PROGRESS" || theGame.status.type.name === "STATUS_DELAYED") &&
      (league === "mlb" || league === "ncaabaseball")
    ) {
      const onFirst = theGame.competitions[0].situation.onFirst;
      const onSecond = theGame.competitions[0].situation.onSecond;
      const onThird = theGame.competitions[0].situation.onThird;
      if (onFirst && onSecond && onThird) {
        return (
          <View style={{ backgroundColor: "transparent", justifyContent: "center" }}>
            <Image style={{ marginBottom: 3, height: 40, width: 40 }} source={basesLoaded} />
          </View>
        );
      } else if (onFirst && !onSecond && !onThird) {
        return (
          <View style={{ backgroundColor: "transparent", justifyContent: "center" }}>
            <Image style={{ marginBottom: 3, height: 40, width: 40 }} source={first} />
          </View>
        );
      } else if (!onFirst && onSecond && !onThird) {
        return (
          <View style={{ backgroundColor: "transparent", justifyContent: "center" }}>
            <Image style={{ marginBottom: 3, height: 40, width: 40 }} source={second} />
          </View>
        );
      } else if (!onFirst && !onSecond && onThird) {
        return (
          <View style={{ backgroundColor: "transparent", justifyContent: "center" }}>
            <Image style={{ marginBottom: 3, height: 40, width: 40 }} source={third} />
          </View>
        );
      } else if (onFirst && onSecond && !onThird) {
        return (
          <View style={{ backgroundColor: "transparent", justifyContent: "center" }}>
            <Image style={{ marginBottom: 3, height: 40, width: 40 }} source={firstAndSecond} />
          </View>
        );
      } else if (onFirst && !onSecond && onThird) {
        return (
          <View style={{ backgroundColor: "transparent", justifyContent: "center" }}>
            <Image style={{ marginBottom: 3, height: 40, width: 40 }} source={firstAndThird} />
          </View>
        );
      } else if (!onFirst && onSecond && onThird) {
        return (
          <View style={{ backgroundColor: "transparent", justifyContent: "center" }}>
            <Image style={{ marginBottom: 3, height: 40, width: 40 }} source={secondAndThird} />
          </View>
        );
      }
    }
  };
  const renderMiddle = () => {
    const getMediaShortName = () => {
      const shortName = theGame.competitions[0].geoBroadcasts[0] ? theGame.competitions[0].geoBroadcasts[0].media.shortName.split(" ") : "";
      if (shortName.length > 1) {
        return null;
      } else {
        return theGame.competitions[0].geoBroadcasts[0].media.shortName;
      }
    };
    if (league === "nfl" || league === "mlb" || league === "ncaabaseball" || league === "nba") {
      if (theGame.status.type.name === "STATUS_FINAL") {
        return <Text style={{ color: "white" }}>FINAL</Text>;
      } else if (theGame.status.type.name === "STATUS_IN_PROGRESS" && (league === "nfl" || league === "nba")) {
        const top = theGame.status.type.shortDetail.split(" - ")[0];
        const bottom = theGame.status.type.shortDetail.split(" - ")[1];
        return (
          <View style={{ backgroundColor: "transparent", justifyContent: "center" }}>
            {top.includes("End") ? (
              <Text style={{ textAlign: "center", color: "white" }}>End</Text>
            ) : (
              <Text style={{ textAlign: "center", color: "white" }}>{top}</Text>
            )}
            <Text style={{ textAlign: "center", color: "white" }}>{bottom}</Text>
          </View>
        );
      } else if (theGame.status.type.name === "STATUS_IN_PROGRESS" && (league === "mlb" || league === "ncaabaseball")) {
        const top = theGame.status.type.shortDetail.split(" ")[0];
        const bottom = theGame.status.type.shortDetail.split(" ")[1];
        const balls = theGame.competitions[0].situation.balls;
        const strikes = theGame.competitions[0].situation.strikes;
        const outs = theGame.competitions[0].situation.outs;
        return (
          <View style={{ backgroundColor: "transparent", justifyContent: "center" }}>
            <Text style={{ textAlign: "center", color: "white" }}>{top}</Text>
            <Text style={{ textAlign: "center", color: "white" }}>{bottom}</Text>
            <Text style={{ textAlign: "center", color: "white" }}>
              {balls} - {strikes}
            </Text>
            <Text style={{ textAlign: "center", color: "white" }}>{outs} outs</Text>
          </View>
        );
      } else if (theGame.status.type.name === "STATUS_HALFTIME" || theGame.status.type.name === "STATUS_END_PERIOD") {
        return (
          <View style={{ backgroundColor: "transparent" }}>
            <Text style={{ textAlign: "center", color: "white" }}>HALF</Text>
          </View>
        );
      } else {
        return (
          <View style={{ backgroundColor: "transparent" }}>
            <Text style={{ textAlign: "center", color: "white" }}>{/*{getMediaShortName()}*/}</Text>
          </View>
        );
      }
    }
  };

  const renderBets = () => {
    const bets = [];
    if (betInfo) {
      if (betInfo.moneylineBet) {
        bets.push({
          type: "moneyline",
          bet: betInfo.moneylineBet,
          winnings: Math.round(betInfo.moneylineToWin),
          winner: betInfo.moneylineWinner,
          text: `${betInfo.moneylineWinner} ML $${betInfo.moneylineBet} win $${Math.round(betInfo.moneylineToWin)}`,
        });
      }
      if (betInfo.overUnderBet) {
        bets.push({
          type: "overUnder",
          bet: betInfo.overUnderBet,
          winnings: Math.round(betInfo.overUnderToWin),
          overUnder: betInfo.overUnderTotal,
          overUnderType: betInfo.overUnderType,
          text: `${betInfo.overUnderType} ${betInfo.overUnderTotal} $${betInfo.overUnderBet} win $${Math.round(betInfo.overUnderToWin)}`,
        });
      }
      if (betInfo.spreadBet) {
        bets.push({
          type: "spread",
          bet: betInfo.spreadBet,
          winnings: Math.round(betInfo.spreadToWin),
          winner: betInfo.spreadWinner,
          spreadAmt: betInfo.spreadAmt,
          text: `${betInfo.spreadWinner} ${betInfo.spreadAmt} $${betInfo.spreadBet} win $${Math.round(betInfo.spreadToWin)}`,
        });
      }
    }
    return bets.map((bet, idx) => {
      if (league === "nfl" || league === "mlb" || league === "nba") {
        if (
          theGame.status.type.name === "STATUS_IN_PROGRESS" ||
          theGame.status.type.name === "STATUS_FINAL" ||
          theGame.status.type.name === "STATUS_HALFTIME" ||
          theGame.status.type.name === "STATUS_END_PERIOD"
        ) {
          return (
            <View
              key={idx}
              style={{
                width: "100%",
                backgroundColor: getNCAABetBackgroundColor(bet, theGame, awayTeam, homeTeam),
              }}>
              <Text
                style={{
                  color: getNCAABetBackgroundColor(bet, theGame, awayTeam, homeTeam) === "yellow" ? "black" : "white",
                  fontSize: deviceType === 2 ? 17 : 14,
                  paddingHorizontal: 5,
                  textAlign: "center",
                }}>
                {bet.text}
              </Text>
            </View>
          );
        }
      }
      if (theGame.playedStatus === "LIVE" || theGame.playedStatus === "COMPLETED" || theGame.playedStatus === "COMPLETED_PENDING_REVIEW") {
        return (
          <View
            key={idx}
            style={{
              width: "100%",
              backgroundColor: getBetBackgroundColor(bet, theGame, awayTeam, homeTeam),
            }}>
            <Text
              style={{
                color: getBetBackgroundColor(bet, theGame, awayTeam, homeTeam) === "yellow" ? "black" : "white",
                fontSize: deviceType === 2 ? 17 : 14,
                paddingHorizontal: 5,
                textAlign: "center",
              }}>
              {bet.text}
            </Text>
          </View>
        );
      }
      return (
        <Text key={idx} style={{ color: "white", textAlign: "center" }}>
          {bet.text}
        </Text>
      );
    });
  };
  const possession = () => (theGame.competitions[0].situation.possession === theGame.competitions[0].competitors[1].id ? "away" : "home");
  const distanceState = () => {
    if (possession() === "away") {
      const yardage = 100 - theGame.competitions[0].situation.yardLine;
      return yardage.toString();
    } else {
      const yardage = theGame.competitions[0].situation.yardLine;
      return yardage.toString();
    }
  };

  const getTintColor = (type) => {
    if (theGame.competitions[0].situation.isRedZone && type === "max") {
      return "#fd8c8c";
    } else if (!theGame.competitions[0].situation.isRedZone && type === "min") {
      return "#000";
    } else if (theGame.competitions[0].situation.isRedZone && type === "min") {
      return "#fa0000";
    } else if (!theGame.competitions[0].situation.isRedZone && type === "min") {
      return "#979595";
    }
  };

  if (!loading && awayTeam && homeTeam && !straightBet && !parlay) {
    const possession = () => (theGame.competitions[0].situation.possession === theGame.competitions[0].competitors[1].id ? "away" : "home");
    const downDistance = theGame.competitions[0].situation ? theGame.competitions[0].situation.downDistanceText : null;
    const redZone = theGame.competitions[0].situation && theGame.competitions[0].situation.isRedZone ? true : false;
    const AwayLogo = league !== "ncaabaseball" && allLogos[league][awayTeam];
    const HomeLogo = league !== "ncaabaseball" && allLogos[league][homeTeam];
    return (
      <LinearGradient colors={["#1a37ee", "#485cd5"]} start={[0.1, 0.4]} style={styles.container}>
        <View
          style={{
            backgroundColor: "transparent",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <View style={{ backgroundColor: "transparent", ...styles.columns }}>
            <View style={{ backgroundColor: "transparent", ...styles.teamDiv }}>
              {!removeForAppStore && league !== "ncaabaseball" && <AwayLogo size={50} />}
              <View
                style={{
                  backgroundColor: "transparent",
                  ...styles.teamDiv,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Text
                  style={{
                    color: "white",
                    ...styles.teamName,
                    fontSize: 20,
                  }}>
                  {awayTeam}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ backgroundColor: "transparent" }}>{renderMiddle()}</View>

          <View style={{ backgroundColor: "transparent", ...styles.columns }}>
            <View style={{ backgroundColor: "transparent", ...styles.teamDiv }}>
              {!removeForAppStore && league !== "ncaabaseball" && <HomeLogo size={50} />}
              <View
                style={{
                  backgroundColor: "transparent",
                  ...styles.teamDiv,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}>
                <Text
                  style={{
                    color: "white",
                    ...styles.teamName,
                    fontSize: 20,
                  }}>
                  {homeTeam}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {downDistance && <Text style={{ color: "white" }}>{downDistance}</Text>}
        {renderOdds()}
        <View style={styles.bottom}>{renderBottom()}</View>
      </LinearGradient>
    );
  } else if (!loading && theGame && straightBet && awayTeam && homeTeam) {
    const downDistance = theGame.competitions[0].situation ? theGame.competitions[0].situation.downDistanceText : null;
    const AwayLogo = allLogos[league][awayTeam];
    const HomeLogo = allLogos[league][homeTeam];
    return (
      <LinearGradient colors={["#1a37ee", "#485cd5"]} start={[0.1, 0.4]} style={styles.container}>
        <View
          style={{
            backgroundColor: "transparent",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <View style={{ backgroundColor: "transparent", ...styles.columns }}>
            <View style={{ backgroundColor: "transparent", ...styles.teamDiv }}>
              {!removeForAppStore && league !== "ncaabaseball" && <AwayLogo size={50} />}
              <View
                style={{
                  backgroundColor: "transparent",
                  ...styles.teamDiv,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Text
                  style={{
                    color: "white",
                    ...styles.teamName,
                    fontSize: 20,
                  }}>
                  {awayTeam}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ backgroundColor: "transparent" }}>{renderMiddle()}</View>

          <View style={{ backgroundColor: "transparent", ...styles.columns }}>
            <View style={{ backgroundColor: "transparent", ...styles.teamDiv }}>
              {!removeForAppStore && league !== "ncaabaseball" && <HomeLogo size={50} />}
              <View
                style={{
                  backgroundColor: "transparent",
                  ...styles.teamDiv,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}>
                <Text
                  style={{
                    color: "white",
                    ...styles.teamName,
                    fontSize: 20,
                  }}>
                  {homeTeam}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottom}>{renderBottom()}</View>
        {downDistance && <Text style={{ color: "white" }}>{downDistance}</Text>}
        {downDistance && (
          <Slider
            value={distanceState().toString()}
            maximumValue={100}
            minimumValue={0}
            step={1}
            style={{ width: "100%" }}
            trackStyle={{
              height: 8,
            }}
            minimumTrackTintColor={getTintColor("min")}
            maximumTrackTintColor={getTintColor("max")}
            thumbStyle={{
              height: 45,
              width: 45,
              backgroundColor: "transparent",
            }}
            thumbProps={{
              children: possession() === "away" ? <AwayLogo size={45} /> : <HomeLogo size={45} />,
            }}
          />
        )}
        {renderOdds()}
        {renderTotalScore()}
        <View style={styles.bets}>{renderBets()}</View>
      </LinearGradient>
    );
  } else if (!loading && theGame && parlay) {
    const possession = () => (theGame.competitions[0].situation.possession === theGame.competitions[0].competitors[1].id ? "away" : "home");
    const downDistance = theGame.competitions[0].situation ? theGame.competitions[0].situation.downDistanceText : null;
    const AwayLogo = allLogos[league][awayTeam];
    const HomeLogo = allLogos[league][homeTeam];
    return (
      <LinearGradient
        colors={getBackgroundColor(theGame, awayTeam, homeTeam, straightBet, parlay, bet, winner)}
        start={[0.1, 0.4]}
        style={styles.container}>
        <View style={styles.bet}>
          {!bet.overUnderType || bet.overUnderType === "false" ? (
            <View
              style={{
                backgroundColor: "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Text style={{ color: "#ffffff" }}>
                {bet.spread ? `${winner} ${bet.spreadType === "plus" ? "+" : "-"}${bet.spread}` : `${winner} win`}
              </Text>
            </View>
          ) : (
            <Text style={{ color: "#ffffff" }}>{bet.overUnderType + " " + bet.overUnder}</Text>
          )}
        </View>
        <View
          style={{
            backgroundColor: "transparent",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <View style={{ backgroundColor: "transparent", ...styles.columns }}>
            <View style={{ backgroundColor: "transparent", ...styles.teamDiv }}>
              {!removeForAppStore && league !== "ncaabaseball" && <AwayLogo size={50} />}
              <View
                style={{
                  backgroundColor: "transparent",
                  ...styles.teamDiv,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Text
                  style={{
                    color: "white",
                    ...styles.teamName,
                    fontSize: 20,
                  }}>
                  {awayTeam}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ backgroundColor: "transparent" }}>{renderMiddle()}</View>

          <View style={{ backgroundColor: "transparent", ...styles.columns }}>
            <View style={{ backgroundColor: "transparent", ...styles.teamDiv }}>
              {!removeForAppStore && league !== "ncaabaseball" && <HomeLogo size={50} />}
              <View
                style={{
                  backgroundColor: "transparent",
                  ...styles.teamDiv,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Text
                  style={{
                    color: "white",
                    ...styles.teamName,
                    fontSize: 20,
                  }}>
                  {homeTeam}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottom}>{renderBottom()}</View>
        {downDistance && <Text style={{ color: "white" }}>{downDistance}</Text>}
        {downDistance && (
          <Slider
            value={distanceState().toString()}
            maximumValue={100}
            minimumValue={0}
            step={1}
            style={{ width: "100%" }}
            trackStyle={{
              height: 8,
            }}
            minimumTrackTintColor={getTintColor("min")}
            maximumTrackTintColor={getTintColor("max")}
            thumbStyle={{
              height: 45,
              width: 45,
              backgroundColor: "transparent",
            }}
            thumbProps={{
              children: possession() === "away" ? <AwayLogo size={45} /> : <HomeLogo size={45} />,
            }}
          />
        )}
        {renderTotalScore()}
        <View style={styles.bets}>{renderBets()}</View>
      </LinearGradient>
    );
  }
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="small" color="#00ff00" />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    height: "auto",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
    paddingVertical: 0,
    borderRadius: 15,
    opacity: 0.8,
  },
  columns: {
    width: "40%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  teamDiv: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  teamName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  gameTime: {
    fontSize: 17,
    backgroundColor: "transparent",
  },
  bottom: {
    backgroundColor: "transparent",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  bets: {
    backgroundColor: "transparent",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "column",
  },
  bet: {
    backgroundColor: "transparent",
    width: "100%",
    alignItems: "center",
    paddingBottom: 5,
  },
  gameScore: {
    fontSize: 27,
    textAlign: "center",
    marginBottom: 0,
  },
  innings: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 5,
    color: "white",
  },
});
