const htmlmin = require("html-minifier");
const esbuild = require("esbuild");
const CleanCSS = require("clean-css");

module.exports = function (eleventyConfig) {
  eleventyConfig.on("afterBuild", () => {
    return esbuild.build({
      entryPoints: ["./src/assets/js/transliterate.js", "./src/assets/js/friconix.js"],
      bundle: true,
      outdir: "dist/assets",
      minify: Boolean(process.env.ELEVENTY_PRODUCTION),
      sourcemap: !Boolean(process.env.ELEVENTY_PRODUCTION),
    });
  });

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (process.env.ELEVENTY_PRODUCTION && outputPath && outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  eleventyConfig.addWatchTarget("src/assets");
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });
  return {
    pathPrefix: "/greekTransliteration/",
    dir: {
      input: "src",
      output: "dist",
      data: "_data",
      layouts: "_layouts",
      includes: "_includes",
    },
    templateFormats: ["html"],
  };
};
