import { exec } from 'child_process';
import { buildPath, js } from './config';
import buildPages from './_lib/pages';
import buildClientJS from './_lib/client';

async () => {
  try {
    /*
     * Remove and recreate _site build folder
     */
    let execCallback = (e) => { if (e !== null) { console.error(e); } };
    exec(`rm -rf ${buildPath}`, execCallback);
    exec(`mkdir ${buildPath}`, execCallback);

    /*
     * Asynchronously build the static pages.
     */
    buildPages();

    /*
     * Create client JS file (app.js) in the build
     * path if `js` config option is `true`
     */
    if (js) {
      buildClientJS();
    }
  } catch (err) {
    console.error(err);
  }
}();
