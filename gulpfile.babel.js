import gulp from 'gulp';
import browserSync from 'browser-sync';

import config from './gulp_tasks/config';
import theme from './gulp_tasks/theme';
import webpack from './gulp_tasks/webpack';

gulp.task('default', () => {
  const bs = browserSync.create('bs-server');
  bs.init({
    proxy: config.proxy.hostname,
  }, () => {
		theme.watch();
		webpack.dev();
  });
});

gulp.task('clean', () => {
  theme.clean();
});

gulp.task('build', ['clean'], () => {
	theme.build();
  webpack.build();
});

// themes
gulp.task('theme:clean', () => {
  theme.clean();
});

gulp.task('theme:build', ['theme:clean'], () => {
  theme.build();
});

gulp.task('theme:dev', () => {
  theme.dev();
});

// assets
gulp.task('webpack:clean', () => {
  webpack.clean();
});

gulp.task('webpack:build', () => {
  webpack.build();
});

gulp.task('webpack:dev', () => {
  webpack.dev();
});
