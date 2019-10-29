const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const less = require('gulp-less');
const imagemin = require('gulp-imagemin');

const styleFiles = [
  './src/css/main.less'
];

const  scriptFiles = [
  'src/js/main.js'
]

gulp.task('styles', () => {
  return gulp.src(styleFiles)
  			 .pipe(sourcemaps.init())
  			 .pipe(less())
             .pipe(concat('style.css'))
             .pipe(autoprefixer({
                cascade: false
        	 }))
        	 .pipe(cleanCSS({
        	 	level: 2
        	 }))
        	 .pipe(sourcemaps.write('./'))
             .pipe(gulp.dest('./public/css'))
             .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
  return gulp.src(scriptFiles)
             .pipe(concat('script.js'))
             .pipe(uglify({
             	toplevel: true
             }))
             .pipe(gulp.dest('./public/js/'))
             .pipe(browserSync.stream());
});

gulp.task('del', () => {
  return del(['public/*']);
});

gulp.task('img-compress', () => {
  return gulp.src('./src/img/**')
  			 .pipe(imagemin({
  			   progressive: true
  			 }))
  			 .pipe(gulp.dest('./public/img'));
});

gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch('./src/img/**', gulp.series('img-compress'));
  gulp.watch('./src/css/**/*.less', gulp.series('styles'));
  gulp.watch('./src/js/**/*.js', gulp.series('scripts'));
  gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('del', gulp.parallel('styles', 'scripts', 'img-compress'), 'watch'));