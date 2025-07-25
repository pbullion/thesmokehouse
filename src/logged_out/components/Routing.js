import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/components/PropsRoute";
import Home from "./home/Home";
import GifDisplay from "./gifDisplay/GifDisplay";
import SmokehouseStock from "./SmokehouseStock";
import NewRound from "./NewRound";
import GolfLeaderboard from "./GolfLeaderboard";
import useLocationBlocker from "../../shared/functions/useLocationBlocker";
import ScoreCard from "./Scorecard";

function Routing(props) {
  const { selectHome, selectGifDisplay, selectTheLinksAtTheSmokehouse, selectSmokehouseStock } = props;
  useLocationBlocker();
  return (
    <Switch>
      <PropsRoute path="/gif-display-vertical" component={GifDisplay} selectGifDisplay={selectGifDisplay} vertical={true} />
      <PropsRoute
        path="/gif-display-horizontal"
        component={GifDisplay}
        selectGifDisplay={selectGifDisplay}
        vertical={false}
      />
      <PropsRoute path="/smokehouseStock" component={SmokehouseStock} selectSmokehouseStock={selectSmokehouseStock} />
      <PropsRoute
        path="/scorecard/:roundID"
        component={ScoreCard}
        selectTheLinksAtTheSmokehouse={selectTheLinksAtTheSmokehouse}
      />
      <PropsRoute
        path="/golf-leaderboard/"
        component={GolfLeaderboard}
        selectTheLinksAtTheSmokehouse={selectTheLinksAtTheSmokehouse}
      />
      <PropsRoute path="/new-round" component={NewRound} selectTheLinksAtTheSmokehouse={selectTheLinksAtTheSmokehouse} />
      <PropsRoute path="/" component={Home} selectHome={selectHome} />
    </Switch>
  );
}

Routing.propTypes = {
  selectHome: PropTypes.func.isRequired,
};

export default memo(Routing);
