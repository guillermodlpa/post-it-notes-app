
import gulp from 'gulp';
import size from 'gulp-size';
import stylus from 'gulp-stylus';
import webpackStream from 'webpack-stream';

gulp.task('js', () => (
  gulp
    .src('app/src/js/index.jsx')
    .pipe(webpackStream({
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
    }))
    .pipe(gulp.dest('app/build/js'))
));

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

gulp.task('default', ['js', 'stylus']);
