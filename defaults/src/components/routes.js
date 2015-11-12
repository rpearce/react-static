import React from 'react';
import Root from './Root.react';
import Index from './Index.react';
import Example from './Example.react';
import NestedExample from './NestedExample.react';

const routes = {
  IndexRoute: {
    component: Index
  },
  ExampleRoute: {
    path: 'example.html',
    component: Example
  },
  NestedExampleRoute: {
    path: 'this/is/a/ridiculously/nested/example.html',
    component: NestedExample
  }
};

export const path = (route) => {
  return '/'.concat(routes[route].path || '');
}

export default {
  path: '/',
  component: Root,
  indexRoute: routes.IndexRoute,
  childRoutes: [
    routes.ExampleRoute,
    routes.NestedExampleRoute
  ]
};
