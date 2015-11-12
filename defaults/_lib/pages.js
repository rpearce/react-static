import { exec } from 'child_process';
import fsp from 'fs-promise';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import routes from '../src/components/routes';

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
       * Render component markup and write
       * markup to a file whose filename
       * is extracted from the route's path.
       * Provide fallback of `index.html` for
       * IndexRoute.
       */

      const total = path || '/';
      const pathArr = total.split('/');
      const directory = pathArr.slice(0, pathArr.length - 1);
      const execCallback = (err) => { if (err !== null) { console.log('exec error: ' + err); } }
      exec(`mkdir -p _site/${directory.join('/')}`, execCallback);

      const componentHTML = renderToString(<RoutingContext { ...renderProps } />),
            filePath = path || 'index.html',
            fspCallback = (err) => { if (err) { throw err; } };
      fsp.writeFile(`_site/${filePath}`, `<!DOCTYPE html>${componentHTML}`, 'utf8', fspCallback);
    } catch(e) {
      console.error(e);
    }
  });
};

export default buildPages;
