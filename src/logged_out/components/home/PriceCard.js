import React from "react";
import PropTypes from "prop-types";
import { Typography, Box } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import CheckIcon from "@mui/icons-material/Check";
import ColoredButton from "../../../shared/components/ColoredButton";

const styles = (theme) => ({
  card: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    marginTop: theme.spacing(2),
    border: `3px solid ${theme.palette.primary.dark}`,
    borderRadius: theme.shape.borderRadius * 2,
  },
  cardHightlighted: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    border: `3px solid ${theme.palette.primary.dark}`,
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
  },
  title: {
    color: theme.palette.primary.main,
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400,
  },
});

function PriceCard(props) {
  const { classes, theme, title, pricing, features, highlighted, btnLink } = props;
  return (
    <div className={highlighted ? classes.cardHightlighted : classes.card}>
      <Box mb={2}>
        <Typography
          variant={highlighted ? "h4" : "h5"}
          className={(classes.title, highlighted ? "text-white" : classes.title)}
          style={{ fontFamily: "'Baloo Bhaijaan', cursive" }}>
          {title}
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography variant={highlighted ? "h3" : "h4"} className={highlighted ? "text-white" : null}>
          {pricing}
        </Typography>
      </Box>
      {features.map((feature, index) => (
        <Box display="flex" alignItems="center" mb={1} key={index}>
          <CheckIcon
            style={{
              color: highlighted ? theme.palette.common.white : theme.palette.primary.dark,
            }}
          />
          <Box ml={1}>
            <Typography className={highlighted ? "text-white" : null} variant={highlighted ? "h6" : "body1"}>
              {feature}
            </Typography>
          </Box>
        </Box>
      ))}
      <ColoredButton variant={"contained"} disableElevation href={btnLink} target="_blank" color={theme.palette.secondary.main}>
        Purchase
      </ColoredButton>
    </div>
  );
}

PriceCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  pricing: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  highlighted: PropTypes.bool,
};

export default withStyles(styles, { withTheme: true })(PriceCard);
