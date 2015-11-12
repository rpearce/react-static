import { exec } from 'child_process';
import fsp from 'fs-promise';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import routes from '../src/components/routes';

const execCallback = (err) => { if (err !== null) { throw err; } }
const fspCallback = (err) => { if (err) { throw err; } };

const buildPages = async () => {
  const allRoutes = [].concat(routes.indexRoute || []).concat(routes.childRoutes || []);
  allRoutes.forEach(matchAndWrite);
};

const matchAndWrite = ({ path }) => {
  /*
   * Prepend route path with `/` to build `location`.
   * E.g., `blog.html` will be `/blog.html`.
   * Given IndexRoute has no path, it keeps a default of `/`.
   */
  const location = '/'.concat(path || '');

  /*
   * Trigger react-router's route matching
   */
  match({ routes, location }, async function handleMatch(err, redirectLocation, renderProps) {
    if (err) { throw(err); };

    try {
      /*
       * Render component markup, create output directories
       * and write markup to a file whose filename is
       * extracted from the route's path.
       * Provide fallback of `index.html` for IndexRoute.
       */

      const componentHTML = renderToString(<RoutingContext { ...renderProps } />),
            directory = determineDirectory(path),
            filePath = path || 'index.html';

      await exec(`mkdir -p _site/${directory}`, execCallback);
      fsp.writeFile(`_site/${filePath}`, `<!DOCTYPE html>${componentHTML}`, 'utf8', fspCallback);
    } catch(e) {
      console.error(e);
    }
  });
};

const determineDirectory = (path = '/') => {
  const pathArr = path.split('/');
  return pathArr.slice(0, pathArr.length - 1).join('/');
}

export default buildPages;
