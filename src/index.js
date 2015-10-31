import fsp from 'fs-promise';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import routes from './components/routes';

function buildPages() {
  routes.props.children.forEach(function(child) {
    /*
     * Get current route's path.
     * Given IndexRoute has no path,
     * we supply a fallback of `/`
     */
    const location = child.props.path || '/';

    /*
     * Trigger react-router's route matching
     */
    match({ routes, location }, function(err, redirectLocation, renderProps) {
      if (err) { throw(err); };

      /*
       * Render component markup and
       * write markup to a file whose filename
       * is extracted from the Route's `name`
       * in src/components/routes.js
       */
      const componentHTML = renderToString(<RoutingContext { ...renderProps } />);
      const fileName = child.props.name;
      fsp.writeFile(`_site/${fileName}.html`, `<!DOCTYPE html>${componentHTML}`, 'utf8');
    });
  });
}

async () => {
  try {
    buildPages();
  } catch (e) {
    console.error(e);
  }
}();
