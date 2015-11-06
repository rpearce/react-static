# WORK-IN-PROGRESS

# react-static
React static site generator for Node.js

## What is this?
This project exists as a static site generator that utilizes React components for markup but, unlike other static site generators, also generates the client-side React JavaScript to allow the linking between pages to be incredibly fast.

This project is a library but also a set of guidelines for building awesome, lightning-fast static pages with React.

Under the hood, this tool builds off of [React](https://github.com/facebook/react), [react-router](https://github.com/rackt/react-router) and [nodejs](https://github.com/nodejs/node) to build static markup and JavaScript.

## Installation
Given you have a `package.json` file, you'll need to install and save the `react-static` package:

```
$ npm install react-static --save-dev

```

If you wish to install it globally (not recommended), you can run it without the `--save-dev` flag:

```
$ npm install react-static
```

## Usage
Check out the [example directory](./example) for a working example, but I'll break it down here, as well.

### Create Components
You should structure your components as per the [example components](./example/src/components) with some sort of `Root` layout file, an `Index` component, and then all the rest.

```
Root
  Index
  ChildRoutes
    Blog
    About
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

### Calling react-static
Recommended way of using react-static:
  * import the react-static library
  * import your [routes](#providing-routes)
  * asynchronously call the library, passing it:
    * `routes` (required)
    * `buildPath` (optional - defaults to `_site`)
    * `browserifyEntryPath` (optional - for client-side JS support - see example/src/browser.js for example)

As shown in the [example](./example/index.js):

```js
import rs from '../lib/index';
import routes from './src/components/routes';

async () => {
  try {
    rs({
      routes,
      buildPath: 'example/_site',
      browserifyEntryPath: 'example/src/browser.js'
    });
  } catch (err) {
    console.error(err);
  }
}();
```

## Contribute

1. Check out the [issues](https://github.com/rpearce/react-static/issues)
1. Fork this repository
1. Clone your fork
1. Check out a feature branch (`$ git checkout -b my-feature`)
1. Make your changes and push your branch to your GitHub repo
1. Create a pull request from your branch to this repo's master
1. When all is merged, pull down the upstream changes to your master
