import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter, constants } from 'app/utils';
import Error401 from 'app/views/errors/Error401';

const AuthGuard = props => {
  const { roles = [], projects = [], children } = props;

  const profile = useSelector(state => state.profile);
  const router = useRouter();
  const [auth, setAuth] = useState({ loading: profile.loading, new_auth: false });

  useEffect(() => {
    if (auth.loading) {
      setAuth({ loading: true, new_auth: false })
      return;
    }

    if (!profile.entity) {
      router.history.push('/auth');
      return;
    }
    if (profile.entity.roles.includes(constants.ROLES.superadmin)) return setAuth({ loading: false, new_auth: true });

    let new_auth = true;

    if (roles.length && !roles.filter(role => {
      if (typeof role === "string") role = [role];
      return role.every(val => profile.entity.roles.includes(val));
    }).length) {
      new_auth = false;
    }

    if (projects.length && !projects.filter(project => {
      if (typeof project === "string") project = [project];
      return project.every(val => profile.entity.projects.includes(val));
    }).length) {
      new_auth = false;
    }
    setAuth({ loading: false, new_auth });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, profile.loading]);
  if (!auth.loading && !auth.new_auth) return <Error401 />
  return <Fragment>{children}</Fragment>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
  roles: PropTypes.array.isRequired
};

AuthGuard.defaultProps = {
  roles: []
};

export default AuthGuard;
