const fs = require('fs'),
  path = require('path'),
  // Convert all images to png beforehand
  IMAGE_EXTENSIONS = ['png'];

module.exports = function getImages() {
  return new Promise((resolve, reject) => {
    fs.readdir(path.resolve('inspo'), (err, files) => {
      if (err) {
        return reject(err);
      }

      files = files.filter((file) => {
        const extension = file.split('.')[1];
        return IMAGE_EXTENSIONS.includes(extension);
      });

      files = files.map((file) => {
        return file.split('.')[0];
      });

      return resolve(files);
    });
  });
};
