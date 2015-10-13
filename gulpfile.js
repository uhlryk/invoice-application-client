var gulp = require('gulp'),
gutil = require("gulp-util"),
concat = require("gulp-concat"),
browserify = require("browserify"),
source = require("vinyl-source-stream"),
livereload = require('gulp-livereload'),
compass = require("gulp-compass"),
minifyCSS = require("gulp-minify-css");

gulp.task("scripts",function(){
  browserify('./project/scripts/app.js',{debug: true})
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./public/js'))
  .pipe(livereload())
  ;
});
gulp.task("view", function(){
  gulp.src(["project/views/**/*.html","project/views/*.html"])
  .pipe(gulp.dest("public/js/views/"))
  .pipe(livereload())
  ;
});
gulp.task("partial", function(){
  gulp.src(["project/partials/**/*.html","project/partials/*.html"])
  .pipe(gulp.dest("public/js/partials/"))
  .pipe(livereload())
  ;
});
gulp.task("html", function(){
  gulp.src(["project/*.html"])
  .pipe(gulp.dest("public/"))
  .pipe(livereload())
  ;
});
gulp.task("css",function(){
  gulp.src(["./project/sass/style.scss"])
  .pipe(compass({
    sass : "./project/sass/",
    image : "./public/img",
    style : "expanded",
    css : "./public/css",
    sourcemap:true,
    import_path : "./bower_components/bootstrap-sass/assets/stylesheets/"
  }).on("error",gutil.log))
  // .pipe(minifyCSS())
  .pipe(gulp.dest("./public/css"))
  .pipe(livereload())
  ;
});
gulp.task("watch",function(){
  livereload.listen();
  gulp.watch(["project/sass/**/*.scss"],["css"]);
  gulp.watch(["project/scripts/**/*.js"],["scripts"]);
  gulp.watch(["project/partials/**/*.html"],["partial"]);
  gulp.watch(["project/views/**/*.html"],["view"]);
  gulp.watch(["project/*.html"],["html"]);
});
gulp.task("all", ["css", "scripts", "partial", "view", "html"]);
gulp.task("default", ["css", "scripts", "partial", "view", "html", "watch"]);
