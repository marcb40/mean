var gulp = require('gulp')
var connect = require('gulp-connect')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var wiredep = require('wiredep').stream;
var sass = require('gulp-sass');

var config = {
    bootstrapDir: './bower_components/bootstrap-sass',
    publicDir: './flapper-news/public',
};

gulp.task('css', function() {
    return gulp.src('./app/sass/style.scss')
    .pipe(sass({
        includePaths: [config.bootstrapDir + '/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/stylesheets'));
});

gulp.task('fonts', function() {
    return gulp.src(config.bootstrapDir + '/assets/fonts/**/*')
    .pipe(gulp.dest(config.publicDir + '/fonts'));
});



gulp.task('connect', function () {
    connect.server({
        root: 'public',
        port: 4000
    })
})

gulp.task('browserify', function() {
    // Grabs the app.js file
    return browserify('./app/app.js')
        // bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest(config.publicDir + '/javascripts/'));
})


gulp.task('watch', function() {

    gulp.watch('app/**/*.js', ['browserify'])
    gulp.watch('app/sass/style.scss', ['css'])
})

gulp.task('default', ['connect', 'watch'])

