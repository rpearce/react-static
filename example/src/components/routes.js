import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Root from './Root.react';
import Index from './Index.react';
import Blog from './Blog.react';

export default (
  <Route path="/" component={ Root }>
    <IndexRoute component={ Index } name="index" />
    <Route path="blog" component={ Blog } name="blog" />
  </Route>
);
