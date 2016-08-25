var path = require("path"),
	fs = require("fs"),
	webpack = require("webpack");

var nodeModules = fs.readdirSync("node_modules")
	.filter(function (x) {
		return ["bin"].indexOf(x) === -1;
	});

module.exports = {
	entry: [
		"webpack/hot/signal.js",
		path.join(__dirname, "App", "Vendors.ts"),
		path.join(__dirname, "App", "Main.ts")
	],
	target: "node",
	output: {
		path: path.join(__dirname, "..", "bin"),
		filename: "index.js",
		devtoolModuleFilenameTemplate: '[absolute-resource-path]',
		devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
	},
	node: {
		__dirname: true,
		__filename: true
	},
	externals: [
		function (context, request, callback) {

			var pathStart = request.split("/")[0];

			if (nodeModules.indexOf(pathStart) >= 0 && request != "webpack/hot/signal.js") {
				return callback(null, "commonjs " + request);
			};

			callback();
		}
	],
	recordsPath: path.join(__dirname, "..", "bin", "records"),
	resolve: {
		extensions: ["", ".js", ".ts"]
	},
	plugins: [
		new webpack.IgnorePlugin(/\.(css|less)$/),
		new webpack.BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false }),
		new webpack.HotModuleReplacementPlugin({ quiet: true })
	],
	module: {
		loaders: [
			{
				test: /\.ts$/,
				loader: "ts-loader",
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				loader: "strip-sourcemap",
				exclude: /node_modules/
			}
		]
	}
};