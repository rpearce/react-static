import fsp from 'fs-promise';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import { exec } from 'child_process';

async function buildStaticPages({ routes, buildPath }) {
  routes.props.children.forEach(function(child) {
    /*
     * Get current route's path.
     * Given IndexRoute has no path,
     * we supply a fallback of `/`
     */
    const { path, name } = child.props,
          location = '/'.concat(path || '');

    /*
     * Trigger react-router's route matching
     */
    match({ routes, location }, async function(err, redirectLocation, renderProps) {
      if (err) { throw(err); };

      /*
       * Render component markup and
       * write markup to a file whose filename
       * is extracted from the Route's `name`
       * in src/components/routes.js
       */
      const componentHTML = renderToString(<RoutingContext { ...renderProps } />);
      await fsp.writeFile(`${buildPath}/${name}.html`, `<!DOCTYPE html>${componentHTML}`, 'utf8');
    });
  });
}

export default async function({ routes, browserifyEntryPath, buildPath = '_site', jsEnabled = true }) {
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
     * Create browserified & uglified JS file in the build path.
     */
    if (jsEnabled) {

      if (!browserifyEntryPath) {
        let message = 'if `jsEnabled` is set to true (default), you must provide a `browserifyEntryPath` that is a path to your source file to be browserified. E.g., `src/browser.js`';
        throw message;
      }

      exec(`node_modules/.bin/browserify ${browserifyEntryPath} | node_modules/.bin/uglifyjs > ${buildPath}/app.js`);
    }

    return true;
  } catch (e) {
    console.error(e);
  }
}
