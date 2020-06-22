import { LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'app/utils';
import PropTypes from 'prop-types';
import React, { Fragment, Suspense, useEffect } from 'react';
import { useSelector } from "react-redux";
import { renderRoutes } from 'react-router-config';
import { Topbar } from './components';
import { RenderGuard } from 'app/components';

const useStyles = makeStyles(theme => ({
  content: {
    height: '100%',
    paddingTop: 56,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  }
}));

const Auth = props => {
  const { route } = props;
  const classes = useStyles();
  const router = useRouter();

  const profile = useSelector(state => state.profile);
  useEffect(() => {
    if (profile.entity)
      router.history.push('/overview');
    // eslint-disable-next-line
  }, [profile.entity]);

  return (
    <Fragment>
      <Topbar />
      <main className={classes.content}>
        <RenderGuard renderIf={!profile.loading}>
          <Suspense fallback={<LinearProgress />}>
            {renderRoutes(route.routes)}
          </Suspense>
        </RenderGuard>
      </main>
    </Fragment>
  );
};

Auth.propTypes = {
  route: PropTypes.object
};

export default Auth;
