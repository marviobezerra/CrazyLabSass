var path = require("path"),
	ExtractTextPlugin = require("extract-text-webpack-plugin"),
	autoprefixer = require("autoprefixer"),
	precss = require("precss"),
	webpack = require("webpack");

module.exports = {
	entry: [
		"./app/polyfills.ts",
		"./app/vendors.ts",
		"./app/main.ts",
        "./app/styles/app.style.scss"
	],
	output: {
		path: path.join(__dirname, "public", "asserts"),
		filename: "bundle.js"
	},
	plugins: [
		new ExtractTextPlugin("bundle.css"),
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|pt-BR/)
	],

	resolve: {
	    extensions: ["", ".js", ".ts", ".scss", ".css"]
	},

	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
			},
            {
            	test: /\app.style.scss/,
            	loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass-loader")
            },
			{
			    exclude: /styles/,
			    test: /\.scss$/,
			    loaders: ["raw-loader", "sass-loader?sourceMap"]
			},
			{
				test: /\.ts$/,
				loader: "ts-loader"
			},
			{
				test: /\.js$/,
				loader: "strip-sourcemap"
			}
		]
	},
	postcss: function () {
		return [precss, autoprefixer({ browsers: ["last 2 versions"] })];
	}
};