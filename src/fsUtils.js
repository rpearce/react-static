import fs from 'fs';

export async function mkDir(path) {
  return new Promise(function(resolve, reject) {
    fs.mkdir(path, function(err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}

export async function readDir(path) {
  return new Promise(function(resolve, reject) {
    fs.readdir(path, function(err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}

export async function readFile(path) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, 'utf8', function(err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}

export async function writeFile(path, content) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(path, content, 'utf8', function(err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}
