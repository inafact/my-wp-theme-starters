/* eslint no-console:0 */

import path from 'path';

import gulp from 'gulp';
import gutil from 'gulp-util';
import loadPlugins from 'gulp-load-plugins';
const plugins = loadPlugins();

import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import del from 'del';
import browserSync from 'browser-sync';
import _ from 'lodash';

import Config from '../config';
const config = {
	assetsPath: [Config.assets.src, Config.assets.resources].join('/'),
	destPath: [path.resolve('../', Config.theme.name), Config.assets.dest].join('/'),
	entry: _.isEmpty(Config.assets.entryPoints) ? {
		main: './assets/scripts/main',
    site: './assets/styles/site.scss',
	} : Config.assets.entryPoints,
};


export default {
  clean(done) {
    del(config.destPath, { force: true })
      .then(() => { done(); });
  },

  dev() {
    return gulp.src(config.assetsPath)
      .pipe(plugins.plumber())
      .pipe(webpackStream(
        {
          watch: true,
          entry: config.entry,
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
            browserSync.get('bs-server').sockets.emit('fullscreen:message', {
              title: 'Webpack Error:',
              body: stats.toString(),
              timeout: 100000,
            });
          } else {
            plugins.util.log(plugins.util.colors.blue('webpack task:done'));
            browserSync.get('bs-server').reload();
          }
        }))
      .pipe(gulp.dest(config.destPath));
  },

  build() {
    return gulp.src(config.assetsPath)
      .pipe(plugins.plumber())
      .pipe(webpackStream({
        // entry: {
        //   // main: [
        //   //   'bootstrap-loader/extractStyles',
        //   //   './assets/scripts/entrypoint',
        //   // ],
        // },
				entry: config.entry,
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
      .pipe(gulp.dest(config.destPath));
  },
};
