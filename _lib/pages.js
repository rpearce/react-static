import fsp from 'fs-promise';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import { buildPath } from '../config';
import routes from '../src/components/routes';

const buildPages = async () => {
  const allRoutes = [].concat(routes.indexRoute || []).concat(routes.childRoutes || []);
  allRoutes.forEach(({ path }) => {
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
        fsp.writeFile(`${buildPath}/${fileName}`, `<!DOCTYPE html>${componentHTML}`, 'utf8');
      } catch(e) {
        console.error(e);
      }
    });
  });
}

export default buildPages;
