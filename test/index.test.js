/*
 * NOTE: While this test does not utilize spies/mocks/stubs
 *       as would befit interacting with the file system, I
 *       would rather be sure everything is working clearly
 *       than have an over-thought-out-and-clever test suite.
 *       - rpearce
 */

import fs from 'fs';
import fsp from 'fs-promise';
import { join } from 'path';
import { execSync } from 'child_process';
import reactStatic from '../index';
import routes, { path } from './components/routes';
import { expect } from 'chai';

const outputDir = join('test', '_test-output');
const rmTestFolder = () => execSync(`rm -rf ${outputDir}`, { stdio: [0,1,2] });

describe('File Builder', () => {
  before(rmTestFolder);
  after(rmTestFolder);

  it('builds all the files in their correct locations', async () => {
    const outputPaths = [
      outputDir,
      join(outputDir, path('IndexRoute')),
      join(outputDir, path('ExampleRoute')),
      join(outputDir, path('NestedExampleRoute'))
    ];

    try {
      await reactStatic({ routes, outputDir });
      for (let p of outputPaths) {
        expect(fs.accessSync(p, fs.F_OK)).to.equal(undefined);
      }
    } catch (err) {
      console.error(err);
    }
  });

  it('builds appropriate HTML for a file', async () => {
    try {
      await reactStatic({ routes, outputDir });
      const markup = await fsp.readFile(join(outputDir, path('ExampleRoute')), 'utf-8');
      expect(markup).to.contain('<!DOCTYPE html>');
      expect(markup).to.contain('<title>Example</title>');
    } catch (err) {
      console.error(err);
    }
  });
});
