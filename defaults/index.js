import { execSync } from 'child_process';
import express from 'express';
import { clientJS, port } from './config';
import buildPages from './_lib/pages';
import buildClientJS from './_lib/client';

async () => {
  try {
    console.log('=> Building static assets...');

    /*
     * Remove and recreate _site build folder
     */
    execSync('rm -rf _site');
    execSync('mkdir _site');

    /*
     * Build the static pages.
     */
    await buildPages();

    console.log('=> Static assets written to _site/');

    /*
     * Create client JS file (app.js) in the build
     * path if `clientJS` config option is `true`
     */
    if (clientJS) {
      await buildClientJS();
    }

    /*
     * Start dev server
     */
    const app = express();

    app.use('/', express.static('_site'));
    app.listen(port);

    console.log(`=> A development server is running at http://localhost:${port}`);
  } catch (err) {
    console.error(err);
  }
}();
