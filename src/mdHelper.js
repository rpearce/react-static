import path from 'path';
import marked from 'marked';
import handlebars from 'handlebars';
import fsp from 'fs-promise';
import yaml from 'js-yaml';
import constants from './constants';

const postsPath = path.join(__dirname, 'posts');
const layoutPath = path.join(__dirname, 'layouts', 'post.html');

async function convertMds() {
  await fsp.mkdir(constants.buildPath);
  const mdFilenames = await getMdFilenames();
  for (let mdFilename of mdFilenames) {
    await writeMdFileAsHTML(mdFilename);
  }
}

async function writeMdFileAsHTML(mdFilename) {
  // get file data
  const filePath = path.join(postsPath, mdFilename);
  const fileContents = await fsp.readFile(filePath, 'utf8');

  // separate metadata from content
  const fileAttrs = splitMetadataFromContent(fileContents);

  // get layout file
  const layout = await fsp.readFile(layoutPath, 'utf8');

  // build up layout and compile template
  const template = handlebars.compile(layout);
  const html = template({
    title: fileAttrs.metadata.title,
    description: fileAttrs.metadata.description,
    markup: fileAttrs.content
  });

  // write file to build path
  fsp.writeFile(`${constants.buildPath}/${mdFilename.split('.')[0]}.html`, html, 'utf8');
}

function splitMetadataFromContent(contents) {
  var fileAttrs = {},
      metadataBoundaryIndices = [],
      lines = contents.split('\n').map(line => { return line.trim(); });

  lines.forEach((line, i) => {
    if (/^---/.test(line)) {
      metadataBoundaryIndices.push(i);
    }
  });

  if (metadataBoundaryIndices.length > 0) {
    let tempMetadata = lines.splice(metadataBoundaryIndices[0], metadataBoundaryIndices[1] + 1);
    tempMetadata.shift();
    tempMetadata.pop();

    fileAttrs.metadata = yaml.safeLoad(tempMetadata.join('\n'));
  }

  fileAttrs.content = marked(lines.join('\n'));

  return fileAttrs;
}

async function getMdFilenames() {
  const files = await fsp.readdir(postsPath);
  return files.filter(file => { return file.match(/.md|.markdown/); });
}

export default { convertMds };
