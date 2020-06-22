import { Button, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
  },
}));

const ViewButton = props => {
  const { className, color, size, path, component, children, ...rest } = props;
  const classes = useStyles();

  return (
    <Button
      className={clsx(classes.root, className)}
      to={path}
      variant="outlined"
      {...{ size, color, component }}
      {...rest} >
      {children || "View"}
    </Button>
  );
};

ViewButton.propTypes = {
};

ViewButton.defaultProps = {
  color: "primary",
  size: "small",
  component: RouterLink,
};

export default ViewButton;
