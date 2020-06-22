import { Avatar, Divider, Drawer, Hidden, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Navigation } from 'app/components';
import { useRouter, constants } from 'app/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { Link as RouterLink } from 'react-router-dom';
import navigationConfig from './navigationConfig';


const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    overflowY: 'auto'
  },
  content: {
    padding: theme.spacing(2)
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  },
  divider: {
    marginTop: theme.spacing(2)
  },
  navigation: {
    marginTop: theme.spacing(2)
  }
}));

const filterNavigationConfig = (entity = { roles: [] }) => {
  const entityRoles = {};
  entity.roles.forEach(role => entityRoles[role] = true);
  return navigationConfig.filter(list => {
    return !list.roles || entity.roles.includes(constants.ROLES.superadmin) ||
      list.roles.reduce((acc, role) => {
        if (acc) return true;
        if (Array.isArray(role)) return (role.every(r => entityRoles[r]))
        return entityRoles[role]
      }, false)
  });
};

let mounted = true;
const NavBar = props => {
  const { openMobile, onMobileClose, className, ...rest } = props;

  const classes = useStyles();
  const router = useRouter();
  const profile = useSelector(state => state.profile);

  const [filteredNavConfig, setFilteredNavConfig] = useState(filterNavigationConfig(profile.entity));

  useEffect(() => {
    mounted = true;
    return () => mounted = false;
  });

  useEffect(() => {
    if (openMobile) {
      onMobileClose && onMobileClose();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.location.pathname]);

  useEffect(() => {
    if (mounted)
      setFilteredNavConfig(filterNavigationConfig(profile.entity));
    // eslint-disable-next-line
  }, [profile.entity]);


  const navbarContent = (
    <div className={classes.content}>
      {profile.person && (
        <div className={classes.profile}>
          <Avatar
            alt="Person"
            className={classes.avatar}
            // component={RouterLink}
            src={profile.person.avatar}
          // to="/profile/1/timeline"
          />
          <Typography
            className={classes.name}
            variant="h4">
            {profile.person.firstname} {profile.person.lastname}
          </Typography>
          <Typography variant="body2">{profile.person.bio}</Typography>
        </div>
      )}
      <Divider className={classes.divider} />
      <nav className={classes.navigation}>
        {filteredNavConfig.map(list => (
          <Navigation
            component="div"
            key={list.title}
            pages={list.pages}
            title={list.title}
          />
        ))}
      </nav>
    </div>
  );

  return (
    <Fragment>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          <div
            {...rest}
            className={clsx(classes.root, className)}
          >
            {navbarContent}
          </div>
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Paper
          {...rest}
          className={clsx(classes.root, className)}
          elevation={1}
          square
        >
          {navbarContent}
        </Paper>
      </Hidden>
    </Fragment>
  );
};

NavBar.propTypes = {
  className: PropTypes.string,
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;
