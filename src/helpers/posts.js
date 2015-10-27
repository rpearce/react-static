import path from 'path';
import handlebars from 'handlebars';
import fsp from 'fs-promise';
import markdownHelper from './markdown';

async function exportHTML(filename) {
  const filenamePrefix = filename.split('.')[0];

  // get file data
  const filePath = path.join(path.join(__dirname, '..', 'posts'), filename);
  const fileContents = await fsp.readFile(filePath, 'utf8');
  const fileAttrs = markdownHelper.parse(fileContents);

  // build up html
  const html = await buildHTML(fileAttrs);

  writeHTML(filenamePrefix, html);
}

async function buildHTML(fileAttrs) {
  // get layout file
  const layout = await fsp.readFile(path.join(__dirname, '..', 'layouts', 'post.html'), 'utf8');

  // build up layout and compile template
  const template = handlebars.compile(layout);
  const html = template({
    title: fileAttrs.metadata.title,
    description: fileAttrs.metadata.description,
    markup: fileAttrs.content
  });

  return html;
}

// write file to build path
async function writeHTML(filenamePrefix, html) {
  return fsp.writeFile(`_site/${filenamePrefix}.html`, html, 'utf8');
}

async function getPostFilenames() {
  const files = await fsp.readdir(path.join(__dirname, '..', 'posts'));
  return files.filter(file => { return /.md|.markdown/.test(file); });
}

export default async function() {
  try {
    const filenames = await getPostFilenames();
    for (let filename of filenames) {
      exportHTML(filename);
    }
  } catch (e) {
    console.error(e);
  }
}
