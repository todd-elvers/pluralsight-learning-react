"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');      // Runs a local server
var open = require('gulp-open');            // Opens a URL in a web browser
var browserify = require('browserify');     // Bundles JS
var reactify = require('reactify');         // Transforms React JSX to JS
var source = require('vinyl-source-stream');// Use conventional text streams with Gulp
var concat = require('gulp-concat');        // Concatenates files
var lint = require('gulp-eslint');          // Lint JS files, including JSX

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/**/*.html',
        js: './src/**/*.js',
        images: './src/images/*',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
        ],
        dist: './dist',
        mainJs: './src/main.jsx'
    }
};


// Creates a web server
gulp.task('connect', function () {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    })
});


// Connect the web server to a given page and open it in the web browser
gulp.task('open', ['connect'], function () {
    gulp.src('dist/index.html')
        .pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

// Compile HTML, move to dist dir, and reload browser
gulp.task('html', function () {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

// Compile JS, move to dist/scripts dir, and reload browser
gulp.task('js', function () {
    browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

// Compile CSS, move to dist/css dir, and
gulp.task('css', function () {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

// Migrate images to dist/images dir, and reload browser
gulp.task('images', function(){
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist +'/images'))
        .pipe(connect.reload());

    // Publish favicon
    gulp.src('./src/favicon.ico')
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('lint', function () {
    return gulp.src(config.paths.js)
        .pipe(lint())
        .pipe(lint.format());
});

// Watch the HTML files and JS files and initiate a browser reload if necessary
gulp.task('watch', function () {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
});

// Configure what gulp does with no args
gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']);