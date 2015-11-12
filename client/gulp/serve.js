var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('js', function() {
  console.log('Running js!');
});

gulp.task('html', function() {
  console.log('Running html!');
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: ".",
      directory: true
    }
  });

  gulp.watch('./src/**/*.js', ['js', reload]);
  gulp.watch('./examples/**/*.html', ['html', reload]);
});