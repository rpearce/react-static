'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = require('child_process');

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_ref) {
    var routes = _ref.routes;
    var _ref$outputDir = _ref.outputDir;
    var outputDir = _ref$outputDir === undefined ? './' : _ref$outputDir;
    var allPaths;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            allPaths = [].concat(routes.indexRoute || []).concat(routes.childRoutes || []);

            allPaths.forEach(function (_ref2) {
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
              try {
                (0, _reactRouter.match)({ routes: routes, location: location }, function () {
                  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(err, redirectLocation, renderProps) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (!err) {
                              _context.next = 2;
                              break;
                            }

                            throw err;

                          case 2:
                            ;
                            _context.prev = 3;
                            _context.next = 6;
                            return writeFile({ path: path, renderProps: renderProps, outputDir: outputDir });

                          case 6:
                            _context.next = 11;
                            break;

                          case 8:
                            _context.prev = 8;
                            _context.t0 = _context['catch'](3);

                            console.error(_context.t0);

                          case 11:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, this, [[3, 8]]);
                  }));

                  return function handleMatch(_x2, _x3, _x4) {
                    return ref.apply(this, arguments);
                  };
                }());
              } catch (err) {
                console.error(err);
              }
            });

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })),
      _this = undefined;

  return function (_x) {
    return ref.apply(_this, arguments);
  };
}();

var writeFile = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(_ref3) {
    var path = _ref3.path;
    var renderProps = _ref3.renderProps;
    var outputDir = _ref3.outputDir;
    var componentHTML, directory, filePath;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            try {
              /*
               * Render component markup, create output directories
               * and write markup to a file whose filename is
               * extracted from the route's path.
               * Provide fallback of `index.html` for IndexRoute.
               */

              componentHTML = (0, _server.renderToStaticMarkup)(_react2.default.createElement(_reactRouter.RouterContext, renderProps)), directory = determineDirectory(path), filePath = path || 'index.html';

              (0, _child_process.execSync)('mkdir -p ' + outputDir + '/' + directory, { stdio: [0, 1, 2] });
              _fsPromise2.default.writeFile(outputDir + '/' + filePath, '<!DOCTYPE html>' + componentHTML, 'utf8', function (err) {
                if (err) {
                  throw err;
                }
              });
            } catch (e) {
              console.error(e);
            }

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })),
      _this = undefined;

  return function writeFile(_x5) {
    return ref.apply(_this, arguments);
  };
}();

var determineDirectory = function determineDirectory() {
  var path = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];

  var pathArr = path.split('/');
  return pathArr.slice(0, pathArr.length - 1).join('/');
};
