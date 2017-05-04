const del = require("del"),
    gulp = require("gulp"),
    path = require("path"),
    shell = require("gulp-shell"),
    size = require("gulp-size"),
    rename = require("gulp-rename"),
    webpack = require("webpack"),
    webpackConfig = require("./webpack.config.js"),
    webpackStream = require("webpack-stream"),
    zip = require("gulp-zip"),
    bases = {
        app: "app/",
        dist: "dist/"
    };

gulp.task("setEnvDevelopment", function () {
    webpackConfig.devtool = "eval-source-map";
});

gulp.task("setEnvProduction", function () {
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


gulp.task("clean", function () {
    del([
        path.resolve(__dirname, "build"),
        path.resolve(__dirname, "dist")
    ]);
});

gulp.task("cleanNode", function () {
    del([
        path.resolve(__dirname, "node_modules")
    ]);
});

gulp.task("copy_index", function () {
    return gulp.src(path.resolve(__dirname, "index.html"))
        .pipe(gulp.dest(webpackConfig.output.path));
});

gulp.task("webpackDevServer", shell.task([
    "npm run webpackDevServer"
]));


gulp.task("copy_fonts", function () {
    return gulp.src(path.resolve(__dirname + "/fonts", "*"))
        .pipe(gulp.dest(webpackConfig.output.path + "/fonts"));
});

gulp.task("copy_favicon", function () {
    return gulp.src(path.resolve(__dirname, "favicon.ico"))
        .pipe(gulp.dest(webpackConfig.output.path));
});

gulp.task("webpack_prod", [ "clean", "copy_index", "copy_fonts", "copy_favicon" ], function () {
    return gulp.src(webpackConfig.index)
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest(webpackConfig.output.path));
});

gulp.task("zip_prod", [ "webpack_prod" ], function () {
    return gulp.src(webpackConfig.output.path + "/**/*")
        .pipe(size({ "showFiles": true }))
        .pipe(zip("survey.zip"))
        .pipe(size({ "showFiles": true }))
        .pipe(gulp.dest(path.resolve(__dirname, bases.dist)));
});

gulp.task("development", [ "setEnvDevelopment"]);
gulp.task("production", [ "setEnvProduction", "zip_prod" ]);
gulp.task("start", [ "setEnvDevelopment", "webpackDevServer" ]);
gulp.task("default", [ "start" ]);
