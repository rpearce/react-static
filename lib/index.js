'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDomServer = require('react-dom/server');

var _reactRouter = require('react-router');

var _child_process = require('child_process');

function buildStaticPages(_ref) {
  var routes = _ref.routes;
  var buildPath = _ref.buildPath;
  var allRoutes;
  return regeneratorRuntime.async(function buildStaticPages$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        allRoutes = [routes.indexRoute].concat(routes.childRoutes);

        allRoutes.forEach(function (_ref2) {
          var path = _ref2.path;

          /*
           * Prepend route path with `/` to build `location`.
           * E.g., `blog.html` will be `/blog.html`.
           * Given IndexRoute has no path, it keeps a default of `/`.
           */
          var location = '/'.concat(path || '');

          /*
           * Trigger react-router's route matching
           */
          (0, _reactRouter.match)({ routes: routes, location: location }, function callee$2$0(err, redirectLocation, renderProps) {
            var componentHTML, fileName;
            return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  if (!err) {
                    context$3$0.next = 2;
                    break;
                  }

                  throw err;

                case 2:
                  ;

                  /*
                   * Render component markup and write
                   * markup to a file whose filename
                   * is extracted from the route's path.
                   * Provide fallback of `index.html` for
                   * IndexRoute.
                   */
                  componentHTML = (0, _reactDomServer.renderToString)(_react2['default'].createElement(_reactRouter.RoutingContext, renderProps)), fileName = path || 'index.html';
                  context$3$0.next = 6;
                  return regeneratorRuntime.awrap(_fsPromise2['default'].writeFile(buildPath + '/' + fileName, '<!DOCTYPE html>' + componentHTML, 'utf8'));

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });
        });

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

exports['default'] = function callee$0$0(_ref3) {
  var routes = _ref3.routes;
  var _ref3$buildPath = _ref3.buildPath;
  var buildPath = _ref3$buildPath === undefined ? '_site' : _ref3$buildPath;
  var _ref3$js = _ref3.js;
  var js = _ref3$js === undefined ? true : _ref3$js;
  return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;

        /*
         * Create site build folder if it does not exist.
         */
        (0, _child_process.exec)('mkdir -p ' + buildPath);

        /*
         * Asynchronously build the static pages.
         * The rest will resume once this process is done.
         */
        context$1$0.next = 4;
        return regeneratorRuntime.awrap(buildStaticPages({ routes: routes, buildPath: buildPath }));

      case 4:

        /*
         * Create browserified & uglified JS file in the build path
         * if `js` property is provided.
         */
        if (js) {
          (0, _child_process.exec)('node_modules/.bin/browserify lib/browser.js | node_modules/.bin/uglifyjs > ' + buildPath + '/app.js');
        }

        return context$1$0.abrupt('return', true);

      case 8:
        context$1$0.prev = 8;
        context$1$0.t0 = context$1$0['catch'](0);

        console.error(context$1$0.t0);

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 8]]);
};

module.exports = exports['default'];
