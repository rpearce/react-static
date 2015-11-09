import fsp from 'fs-promise';
import mkdirp from 'mkdirp';
import { buildPath, js } from './config';
import html from './lib/html';
import client from './lib/client';

async () => {
  try {
    /*
     * Create site build folder if it does not exist.
     */
    mkdirp(buildPath, e => console.error(e));

    /*
     * Asynchronously build the static pages.
     * The rest will resume once this process is done.
     */
    html();

    /*
     * Create browserified & uglified JS file in the build path
     * if `browserJSPath` property is provided.
     */
    if (js) {
      client();
    }
  } catch (err) {
    console.error(err);
  }
}();
