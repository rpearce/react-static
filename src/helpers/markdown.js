import marked from 'marked';
import yaml from 'js-yaml';
import './array';

function parse(contents) {
  const lines = contents.split('\n').map(line => { return line.trim(); });
  const metadataIndices = getMetadataBoundaryIndices(lines);
  const metadata = getMetadata({ lines, metadataIndices });
  const content = getContent({ lines, metadataIndices });
  return { metadata, content };
}

function getMetadataBoundaryIndices(lines) {
  return lines.map(testForMetadataBoundary).clean(undefined);
}

function testForMetadataBoundary(item, i) {
  if (/^---/.test(item)) {
    return i;
  }
}

function getMetadata({ lines, metadataIndices }) {
  if (metadataIndices.length > 0) {
    let tempMetadata = lines.slice(metadataIndices[0] + 1, metadataIndices[1]);
    return yaml.safeLoad(tempMetadata.join('\n'));
  }
  return {};
}

function getContent({ lines, metadataIndices }) {
  if (metadataIndices.length > 0) {
    lines = lines.slice(metadataIndices[1] + 1, lines.length);
  }
  return marked(lines.join('\n'));
}

export default { parse };
