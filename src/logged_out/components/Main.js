import React, { memo, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import AOS from "aos/dist/aos";
import withStyles from "@mui/styles/withStyles";
import "aos/dist/aos.css";
import Routing from "./Routing";
import smoothScrollTop from "../../shared/functions/smoothScrollTop";
import ConsecutiveSnackbarMessages from "../../shared/components/ConsecutiveSnackbarMessages";

AOS.init({ once: true });

const styles = (theme) => ({
  wrapper: {
    backgroundColor: theme.palette.common.white,
    overflowX: "hidden",
  },
});

function Main(props) {
  const { classes } = props;
  const [, setSelectedTab] = useState("Home");
  const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState(null);

  const selectHome = useCallback(() => {
    smoothScrollTop();
    document.title = "Mancave Displays";
    setSelectedTab("Home");
  }, [setSelectedTab]);

  const selectTheLinksAtTheSmokehouse = useCallback(() => {
    smoothScrollTop();
    document.title = "Mancave Displays";
    setSelectedTab("The Links At The Smokehouse");
  }, [setSelectedTab]);

  const selectGifDisplay = useCallback(() => {
    smoothScrollTop();
    document.title = "Mancave Displays";
    setSelectedTab("Gif Display");
  }, [setSelectedTab]);
  const selectSmokehouseStock = useCallback(() => {
    smoothScrollTop();
    document.title = "Mancave Displays";
    setSelectedTab("Smokehouse Stock");
  }, [setSelectedTab]);

  const getPushMessageFromChild = useCallback(
    (pushMessage) => {
      setPushMessageToSnackbar(() => pushMessage);
    },
    [setPushMessageToSnackbar]
  );

  return (
    <div className={classes.wrapper}>
      <ConsecutiveSnackbarMessages getPushMessageFromChild={getPushMessageFromChild} />
      <Routing
        selectHome={selectHome}
        selectGifDisplay={selectGifDisplay}
        selectSmokehouseStock={selectSmokehouseStock}
        selectTheLinksAtTheSmokehouse={selectTheLinksAtTheSmokehouse}
        pushMessageToSnackbar={pushMessageToSnackbar}
      />
    </div>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
