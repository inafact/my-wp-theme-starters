/* eslint no-console:0 */

import gulp from 'gulp';
import gutil from 'gulp-util';
import browserSync from 'browser-sync';

import theme from './theme';
import webpack from './webpack';

gulp.task('default', () => {
  const bs = browserSync.create('bs-server');

  gutil.log(gutil.colors.green('default'));
  bs.init({
    proxy: 'yushinada.dev',
  }, () => {
    theme.watch();
    webpack.dev();
  });
});

gulp.task('clean', () => {
  gutil.log(gutil.colors.green('clean'));
  theme.clean();
  webpack.clean();
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
