/* eslint-disable no-unused-vars */
import { AppBar, Badge, Button, colors, Hidden, IconButton, Toolbar } from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import { makeStyles } from '@material-ui/styles';
import { NotificationsPopover } from 'app/components';
import { axios, useRouter } from 'app/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { ProfileActions } from 'app/store/actions';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  notificationsButton: {
    marginLeft: theme.spacing(1)
  },
  notificationsBadge: {
    backgroundColor: colors.orange[600]
  },
  logoutButton: {
    marginLeft: theme.spacing(1)
  },
  logoutIcon: {
    marginRight: theme.spacing(1)
  }
}));

const TopBar = props => {
  const { onOpenNavBarMobile, className, ...rest } = props;

  const classes = useStyles();
  const { history } = useRouter();
  const dispatch = useDispatch();
  const notificationsRef = useRef(null);
  const [openSearchPopover, setOpenSearchPopover] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchNotifications = () => {
      // axios.get('/api/account/notifications').then(response => {
      //   if (mounted) {
      //     setNotifications(response.data.notifications);
      //   }
      // });
    };

    fetchNotifications();

    return () => {
      mounted = false;
    };
  }, []);

  const handleLogout = () => {
    history.push('/auth/login');
    dispatch(ProfileActions.update_session(null, null));
  };

  const handleNotificationsOpen = () => {
    setOpenNotifications(true);
  };

  const handleNotificationsClose = () => {
    setOpenNotifications(false);
  };

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary" >
      <Toolbar>
        <RouterLink to="/" style={{ display: "flex", alignItems: "center" }}>
          <span style={{ color: "#FFF", fontSize: "1.5em", fontWeight: 400, letterSpacing: 7, marginLeft: 10, marginTop: 2 }}>NTU MODS</span>
        </RouterLink>
        <div className={classes.flexGrow} />
      </Toolbar>
      <NotificationsPopover
        anchorEl={notificationsRef.current}
        notifications={notifications}
        onClose={handleNotificationsClose}
        open={openNotifications}
      />
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onOpenNavBarMobile: PropTypes.func
};

export default TopBar;
