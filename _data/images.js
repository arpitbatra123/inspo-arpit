const fs = require('fs'),
  path = require('path'),
  // Convert all images to png beforehand
  IMAGE_EXTENSIONS = ['png'];
background = require('../background.json');

module.exports = async function getImages() {
  let files = await fs.promises.readdir(path.resolve('inspo'));
  files = files.filter((file) => {
    const extension = file.split('.')[1];
    return IMAGE_EXTENSIONS.includes(extension);
  });

  files = files.map((file) => {
    return { image: file.split('.')[0], background: background[file] };
  });

  return files;
};
