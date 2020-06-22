import { CardContent, makeStyles, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import RenderGuard from "../RenderGuard";

const useStyle = makeStyles(theme => ({
  root: {
  },
  mono: {
    fontFamily: "Roboto Mono",
  },
  not_found_emoji: {
    fontWeight: 300,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
}));

const EmptyState = props => {
  const { active, emoji, message, ...rest } = props;
  const classes = useStyle();
  return (
    <RenderGuard renderIf={active} {...rest}>
      <CardContent>
        <Typography align="center" variant="h2" className={classes.not_found_emoji}>{emoji}</Typography>
        <Typography align="center" className={classes.mono}>{message}</Typography>
      </CardContent>
    </RenderGuard>
  );
};

EmptyState.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.any,
};

EmptyState.defaultProps = {
  emoji: "¯\\_(ツ)_/¯",
  message: "No records found in your query.",
}

export default EmptyState;