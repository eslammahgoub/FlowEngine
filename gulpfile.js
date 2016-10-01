/**
 * [Global variables and load plugines]
 * @var gulp [main gulp]
 * @var open [gulp-open plugin for open URL]
 * @var connect [gulp-connect plugin for static server]
 * @var jasmine [gulp-jasmine plugin for test]
 * @var reporters [jasmine-reporters plugin for reporters]
 */
var gulp           = require('gulp'),
    open           = require('gulp-open');
    connect        = require('gulp-connect'),
    jasmine_task   = require('gulp-jasmine-livereload-task');

/**
 * [connectDev task for dev server ]
 * @param root 'app'
 * @param port '8000'
 * @param livereload 'true'
 */
gulp.task('connectDev', function () {
  connect.server({
    name: 'Dev App',
    root: ['app'],
    port: 8000,
    livereload: true
  });
});


/**
 * [openApp task for open an URL in a given browser]
 *  @param uri 'localhost:8000'
 */
gulp.task('openApp', function(){
  var options = {
    uri: 'localhost:8000'
  };
  gulp.src(__filename)
  .pipe(open(options));
});

/**
 * [html task for server reload for html files]
 */
gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

/**
 * [scripts task for server reload for scripts js files]
 */
gulp.task('scripts', function () {
  gulp.src('./app/js/*.js')
    .pipe(connect.reload());
});

/**
 * [watch task for watch files html and js]
 */
gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html']);
  gulp.watch(['./app/js/*.js'], ['scripts']);
});

/**
 * [testSpecBrowser task for testing]
 */
 gulp.task('testSpecBrowser', jasmine_task({
   files:['./app/js/*.js','./spec/*.test.js'],
   host: 'localhost',
   port: 9090
 }));

/**
 * [default is default task for open write gulp on console]
 */
gulp.task('default', ['connectDev', 'openApp', 'watch']);


/**
 * [testBrowser is task for testSpecBrowser exec]
 */
gulp.task('testBrowser',['testSpecBrowser']);
