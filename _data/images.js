const fs = require('fs'),
  path = require('path'),
  IMAGE_EXTENSIONS = ['jpeg', 'jpg', 'png'];

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

      return resolve(files);
    });
  });
};
