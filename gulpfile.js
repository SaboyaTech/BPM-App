// This configuration is OPTIONAL

// in order to use this file
// both gulp and gulp-sass and node-sass must be install globally
// "npm install -g node-sass gulp gulp-cli"
// type "gulp default" into the terminal
// CTRL + C / CMD + C to cancel

//please note that this configuration has to be restarted periodically due to bugs
//it doesn't always stop because your code is wrong. (It will simply crash due to race conditions with file locks.)
//simply restart if it does crash

// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', gulp.series(function(done) {
    gulp.src('assets/scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('assets/css'))
        .on('error', function(e){
            console.log(e);
        });
    done();
}));

gulp.task('default', gulp.series(['sass'], function(done) {
    gulp.watch('assets/scss/*.scss').on('change', function(event){
        gulp.series(['sass']);
    });
}));