/*
 * Recommended way of using react-static:
 *   - import the react-static library
 *   - import your react-router routes
 *   - asynchronously call the library, passing it:
 *     * `routes` (required)
 *     * `buildPath` (optional - defaults to `_site`)
 *     * `browserifyEntryPath` (optional - for client-side JS support - see example/src/browser.js for example)
 */

import ReactStatic from '../lib/index';
import routes from './src/components/routes';

(async () => {
  try {
    ReactStatic({
      routes,
      buildPath: 'example/_site',
      browserifyEntryPath: 'example/src/browser.js'
    });
  } catch (err) {
    console.error(err);
  }
})();
