const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// Compile SASS into CSS & auto-inject into browsers
function style() {
  return gulp.src('app/scss/**/style.scss')
    .pipe(sourcemaps.init()) // Initialize sourcemap generation
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.')) // Write sourcemaps file in the same directory as the CSS file
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream());
}

// Serve and watch the SCSS/HTML files for changes
function watch() {
  browserSync.init({
    server: "./app/" // Serve files from the root of this project
  });

  gulp.watch('app/scss/**/*', style);
  gulp.watch('app/*.html').on('change', browserSync.reload);
}

// Define default task
exports.default = watch;
