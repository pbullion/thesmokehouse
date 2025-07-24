import * as React from "react";
import { StyleSheet, ActivityIndicator, Image } from "react-native";
import { MyContext } from "../contexts/MyContext";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "./Themed";
import moment from "moment";
import getBackgroundColor from "../utils/getBackgroundColor";
import getNCAABetBackgroundColor from "../utils/getNCAABetBackgroundColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Slider } from "react-native-elements";

export default function MatchupCardNCAA({ game, betInfo, straightBet, parlay, gameId, winner, league, bet }) {
  const {
    todaysNBAGames,
    deviceType,
    todaysGames,
    todaysNFLGames,
    todaysXFLGames,
    todaysNHLGames,
    todaysNCAAFootballGames,
    todaysNCAABasketballGames,
    todaysNCAABaseballGames,
    todaysSoccerGames,
  } = React.useContext(MyContext);
  const [theGame, setTheGame] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [awayTeam, setAwayTeam] = React.useState();
  const [homeTeam, setHomeTeam] = React.useState();
  const allGames = {
    nba: todaysNBAGames,
    nhl: todaysNHLGames,
    mlb: todaysGames,
    nfl: todaysNFLGames,
    xfl: todaysXFLGames,
    ncaaFootball: todaysNCAAFootballGames,
    ncaaBasketball: todaysNCAABasketballGames,
    ncaaBaseball: todaysNCAABaseballGames,
    soccer: todaysSoccerGames,
  };

  React.useEffect(() => {
    if (parlay) {
      const theGame = allGames[league].find((x) => {
        return parseInt(x.id) === parseInt(gameId);
      });
      theGame.winner = winner;
      setTheGame(theGame);
      const awayTeam = theGame.competitions[0].competitors[1].team.location;
      const homeTeam = theGame.competitions[0].competitors[0].team.location;

      setAwayTeam(awayTeam);
      setHomeTeam(homeTeam);
      setLoading(false);
    } else if (
      (league === "ncaaFootball" ||
        league === "ncaaBasketball" ||
        league === "xfl" ||
        league === "ncaaBasetball" ||
        league === "nhl" ||
        league === "soccer") &&
      game
    ) {
      setTheGame(game);
      const awayTeam = game.competitions[0].competitors[1].team.location;
      const homeTeam = game.competitions[0].competitors[0].team.location;
      setAwayTeam(awayTeam);
      setHomeTeam(homeTeam);
      setLoading(false);
    }
  }, [game]);

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
        {theGame.competitions[0].odds[0].overUnder && <Text style={{ color: "white" }}>o/u {theGame.competitions[0].odds[0].overUnder}</Text>}
      </View>
    );

  const renderRightSide = () => {
    const plusSpread = (score, spread) => score + spread;
    const minusSpread = (score, spread) => score - spread;
    if (theGame.status.type.name === "STATUS_POSTPONED" || theGame.status.type.name === "STATUS_CANCELED") {
      return <Text style={{ color: "white" }}>PPND</Text>;
    } else if (
      theGame.status.type.name === "STATUS_IN_PROGRESS" ||
      theGame.status.type.name === "STATUS_FINAL" ||
      theGame.status.type.name === "STATUS_FULL_TIME" ||
      theGame.status.type.name === "STATUS_HALFTIME" ||
      theGame.status.type.name === "STATUS_END_PERIOD"
    ) {
      return (
        <View style={{ backgroundColor: "transparent" }}>
          <View
            style={{
              backgroundColor: "transparent",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}>
            {theGame.competitions[0].situation &&
              possession() === "away" &&
              league !== "soccer" &&
              league !== "nhl" &&
              league !== "ncaaBasetball" &&
              league !== "ncaaBasketball" &&
              renderRedzone()}
            {parlay && winner && bet.spread && theGame.competitions[0].competitors[1].team.abbreviation === winner && (
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
            <Text style={{ color: "white", ...styles.gameScore }}>{theGame.competitions[0].competitors[1].score}</Text>
          </View>
          <View
            style={{
              backgroundColor: "transparent",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}>
            {theGame.competitions[0].situation &&
              possession() === "home" &&
              league !== "soccer" &&
              league !== "nhl" &&
              league !== "ncaaBasketball" &&
              renderRedzone()}
            {parlay && winner && bet.spread && theGame.competitions[0].competitors[0].team.abbreviation === winner && (
              <Text
                style={{
                  color: "white",
                  ...styles.gameScore,
                  fontSize: 13,
                  marginLeft: 3,
                }}>
                {bet.spreadType === "plus"
                  ? plusSpread(parseInt(theGame.competitions[0].competitors[0].score), parseFloat(bet.spread))
                  : minusSpread(parseInt(theGame.competitions[0].competitors[0].score), parseFloat(bet.spread))}
              </Text>
            )}
            <Text style={{ color: "white", ...styles.gameScore }}>{theGame.competitions[0].competitors[0].score}</Text>
          </View>
        </View>
      );
    } else if (
      theGame.status.type.name === "STATUS_FIRST_HALF" ||
      theGame.status.type.name === "STATUS_FINAL" ||
      theGame.status.type.name === "STATUS_FULL_TIME" ||
      theGame.status.type.name === "STATUS_SECOND_HALF"
    ) {
      return (
        <View style={{ backgroundColor: "transparent" }}>
          <View
            style={{
              backgroundColor: "transparent",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}>
            <Text style={{ color: "white", ...styles.gameScore }}>{theGame.competitions[0].competitors[1].score}</Text>
          </View>
          <View
            style={{
              backgroundColor: "transparent",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}>
            <Text style={{ color: "white", ...styles.gameScore }}>{theGame.competitions[0].competitors[0].score}</Text>
          </View>
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
          <View style={{ backgroundColor: "transparent" }}>
            <Text style={{ textAlign: "center", color: "white" }}>
              {theGame.competitions[0].geoBroadcasts[0] && theGame.competitions[0].geoBroadcasts[0].media.shortName}
            </Text>
          </View>
        </View>
      );
    }
  };

  const downDistance = () => (theGame.competitions[0].situation ? theGame.competitions[0].situation.downDistanceText : null);

  const renderDetails = () => {
    return downDistance() && <Text style={{ color: "white" }}>{downDistance()}</Text>;
  };
  const renderRedzone = () => {
    const redZone = theGame.competitions[0].situation && theGame.competitions[0].situation.isRedZone ? true : false;
    return <MaterialCommunityIcons name="football" size={20} color={redZone ? "red" : "white"} />;
  };
  const renderTotalScore = () => {
    if (bet && bet.overUnder === "false") return null;
    if (
      ((betInfo && betInfo.overUnderBet) || (bet && bet.overUnder !== "undefined" && bet.overUnder)) &&
      theGame.status.type.name !== "STATUS_SCHEDULED"
    ) {
      const totalScore = parseInt(theGame.competitions[0].competitors[1].score) + parseInt(theGame.competitions[0].competitors[0].score);
      const theBet = parlay ? bet : betInfo;
      const { overUnderTotal, overUnderType, overUnder } = theBet;
      const left = overUnderType === "over" ? totalScore - overUnderTotal : overUnderTotal - totalScore;
      const parlayLeft = overUnderType === "over" ? totalScore - overUnder : overUnder - totalScore;
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
            {overUnderType === "Over" ? "Need" : "Left "}: {parlay ? parlayLeft : left}
          </Text>
        </View>
      );
    } else if (
      ((betInfo && betInfo.overUnderBet) || (bet && bet.overUnder !== "undefined" && bet.overUnder)) &&
      (theGame.status.type.name === "STATUS_IN_PROGRESS" ||
        theGame.status.type.name === "STATUS_HALFTIME" ||
        theGame.status.type.name === "STATUS_END_PERIOD" ||
        theGame.status.type.name === "STATUS_FIRST_HALF" ||
        theGame.status.type.name === "STATUS_SECOND_HALF")
    ) {
      const totalScore = theGame.competitions[0].competitors[1].score + theGame.competitions[0].competitors[0].score;
      const { overUnderTotal, overUnderType, overUnder } = betInfo;
      const left = overUnderType === "over" ? totalScore - overUnderTotal : overUnderTotal - totalScore;
      const parlayLeft = overUnderType === "over" ? totalScore - overUnder : overUnder - totalScore;
      return (
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            backgroundColor: "transparent",
            justifyContent: "space-around",
          }}>
          <Text style={{ color: "white", fontSize: 15 }}>Totalaaaa: {totalScore}</Text>
          <Text style={{ color: "white", fontSize: 15 }}>
            {overUnderType === "Over" ? "Need " : "Left "}:{parlay ? parlayLeft : left}
          </Text>
        </View>
      );
    } else {
      return null;
    }
  };
  const renderStatus = () => {
    if (theGame.status.type.name === "STATUS_FINAL" || theGame.status.type.name === "STATUS_FULL_TIME") {
      return <Text style={{ color: "white" }}>FINAL</Text>;
    } else if (
      theGame.status.type.name === "STATUS_IN_PROGRESS" ||
      theGame.status.type.name === "STATUS_HALFTIME" ||
      theGame.status.type.name === "STATUS_END_PERIOD" ||
      theGame.status.type.name === "STATUS_FIRST_HALF" ||
      theGame.status.type.name === "STATUS_SECOND_HALF"
    ) {
      return (
        <View style={{ backgroundColor: "transparent" }}>
          <Text style={{ color: "white" }}>{theGame.status.type.detail}</Text>
        </View>
      );
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
          text: `${betInfo.moneylineWinner} ML $${betInfo.moneylineBet} to win $${Math.round(betInfo.moneylineToWin)}`,
        });
      }
      if (betInfo.overUnderBet) {
        bets.push({
          type: "overUnder",
          bet: betInfo.overUnderBet,
          winnings: Math.round(betInfo.overUnderToWin),
          overUnder: betInfo.overUnderTotal,
          overUnderType: betInfo.overUnderType,
          text: `${betInfo.overUnderType} ${betInfo.overUnderTotal} $${betInfo.overUnderBet} to win $${Math.round(betInfo.overUnderToWin)}`,
        });
      }
      if (betInfo.spreadBet) {
        bets.push({
          type: "spread",
          bet: betInfo.spreadBet,
          winnings: Math.round(betInfo.spreadToWin),
          winner: betInfo.spreadWinner,
          spreadAmt: betInfo.spreadAmt,
          text: `${betInfo.spreadWinner} ${betInfo.spreadAmt} $${betInfo.spreadBet} to win $${Math.round(betInfo.spreadToWin)}`,
        });
      }
    }
    return bets.map((bet, idx) => {
      if (
        theGame.status.type.name === "STATUS_IN_PROGRESS" ||
        theGame.status.type.name === "STATUS_FIRST_HALF" ||
        theGame.status.type.name === "STATUS_SECOND_HALF" ||
        theGame.status.type.name === "STATUS_FINAL" ||
        theGame.status.type.name === "STATUS_FULL_TIME" ||
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
      return (
        <Text key={idx} style={{ color: "white", textAlign: "center" }}>
          {bet.text}
        </Text>
      );
    });
  };

  if (!loading && awayTeam && homeTeam && !straightBet && !parlay) {
    return (
      <LinearGradient colors={["#1a37ee", "#485cd5"]} start={[0.1, 0.4]} style={styles.container}>
        <View
          style={{
            backgroundColor: "transparent",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-around",
          }}>
          <View
            style={{
              backgroundColor: "transparent",
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <View style={{ backgroundColor: "transparent", ...styles.teamDiv }}>
              <Text
                style={{
                  color: "white",
                  ...styles.teamName,
                  fontSize: 13,
                  textAlign: "center",
                }}>
                {awayTeam}
              </Text>
              <Text
                style={{
                  color: "white",
                }}>
                v
              </Text>
              <View style={{ backgroundColor: "transparent", ...styles.teamDiv }}>
                <Text
                  style={{
                    color: "white",
                    ...styles.teamName,
                    fontSize: 13,
                    textAlign: "center",
                  }}>
                  {homeTeam}
                </Text>
              </View>
            </View>
          </View>
          {renderRightSide()}
        </View>
        <View
          style={{
            backgroundColor: "transparent",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 5,
          }}>
          {renderStatus()}
          {renderDetails()}
        </View>
        {renderOdds()}
      </LinearGradient>
    );
  } else if (!loading && theGame && straightBet) {
    return (
      <LinearGradient colors={["#1a37ee", "#485cd5"]} start={[0.1, 0.4]} style={styles.container}>
        <View
          style={{
            backgroundColor: "transparent",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-around",
          }}>
          <View
            style={{
              backgroundColor: "transparent",
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <View style={{ backgroundColor: "transparent", ...styles.teamDiv }}>
              <Text
                style={{
                  color: "white",
                  ...styles.teamName,
                  fontSize: 13,
                  textAlign: "center",
                }}>
                {awayTeam}
              </Text>
              <Text
                style={{
                  color: "white",
                }}>
                v
              </Text>
              <View style={{ backgroundColor: "transparent", ...styles.teamDiv }}>
                <Text
                  style={{
                    color: "white",
                    ...styles.teamName,
                    fontSize: 13,
                    textAlign: "center",
                  }}>
                  {homeTeam}
                </Text>
              </View>
            </View>
          </View>
          {renderRightSide()}
        </View>
        <View
          style={{
            backgroundColor: "transparent",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 5,
          }}>
          {renderStatus()}
          {downDistance() && (
            <Slider
              value={distanceState()}
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
                height: 30,
                width: 30,
                backgroundColor: "transparent",
              }}
              thumbProps={{
                children: <MaterialCommunityIcons name="football" size={30} color={"white"} />,
              }}
            />
          )}
          {renderTotalScore()}
          {renderDetails()}
          {renderOdds()}
          {renderBets()}
        </View>
      </LinearGradient>
    );
  } else if (!loading && theGame && parlay) {
    return (
      <LinearGradient
        colors={getBackgroundColor(theGame, awayTeam, homeTeam, straightBet, parlay, bet, winner, league)}
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
            justifyContent: "space-around",
          }}>
          <View
            style={{
              backgroundColor: "transparent",
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <View style={{ backgroundColor: "transparent", ...styles.teamDiv }}>
              <Text
                style={{
                  color: "white",
                  ...styles.teamName,
                  fontSize: 13,
                  textAlign: "center",
                }}>
                {awayTeam}
              </Text>
              <Text
                style={{
                  color: "white",
                }}>
                v
              </Text>
              <View style={{ backgroundColor: "transparent", ...styles.teamDiv }}>
                <Text
                  style={{
                    color: "white",
                    ...styles.teamName,
                    fontSize: 13,
                    textAlign: "center",
                  }}>
                  {homeTeam}
                </Text>
              </View>
            </View>
          </View>
          {renderRightSide()}
        </View>
        <View
          style={{
            backgroundColor: "transparent",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 5,
          }}>
          {renderStatus()}
          {downDistance() && (
            <Slider
              value={distanceState()}
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
                height: 30,
                width: 30,
                backgroundColor: "transparent",
              }}
              thumbProps={{
                children: <MaterialCommunityIcons name="football" size={30} color={"white"} />,
              }}
            />
          )}
          {renderTotalScore()}
          {renderDetails()}
        </View>
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
    paddingTop: 5,
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
