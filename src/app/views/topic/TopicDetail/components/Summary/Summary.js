import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { TopicInfo } from "./components";
import { Statistic, ModulePreview } from "app/components";

const useStyles = makeStyles(theme => ({
  root: {},
  card: {
  }
}));

/* eslint-disable-next-line no-unused-vars */
let mounted = false;
const Summary = props => {
  const { handleDelete, onUpdate, className, loading, model, ...rest } = props;

  const classes = useStyles();

  useEffect(() => {
    mounted = true;
    return () => mounted = false;
  }, []);

  if (!model) return null;

  return (
    <Grid {...rest} className={clsx(classes.root, className)} container spacing={3}>
      <Grid item lg={6} md={6} xl={6} xs={12}>
        <TopicInfo className={classes.card} model={model} />
      </Grid>
      <Grid item lg={6} md={12} xl={6} xs={12} container spacing={3}>
        <Grid item xl={12} lg={12} md={12} xs={12}>
          <ModulePreview moduleId={model.module_id} />
        </Grid>
        <Grid item xl={6} lg={6} md={6} xs={6}>
          <Statistic title={model.lecture_hours} subtitle="LECTURE HOUR(S)" />
        </Grid>
        <Grid item xl={6} lg={6} md={6} xs={6}>
          <Statistic title={model.tutorial_hours} subtitle="TUTORIAL HOUR(S)" />
        </Grid>
      </Grid>
    </Grid>
  );
};

Summary.propTypes = {
  className: PropTypes.string,
};

export default Summary;
