import { Button, Card, CardContent, CardHeader, Divider, Grid, Link, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {},
  card: {
    marginBottom: theme.spacing(3),
  },
  content: {
    padding: 0
  }
}));

/* eslint-disable-next-line no-unused-vars */
let mounted = false;
const Topics = props => {
  const { handleDelete, onUpdate, className, loading, model, pathPrefix, ...rest } = props;

  const classes = useStyles();

  useEffect(() => {
    mounted = true;
    return () => mounted = false;
  }, []);

  if (!model) return null;

  return (
    <Grid {...rest} className={clsx(classes.root, className)} container >
      <Card style={{width: "100%"}}>
        <CardHeader title="Prerequisites" />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
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
                  {model.topics.map((model, index) => (
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
            </div>
          </PerfectScrollbar>
        </CardContent>
      </Card >
    </Grid>
  );
};

Topics.propTypes = {
  className: PropTypes.string,
};

Topics.defaultProps = {
  pathPrefix: "/topics",
};

export default Topics;
