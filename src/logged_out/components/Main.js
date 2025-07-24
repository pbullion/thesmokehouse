import React, { memo, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import AOS from "aos/dist/aos";
import withStyles from "@mui/styles/withStyles";
import NavBar from "./navigation/NavBar";
import Footer from "./footer/Footer";
import "aos/dist/aos.css";
import CookieRulesDialog from "./cookies/CookieRulesDialog";
import CookieConsent from "./cookies/CookieConsent";
import dummyBlogPosts from "../dummy_data/blogPosts";
import DialogSelector from "./register_login/DialogSelector";
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
  const [selectedTab, setSelectedTab] = useState("Home");
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(null);
  const [isCookieRulesDialogOpen, setIsCookieRulesDialogOpen] = useState(false);
  const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState(null);

  const selectHome = useCallback(() => {
    smoothScrollTop();
    document.title = "Mancave Displays";
    setSelectedTab("Home");
  }, [setSelectedTab]);

  const selectWifiInstructions = useCallback(() => {
    smoothScrollTop();
    document.title = "Mancave Displays";
    setSelectedTab("Wifi Instructions");
  }, [setSelectedTab]);
  const selectMaddieAndJohnWedding = useCallback(() => {
    smoothScrollTop();
    document.title = "Mancave Displays";
    setSelectedTab("Maddie and John Wedding");
  }, [setSelectedTab]);
  const selectThomasFirstBirthday = useCallback(() => {
    smoothScrollTop();
    document.title = "Mancave Displays";
    setSelectedTab("Thomas First Birthday");
  }, [setSelectedTab]);
  const selectTheLinksAtTheSmokehouse = useCallback(() => {
    smoothScrollTop();
    document.title = "Mancave Displays";
    setSelectedTab("The Links At The Smokehouse");
  }, [setSelectedTab]);

  const selectTeslaDashboard = useCallback(() => {
    smoothScrollTop();
    document.title = "Mancave Displays";
    setSelectedTab("Tesla Dashboard");
  }, [setSelectedTab]);

  const selectWifiInstructionsOnboarding = useCallback(() => {
    smoothScrollTop();
    document.title = "Mancave Displays";
    setSelectedTab("Wifi Instructions");
  }, [setSelectedTab]);

  const selectGifDisplay = useCallback(() => {
    smoothScrollTop();
    document.title = "Mancave Displays";
    setSelectedTab("Gif Display");
  }, [setSelectedTab]);
  const selectGamesScreen = useCallback(() => {
    smoothScrollTop();
    document.title = "Mancave Displays";
    setSelectedTab("Game Screen");
  }, [setSelectedTab]);

  const selectBetfolio = useCallback(() => {
    smoothScrollTop();
    document.title = "Mancave Displays";
    setSelectedTab("Betfolio");
  }, [setSelectedTab]);
  const selectGolfTeeTimeFinder = useCallback(() => {
    smoothScrollTop();
    document.title = "Mancave Displays";
    setSelectedTab("GolfTeeTimeFinder");
  }, [setSelectedTab]);

  const selectTDMPFFL = useCallback(() => {
    smoothScrollTop();
    document.title = "Mancave Displays";
    setSelectedTab("TDMPFFL");
  }, [setSelectedTab]);

  const selectCandlelightersAdmin = useCallback(() => {
    smoothScrollTop();
    document.title = "Candlelighters Admin";
    setSelectedTab("CandlelightersAdmin");
  }, [setSelectedTab]);

  const selectCandlelighters = useCallback(() => {
    smoothScrollTop();
    document.title = "Candlelighters";
    setSelectedTab("Candlelighters");
  }, [setSelectedTab]);

  const selectTracking = useCallback(() => {
    smoothScrollTop();
    document.title = "Mancave Displays";
    setSelectedTab("Tracking");
  }, [setSelectedTab]);

  const selectSmokehouseStock = useCallback(() => {
    smoothScrollTop();
    document.title = "Mancave Displays";
    setSelectedTab("Smokehouse Stock");
  }, [setSelectedTab]);

  const selectOddsDisplay = useCallback(() => {
    smoothScrollTop();
    document.title = "Mancave Displays";
    setSelectedTab("Odds Display");
  }, [setSelectedTab]);

  const selectBlog = useCallback(() => {
    smoothScrollTop();
    document.title = "Mancave Displays";
    setSelectedTab("Blog");
  }, [setSelectedTab]);

  const openLoginDialog = useCallback(() => {
    setDialogOpen("login");
    setIsMobileDrawerOpen(false);
  }, [setDialogOpen, setIsMobileDrawerOpen]);

  const closeDialog = useCallback(() => {
    setDialogOpen(null);
  }, [setDialogOpen]);

  const openRegisterDialog = useCallback(() => {
    setDialogOpen("register");
    setIsMobileDrawerOpen(false);
  }, [setDialogOpen, setIsMobileDrawerOpen]);

  const openTermsDialog = useCallback(() => {
    setDialogOpen("termsOfService");
  }, [setDialogOpen]);

  const handleMobileDrawerOpen = useCallback(() => {
    setIsMobileDrawerOpen(true);
  }, [setIsMobileDrawerOpen]);

  const handleMobileDrawerClose = useCallback(() => {
    setIsMobileDrawerOpen(false);
  }, [setIsMobileDrawerOpen]);

  const openChangePasswordDialog = useCallback(() => {
    setDialogOpen("changePassword");
  }, [setDialogOpen]);

  const fetchBlogPosts = useCallback(() => {
    const blogPosts = dummyBlogPosts.map((blogPost) => {
      let title = blogPost.title;
      title = title.toLowerCase();
      title = title.replace(/[^A-Za-z0-9 ]/g, "");
      title = title.replace(/\s{2,}/g, " ");
      title = title.replace(/\s/g, "-");
      blogPost.url = `/blog/post/${title}`;
      blogPost.params = `?id=${blogPost.id}`;
      return blogPost;
    });
    setBlogPosts(blogPosts);
  }, [setBlogPosts]);

  const handleCookieRulesDialogOpen = useCallback(() => {
    setIsCookieRulesDialogOpen(true);
  }, [setIsCookieRulesDialogOpen]);

  const handleCookieRulesDialogClose = useCallback(() => {
    setIsCookieRulesDialogOpen(false);
  }, [setIsCookieRulesDialogOpen]);

  useEffect(fetchBlogPosts, [fetchBlogPosts]);

  const getPushMessageFromChild = useCallback(
    (pushMessage) => {
      setPushMessageToSnackbar(() => pushMessage);
    },
    [setPushMessageToSnackbar]
  );

  return (
    <div className={classes.wrapper}>
      {!isCookieRulesDialogOpen && <CookieConsent handleCookieRulesDialogOpen={handleCookieRulesDialogOpen} />}
      <ConsecutiveSnackbarMessages getPushMessageFromChild={getPushMessageFromChild} />
      <DialogSelector
        openLoginDialog={openLoginDialog}
        dialogOpen={dialogOpen}
        onClose={closeDialog}
        openTermsDialog={openTermsDialog}
        openRegisterDialog={openRegisterDialog}
        openChangePasswordDialog={openChangePasswordDialog}
      />
      <CookieRulesDialog open={isCookieRulesDialogOpen} onClose={handleCookieRulesDialogClose} />
      {!selectedTab.includes("TDMPFFL") &&
        !selectedTab.includes("Candlelighters") &&
        !selectedTab.includes("Smokehouse Stock") &&
        !selectedTab.includes("The Links At The Smokehouse") &&
        !selectedTab.includes("Thomas First Birthday") &&
        !selectedTab.includes("Maddie and John Wedding") &&
        !selectedTab.includes("Tesla Dashboard") &&
        !selectedTab.includes("Gif") &&
        !selectedTab.includes("Game") &&
        !selectedTab.includes("Odds") &&
        !selectedTab.includes("Tracking") && (
          <NavBar
            selectedTab={selectedTab}
            selectTab={setSelectedTab}
            openLoginDialog={openLoginDialog}
            openRegisterDialog={openRegisterDialog}
            mobileDrawerOpen={isMobileDrawerOpen}
            handleMobileDrawerOpen={handleMobileDrawerOpen}
            handleMobileDrawerClose={handleMobileDrawerClose}
          />
        )}
      <Routing
        blogPosts={blogPosts}
        selectHome={selectHome}
        selectWifiInstructions={selectWifiInstructions}
        selectWifiInstructionsOnboarding={selectWifiInstructionsOnboarding}
        selectBlog={selectBlog}
        selectMaddieAndJohnWedding={selectMaddieAndJohnWedding}
        selectGifDisplay={selectGifDisplay}
        selectTDMPFFL={selectTDMPFFL}
        selectSmokehouseStock={selectSmokehouseStock}
        selectTeslaDashboard={selectTeslaDashboard}
        selectThomasFirstBirthday={selectThomasFirstBirthday}
        selectTheLinksAtTheSmokehouse={selectTheLinksAtTheSmokehouse}
        selectCandlelighters={selectCandlelighters}
        selectCandlelightersAdmin={selectCandlelightersAdmin}
        selectBetfolio={selectBetfolio}
        selectOddsDisplay={selectOddsDisplay}
        selectGamesScreen={selectGamesScreen}
        selectGolfTeeTimeFinder={selectGolfTeeTimeFinder}
        selectTracking={selectTracking}
        pushMessageToSnackbar={pushMessageToSnackbar}
      />
      {!selectedTab.includes("TDMPFFL") &&
        !selectedTab.includes("Smokehouse Stock") &&
        !selectedTab.includes("Betfolio") &&
        !selectedTab.includes("CandlelightersAdmin") &&
        !selectedTab.includes("Tesla Dashboard") &&
        !selectedTab.includes("The Links At The Smokehouse") &&
        !selectedTab.includes("Thomas First Birthday") &&
        !selectedTab.includes("Maddie and John Wedding") &&
        !selectedTab.includes("Candlelighters") &&
        !selectedTab.includes("Gif") &&
        !selectedTab.includes("Game") &&
        !selectedTab.includes("Odds") &&
        !selectedTab.includes("Tracking") && <Footer pushMessageToSnackbar={pushMessageToSnackbar} />}
    </div>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
