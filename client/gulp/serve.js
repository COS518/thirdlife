var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var reload = require('browser-sync').reload;

var BROWSER_SYNC_RELOAD_DELAY = 100;

gulp.task('nodemon', function(callback) {
  var called = false;

  return nodemon({
      script: 'server.js',
      watch: ['server.js']
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
        console.log('browserSync')
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('js', function() {
  gulp.watch('./src/**/*.js', ['build', reload]);
});

gulp.task('html', function() {
  gulp.watch('./examples/**/*.html', [reload]);
});

gulp.task('serve', ['js', 'html'], function() {

  browserSync({
    server: {
      baseDir: ".",
      directory: true
    }
  });
});