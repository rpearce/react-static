import { execSync } from 'child_process';
import fsp from 'fs-promise';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

export default async ({ routes, outputDir: outputDir = './' }) => {
  const allPaths = [].concat(routes.indexRoute || []).concat(routes.childRoutes || []);
  allPaths.forEach(({ path }) => {
    /*
     * Prepend route path with `/` to build `location`.
     * E.g., `blog.html` will be `/blog.html`.
     * Given IndexRoute has no path, it keeps a default of `/`.
     */
    const location = '/'.concat(path || '');

    /*
     * Trigger react-router's route matching
     */
    try {
      match({ routes, location }, async function handleMatch(err, redirectLocation, renderProps) {
        if (err) { throw(err); };
        try {
          await writeFile({ path, renderProps, outputDir });
        } catch (err) {
          console.error(err);
        }
      });
    } catch (err) {
      console.error(err);
    }
  });
}

const writeFile = async ({ path, renderProps, outputDir }) => {
  try {
    /*
     * Render component markup, create output directories
     * and write markup to a file whose filename is
     * extracted from the route's path.
     * Provide fallback of `index.html` for IndexRoute.
     */

    const componentHTML = renderToStaticMarkup(<RouterContext { ...renderProps } />),
          directory = determineDirectory(path),
          filePath = path || 'index.html';

    execSync(`mkdir -p ${outputDir}/${directory}`, { stdio: [0,1,2] });
    fsp.writeFile(`${outputDir}/${filePath}`, `<!DOCTYPE html>${componentHTML}`, 'utf8', (err) => { if (err) { throw err; } });
  } catch(e) {
    console.error(e);
  }
}

const determineDirectory = (path = '/') => {
  const pathArr = path.split('/');
  return pathArr.slice(0, pathArr.length - 1).join('/');
}
