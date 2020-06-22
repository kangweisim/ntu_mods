import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { makeStyles } from '@material-ui/styles';
import { ErrorMessage, Page } from 'app/components';
import { API } from 'app/services';
import { gradients, useErrorCatcher } from 'app/utils';
import queryString from "query-string";
import React, { useEffect, useState } from 'react';
import { ResetForm } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(6, 2)
  },
  card: {
    width: theme.breakpoints.values.md,
    maxWidth: '100%',
    overflow: 'unset',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%'
    }
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4)
  },
  media: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: theme.spacing(3),
    color: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  icon: {
    backgroundImage: gradients.blue,
    color: theme.palette.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: 'absolute',
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64,
    fontSize: 32
  },
  resetForm: {
    marginTop: theme.spacing(3)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  person: {
    marginTop: theme.spacing(2),
    display: 'flex'
  },
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

let mounted = false;

const Reset = (props) => {
  const classes = useStyles();
  const { location, history } = props;
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(null);
  const [result, setResult] = useState(null);
  const errorCatcher = useErrorCatcher(error => setErrorMessage(error && error.message));
  const { token } = queryString.parse(location.search);

  useEffect(() => {
    mounted = true;
    errorCatcher(async () => {
      const { model } = await API.Auth.password_query({ token });
      if (mounted) {
        setResult(model);
      }
    }).finally(() => mounted && setLoading(false));
    return () => { mounted = false };
  }, []); // eslint-disable-line

  if (!result && !loading) return (
    <Page className={classes.root} title="Reset" >
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <LockIcon className={classes.icon} />
          <Typography gutterBottom variant="h3" >
            Reset Password
          </Typography>
          <ErrorMessage message={errorMessage} />
        </CardContent>
      </Card>
    </Page>
  )
  return (
    <Page className={classes.root} title="Reset" >
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <LockIcon className={classes.icon} />
          <Typography gutterBottom variant="h3" >
            Reset Password
          </Typography>
          <Typography variant="subtitle2">
            Reset password for {result ? result.firstname || result.email : "User"}
          </Typography>
          <ResetForm className={classes.resetForm} token={token} history={history} />
        </CardContent>
        <CardMedia className={classes.media} image="/images/auth.png" title="Cover" >
          <Typography color="inherit" variant="subtitle1" >
            NTU MODS
          </Typography>
        </CardMedia>
      </Card>
    </Page>
  );
};

export default Reset;
