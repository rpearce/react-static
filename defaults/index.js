import { exec } from 'child_process';
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
    const execCallback = (err) => { if (err !== null) { console.log('exec error: ' + err); } }
    exec('rm -rf _site', execCallback);
    exec('mkdir _site', execCallback);

    /*
     * Asynchronously build the static pages.
     */
    await buildPages();

    /*
     * Create client JS file (app.js) in the build
     * path if `clientJS` config option is `true`
     */
    if (clientJS) {
      buildClientJS();
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
