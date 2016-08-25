var gulp = require("gulp"),
  fs = require("fs"),
  path = require("path"),
  nodemon = require("nodemon"),
  htmlmin = require("gulp-htmlmin"),
  merge = require("webpack-merge"),
  livereload = require("gulp-livereload"),
  webpack = require("webpack"),
  rimraf = require("gulp-rimraf"),
  webpackStream = require("webpack-stream");

var helper = {
  onBuild: function (done) {
    return function (err, stats) {
      if (err) {
        console.log("Error", err);
      }
      else {
        console.log(stats.toString());
      }

      if (done) {
        done();
      }
    }
  },
  htmlMimify: {
    collapseWhitespace: true,
    removeComments: true,
    removeTagWhitespace: false,
    removeRedundantAttributes: true,
    caseSensitive: true
  },
  webpack: {
    client: require("./Client/webpack.config.js"),
    server: require("./Server/webpack.config.js"),
    config: function (config, dev, watch, deploy, server) {
      var result = merge(config, {
        watch: watch,
        devtool: dev ? "source-map" : ""
      });

      if (watch === true) {
        result.plugins = result.plugins || [];
        result.plugins.push(helper.webpack.Log);
      }

      if (deploy === true) {
        result.plugins = result.plugins || [];
        result.plugins.push(new webpack.optimize.UglifyJsPlugin({
          minimize: true
        }));


        if (server === true) {
          delete config.output.devtoolModuleFilenameTemplate;
          delete config.output.devtoolFallbackModuleFilenameTemplate;
          delete config.recordsPath;

          config.output.path = path.join(__dirname, "deploy");

          console.log("recordsPath: " + config.recordsPath);
        }

        if (server === false) {
          config.output.path = path.join(__dirname, "deploy", "public", "assets");
        }
      }

      return result;
    },
    Log: function () {
      this.plugin("done", function (stats) {
        if (stats.compilation.errors && stats.compilation.errors.length) {
          console.log("");
          console.log("********************************************************************************");
          console.log("********************************   ERROR   *************************************");
          console.log("");
          console.log(stats.compilation.errors);
          console.log("********************************************************************************");
          console.log("********************************************************************************");
          console.log("");
          stats.compilation.errors = [];
        }
      });
    }
  },
  path: {
    source: {
      html: "./Client/App/**/*.html"
    },
    destination: {
      html: "./bin/public",
      js: "./bin/public/assets"
    }
  },
  tasks: {
    run: "run",
    clean: {
      bin: "clean",
      deploy: "clean:deploy"
    },
    watch: {
      client: "watch:client",
      server: "watch:server",
      all: "watch"
    },
    build: {
      copy: "build:client:copy",
      client: "build:client",
      server: "build:server",
      deploy: "build:deploy"
    }
  },
};

gulp.task(helper.tasks.clean.bin, function (done) {
  return gulp.src(path.join("./bin"), { read: false })
    .pipe(rimraf());
});

gulp.task(helper.tasks.clean.deploy, function (done) {
  return gulp.src(path.join("/deploy"), { read: false })
    .pipe(rimraf());
});

gulp.task(helper.tasks.build.server, function (done) {
  webpack(helper.webpack.config(helper.webpack.server, true, true, false)).run(helper.onBuild(done));
});

gulp.task(helper.tasks.build.client, function (done) {
  webpack(helper.webpack.config(helper.webpack.client, true, true, false)).run(helper.onBuild(done));
});

gulp.task(helper.tasks.build.deploy, [helper.tasks.clean.deploy], function (done) {

  gulp.src([helper.path.source.html])
    .pipe(htmlmin(helper.htmlMimify))
    .pipe(gulp.dest("./deploy/public"));

  webpack(helper.webpack.config(helper.webpack.client, false, false, true, false)).run(helper.onBuild());
  webpack(helper.webpack.config(helper.webpack.server, false, false, true, true)).run(helper.onBuild());
});

gulp.task(helper.tasks.build.copy, function () {
  gulp.src([helper.path.source.html])
    .pipe(htmlmin(helper.htmlMimify))
    .pipe(gulp.dest(helper.path.destination.html))
    .on("end", function () {
			livereload.reload("index.html");
		});
});

gulp.task(helper.tasks.watch.client, [helper.tasks.build.copy], function (done) {

  livereload({ start: true });
  gulp.watch([helper.path.source.html], [helper.tasks.build.copy]);

  gulp.src("./client/app/main.ts")
    .pipe(webpackStream(helper.webpack.config(helper.webpack.client, true, true, false)))
    .pipe(gulp.dest(helper.path.destination.js))
    .pipe(livereload());

  done();

});

gulp.task(helper.tasks.watch.server, function (done) {

  var firedDone = false;

  webpack(helper.webpack.config(helper.webpack.server, true, false, false)).watch(100, function (err, stats) {
    if (!firedDone) {
      firedDone = true;
      done();
    }

    nodemon.restart();
  });

});

gulp.task(helper.tasks.run, [helper.tasks.watch.server, helper.tasks.watch.client], function () {
  nodemon({
    execMap: {
      js: "node"
    },
    script: path.join(__dirname, "bin"),
    ignore: ["*"],
    watch: ["foo/"],
    nodeArgs: ["--debug"],
    env: {
      NODE_PATH: "./bin"
    },
    ext: "noop"
  }).on("restart", function () {
    console.log("Patched!");
  });
});