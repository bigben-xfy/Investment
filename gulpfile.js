
var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var revReplace = require('gulp-rev-replace');


gulp.task('html', function () {
	return gulp.src('index.html')
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCss()))
		.pipe(rev())
		.pipe(revReplace())
		.pipe(gulp.dest('./build'));
});

gulp.task('templateHome', function() {
	return gulp.src('./src/template/home/view/*.html')
		.pipe(gulp.dest('./build/src/template/home/view/'));
});

gulp.task('templateAction', function() {
	return gulp.src('./src/template/action/view/*.html')
		.pipe(gulp.dest('./build/src/template/action/view/'));
})

gulp.task('assets', function() {
	return gulp.src('./src/assets/**/*')
		.pipe(gulp.dest('./build/assets/'));
});

gulp.task('clean', function() {
	return del('./build');
});

gulp.task('default', ['clean'], function() {
	gulp.start('assets', 'templateHome', 'templateAction', 'html');
});









