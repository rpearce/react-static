import fsp from 'fs-promise';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import { exec } from 'child_process';
import mkdirp from 'mkdirp';

async function buildStaticPages({ routes, buildPath }) {
  const allRoutes = [].concat(routes.indexRoute || []).concat(routes.childRoutes || []);
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

      try {
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
      } catch(e) {
        console.error(e);
      }
    });
  });
}

export default async function({ routes, buildPath = '_site', js = true }) {
  try {
    /*
     * Create site build folder if it does not exist.
     */
    mkdirp(buildPath, e => console.error(e));

    /*
     * Asynchronously build the static pages.
     * The rest will resume once this process is done.
     */
    await buildStaticPages({ routes, buildPath });

    /*
     * Create browserified & uglified JS file in the build path
     * if `browserJSPath` property is provided.
     */
    if (js) {
      let jsCallback = (e) => { if (e !== null) { console.error(e); } };
      exec(`node_modules/.bin/browserify lib/browser.js | node_modules/.bin/uglifyjs > ${buildPath}/app.js`, jsCallback);
    }

    return true;
  } catch (e) {
    console.error(e);
  }
}
