# react-static
Modular library for building simple static pages with React

## What is this?
EXPLANATION HERE

Under the hood, this tool builds off of [React](https://github.com/facebook/react), [react-router](https://github.com/rackt/react-router) and [nodejs](https://github.com/nodejs/node) to build static markup from React Components.

## Requirements
* [React](https://github.com/facebook/react) components
* [react-router](https://github.com/rackt/react-router) routes

## Installation
Given you have a `package.json` file, you'll need to install and save the `react-static` package:

```
$ npm install --save react-static
```

## Usage
Considering you already have a react router set up similarly to [the example](NEED LINK HERE), you pass the asynchronous `reactStatic` function your routes and an output directory for the static assets to be written to.
```js
import reactStatic from 'react-static';
import routes from './react-router-routes';

const outputDir = '_public';

try {
  await reactStatic({ routes, outputDir });
} catch (err) {
  console.error(err);
}
```
If you have a route with a `path` like `/some/really/nested/example.html`, `react-static` will create the static file structure at your desired output directory.

## Contribute

1. Check out the [issues](https://github.com/rpearce/react-static/issues)
1. Fork this repository
1. Clone your fork
1. Check out a feature branch (`$ git checkout -b my-feature`)
1. Make your changes and push your branch to your GitHub repo
1. Create a pull request from your branch to this repo's master
1. When all is merged, pull down the upstream changes to your master
