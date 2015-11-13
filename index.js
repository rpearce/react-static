#!/usr/bin/env node
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _packageJson = require('./package.json');

var _packageJson2 = _interopRequireDefault(_packageJson);

var defaultsPath = _path2['default'].join(__dirname, 'defaults/');
var execCallback = function execCallback(err) {
  console.log(err);if (err !== null) {
    throw err;
  }
};

_commander2['default'].command('new [path]').description('create a new react-static project').action(function handleNew(path, options) {
  if (path) {
    console.log('Installing react-static in to `' + path + '`');
    (0, _child_process.execSync)('mkdir -p ' + path);
    (0, _child_process.execSync)('cp -r ' + defaultsPath + ' ' + path);
    console.log('=> Successfully installed in to `' + path + '`');
    console.log('=> Run the following to complete setup:\n\n    $ cd ' + path + ' && npm install\n');
    console.log('=> Once setup is complete, to run the development server:\n\n    $ react-static serve');
  } else {
    console.error('Error: Please provide a directory name to `react-static new <dirname>`');
  }
});

_commander2['default'].command('serve').description('run the development server and have it watch for changes').action(function handleServe() {
  (0, _child_process.execSync)('node_modules/.bin/nodemon', { stdio: [0, 1, 2] });
});

_commander2['default'].version(_packageJson2['default'].version).parse(process.argv);
