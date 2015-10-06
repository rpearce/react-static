import path from 'path';
import handlebars from 'handlebars';
import marked from 'marked';
import { mkDir, readDir, readFile, writeFile } from './fsUtils';

const buildPath = '_site';
const postsPath = path.join(__dirname, 'posts');
const layoutPath = path.join(__dirname, 'layout.html');

function filterMdFiles(files) {
  return files.filter(file => { return file.match(/.md|.markdown/); });
}

async function outputMdFileAsHTML(mdFilename) {
  var mdFilePath = path.join(postsPath, mdFilename);
  var mdData = await readFile(mdFilePath);
  var mdHTML = marked(mdData);
  var layout = await readFile(layoutPath);
  var template = handlebars.compile(layout);
  var html = template({ markup: mdHTML });
  await writeFile(`${buildPath}/${mdFilename.split('.')[0]}.html`, html);
}

async () => {
  try {
    await mkDir(buildPath);
    const files = await readDir(postsPath);
    const mdFilenames = filterMdFiles(files);
    for (let mdFilename of mdFilenames) {
      await outputMdFileAsHTML(mdFilename);
    }
  } catch (err) {
    console.error(err);
  }
}()
