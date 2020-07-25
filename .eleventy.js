module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('inspo');
  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy('favicon.ico');

  // For extra config options
  // return {
  // }
};
