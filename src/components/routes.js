import React from 'react';
import Root from './Root.react';
import Index from './Index.react';
import Example from './Example.react';

const IndexRoute = {
  component: Index
};

const ExampleRoute = {
  path: 'example.html',
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
