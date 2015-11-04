import fsp from 'fs-promise';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import { exec } from 'child_process';

async function buildStaticPages({ routes, buildPath }) {
  const allRoutes = [routes.indexRoute].concat(routes.childRoutes);
  allRoutes.forEach(function({ path }) {
    /*
     * Prepend route path with `/` to build `location`.
     * E.g., `blog.html` will be `/blog.html`.
     * Given IndexRoute has no path, it keeps a default of `/`.
     */
    const location = '/'.concat(path || '');

    /*
     * Trigger react-router's route matching
     */
    match({ routes, location }, async function(err, redirectLocation, renderProps) {
      if (err) { throw(err); };

      /*
       * Render component markup and write
       * markup to a file whose filename
       * is extracted from the route's path.
       * Provide fallback of `index.html` for
       * IndexRoute.
       */
      const componentHTML = renderToString(<RoutingContext { ...renderProps } />),
            fileName = path || 'index.html';
      await fsp.writeFile(`${buildPath}/${fileName}`, `<!DOCTYPE html>${componentHTML}`, 'utf8');
    });
  });
}

export default async function({ routes, buildPath = '_site', browserifyEntryPath }) {
  try {
    /*
     * Create site build folder if it does not exist.
     */
    exec(`mkdir -p ${buildPath}`);

    /*
     * Asynchronously build the static pages.
     * The rest will resume once this process is done.
     */
    await buildStaticPages({ routes, buildPath });

    /*
     * Create browserified & uglified JS file in the build path
     * if browserifyEntryPath property is provided.
     */
    if (browserifyEntryPath) {
      exec(`node_modules/.bin/browserify ${browserifyEntryPath} | node_modules/.bin/uglifyjs > ${buildPath}/app.js`);
    }

    return true;
  } catch (e) {
    console.error(e);
  }
}
