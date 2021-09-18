// https://github.com/arpitbatra123/inspo-arpit/issues/2

const fs = require('fs'),
  path = require('path'),
  // Convert all images to png beforehand
  IMAGE_EXTENSIONS = ['png'],
  ColorThief = require('colorthief'),
  colorsArr = {};

const rgbToHex = (r, g, b) =>
  '#' +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');

async function getDominantColor() {
  let files = await fs.promises.readdir(path.resolve('inspo'));
  files = files.filter((file) => {
    const extension = file.split('.')[1];
    return IMAGE_EXTENSIONS.includes(extension);
  });

  for (const file of files) {
    const img = path.resolve(`inspo/${file}`);
    const colors = await ColorThief.getColor(img);
    colorsArr[file] = colors ? rgbToHex(...colors) : 'thistle';
  }

  console.log(JSON.stringify(colorsArr, null, 4));
}

getDominantColor();
