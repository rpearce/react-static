import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';

const client = async () => {
  return browserify({ entries: 'src/browser.js', debug: true })
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('_site'));
}

export default client;
