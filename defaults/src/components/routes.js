import React from 'react';
import Root from './Root.react';
import Index from './Index.react';
import Example from './Example.react';
import NestedExample from './NestedExample.react';

/*
 * Define your routes and their desired
 * output paths here.
 *
 * DO NOT prefix a `path` with a `/` (backslash)
 */
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

/*
 * Helper function so that we can
 * read all the route keys in `routes`
 * and export them to `childRoutes`
 * in our default export.
 */
const getChildRoutes = () => {
  let childRoutes = [];
  for (let key in routes) {
    if (key !== 'IndexRoute') {
      childRoutes.push(routes[key]);
    }
  }
  return childRoutes;
};

export const path = (route) => {
  return '/'.concat(routes[route].path || '');
}

export default {
  path: '/',
  component: Root,
  indexRoute: routes.IndexRoute,
  childRoutes: getChildRoutes()
};
