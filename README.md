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

### Creating a Component
Inside of the `src/components/` components directory is where your components live, and you are free to structure them in any way you see fit, but if you change the location of `routes.js`, you're going to have problems.

Create a new file, e.g., `src/components/About.react.js`, and place this content inside of it:

```js
import React from 'react';

const About = () =>
  <main role="main">
    <header>
      <h1>About</h1>
    </header>
  </main>

About.meta = {
  title: 'About',
  description: 'This is the about us page'
};

export default About;
```

If you're wondering where `class` and `extend` are, don't worry! This is a stateless functional component, as included in the [React 0.14 release notes](NEED LINK), that also sets a few static properties: `title` and `description` that are used in `src/components/Root.react.js` to provide metadata for your page (extend this as you wish).

Next go to your `src/components/routes.js` file and import your `About` component:

```js
import About from './About.react';
```

and add the route information to the `routes` object:

```
const routes = {
  // other routes

  About: {
    path: 'desired/path/to/about.html',
    component: About
  }
}
```

Once you've done this, if you haven't already run

```
$ react-static serve
```

go ahead and do that. Happy coding!

## Contribute

1. Check out the [issues](https://github.com/rpearce/react-static/issues)
1. Fork this repository
1. Clone your fork
1. Check out a feature branch (`$ git checkout -b my-feature`)
1. Make your changes and push your branch to your GitHub repo
1. Create a pull request from your branch to this repo's master
1. When all is merged, pull down the upstream changes to your master
