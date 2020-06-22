import { Box, Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import RenderGuard from "../RenderGuard";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
  },
}));

const ErrorMessage = props => {
  const { message, map = {}, variant = "message", textProps = {}, ...rest } = props;
  const classes = useStyles();

  let text = map[message] || message;
  if (text === "validation error")
    text = "Validation Error: Please check your input."

  let content = null;
  switch (variant) {
    case "card":
      content = (
        <Card {...rest}>
          <CardContent>
            <Typography variant="body2" color="error" {...textProps}>
              {text}
            </Typography>
          </CardContent>
        </Card>
      );
      break;
    case "message":
      content = (
        <Box component="div" display="block" {...rest} className={clsx(classes.root, rest.className)}>
          <Typography variant="body2" color="error" {...textProps}>
            {text}
          </Typography>
        </Box>
      )
      break;
    default:
      content = (
        <Typography variant="body2" color="error" {...rest} {...textProps}>
          {text}
        </Typography>
      );
  }

  return (
    <RenderGuard renderIf={!!message}>{content}</RenderGuard>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  map: PropTypes.object,
  className: PropTypes.any,
};

export default ErrorMessage;