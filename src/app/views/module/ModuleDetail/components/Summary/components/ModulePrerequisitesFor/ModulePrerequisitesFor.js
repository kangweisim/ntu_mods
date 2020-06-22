import { Button, Card, CardContent, CardHeader, Divider, Link, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { MonoText, ErrorMessage, LoadingIndicator } from "app/components";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link as RouterLink } from "react-router-dom";
import { useErrorCatcher } from "app/utils";
import { API } from "app/services";
import { useSelector, useDispatch } from "react-redux";
import { FilterActions } from "app/store/actions";


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
  content: {
    padding: 0
  },
  pos: {
    marginBottom: 12,
  },
  inner: {
    minWidth: 700
  },
  spinner: {
    marginTop: theme.spacing(3),
  },
}));

/* eslint-disable-next-line no-unused-vars */
let mounted = false;
const ModulePrerequisites = props => {
  const { className, model, pathPrefix, ...rest } = props;

  const classes = useStyles();
  const errorCatcher = useErrorCatcher(error => setErrorMessage(error && error.message));
  const [errorMessage, setErrorMessage] = useState(null);
  const [models, setModels] = useState([]);
  const filter = useSelector(state => state.filters.prerequisite)
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    mounted = true;

    reload();

    return () => mounted = false;
  }, []); // eslint-disable-line

  const reload = () => {
    errorCatcher(async () => {
      const { models, meta } = await API.Prerequisite.list({ query: { ...filter, required_id: model.id } });
      dispatch(FilterActions.update_filters({ prerequisite: { ...filter, ...meta } }));
      if (mounted)
        setModels(models);
    }).finally(() => mounted && setLoading(false));
  }

  if (!model || !models.length) return null;

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Required For" />
      <LoadingIndicator className={classes.spinner} variant="card" active={loading} />
      <Divider />
      <CardContent className={classes.content}>
        <ErrorMessage message={errorMessage} />
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>Email Address</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {models.map(({ module: model }, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Link color="inherit" component={RouterLink} to={`${pathPrefix}/${model.id}/summary`} variant="h6">
                        <MonoText>{model.code}</MonoText>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{model.title}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{model.year}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        color="primary"
                        component={RouterLink}
                        size="small"
                        to={`${pathPrefix}/${model.id}/summary`}
                        variant="outlined">
                        View
                </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card >
  );
};

ModulePrerequisites.propTypes = {
  className: PropTypes.string,
};

ModulePrerequisites.defaultProps = {
  pathPrefix: "/modules",
};

export default ModulePrerequisites;
