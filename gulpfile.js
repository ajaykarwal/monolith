'use strict';

/*=============================
=            Paths            =
=============================*/
var basePaths = {
    src:    'src/',
    dest:   'dist/'
};



var paths = {
    scripts: {
        src: basePaths.src + 'js/',
        dest: basePaths.dest + 'js/'
    },
    styles: {
        src: basePaths.src + 'sass/',
        dest: basePaths.dest + 'css/'
    }

};

/*====================================
=            Gulp Plugins            =
====================================*/
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    //livereload = require('gulp-livereload'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');


/*=================================
 =            CSS Tasks            =
 =================================*/
gulp.task('sass', function() {
    return gulp.src(paths.styles.src + '**/*.scss')
    .pipe(sourcemaps.init())

    // Compile Sass files to Default.css
    // outputStyle options: nested, compact, expanded, compressed
    
    .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['> 1%', 'IE 6'], cascade: true }))
    .pipe(gulp.dest(paths.styles.dest))

    // Minify and save as Default.min.css
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))

    .pipe(sourcemaps.write('.'))

    .pipe(gulp.dest(paths.styles.dest));
});



/*========================================
=            JavaScript Tasks            =
========================================*/

// Concat and Minify
gulp.task('scripts', function() {
    return gulp.src(paths.scripts.src + '**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(uglify({debug: true}, function(file) {
        console.log(file.name + ': ' + file.stats.originalSize);
        console.log(file.name + ': ' + file.stats.minifiedSize);
    }))
    .pipe(rename('scripts.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
});


// Run the default tasks on launch and then watch.
gulp.task('default', ['sass', 'scripts', 'watch']);

gulp.task('watch', function() {
    //livereload.listen();
    gulp.watch(paths.styles.src + '**/*.scss', ['sass']);
    gulp.watch(paths.scripts.src + '**/*.js', ['scripts']);
});
