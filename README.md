# WORK-IN-PROGRESS (AS IS THE README)

# react-static
React static site generator framework for Node.js

## What is this?
This project exists as a static site generator that utilizes React components for markup but, unlike other static site generators, also generates the client-side React JavaScript to allow the linking between pages to be incredibly fast out of the box. This means you'll also be able to have any other fancy client-side-oriented React bundled, as well.

Under the hood, this tool builds off of [React](https://github.com/facebook/react), [react-router](https://github.com/rackt/react-router) and [nodejs](https://github.com/nodejs/node) to build static markup and JavaScript.

## Installation
Given you have a `package.json` file, you'll need to install and save the `react-static` package:

```
$ npm install -g react-static
```

## Usage
Create a new `react-static` project:

```
$ react-static new portfolio/
Installing react-static in to `portfolio/`
=> Successfully installed in to `portfolio/`
=> Run the following to complete setup:

    $ cd portfolio/ && npm install

=> Once setup is complete, to run the development server:

    $ react-static serve
```

Change directory in to `portfolio/` and install dependencies:

```
$ cd portfolio/ && npm install
```

This might take a minute. Once your dependencies are installed, start the local dev bundling and watching:

```
$ react-static serve

> @ build /Users/rpearce/Desktop/portfolio
> npm run lint && babel-node --optional es7.asyncFunctions --stage 0 "index.js"

> @ lint /Users/rpearce/Desktop/portfolio
> eslint src

=> Building static assets...
=> A development server is running at http://localhost:4000
```

Navigate to [http://localhost:4000](http://localhost:4000) and see the dummy components in action.

From this point on, all you need to do with regards to this core functionality is make changes to your app, and `react-static serve` will re-bundle and re-serve everything automatically.

_NOTE: Do not edit anything in the `\_site/` folder. This is regularly removed and recreated._

### Create Components
You should structure your components as per the [example components](./src/components) with at minimum a `Root` layout component and an `Index` component, as well as any other pages or components.

The basic structure looks like like this:

```
Root
  Index (functions as the Root, in a sense)
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
