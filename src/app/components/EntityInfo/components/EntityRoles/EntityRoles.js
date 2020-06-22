import { Button, Card, CardActions, CardContent, CardHeader, Chip, Divider } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { EmptyState } from 'app/components';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RolesEdit } from './components';

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
  },
  chip: {
    margin: theme.spacing(1)
  }
}));

const EntityRoles = props => {
  const { onUpdate, className, type, ...rest } = props;
  const model = useSelector(state => state.models[type].entity);
  const all_roles = useSelector(state => state.models.roles);
  const { roles = [] } = model;
  const classes = useStyles();

  const [openEdit, setOpenEdit] = useState(false);

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };


  const renderRoles = () => {
    return roles.map((role_name, index) => {
      let role = all_roles.find((the_role) => the_role.name === role_name);
      if (!role) return null;
      return (
        <Chip key={index} label={role.label} className={classes.chip} />
      )
    });
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Entity roles" />
      <Divider />
      <CardContent>
        {roles.length > 0 && renderRoles()}
      </CardContent>
      <EmptyState active={!roles.length} message="This entity does not have any assigned roles" />

      <CardActions className={classes.actions}>
        <Button onClick={handleEditOpen}>
          <EditIcon className={classes.buttonIcon} />
          Edit
        </Button>
      </CardActions>
      <RolesEdit type={type} onUpdate={onUpdate} onClose={handleEditClose} open={openEdit} />
    </Card>
  );
};

EntityRoles.propTypes = {
  className: PropTypes.string,
};

export default EntityRoles;
