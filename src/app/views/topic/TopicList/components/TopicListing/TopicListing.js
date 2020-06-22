import { Button, Link, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Listing } from "app/components";
import { API } from "app/services";
import { FilterActions } from "app/store/actions";
import { constants, useErrorCatcher } from "app/utils";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2)
  },
  card: {
    marginBottom: theme.spacing(3),
  }
}));

const ALLOWED_FILTERS = [...Object.keys(constants.INIT_MODULES_FILTER)];

let mounted = false;
const TopicListing = props => {
  const { className, pathPrefix, ...rest } = props;

  const classes = useStyles();

  const filter = useSelector(state => state.filters.topics)

  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const errorCatcher = useErrorCatcher(error => setErrorMessage(error && error.message));
  const dispatch = useDispatch();
  const listenFilters = Object.keys(filter).filter(key => key !== "count").map(key => filter[key]);

  useEffect(() => {
    mounted = true;
    return () => mounted = false;
  }, []);

  useEffect(() => {
    setLoading(true);
    errorCatcher(async () => {
      const { models, meta } = await API.Topic.list({ query: filter });
      dispatch(FilterActions.update_filters({ topics: { ...filter, ...meta } }));
      if (mounted)
        setModels(models);
    }).finally(() => mounted && setLoading(false));

    // eslint-disable-next-line
  }, [...listenFilters]);

  const updateRequestFilter = (query) => {
    const new_filter = { ...filter, ...query };
    const valid_filter = Object.keys(new_filter)
      .filter(key => ALLOWED_FILTERS.includes(key))
      .reduce((accum, next) => ({ ...accum, [next]: new_filter[next] }), {});
    dispatch(FilterActions.update_filters({ topics: valid_filter }));
  };


  const handleFilter = (query) => {
    updateRequestFilter(query);
  };

  return (
    <Listing title="Topics" onPageChange={handleFilter}
      error={errorMessage}
      loading={loading}
      filter={filter}
      {...rest} className={clsx(classes.root, className)}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Lecture Hours</TableCell>
            <TableCell>Tutorial Hours</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {models.map((model, index) => (
            <TableRow key={index}>
              <TableCell>
                <Link color="inherit" component={RouterLink} to={`${pathPrefix}/${model.id}/summary`} variant="h6">
                  {model.name}
                </Link>
              </TableCell>
              <TableCell>
                <Typography variant="body1">{model.lecture_hours}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">{model.tutorial_hours}</Typography>
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
    </Listing>
  );
};

TopicListing.propTypes = {
  className: PropTypes.string,
};

TopicListing.defaultProps = {
  pathPrefix: "/topics",
};

export default TopicListing;
