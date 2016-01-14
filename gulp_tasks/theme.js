/* eslint no-console:0 */

import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import mapstream from 'map-stream';
import vtransform from 'vinyl-transform';
import browserSync from 'browser-sync';
import del from 'del';

const plugins = loadPlugins();

//
import includeDev from './templates/devmode-php-include';
import style from './templates/wordpress-style-css';
import bSSnippet from './templates/browser-sync-snippet';

//
// import project from '../../../../project.config';
import config from './config';

export default {
  clean(done) {
    del(config.paths.clean, { force: true })
      .then(() => { done(); });
  },

  build() {
    return gulp.src(config.paths.src)
      .pipe(plugins.plumber())
      .pipe(plugins.add({
        '.gitignore': '*',
        'style.css': style,
      }))
      .pipe(gulp.dest(config.paths.dest));
  },

  dev() {
    plugins.util.log('start theme.dev task');
    const filterPHP = plugins.filter('**/*.php', { restore: true });
    const filterFunc = plugins.filter('functions.php', { restore: true });
    const bs = browserSync.get('bs-server');

    return gulp.src(config.paths.src)
      .pipe(plugins.plumber())
      .pipe(filterPHP)
      .pipe(vtransform((filename) => {
        return mapstream((chunk, next) => {
          const definitions = [];
          // if (config.options.transform.preserve) {
          //   definitions = chunk.toString().match(config.options.transform.preserve);
          // }

          // TODO - for container-based dev environment: like vagrant, etc
          let _filename = filename;
          _filename = filename.replace('/Users/inafact/Desktop/vccw.yushinada', '/var');
          // console.log(_filename);

          return next(null, includeDev(_filename, definitions));
        });
      }))
      .pipe(filterPHP.restore)
      .pipe(plugins.add({
        '.gitignore': '*',
        'style.css': style,
      }))
      .pipe(filterFunc)
      .pipe(plugins.insert.append(bSSnippet))
      .pipe(filterFunc.restore)
      .pipe(gulp.dest(config.paths.dest))
      .on('end', () => bs.reload());
  },

  watch() {
    plugins.watch(config.paths.watch, this.dev);
  },
};
