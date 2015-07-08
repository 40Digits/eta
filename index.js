/*
  index.js
  ===========
  Returns gulp tasks to a parent app
*/

var gulp = require('gulp');
var p = require('path');
var plugins = require('gulp-load-plugins')({ lazy: true });
var browserSync = require('browser-sync');
var tasks = require('./lib/tasks');
var defaultConfig = require('./lib/config');

// A convenience function to return a gulp task
var getTask = function(task, config) {
  return tasks[task](gulp, plugins, config);
};

module.exports = function(options) {
  options = options ? options : {};
  // Set up the configuration for the tasks
  // Passing in the base path for the parent app
  // Merges the default config with the user config
  config = defaultConfig(p.dirname(module.parent.filename), options);

  // add browser-sync to the plugins so that it can be injected
  // into all of the dependencies
  plugins.browserSync = browserSync;

  // The Tasks
  gulp.task('init', getTask('init', config));
  gulp.task('watch', getTask('watch', config));
  gulp.task('images', getTask('images', config));
  gulp.task('sass', getTask('sass', config));
  gulp.task('sprites', getTask('sprites', config));
  gulp.task('static', getTask('static', config));
  gulp.task('symbols', getTask('symbols', config));
  gulp.task('browserify', getTask('browserify', config));
  gulp.task('browserSync', ['watch'], getTask('browserSync', config));
  gulp.task('uglifyJs', ['browserify'], getTask('uglifyJs', config));
  gulp.task('minifyCss', ['sass'], getTask('minifyCss', config));
  gulp.task('production', ['minifyCss', 'uglifyJs']);
  gulp.task('default', config.default.tasks);

  // Expose the tasks for consumption
  return gulp.tasks;
};