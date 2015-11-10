#!/usr/bin/env node

import path from 'path';
import { exec } from 'child_process';
import program from 'commander';
import express from 'express';
import pkg from './package.json';

const defaultsPath = path.join(__dirname, 'defaults/');
const execCallback = (e) => { if (e !== null) { console.error(e); } };

program
  .version(pkg.version);

program
  .command('new [path]')
  .description('create new react-static project')
  .action(function(env, options) {
    if (env) {
      console.log(`=> Installing react-static in to \`${env}\``);
      exec(`mkdir -p ${env}`, execCallback);
      exec(`cp -r ${defaultsPath} ${env}`, execCallback);
      console.log(`=> Successfully installed in to \`${env}\``);

      console.log(`=> Run \`cd ${env} && npm install\` to complete setup`);
      console.log('=> Once setup is complete, run `react-static serve` to run the development server');
    } else {
      console.error('Error: Please provide a directory name to `react-static new <dirname>`');
    }
  });

program
  .command('serve')
  .description('run a development server')
  .option('-p, --port <port>', 'Port on which to listen to (defaults to 4000)', parseInt)
  .action(function({ port = 4000 }) {
    const app = express();

    console.log('=> Building static assets...');
    exec(`npm run build`, execCallback);

    app.use('/', express.static('_site'));
    app.listen(port);

    console.log(`=> A development server is running at http://localhost:${port}`);
  });

program.parse(process.argv);
