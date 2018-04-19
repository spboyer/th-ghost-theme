var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    cmq = require('gulp-combine-media-queries'),
    clean = require('gulp-rimraf'),
    zip = require('gulp-zip'),
    config = require('./package.json');

var output_dir = 'dist';
// to update the theme version, change the pacakge version in package.json
var current_version = 'sasquatchcoding-ghost-theme-' + config.version + '.zip';

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
    var source = [
        './assets/**/*',
        './partials/**/*',
        'package.json',
        '*.hbs'
    ];
    return gulp.src(source, {base: './'})
        .pipe(gulp.dest(output_dir))        
        .pipe(zip(current_version))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['build-dist']);