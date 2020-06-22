import { makeStyles } from '@material-ui/styles';
import { API } from "app/services";
import { ModelsActions } from "app/store/actions";
import { useErrorCatcher } from "app/utils";
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingIndicator from '../LoadingIndicator';
import { EntityRoles } from './components';
import ErrorMessage from '../ErrorMessage';

const useStyles = makeStyles(theme => ({
  root: {},
  card: {
    marginBottom: theme.spacing(3),
  }
}));

let mounted = false;


const EntityInfo = props => {
  const { type, onUpdate } = props;

  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const model = useSelector(state => state.models[type].entity);
  const [errorMessage, setErrorMessage] = useState(null);
  const runAsyncBlock = useErrorCatcher(error => setErrorMessage(error && error.message));
  const dispatch = useDispatch();

  useEffect(() => {
    mounted = true;

    setLoading(true);
    runAsyncBlock(async () => {
      const roles = await API.Entity.all_roles();
      // const projects = await API.Entity.all_projects();
      if (mounted) {
        dispatch(ModelsActions.update_model({
          roles: roles.models,
          // projects: projects.models
        }));
      }
    }).finally(() => setLoading(false));

    return () => { mounted = false; };
    // eslint-disable-next-line
  }, []);

  // if (!model) return <EntityCreate type={type} onCreate={() => { }} />
  if (!model) return null;

  return (
    <Fragment>
      <ErrorMessage message={errorMessage} />
      <EntityRoles type={type} onUpdate={onUpdate} className={classes.card} />
      {/* <EntityProjects type={type} className={classes.card} /> */}
      <LoadingIndicator active={loading} variant="card" />
    </Fragment>
  )
}

export default EntityInfo;