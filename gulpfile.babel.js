/* eslint no-console:0 */

import gulp from 'gulp';
import gutil from 'gulp-util';
import browserSync from 'browser-sync';

import config from './gulp_tasks/config';
import theme from './gulp_tasks/theme';
import webpack from './gulp_tasks/webpack';

gulp.task('default', () => {
  const bs = browserSync.create('bs-server');
  gutil.log(gutil.colors.green('default'));
  bs.init({
    proxy: config.proxy.hostname,
  }, () => {
		theme.watch();
		webpack.dev();
  });
});

gulp.task('clean', () => {
  gutil.log(gutil.colors.green('clean'));
  theme.clean();
});

gulp.task('build', ['clean'], () => {
	theme.build();
  webpack.build();
});

// themes
gulp.task('theme:clean', () => {
  gutil.log(gutil.colors.green('theme:clean'));
  theme.clean();
});

gulp.task('theme:build', ['theme:clean'], () => {
  gutil.log(gutil.colors.green('theme:build'));
  theme.build();
});

gulp.task('theme:dev', () => {
  gutil.log(gutil.colors.green('theme:dev'));
  theme.dev();
});

// assets
gulp.task('webpack:clean', () => {
  gutil.log(gutil.colors.green('theme:clean'));
  webpack.clean();
});

gulp.task('webpack:build', () => {
  gutil.log(gutil.colors.green('webpack:build'));
  webpack.build();
});

gulp.task('webpack:dev', () => {
  gutil.log(gutil.colors.green('webpack:dev'));
  webpack.dev();
});
