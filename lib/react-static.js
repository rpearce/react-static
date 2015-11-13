#!/usr/bin/env node

import path from 'path';
import { execSync } from 'child_process';
import program from 'commander';
import pkg from './package.json';

const defaultsPath = path.join(__dirname, 'defaults/');
const execCallback = (err) => { console.log(err); if (err !== null) { throw err; } };

program
  .command('new [path]')
  .description('create a new react-static project')
  .action(function handleNew(path, options) {
    if (path) {
      console.log(`Installing react-static in to \`${path}\``);
      execSync(`mkdir -p ${path}`);
      execSync(`cp -r ${defaultsPath} ${path}`);
      console.log(`=> Successfully installed in to \`${path}\``);
      console.log(`=> Run the following to complete setup:\n\n    $ cd ${path} && npm install\n`);
      console.log('=> Once setup is complete, to run the development server:\n\n    $ react-static serve');
    } else {
      console.error('Error: Please provide a directory name to `react-static new <dirname>`');
    }
  });

program
  .command('serve')
  .description('run the development server and have it watch for changes')
  .action(function handleServe() {
    execSync('node_modules/.bin/nodemon', { stdio: [0,1,2] });
  });

program
  .version(pkg.version)
  .parse(process.argv);
