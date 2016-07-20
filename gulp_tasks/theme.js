import path from 'path';

import gulp from 'gulp';
import gutil from 'gulp-util';
import loadPlugins from 'gulp-load-plugins';
const plugins = loadPlugins();

import mapstream from 'map-stream';
import vtransform from 'vinyl-transform';
import browserSync from 'browser-sync';
import del from 'del';

import includeDev from './templates/devmode-php-include';
import style from './templates/wordpress-style-css';

import Config from '../config';

const config = {
	themeDir: path.resolve('../', Config.theme.name),
	resources: {
		src: ['./theme/**', Config.theme.resources].join('/'),
		dest: [
			path.resolve('../', Config.theme.name),
			'**',
			Config.theme.resources
		].join('/'),
	},
	originRoot: Config.proxy.origin,
	proxyRoot: Config.proxy.replaced,
};


export default {
  clean(done) {
    del(config.resources.dest, { force: true })
      .then(() => { done(); });
  },

  build() {
    return gulp.src(config.resources.src)
      .pipe(plugins.plumber())
      .pipe(plugins.add({
        '.gitignore': '*',
				'style.css': style.production,
      }))
      .pipe(gulp.dest(config.themeDir));
  },

  dev() {
    const filterPHP = plugins.filter('**/*.php', { restore: true });
    const filterFunc = plugins.filter('functions.php', { restore: true });
    const bs = browserSync.get('bs-server');

    return gulp.src(config.resources.src)
      .pipe(plugins.plumber())
      .pipe(filterPHP)
      .pipe(vtransform((filename) => {
        return mapstream((chunk, next) => {
          let tFilename = filename;
          tFilename = filename.replace(config.originRoot, config.proxyRoot);
          gutil.log(gutil.colors.blue(filename, ' -> ', tFilename));

          return next(null, includeDev(tFilename));
        });
      }))
      .pipe(filterPHP.restore)
      .pipe(plugins.add({
        '.gitignore': '*',
				'style.css': style.develop,
      }))
      .pipe(filterFunc)
      .pipe(filterFunc.restore)
      .pipe(gulp.dest(config.themeDir))
      .on('end', () => bs.reload());
  },

  watch() {
    plugins.watch(config.resources.src, this.dev);
  },
};
