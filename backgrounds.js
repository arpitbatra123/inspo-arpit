// https://github.com/arpitbatra123/inspo-arpit/issues/2

const fs = require('fs');
const path = require('path');
// Convert all images to png beforehand
const IMAGE_EXTENSIONS = ['png'];
const ColorThief = require('colorthief');
const colorsArr = {};

const rgbToHex = (r, g, b) =>
  '#' +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');

async function getDominantColor() {
  try {
    let files = await fs.promises.readdir(path.resolve('inspo'));
    files = files.filter((file) => {
      const extension = file.split('.')[1];
      return IMAGE_EXTENSIONS.includes(extension);
    });

    for (const file of files) {
      const img = path.resolve(`inspo/${file}`);
      try {
        const colors = await ColorThief.getColor(img);
        colorsArr[file] = colors ? rgbToHex(...colors) : 'thistle';
      } catch (e) {
        colorsArr[file] = 'thistle';
      }
    }

    // Sort keys numerically if they start with numbers to keep file deterministic
    const sorted = Object.keys(colorsArr)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .reduce((acc, key) => {
        acc[key] = colorsArr[key];
        return acc;
      }, {});

    const outPath = path.resolve('background.json');
    await fs.promises.writeFile(outPath, JSON.stringify(sorted, null, 4));
    console.log(`[backgrounds] wrote ${Object.keys(sorted).length} entries to background.json`);
  } catch (err) {
    console.error('[backgrounds] failed', err);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  getDominantColor();
}
