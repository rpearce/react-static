import { exec } from 'child_process';
import { buildPath, js } from './config';
import html from './_lib/pages';
import client from './_lib/client';

async () => {
  try {
    /*
     * Clean out and recreate _site build folder
     */
    let execCallback = (e) => { if (e !== null) { console.error(e); } };
    exec(`rm -rf ${buildPath}`, execCallback);
    exec(`mkdir ${buildPath}`, execCallback);

    /*
     * Asynchronously build the static pages.
     * The rest will resume once this process is done.
     */
    html();

    /*
     * Create client JS file (app.js) in the build
     * path if `js` config option is `true`
     */
    if (js) {
      client();
    }
  } catch (err) {
    console.error(err);
  }
}();
