/*
 * Recommended way of using react-static:
 *   - import the react-static library
 *   - import your react-router routes
 *   - asynchronously call the library, passing it:
 *     * `routes` (required)
 *     * `buildPath` (optional - defaults to `_site`)
 *     * `js` (optional - defaults to `true` - for client-side JS support)
 */

import rs from '../lib/index';
import routes from './src/components/routes';

async () => {
  try {
    rs({
      routes,
      buildPath: 'example/_site',
      js: true
    });
  } catch (err) {
    console.error(err);
  }
}();
