import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {},
}));

const Header = props => {
  const { className, header = " ", subheader = " ", subtitle = " ", children, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h2" gutterBottom variant="overline">
            {header}
          </Typography>
          <Typography component="h1" variant="h3">
            {subheader}
          </Typography>
          <Typography component="pre" variant="caption">
            {subtitle}
          </Typography>
        </Grid>
        {children && <Grid item>{children}</Grid>}
      </Grid>
    </div >
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
