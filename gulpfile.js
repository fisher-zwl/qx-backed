var gulp = require('gulp'),
  less = require('gulp-less');
concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var px2rem = require('postcss-px2rem');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var processors = [px2rem({remUnit: 16})];
gulp.task('less', function () {
  return gulp.src('public/less/*.less')
    .pipe(less())
    // .pipe(postcss(processors))
    .pipe(concat('main.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('public/dist'))
});
gulp.task('watch', function () {
  gulp.watch('public/less/*.less', ['less']);
})

module.exports.gulpWatch = () =>{
  gulp.watch('public/less/*.less', ['watch']);
}



