const del = require("del"),
	gulp = require("gulp"),
	path = require("path"),
	shell = require("gulp-shell"),
	size = require("gulp-size"),
	rename = require("gulp-rename"),
	webpack = require("webpack"),
	webpackConfig = require("./webpack.config.js"),
	webpackStream = require("webpack-stream"),
	zip = require("gulp-zip");

gulp.task("setEnvDevelopment", () => {
	webpackConfig.devtool = "eval-source-map";
});

gulp.task("setEnvProduction", () => {
	webpackConfig.devtool = null;
	webpackConfig.plugins = webpackConfig.plugins.concat([
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("production")
		}),
		new webpack.optimize.UglifyJsPlugin({
			"comments": false,
			"compress": {
				"drop_console": true,
				"warnings": true
			}
		})
	]);
});


gulp.task("clean", () => {
	del([
		path.resolve(__dirname, "dist")
	]);
});

gulp.task("cleanNode", () => {
	del([
		path.resolve(__dirname, "node_modules")
	]);
});

gulp.task("webpackDevServer", shell.task([
	"npm run webpackDevServer"
]));

gulp.task("copy_index", () => {
	return gulp.src(path.resolve(__dirname, "index.html"))
		.pipe(gulp.dest(webpackConfig.output.path));
});

gulp.task("copy_configuration_prod", () => {
	return gulp.src(path.resolve(__dirname + "/envconfig", "configuration.prod.js"))
		.pipe(rename("configuration.js"))
		.pipe(gulp.dest(webpackConfig.output.path));
});

gulp.task("copy_fonts", () => {
	return gulp.src(path.resolve(__dirname + "/fonts", "*"))
		.pipe(gulp.dest(webpackConfig.output.path + "/fonts"));
});

gulp.task("copy_favicon", () => {
	return gulp.src(path.resolve(__dirname, "favicon.ico"))
		.pipe(gulp.dest(webpackConfig.output.path));
});

gulp.task("webpack_prod", ["clean", "copy_index"], () => {
	return gulp.src(webpackConfig.index)
		.pipe(webpackStream(webpackConfig))
		.pipe(gulp.dest(webpackConfig.output.path));
});

gulp.task("development", ["setEnvDevelopment"]);
gulp.task("production", ["setEnvProduction", "webpack_prod"]);
gulp.task("start", ["setEnvDevelopment", "webpackDevServer"]);
gulp.task("default", ["start"]);
