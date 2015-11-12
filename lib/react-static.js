#!/usr/bin/env node

import path from 'path';
import { exec } from 'child_process';
import program from 'commander';
import nodemon from 'nodemon';
import pkg from './package.json';

const defaultsPath = path.join(__dirname, 'defaults');
const execCallback = (err) => { if (err !== null) { console.log('exec error: ' + err); } }

program
  .version(pkg.version);

program
  .command('new [path]')
  .description('create a new react-static project')
  .action(function handleNew(env, options) {
    if (env) {
      console.log(`Installing react-static in to \`${env}\``);
      exec(`mkdir -p ${env}`, execCallback);
      exec(`cp -r ${defaultsPath} ${env}`, execCallback);
      console.log(`=> Successfully installed in to \`${env}\``);
      console.log(`=> Run the following to complete setup:\n\n    $ cd ${env} && npm install\n`);
      console.log('=> Once setup is complete, to run the development server:\n\n    $ react-static serve');
    } else {
      console.error('Error: Please provide a directory name to `react-static new <dirname>`');
    }
  });

program
  .command('serve')
  .description('run the development server and have it watch for changes')
  .option('-m, --main <main>', 'Main entry file (defaults to index.js)')
  .action(function handleServe({ main = 'index.js' }) {
    nodemon({
      script: main,
      exec: 'npm run dev',
      ignore: '_site'
    });
  });

program.parse(process.argv);
