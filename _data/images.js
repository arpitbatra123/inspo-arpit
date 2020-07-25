const fs = require('fs'),
  path = require('path'),
  util = require('util');
const { resolve } = require('path');

module.exports = function getImages() {
  return new Promise((resolve, reject) => {
    fs.readdir(path.resolve('inspo'), (err, files) => {
      if (err) {
        return reject(err);
      }
      return resolve(files);
    });
  });
};
