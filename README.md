# WORK-IN-PROGRESS (AS IS THE README)

# react-static
React static site generator framework for Node.js

## What is this?
This project exists as a static site generator that utilizes React components for markup but, unlike other static site generators, also generates the client-side React JavaScript to allow the linking between pages to be incredibly fast.

Under the hood, this tool builds off of [React](https://github.com/facebook/react), [react-router](https://github.com/rackt/react-router) and [nodejs](https://github.com/nodejs/node) to build static markup and JavaScript.

## Installation
Given you have a `package.json` file, you'll need to install and save the `react-static` package:

```
$ npm install -g react-static

```

## Usage

### Create Components
You should structure your components as per the [example components](./src/components) with at minimum a `Root` layout component and an `Index` component, as well as any other pages or components.

The structure will end up looking like this:

```
Root
  Index
  ChildRoutes
    Example
```

This structure allows for you to have a customizable layout and dynamic children.

Example `Root` component:

```js
// Root.react.js

import React, { Component } from 'react';
import Nav from './Nav.react';

export default function Root({ children }) {
  const { title, description } = children.type.meta;
  return (
    <html lang="en">
      <head>
        <title>{ title }</title>
        <meta property="description" content={ description } />
        <script src="app.js" async></script>
      </head>
      <body>
        <header role="header">
          <Nav />
        </header>
        { children }
      </body>
    </html>
  );
}
```

As you can see, this `Root` component has a dynamic `title` and `description`. These come from its children's static props that are set in whatever component is being rendered that looks like this:

```js
// Index.react.js

import React from 'react';

function Index() {
  return (
    <main role="main">
      <header>
        <h1>Home</h1>
      </header>
    </main>
  );
}

Index.meta = {
  title: 'Homepage',
  description: 'This is the homepage'
};

export default Index;
```

### Providing Routes
In order for react-static to understand the desired layout of your application, you'll want to create a `routes.js` file that utilizes [react-router PlainRoutes](https://github.com/rackt/react-router/blob/master/docs/API.md#plainroute) to provide a generic object filled with your React components.

```js
// routes.js

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
```

## Contribute

1. Check out the [issues](https://github.com/rpearce/react-static/issues)
1. Fork this repository
1. Clone your fork
1. Check out a feature branch (`$ git checkout -b my-feature`)
1. Make your changes and push your branch to your GitHub repo
1. Create a pull request from your branch to this repo's master
1. When all is merged, pull down the upstream changes to your master
