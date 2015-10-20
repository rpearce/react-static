import marked from 'marked';
import yaml from 'js-yaml';

function splitMetadataFromContent(contents) {
  var fileAttrs = {};
  var lines = contents.split('\n').map(line => { return line.trim(); });
  var yamlIndices = getMetadataBoundaryIndices(lines);

  if (yamlIndices.length > 0) {
    let tempMetadata = lines.splice(yamlIndices[0], yamlIndices[1] + 1);
    tempMetadata.shift();
    tempMetadata.pop();

    fileAttrs.metadata = yaml.safeLoad(tempMetadata.join('\n'));
  }

  fileAttrs.content = marked(lines.join('\n'));

  return fileAttrs;
}

function getMetadataBoundaryIndices(lines) {
  return lines.map(testForBoundary).clean(undefined);
}

function testForBoundary(item, i) {
  if (/^---/.test(item)) {
    return i;
  }
}

export default {
  splitMetadataFromContent
};
