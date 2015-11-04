import React from 'react';
import { render } from 'react-dom';
import Router from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import routes from '../example/src/components/routes';

render((
  <Router history={ createBrowserHistory() }>
    { routes }
  </Router>
), document);
