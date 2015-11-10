#!/usr/bin/env node
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _packageJson = require('./package.json');

var _packageJson2 = _interopRequireDefault(_packageJson);

var defaultsPath = _path2['default'].join(__dirname, 'defaults/');
var execCallback = function execCallback(e) {
  if (e !== null) {
    console.error(e);
  }
};

_commander2['default'].version(_packageJson2['default'].version);

_commander2['default'].command('new [path]').description('create new react-static project').action(function (env, options) {
  if (env) {
    console.log('=> Installing react-static in to `' + env + '`');
    (0, _child_process.exec)('mkdir -p ' + env, execCallback);
    (0, _child_process.exec)('cp -r ' + defaultsPath + ' ' + env, execCallback);
    console.log('=> Successfully installed in to `' + env + '`');

    console.log('=> Run `cd ' + env + ' && npm install` to complete setup');
    console.log('=> Once setup is complete, run `react-static serve` to run the development server');
  } else {
    console.error('Error: Please provide a directory name to `react-static new <dirname>`');
  }
});

_commander2['default'].command('serve').description('run a development server').option('-p, --port <port>', 'Port on which to listen to (defaults to 4000)', parseInt).action(function (_ref) {
  var _ref$port = _ref.port;
  var port = _ref$port === undefined ? 4000 : _ref$port;

  var app = (0, _express2['default'])();

  console.log('=> Building static assets...');
  (0, _child_process.exec)('npm run build', execCallback);

  app.use('/', _express2['default']['static']('_site'));
  app.listen(port);

  console.log('=> A development server is running at http://localhost:' + port);
});

_commander2['default'].parse(process.argv);
