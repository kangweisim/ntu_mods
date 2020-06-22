import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles({
  root: {
    fontFamily: ["Roboto Mono", "monospace"],
  },
  prewrap: {
    whiteSpace: "pre-wrap",
  },
  uppercase: {
    textTransform: "uppercase"
  },
});

const MonoText = props => {
  const { className, children, uppercase, prewrap, component: Component, ...rest } = props;
  const classes = useStyles();
  const allClasses = [classes.root];

  if (prewrap)
    allClasses.push(classes.prewrap);
  if (uppercase)
    allClasses.push(classes.uppercase);
  return (
    <Component className={clsx(allClasses, className)} {...rest}>{children}</Component>
  );
};

MonoText.propTypes = {
  component: PropTypes.node,
  className: PropTypes.string,
};

MonoText.defaultProps = {
  component: "span",
  map: {},
};

export default MonoText;
