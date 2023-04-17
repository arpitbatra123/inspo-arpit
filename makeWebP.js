// Run locally: node makeWebP.js
const fs = require('fs');
const path = require('path');
const CWebp = require('cwebp').CWebp;
const isImage = require('is-image');

fs.readdir(path.resolve('inspo'), (_err, files) => {
  files.forEach((file) => {
    const fileName = file.split('.')[0];

    const webPFile = `inspo/webp/${fileName}.webp`;

    // TODO: Fix, This is not preocessing new files
    if (fileName !== 'webp' && !fs.existsSync(webPFile) && isImage(fileName)) {
      const encoder = new CWebp(path.resolve('inspo', file));
      encoder.quality(90);
      encoder.write(webPFile, function (err) {
        console.log(err || 'encoded successfully');
      });
    }
  });
});
