import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Root from './Root.react';
import Index from './Index.react';
import Blog from './Blog.react';
import About from './About.react';

export default (
  <Route path="/" component={ Root }>
    <IndexRoute component={ Index } />
    <Route path="blog.html" component={ Blog } />
    <Route path="about.html" component={ About } />
  </Route>
);
