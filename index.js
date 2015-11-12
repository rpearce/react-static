#!/usr/bin/env node
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _nodemon = require('nodemon');

var _nodemon2 = _interopRequireDefault(_nodemon);

var _packageJson = require('./package.json');

var _packageJson2 = _interopRequireDefault(_packageJson);

var defaultsPath = _path2['default'].join(__dirname, 'defaults');
var execCallback = function execCallback(err) {
  if (err !== null) {
    throw err;
  }
};

_commander2['default'].version(_packageJson2['default'].version);

_commander2['default'].command('new [path]').description('create a new react-static project').action(function handleNew(env, options) {
  if (env) {
    console.log('Installing react-static in to `' + env + '`');
    (0, _child_process.exec)('mkdir -p ' + env, execCallback);
    (0, _child_process.exec)('cp -r ' + defaultsPath + ' ' + env, execCallback);
    console.log('=> Successfully installed in to `' + env + '`');
    console.log('=> Run the following to complete setup:\n\n    $ cd ' + env + ' && npm install\n');
    console.log('=> Once setup is complete, to run the development server:\n\n    $ react-static serve');
  } else {
    console.error('Error: Please provide a directory name to `react-static new <dirname>`');
  }
});

_commander2['default'].command('serve').description('run the development server and have it watch for changes').option('-m, --main <main>', 'Main entry file (defaults to index.js)').action(function handleServe(_ref) {
  var _ref$main = _ref.main;
  var main = _ref$main === undefined ? 'index.js' : _ref$main;

  (0, _nodemon2['default'])({
    script: main,
    exec: 'npm run dev',
    ignore: '_site'
  });
});

_commander2['default'].parse(process.argv);
