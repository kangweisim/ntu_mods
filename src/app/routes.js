/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import DashboardLayout from './layouts/Dashboard';
import ErrorLayout from './layouts/Error';


const routes = [{
  path: '/',
  exact: true,
  component: () => <Redirect to="/modules" />
}, {
  path: '/errors',
  component: ErrorLayout,
  routes: [{
    path: '/errors/error-401',
    exact: true,
    component: lazy(() => import('./views/errors/Error401'))
  }, {
    path: '/errors/error-404',
    exact: true,
    component: lazy(() => import('./views/errors/Error404'))
  }, {
    path: '/errors/error-500',
    exact: true,
    component: lazy(() => import('./views/errors/Error500'))
  }, {
    component: () => <Redirect to="/errors/error-404" />
  }]
}, {
  route: '*',
  component: DashboardLayout,
  routes: [{
    path: '/modules',
    exact: true,
    component: lazy(() => import('./views/module/ModuleList'))
  }, {
    path: '/modules/:moduleId/:tab',
    exact: true,
    component: lazy(() => import('./views/module/ModuleDetail')),
  }, {
    path: '/topics',
    exact: true,
    component: lazy(() => import('./views/topic/TopicList'))
  }, {
    path: '/topics/:topicId/:tab',
    exact: true,
    component: lazy(() => import('./views/topic/TopicDetail')),
  }, {
    component: () => <Redirect to="/errors/error-404" />
  }]
}];

export default routes;
