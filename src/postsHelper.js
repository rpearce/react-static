import path from 'path';
import marked from 'marked';
import handlebars from 'handlebars';
import fsp from 'fs-promise';
import yaml from 'js-yaml';
import constants from './constants';

async function convert() {
  await fsp.mkdir(constants.buildPath);
  const filenames = await getPostFilenames();
  for (let filename of filenames) {
    exportHTML(filename);
  }
}

async function exportHTML(filename) {
  const filenamePrefix = filename.split('.')[0];

  // get file data
  const filePath = path.join(path.join(__dirname, 'posts'), filename);
  const fileContents = await fsp.readFile(filePath, 'utf8');
  const fileAttrs = splitMetadataFromContent(fileContents);

  // build up html
  const html = await buildHTML(fileAttrs);

  writeHTML(filenamePrefix, html);
}

async function buildHTML(fileAttrs) {
  // get layout file
  const layout = await fsp.readFile(path.join(__dirname, 'layouts', 'post.html'), 'utf8');

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
  return fsp.writeFile(`${constants.buildPath}/${filenamePrefix}.html`, html, 'utf8');
}


// separate metadata from content
function splitMetadataFromContent(contents) {
  var fileAttrs = {};
  var lines = contents.split('\n').map(line => { return line.trim(); });
  var metadataBoundaryIndices = getMetadataBoundaryIndices(lines);

  if (metadataBoundaryIndices.length > 0) {
    let tempMetadata = lines.splice(metadataBoundaryIndices[0], metadataBoundaryIndices[1] + 1);
    tempMetadata.shift();
    tempMetadata.pop();

    fileAttrs.metadata = yaml.safeLoad(tempMetadata.join('\n'));
  }

  fileAttrs.content = marked(lines.join('\n'));

  return fileAttrs;
}

function getMetadataBoundaryIndices(lines) {
  var arr = [];
  lines.forEach((line, i) => {
    if (/^---/.test(line)) {
      arr.push(i);
    }
  });
  return arr;
}

async function getPostFilenames() {
  const files = await fsp.readdir(path.join(__dirname, 'posts'));
  return files.filter(file => { return file.match(/.md|.markdown/); });
}

export default { convert };
