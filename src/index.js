import path from 'path';
import handlebars from 'handlebars';
import marked from 'marked';
import fsp from 'fs-promise';
import yaml from 'js-yaml';

const buildPath = '_site';
const postsPath = path.join(__dirname, 'posts');
const layoutPath = path.join(__dirname, 'layouts', 'post.html');

async function getMdFilenames() {
  const files = await fsp.readdir(postsPath);
  return files.filter(file => { return file.match(/.md|.markdown/); });
}

async function outputMdFileAsHTML(mdFilename) {
  // get file data
  const mdFilePath = path.join(postsPath, mdFilename);
  const mdData = await fsp.readFile(mdFilePath, 'utf8');

  // separate metadata from content
  var metadata;
  var lines = mdData.split('\n').map(line => { return line.trim(); });

  // find `---` indices
  var indices = [];
  lines.forEach(function(line, i) {
    if (/^---/.test(line)) {
      indices.push(i);
    }
  });

  // parse out actual metadata and convert to JSON
  metadata = lines.splice(indices[0], indices[1] + 1);
  metadata.shift();
  metadata.pop();
  metadata = yaml.safeLoad(metadata.join('\n'));

  // convert markdown to html
  const mdHTML = marked(lines.join('\n'));

  // get layout file
  const layout = await fsp.readFile(layoutPath, 'utf8');

  // build up layout and compile template
  const template = handlebars.compile(layout);
  const html = template({
    title: metadata.title,
    description: metadata.description,
    markup: mdHTML
  });

  // write file to build path
  await fsp.writeFile(`${buildPath}/${mdFilename.split('.')[0]}.html`, html, 'utf8');
}

async () => {
  try {
    await fsp.mkdir(buildPath);
    const mdFilenames = await getMdFilenames();
    for (let mdFilename of mdFilenames) {
      await outputMdFileAsHTML(mdFilename);
    }
  } catch (err) {
    console.error(err);
  }
}();
