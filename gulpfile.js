var gulp = require('gulp');
var requirejs = require('gulp-requirejs');
var uglifycss = require('gulp-uglifycss');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var paths = {
    css: 'src/css/**/*.css',
    src: 'src/',
    dist: 'dist/',
    js: 'src/js/**/*.js'
};

gulp.task('css', function() {
    gulp.src( paths.css )
        .pipe( uglifycss({'max-line-len':80}) )
        .pipe( rename({suffix:'.min'}) )
        .pipe( gulp.dest(paths.dist+'css/') );
});

gulp.task('js', function() {
    requirejs({
        mainConfigFile: paths.src+'js/config.js',
        baseUrl: paths.src+'js/todolist',
        name: 'Application',
        include: ['../config'],
        out: '../js/script.js'
    })
        .pipe( gulp.dest(paths.dist+'js/') );

    requirejs({
        mainConfigFile: paths.src+'js/config.js',
        baseUrl: paths.src+'js/todolist',
        name: 'Application',
        include: ['../config'],
        out: '../dist/js/script.min.js'
    })
        .pipe( uglify({mangle:true, preserveComments:'some'}) )
        .pipe( gulp.dest('./js') );
});

gulp.task('watch', function () {
    gulp.watch( paths.css, ['css'] );
    gulp.watch( paths.js, ['js'] );
});

gulp.task( 'default', ['css', 'js', 'watch'] );