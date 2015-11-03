import routes from './src/components/routes';
import build from '../lib/index';

(async () => {
  try {
    build({ routes, browserifyEntryPath: 'example/src/browser.js', buildPath: 'example/_site' });
  } catch (err) {
    console.error(err);
  }
})();
