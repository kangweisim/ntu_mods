import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

const useStyles = makeStyles(theme => ({
  root: {},
  actions: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& > * + *': {
      marginLeft: 0
    }
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  },
  header: {
    fontWeight: 600
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

/* eslint-disable-next-line no-unused-vars */
let mounted = false;
const ModuleInfo = props => {
  const { className, loading, model, ...rest } = props;

  const classes = useStyles();

  useEffect(() => {
    mounted = true;
    return () => mounted = false;
  }, []);


  if (!model) return null;

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <Typography variant="h5" component="h2" paragraph>
          {model.name}
        </Typography>
        <Typography variant="body2">
          {model.description}
        </Typography>
      </CardContent>
    </Card >
  );
};

ModuleInfo.propTypes = {
  className: PropTypes.string,
};

export default ModuleInfo;
