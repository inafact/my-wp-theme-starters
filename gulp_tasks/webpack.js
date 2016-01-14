/* eslint no-console:0 */

import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
// import path from 'path';
import autoprefixer from 'autoprefixer';
import del from 'del';
import browserSync from 'browser-sync';

import config from './config';

const plugins = loadPlugins();
const assetsPath = '../theme-out/assets';

export default {
  clean(done) {
    // del(config.paths.clean, { force: true })
    //   .then(() => { done(); });
    del(assetsPath, { force: true })
      .then(() => { done(); });
  },

  build() {
    return gulp.src(config.paths.src)
      .pipe(plugins.plumber())
      .pipe(webpackStream({
        entry: {
          // main: [
          //   'bootstrap-loader/extractStyles',
          //   './assets/scripts/entrypoint',
          // ],
          main: './assets/scripts/entrypoint',
          site: './assets/styles/site.scss',
        },
        output: {
          // path: path.join(__dirname, 'public', 'assets'),
          filename: '[name].js?[hash]',
          // chunkFilename: '[name].js?[hash]',
        },
        resolve: { extensions: ['', '.js', '.jsx'] },
        plugins: [
          new ExtractTextPlugin(
            '[name].css?[hash]',
            { allChunks: true }),
          new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify('production'),
            },
          }),
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false,
            },
          }),
        ],
        devtool: 'sourceMap',
        module: {
          loaders: [
            {
              test: /\.js$/,
              loaders: ['babel'],
              exclude: /node_modules/,
            },
            {
              test: /\.(woff2?|ttf|eot|svg)$/,
              // loaders: ['url?limit=10000'],
              loader: 'file',
            },
            {
              test: /\.(png|jpg|jpeg)$/,
              loader: 'file?name=../[path][name].[ext]',
            },
            {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract(
                'style',
                // 'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]' +
                'css?minimize!postcss'
              ),
            },
            {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract(
                'style',
                'css?minimize!postcss!resolve-url!sass?sourceMap'
              ),
            },
          ],
        },
        postcss: [autoprefixer],
      }, webpack))
      .pipe(gulp.dest(assetsPath));
  },

  dev() {
    const bs = browserSync.get('bs-server');

    return gulp.src(config.paths.src)
      .pipe(plugins.plumber())
      .pipe(webpackStream(
        {
          watch: true,
          entry: {
            main: './assets/scripts/entrypoint',
            site: './assets/styles/site.scss',
          },
          output: {
            filename: '[name].js?[hash]',
          },
          resolve: { extensions: ['', '.js', '.jsx'] },
          plugins: [
            new ExtractTextPlugin(
              '[name].css?[hash]',
              { allChunks: true }),
          ],
          devtool: 'sourceMap',
          module: {
            loaders: [
              {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/,
              },
              {
                test: /\.(woff2?|ttf|eot|svg)$/,
                loader: 'file',
              },
              {
                test: /\.(png|jpg|jpeg)$/,
                loader: 'file?name=../[path][name].[ext]',
              },
              {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                  'style',
                  'css!postcss'
                ),
              },
              {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                  'style',
                  'css!postcss!resolve-url!sass?sourceMap'
                ),
              },
            ],
          },
          postcss: [autoprefixer],
        },
        webpack,
        (stats) => {
          if (stats && (stats.hasErrors() || stats.hasWarnings())) {
            plugins.util.log(plugins.util.colors.red('webpack task:faild'));
            bs.sockets.emit('fullscreen:message', {
              title: 'Webpack Error:',
              body: stats.toString(),
              timeout: 100000,
            });
          } else {
            plugins.util.log(plugins.util.colors.blue('webpack task:done'));
            bs.reload();
          }
        }))
      .pipe(gulp.dest(assetsPath));
  },
};
