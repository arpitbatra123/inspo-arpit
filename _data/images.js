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

  // Get file stats for creation dates
  const filesWithStats = await Promise.all(
    files.map(async (file) => {
      const filePath = path.resolve('inspo', file);
      const stats = await fs.promises.stat(filePath);
      return {
        image: file.split('.')[0],
        background: background[file],
        createdDate: stats.birthtime,
        modifiedDate: stats.mtime
      };
    })
  );

  // Sort by creation date (newest first)
  filesWithStats.sort((a, b) => b.createdDate - a.createdDate);

  return filesWithStats;
};
