import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/components/PropsRoute";
import Home from "./home/Home";
import TickerSettings from "./tickerSettings/TickerSettings";
import WiFiInstructions from "./tickerSettings/WiFi";
import WiFiInstructionsOnboarding from "./tickerSettings/WiFiOnboarding";
import GifDisplay from "./gifDisplay/GifDisplay";
import GameScreen from "./gameScreen";
import TeslaDashboard from "./TeslaDashboard";
import OddsScreen from "./oddsScreen/OddsScreen";
import Tracking from "./oddsScreen/Tracking";
import OddsScreenStore from "./oddsScreen/OddsScreenStore";
import TDMPFFL from "./TDMPFFL";
import Candlelighters from "./Candlelighters";
import CandlelightersAdmin from "./Candlelighters/Admin";
import Betfolio from "./Betfolio";
import ThomasFirstBirthday from "./ThomasFirstBirthday";
import MaddieAndJohnWedding from "./MaddieAndJohnWedding";
import MaddieAndJohnPics from "./MaddieAndJohnPics";
import SmokehouseStock from "./SmokehouseStock";
import TheLinksAtTheSmokehouse from "./TheLinksAtTheSmokehouse";
import GolfTeeTimeFinder from "./GolfTeeTimeFinder";
import Blog from "./blog/Blog";
import BlogPost from "./blog/BlogPost";
import useLocationBlocker from "../../shared/functions/useLocationBlocker";

function Routing(props) {
  const {
    selectTDMPFFL,
    blogPosts,
    selectBlog,
    selectHome,
    selectGifDisplay,
    pushMessageToSnackbar,
    selectWifiInstructions,
    selectTracking,
    selectOddsDisplay,
    selectGamesScreen,
    selectBetfolio,
    selectCandlelighters,
    selectCandlelightersAdmin,
    selectThomasFirstBirthday,
    selectTheLinksAtTheSmokehouse,
    selectGolfTeeTimeFinder,
    selectWifiInstructionsOnboarding,
    selectTeslaDashboard,
    selectMaddieAndJohnWedding,
    selectSmokehouseStock,
  } = props;
  useLocationBlocker();
  return (
    <Switch>
      {blogPosts.map((post) => (
        <PropsRoute
          path={post.url}
          component={BlogPost}
          title={post.title}
          key={post.title}
          src={post.src}
          date={post.date}
          content={post.content}
          otherArticles={blogPosts.filter((blogPost) => blogPost.id !== post.id)}
        />
      ))}
      <PropsRoute path="/gif-display-vertical" component={GifDisplay} selectGifDisplay={selectGifDisplay} vertical={true} />
      <PropsRoute
        path="/gif-display-horizontal"
        component={GifDisplay}
        selectGifDisplay={selectGifDisplay}
        vertical={false}
      />
      <PropsRoute path="/smokehouseStock" component={SmokehouseStock} selectSmokehouseStock={selectSmokehouseStock} />
      <PropsRoute
        path="/the-links-at-the-smokehouse/:type/:roundID"
        component={TheLinksAtTheSmokehouse}
        selectTheLinksAtTheSmokehouse={selectTheLinksAtTheSmokehouse}
      />
      <PropsRoute
        path="/the-links-at-the-smokehouse/:type/"
        component={TheLinksAtTheSmokehouse}
        selectTheLinksAtTheSmokehouse={selectTheLinksAtTheSmokehouse}
      />
      <PropsRoute
        path="/the-links-at-the-smokehouse"
        component={TheLinksAtTheSmokehouse}
        selectTheLinksAtTheSmokehouse={selectTheLinksAtTheSmokehouse}
      />
      <PropsRoute
        path="/"
        component={TheLinksAtTheSmokehouse}
        selectTheLinksAtTheSmokehouse={selectTheLinksAtTheSmokehouse}
      />
    </Switch>
  );
}

Routing.propTypes = {
  blogposts: PropTypes.arrayOf(PropTypes.object),
  selectHome: PropTypes.func.isRequired,
  selectBlog: PropTypes.func.isRequired,
};

export default memo(Routing);
