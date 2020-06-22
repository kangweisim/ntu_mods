import { Button, Card, CardActions, CardContent, Checkbox, colors, Modal, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@material-ui/core';
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

const RolesEdit = props => {
  const { type, open, onUpdate, onClose, className, ...rest } = props;

  const classes = useStyles();
  const model = useSelector(state => state.models[type].entity);
  const all_roles = useSelector(state => state.models.roles);
  const { roles } = model;
  const [selectedRoles, setSelectedRoles] = useState(roles);
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
      let filteredRoles = all_roles.filter((role) => role.manageable).map(role => role.name).filter(role => selectedRoles.includes(role));
      const response = await API.Entity.roles(model.id, { roles: filteredRoles });
      dispatch(ModelsActions.update_model({ entity: response.model }));
      onUpdate();
    }).finally(() => {
      setLoading(false);
      onClose();
    });

  }


  const handleSelectOne = (event, name) => {
    const selectedIndex = selectedRoles.indexOf(name);
    let newSelectedRoles = [];

    if (selectedIndex === -1) {
      newSelectedRoles = newSelectedRoles.concat(selectedRoles, name);
    } else if (selectedIndex === 0) {
      newSelectedRoles = newSelectedRoles.concat(
        selectedRoles.slice(1)
      );
    } else if (selectedIndex === selectedRoles.length - 1) {
      newSelectedRoles = newSelectedRoles.concat(
        selectedRoles.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedRoles = newSelectedRoles.concat(
        selectedRoles.slice(0, selectedIndex),
        selectedRoles.slice(selectedIndex + 1)
      );
    }

    setSelectedRoles(newSelectedRoles);
  };

  return (
    <Modal onClose={onClose} open={open}>
      <Card {...rest} className={clsx(classes.root, className)}>
        <form>
          <CardContent>
            <Typography align="center" gutterBottom variant="h3">
              Update Roles Assignment
            </Typography>
            <ErrorMessage message={errorMessage} map={messages} className={classes.error} />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {all_roles.map(role => (
                  <TableRow hover key={role.name} selected={selectedRoles.indexOf(role.name) !== -1}>
                    <TableCell>
                      {role.label}
                    </TableCell>
                    <TableCell>
                      {role.description}
                    </TableCell>
                    <TableCell padding="checkbox">
                      <Tooltip placement="top" title={role.manageable ? "" : "Not manageable"}>
                        <div>
                          <Checkbox
                            disabled={!role.manageable}
                            checked={selectedRoles.indexOf(role.name) !== -1}
                            color="primary"
                            onChange={e => handleSelectOne(e, role.name)}
                            value={selectedRoles.indexOf(role.id) !== -1}
                          />
                        </div>
                      </Tooltip>
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

RolesEdit.displayName = 'RolesEdit';

RolesEdit.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

RolesEdit.defaultProps = {
  open: false,
  onClose: () => { }
};

export default RolesEdit;
