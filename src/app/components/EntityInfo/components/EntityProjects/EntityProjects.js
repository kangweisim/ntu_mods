import { Button, Card, CardActions, CardHeader, Divider, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { EmptyState } from 'app/components';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ProjectsEdit } from './components';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& > * + *': {
      marginLeft: 0
    }
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
}));

const EntityProjects = props => {
  const { className, type, ...rest } = props;
  const model = useSelector(state => state.models[type].entity);
  const all_projects = useSelector(state => state.models.projects);
  const { projects = [] } = model;
  const classes = useStyles();

  const [openEdit, setOpenEdit] = useState(false);

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const renderProjects = () => {
    return projects.map((project_name, index) => {
      let project = all_projects.find((the_project) => the_project.name === project_name);
      return (
        <TableRow key={index}>
          <TableCell>{project.label}</TableCell>
          <TableCell>{project.description}</TableCell>
        </TableRow>
      )
    });
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Entity projects" />
      <Divider />
      {projects.length > 0 &&
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderProjects()}
          </TableBody>
        </Table>
      }
      <EmptyState active={!projects.length} message="This entity does not have any assigned projects" />
      <CardActions className={classes.actions}>
        <Button onClick={handleEditOpen}>
          <EditIcon className={classes.buttonIcon} />
          Edit
        </Button>
      </CardActions>
      <ProjectsEdit type={type} onClose={handleEditClose} open={openEdit} />
    </Card>
  );
};

EntityProjects.propTypes = {
  className: PropTypes.string,
};

export default EntityProjects;

