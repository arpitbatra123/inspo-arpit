const pluginRss = require("@11ty/eleventy-plugin-rss");
module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('inspo');
  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy('favicon.ico');

 eleventyConfig.addPlugin(pluginRss);
};
