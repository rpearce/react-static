import React from 'react';
import Root from './Root.react';
import Index from './Index.react';
import Example from './Example.react';

const IndexRoute = {
  component: Index
};

export const ExampleRoute = {
  path: 'example.html',
  component: Example
};

export const NestedExampleRoute = {
  path: 'this/is/a/ridiculously/nested/example.html',
  component: Example
};

export default {
  path: '/',
  component: Root,
  indexRoute: IndexRoute,
  childRoutes: [
    ExampleRoute
  ]
};
