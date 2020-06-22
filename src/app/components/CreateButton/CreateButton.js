import { Button, makeStyles } from "@material-ui/core";
import PlusIcon from '@material-ui/icons/AddOutlined';
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  },
}));

const CreateButton = props => {
  const { className, color, size, component, children, ...rest } = props;
  const classes = useStyles();

  return (
    <Button
      className={clsx(classes.root, className)}
      variant="contained"
      {...{ size, color, component }}
      {...rest} >
      <PlusIcon className={classes.buttonIcon} />
      {children || "New"}
    </Button>
  );
};

CreateButton.propTypes = {
};

CreateButton.defaultProps = {
  color: "primary",
  size: "small",
};

export default CreateButton;
