import React from 'react';
import Root from './Root.react';
import Index from './Index.react';
import Blog from './Blog.react';
import About from './About.react';

const IndexRoute = {
  component: Index
};

const BlogRoute = {
  path: 'blog.html',
  component: Blog
};

const AboutRoute = {
  path: 'about.html',
  component: About
};

export default {
  path: '/',
  component: Root,
  indexRoute: IndexRoute,
  childRoutes: [
    BlogRoute,
    AboutRoute
  ]
};
