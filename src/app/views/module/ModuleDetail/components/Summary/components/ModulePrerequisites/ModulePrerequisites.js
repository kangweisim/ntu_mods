import { Button, Card, CardContent, CardHeader, Divider, Link, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { MonoText } from "app/components";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link as RouterLink } from "react-router-dom";


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
}));

/* eslint-disable-next-line no-unused-vars */
let mounted = false;
const ModulePrerequisites = props => {
  const { className, loading, model, pathPrefix, ...rest } = props;

  const classes = useStyles();

  useEffect(() => {
    mounted = true;
    return () => mounted = false;
  }, []);


  if (!model || !model.prerequisites || !model.prerequisites.length) return null;

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Prerequisites" />
      <Divider />
      <CardContent className={classes.content}>
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
                {model.prerequisites.map(({ required: model }, index) => (
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
