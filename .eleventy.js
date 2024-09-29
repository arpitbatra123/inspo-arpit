const pluginRss = require('@11ty/eleventy-plugin-rss');
module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('inspo');
  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy('favicon.ico');

  // Disable rss plugin until it's fixed
  //  eleventyConfig.addPlugin(pluginRss);
};
