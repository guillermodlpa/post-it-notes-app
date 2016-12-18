
import gulp from 'gulp';
import size from 'gulp-size';
import stylus from 'gulp-stylus';
import gutil from 'gulp-util';
import webpackStream from 'webpack-stream';

gulp.task('css', () => (
  gulp
    .src('app/src/stylus/index.styl')
    .pipe(size({
      showFiles: true,
      showTotal: false,
    }))
    .pipe(stylus())
    .pipe(gulp.dest('app/build/css/'))
));

gulp.task('js', () => (
  gulp
    .src('app/src/js/index.jsx')
    .pipe(webpackStream({
      watch: gutil.env.watch,
      output: {
        filename: 'index.js',
      },
      resolve: {
        extensions: ['', '.js', '.jsx'],
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            loader: 'babel',
          },
        ],
      },
      externals: {
        // for testing. more info: http://airbnb.io/enzyme/docs/guides/webpack.html
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
      },
    }))
    .pipe(gulp.dest('app/build/js'))
));

gulp.task('default', ['js', 'stylus']);
