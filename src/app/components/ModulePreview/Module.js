import { Button, Card, CardActions, CardContent, CardHeader, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ErrorMessage from "../ErrorMessage";
import LoadingIndicator from "../LoadingIndicator";
import MonoText from "../MonoText";
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { API } from "app/services";
import { useErrorCatcher } from "app/utils";

const useStyles = makeStyles(theme => ({
  root: {
  },
  content: {
  },
  actions: {
    flexDirection: "column",
    alignItems: "flex-start",
    "& > * + *": {
      marginLeft: 0
    }
  },
  notice: {
    marginTop: theme.spacing(1)
  },
  italics_light: {
    opacity: 0.7,
    fontStyle: "italic",
  },
  spinner: {
    marginTop: theme.spacing(3),
  },
  mono: {
    fontFamily: ["Roboto Mono", "monospace"],
  },
}));

let mounted = false;
const ModulePreview = props => {
  const { moduleId, title = "Module", className, ...rest } = props;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const runAsyncBlock = useErrorCatcher(error => setErrorMessage(error && error.message));

  useEffect(() => {
    mounted = true;
    return () => mounted = false;
  }, [])

  useEffect(() => {
    runAsyncBlock(async () => {
      const { model } = await API.Module.detail(moduleId);
      if (mounted) setModel(model);
    }).finally(() => mounted && setLoading(false));

    return () => {
      if (mounted) setModel(null);
    };
    // eslint-disable-next-line
  }, [moduleId]);

  if (!moduleId) return null;

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title={`${title}`} />
      <Divider />
      <CardContent className={classes.content}>
        <ErrorMessage message={errorMessage} />
        <LoadingIndicator className={classes.spinner} variant="card" active={loading} />
        {model && (
          <Fragment>
            <Typography variant="h3">{model.title}</Typography>
            <Typography className={classes.mono} variant="body1" >
              <MonoText>{model.code}</MonoText></Typography>
          </Fragment>
        )}
      </CardContent>
      <CardActions className={classes.actions}>
        <Button component={RouterLink} size="small" to={`/modules/${moduleId}/summary`}>
          View {title} Details
        </Button>
      </CardActions>
    </Card>
  );
};

ModulePreview.propTypes = {
  className: PropTypes.string,
};

export default ModulePreview;
