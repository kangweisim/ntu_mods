import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Statistic } from "app/components";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { ModuleInfo, ModulePrerequisites, ModulePrerequisitesFor } from "./components";

const useStyles = makeStyles(theme => ({
  root: {},
  card: {
    marginBottom: theme.spacing(3),
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

  let lecture_hours = model.topics.reduce((acc, val) => acc + val.lecture_hours, 0);
  let tutorial_hours = model.topics.reduce((acc, val) => acc + val.tutorial_hours, 0);

  return (
    <Grid {...rest} className={clsx(classes.root, className)} container spacing={3}>
      <Grid item lg={4} md={6} xl={3} xs={12}>
        <ModuleInfo className={classes.card} model={model} />
      </Grid>
      <Grid item lg={8} md={12} xl={6} xs={12} container spacing={2}>
        <Grid item style={{flex: 1}}>
          <Statistic title={lecture_hours} subtitle="LECTURE HOUR(S)" />
        </Grid>
        <Grid item style={{flex: 1}}>
          <Statistic title={tutorial_hours} subtitle="LECTURE HOUR(S)" />
        </Grid>
        <Grid item style={{flex: 1}}>
          <Statistic title={lecture_hours + tutorial_hours} subtitle="TOTAL HOURS" />
        </Grid>
        <Grid item style={{flex: 1}}>
          <Statistic title={model.au} subtitle="AU(S)" />
        </Grid>
        <Grid item style={{flex: 1}}>
          <Statistic title={1} subtitle="YEAR" />
        </Grid>

        <Grid item xl={12} lg={12} md={12} xs={12}>
          <ModulePrerequisites className={classes.card} model={model} />
          <ModulePrerequisitesFor className={classes.card} model={model} />
        </Grid>
      </Grid>
    </Grid>
  );
};

Summary.propTypes = {
  className: PropTypes.string,
};

export default Summary;
