var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var watch = require('gulp-watch');

var reload = browserSync.reload;

var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function(callback) {
  var called = false;

  return nodemon({
      script: 'index.js',
      watch: ['index.js']
    })
    .on('start', function() {
      if (!called) {
        callback();
      }
      called = true;
    })
    .on('restart', function() {
      console.log('restarted!');
      setTimeout(function() {
        reload({
          stream: false //
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('js', function() {
  console.log('Running js!');
});

gulp.task('html', function() {
  console.log('Running html!');
});

gulp.task('serve', ['nodemon'], function() {
  browserSync({
    proxy: 'http://0.0.0.0:8080',
    notify: true
  });

  gulp.watch(['./src/**/*.js', './public/**/*.js'], ['js', 'build', reload]);
  gulp.watch('./public/**/*.html', ['html', reload]);
});