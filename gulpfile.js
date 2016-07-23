var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    cmq = require('gulp-combine-media-queries'),
    clean = require('gulp-rimraf'),
    zip = require('gulp-zip');

var output_dir = 'sasquatchcoding-ghost-theme'

gulp.task('clean', function() {
  console.log("Clean all files in dist folder");
  return gulp.src(output_dir + "/*", { read: false }).pipe(clean());
});

gulp.task('bundle-minify-js', function () {
  return gulp.src(['assets/js/*.js', '!assets/js/app.js'])
    .pipe(uglify())
	.pipe(concat('app.js'))
    .pipe(gulp.dest('assets/js'))
});

gulp.task('styles-build', function() {
  return gulp.src('assets/css/main.css')
    //.pipe(cmq())
	.pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('assets/css'));
})

// Copy theme context to the dist folder
gulp.task('build-dist', ['bundle-minify-js', 'styles-build'], function() {
    gulp.src(['**/*min.*','**/app.js','**/fonts/*', '**/faviocon.ico', './**/*.hbs', './package.json', '!node_modules/**/*.*' ])
   .pipe(gulp.dest('./' + output_dir));
});

// Zip the dist folder 
gulp.task('zip', ['build-dist'], function() {
    return gulp.src(output_dir + '/*')
        .pipe(zip('saquatchcoding-ghost-theme.zip'))
        .pipe(gulp.dest('output_dir'));
});

gulp.task('default', ['clean', 'build-dist']);