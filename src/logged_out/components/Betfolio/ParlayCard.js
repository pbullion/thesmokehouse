import * as React from "react";
import { MyContext } from "../contexts/MyContext";
import MatchupCard from "./MatchupCard";
import MatchupCardNCAA from "./MatchupCardNCAA";
import moment from "moment";

export default function ParlayCard({ parlay }) {
  const [games, setGames] = React.useState([]);
  const {
    deviceType,
    todaysNBAGames,
    todaysGames,
    todaysNFLGames,
    todaysXFLGames,
    removeForAppStore,
    todaysNCAAFootballGames,
    todaysNCAABaseballGames,
    todaysNCAABasketballGames,
  } = React.useContext(MyContext);
  const allGames = {
    nba: todaysNBAGames,
    mlb: todaysGames,
    nfl: todaysNFLGames,
    xfl: todaysXFLGames,
    ncaab: todaysNCAABasketballGames,
    ncaaf: todaysNCAAFootballGames,
    ncaabaseball: todaysNCAABaseballGames,
  };
  React.useEffect(() => {
    const games = Object.values(parlay).filter((item) => {
      if (item && item.toString().includes("game")) {
        return item;
      }
    });
    setGames(games);
  }, [parlay]);

  const getLeague = (league) => {
    if (league === "ncaaf") {
      return "ncaaFootball";
    } else if (league === "ncaab") {
      return "ncaaBasketball";
    } else if (league === "ncaabaseball") {
      return "ncaaBaseball";
    } else if (league === "soccer") {
      return "soccer";
    } else if (league === "xfl") {
      return "xfl";
    } else if (league === "nhl") {
      return "nhl";
    }
  };
  if (games) {
    return (
      <div
        style={{
          backgroundColor: "#1a37ee",
          flex: 1,
          display: "flex",
          width: "97%",
          alignItems: "center",
          justifyContent: "space-around",
          height: "auto",
          borderRadius: 15,
          paddingVertical: 5,
          marginVertical: 5,
          opacity: 0.8,
          flexDirection: "row",
        }}>
        <div
          style={{
            backgroundColor: "transparent",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            margin: 10,
          }}>
          <div style={{ backgroundColor: "transparent" }}>
            <p style={{ fontSize: 20, color: "white" }}>{parlay.bet ? `Risk $${parlay.bet} to win $${parlay.toWin}` : `PRESS TO ADD YOUR BET`}</p>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
              justifyContent: "space-around",
              backgroundColor: "transparent",
            }}>
            {games
              .sort((a, b) => {
                const [type, gameId, winner, league, spread, spreadType, overUnder, overUnderType, overUnderTeams] = a.split("-");
                const [type2, gameId2, winner2, league2, spread2, spreadType2, overUnder2, overUnderType2, overUnderTeams2] = b.split("-");
                if (league === "nhl" || league2 === "nhl") return;
                const aGame = allGames[league].find((x) => {
                  return parseInt(x.id) === parseInt(gameId);
                });
                const bGame = allGames[league2].find((x) => {
                  return parseInt(x.id) === parseInt(gameId2);
                });
                return moment(aGame.date).format("X") - moment(bGame.date).format("X");
              })
              .map((game, idx) => {
                const [type, gameId, winner, league, spread, spreadType, overUnder, overUnderType, overUnderTeams] = game.split("-");
                const bet = {
                  spread,
                  spreadType,
                  overUnder,
                  overUnderTeams,
                  overUnderType,
                };
                return (
                  <div
                    style={
                      deviceType === 2
                        ? { width: "16%", backgroundColor: "transparent", marginVertical: 5 }
                        : {
                            width: "48%",
                            backgroundColor: "transparent",
                            marginVertical: 5,
                          }
                    }
                    key={idx}>
                    {league === "nba" && <MatchupCard gameId={gameId} winner={winner} parlay={true} bet={bet} league="nba" />}
                    {league === "mlb" && <MatchupCard gameId={gameId} winner={winner} bet={bet} parlay={true} league="mlb" />}
                    {league === "nfl" && <MatchupCard gameId={gameId} winner={winner} bet={bet} parlay={true} league="nfl" />}
                    {league === "ncaabaseball" && <MatchupCard gameId={gameId} winner={winner} bet={bet} parlay={true} league="ncaabaseball" />}
                    {(league === "ncaaf" || league === "xfl" || league === "ncaab" || league === "nhl" || league === "soccer") && (
                      <MatchupCardNCAA gameId={gameId} winner={winner} bet={bet} parlay={true} league={getLeague(league)} />
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        width: "97%",
        alignItems: "center",
        justifyContent: "space-around",
        height: "auto",
        borderRadius: 15,
        paddingVertical: 5,
        marginVertical: 5,
        opacity: 0.8,
        flexDirection: "row",
      }}>
      <p>Loading</p>
    </div>
  );
}
