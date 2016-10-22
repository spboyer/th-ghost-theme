# Sasquatch Coding Ghost Theme

This theme adapted from [Troy Hunt](https://github.com/troyhunt/troyhunt.com-ghost-theme) and cloned from [Shayne Boyer's](https://github.com/spboyer/th-ghost-theme) theme.


## Cloning the Ghost Project for Local Development
- Clone the Ghost project locally 

``` 
git clone https://github.com/TryGhost/Ghost 
```

- Once cloned, edit the npm scripts to add the following 
```
  "scripts": {
    "clean": "rm -rf ./content/themes/sasquatchcoding && mkdir ./content/themes/sasquatchcoding",
    "copy-theme": "cp -R ~/repos/sasquatchcoding-ghost-theme/dist/* ./content/themes/sasquatchcoding",
    "preinstall": "node core/server/utils/npm/preinstall.js",
    "prestart": "npm run clean && npm run copy-theme",
    "start": "node index",
    "test": "grunt validate --verbose"
  }
```
- 

## Building and Deploying Locally
- Once ~/repos sasquatchcoding-ghost-theme is created, edit the gulp file
```
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    cmq = require('gulp-combine-media-queries'),
    clean = require('gulp-rimraf'),
    zip = require('gulp-zip');

var output_dir = 'dist'

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
        .pipe(zip('sasquatchcoding-ghost-theme.zip'))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['build-dist']);
``` 

- The new ```build-dist``` task will build the zip file for the theme

## Testing the Theme Locally
- Build the local theme using ``` gulp ``` to build the default and create the zip
- Open a terminal and run the Ghost npm start task
    - This run clean the Ghost repository's ./content/themes/sasquatchcoding
    - Then ``` mkdir ./content/themes/sasquatchcoding ``` will create the theme dir
    - Finally the contents of the theme will be copied to the new themes dir by the ```copy-theme``` npm script
- Return to the terminal prompt for the local Ghost instance. 
- Run ```npm start``` and browse to the url specified to test the theme changes