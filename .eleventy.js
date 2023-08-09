const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output");
const htmlmin = require("html-minifier");

module.exports = function (config) {
	config.setQuietMode(true);
	config.addPlugin(directoryOutputPlugin);

	//Passthrough copy
	// config.addPassthroughCopy("./src/fonts");
	// config.addPassthroughCopy("./src/images");
	// config.addPassthroughCopy("./src/scripts");
	// config.addPassthroughCopy({"./src/favicons": "/"});
	// config.addPassthroughCopy("./src/manifest.webmanifest");

	//Watch target
	config.addWatchTarget("./src/css/");

	//Filters
	config.addFilter("md", require("./src/filters/md.js"));

	//Transforms
	config.addTransform("htmlmin", function (content, outputPath) {
		// Eleventy 1.0+: use this.inputPath and this.outputPath instead
		if (
			process.env.NODE_ENV === "production" &&
			this.outputPath &&
			this.outputPath.endsWith(".html")
		) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: false,
				removeComments: true,
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
			});
			return minified;
		}

		return content;
	});

	return {
		dataTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		dir: {
			input: "src",
			output: "public",
		},
	};
};
