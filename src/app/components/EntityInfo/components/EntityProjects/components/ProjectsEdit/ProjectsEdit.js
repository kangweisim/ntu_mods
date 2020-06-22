import { Button, Card, CardActions, CardContent, Checkbox, colors, Modal, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { ErrorMessage } from 'app/components';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API } from 'app/services';
import { ModelsActions } from "app/store/actions";
import useErrorCatcher from "app/utils/useErrorCatcher";

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 700,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%'
  },
  container: {
    marginTop: theme.spacing(3)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  saveButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

const messages = {

}


const ProjectsEdit = props => {
  const { type, open, onClose, className, ...rest } = props;

  const classes = useStyles();
  const model = useSelector(state => state.models[type].entity);
  const all_projects = useSelector(state => state.models.projects);
  const { projects } = model;
  const [selectedProjects, setSelectedProjects] = useState(projects);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const runAsyncBlock = useErrorCatcher(error => setErrorMessage(error && error.message));
  const dispatch = useDispatch();

  if (!open) {
    return null;
  }

  const handleClose = event => {
    event.preventDefault();

    setLoading(true);
    runAsyncBlock(async () => {
      let filteredProjects = all_projects.filter((project) => project.manageable).map(project => project.name).filter(project => selectedProjects.includes(project));
      const response = await API.Entity.projects(model.id, { projects: filteredProjects });
      dispatch(ModelsActions.update_model({ entity: response.model }));
    }).finally(() => {
      setLoading(false);
      onClose();
    });

  }

  const handleSelectAll = event => {
    const selectedProjects = event.target.checked
      ? all_projects.map(project => project.name)
      : [];

    setSelectedProjects(selectedProjects);
  };


  const handleSelectOne = (event, name) => {
    const selectedIndex = selectedProjects.indexOf(name);
    let newSelectedProjects = [];

    if (selectedIndex === -1) {
      newSelectedProjects = newSelectedProjects.concat(selectedProjects, name);
    } else if (selectedIndex === 0) {
      newSelectedProjects = newSelectedProjects.concat(
        selectedProjects.slice(1)
      );
    } else if (selectedIndex === selectedProjects.length - 1) {
      newSelectedProjects = newSelectedProjects.concat(
        selectedProjects.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedProjects = newSelectedProjects.concat(
        selectedProjects.slice(0, selectedIndex),
        selectedProjects.slice(selectedIndex + 1)
      );
    }

    setSelectedProjects(newSelectedProjects);
  };

  return (
    <Modal onClose={onClose} open={open}>
      <Card {...rest} className={clsx(classes.root, className)}>
        <form>
          <CardContent>
            <Typography align="center" gutterBottom variant="h3">
              Update Projects Assignment
            </Typography>
            <ErrorMessage message={errorMessage} map={messages} className={classes.error} />

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedProjects.length === all_projects.length}
                      color="primary"
                      indeterminate={
                        selectedProjects.length > 0 &&
                        selectedProjects.length < all_projects.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {all_projects.map(project => (
                  <TableRow hover key={project.name} selected={selectedProjects.indexOf(project.name) !== -1}>
                    <TableCell>
                      {project.label}
                    </TableCell>
                    <TableCell>
                      {project.description}
                    </TableCell>
                    <TableCell padding="checkbox">
                      <Checkbox
                        disabled={!project.manageable}
                        checked={selectedProjects.indexOf(project.name) !== -1}
                        color="primary"
                        onChange={e => handleSelectOne(e, project.name)}
                        value={selectedProjects.indexOf(project.id) !== -1}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardActions className={classes.actions}>
            <Button onClick={onClose} variant="contained">Close</Button>
            <Button className={classes.saveButton} onClick={handleClose} disabled={loading} variant="contained">Save</Button>
          </CardActions>
        </form>
      </Card>
    </Modal>
  );
};

ProjectsEdit.displayName = 'ProjectsEdit';

ProjectsEdit.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

ProjectsEdit.defaultProps = {
  open: false,
  onClose: () => { }
};

export default ProjectsEdit;
