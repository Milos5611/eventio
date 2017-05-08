const ExtractTextPlugin = require("extract-text-webpack-plugin"),
	path = require("path"),
	webpack = require("webpack"),
	HtmlWebpackPlugin = require("html-webpack-plugin");

indexJs = path.resolve(__dirname, "./lib/index.js");

module.exports = {
	"index": indexJs,
	"entry": ["babel-polyfill", indexJs],
	
	"devtool": "eval-source-map",
	"output": {
		"path": path.resolve(__dirname, "dist"),
		"filename": "js/bundle[hash].js"
	},
	"module": {
		"loaders": [
			{
				"test": /\.jsx?$/,
				"loader": "babel", "exclude": /node_modules/
			},
			{
				"test": /\.scss$/,
				"loader": ExtractTextPlugin.extract(["style-loader"], "css-loader!postcss-loader!sass-loader")
			},
			{
				"test": /\.css$/,
				"loader": "style-loader!css-loader!postcss-loader"
			},
			{
				"test": /\.(jp?g|png|gif|svg)$/,
				"loader": "file?name=[path][name].[hash].[ext]",
				"include": path.resolve(__dirname, "images")
			},
			{
				"test": /\.(woff|woff2|eot|ttf|svg)$/,
				"loader": "url-loader?limit=100000"
			}
		]
	},
	"postcss": () => {
		return [
			require("postcss-cssnext")({
				browsers: ["last 2 versions"],
				warnForDuplicates: false
			}),
			require("postcss-discard-duplicates"),
			require("postcss-discard-comments"),
			require("cssnano")({
				zindex: false
			})
		];
	},
	"plugins": [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "index.ejs"),
			path: __dirname,
			filename: "index.html",
			pkg: require("./package.json"),
			inject: false,
			favicon: "favicon.ico",
			minify: false
		}),
		// Ignore all other locals except [en]
		// (https://webpack.js.org/plugins/context-replacement-plugin/)
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
		new ExtractTextPlugin("[name][hash].css"),
		new webpack.ProvidePlugin({
			"React": "react"
			
		})
	]
};
