import path from 'path';
import fsp from 'fs-promise';
import handlebars from 'handlebars';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Index from './Index.react';

/*
 * Get layout file
 * Build up layout and compile template
 */
async function buildHTML(markup) {
  const layout = await fsp.readFile(path.join(__dirname, '..', 'layouts', 'main.html'), 'utf8');
  const template = handlebars.compile(layout);
  return template({ markup });
}

// Write file to build path
async function writeHTML(filenamePrefix, html) {
  return fsp.writeFile(`_site/${filenamePrefix}.html`, html, 'utf8');
}

export default async function() {
  try {
    const componentHTML = ReactDOM.renderToString(<Index />);
    const html = await buildHTML(componentHTML);
    writeHTML('index', html);
  } catch (e) {
    console.error(e);
  }
}
