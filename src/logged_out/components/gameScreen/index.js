import React, { useEffect, useState } from "react";
import Basketball from "./Basketball";
import BasketballFirestick from "./BasketballFirestick";

function GameScreen(props) {
  const { selectGamesScreen, game } = props;
  const [isFireTV, setIsFireTV] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("AFT")) {
      setIsFireTV(true);
    }
  }, []);
  useEffect(() => {
    selectGamesScreen();
  }, [selectGamesScreen]);

  return isFireTV ? (
    <BasketballFirestick game={props.location.state.game} />
  ) : (
    <Basketball game={props.location.state.game} />
  );
}
export default GameScreen;
