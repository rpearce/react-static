import path from 'path';
import handlebars from 'handlebars';
import marked from 'marked';
import fsp from 'fs-promise';

const buildPath = '_site';
const postsPath = path.join(__dirname, 'posts');
const layoutPath = path.join(__dirname, 'layout.html');

async function getMdFilenames() {
  const files = await fsp.readdir(postsPath);
  return files.filter(file => { return file.match(/.md|.markdown/); });
}

async function outputMdFileAsHTML(mdFilename) {
  const mdFilePath = path.join(postsPath, mdFilename);
  const mdData = await fsp.readFile(mdFilePath, 'utf8');
  const mdHTML = marked(mdData);
  const layout = await fsp.readFile(layoutPath, 'utf8');
  const template = handlebars.compile(layout);
  const html = template({ markup: mdHTML });
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
