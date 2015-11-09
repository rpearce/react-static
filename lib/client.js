function client() {
  exec(`node_modules/.bin/browserify lib/browser.js | node_modules/.bin/uglifyjs > ${buildPath}/app.js`);
}

export default client;

