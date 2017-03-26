
import gulp from 'gulp';
import del from 'del';
import uglify from 'gulp-uglify';
import minifyCss from 'gulp-minify-css';
import rev from 'gulp-rev';
import useref from 'gulp-useref';
import gulpif from 'gulp-if';
import revReplace from 'gulp-rev-replace';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';


gulp.task('html', () => {
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

gulp.task('templateAction', () => {
	return gulp.src('./src/template/action/view/*.html')
		.pipe(gulp.dest('./build/src/template/action/view/'));
});

gulp.task('assets', ['images'], () => {
	return gulp.src(['./src/assets/**/*', '!./src/assets/images/*', '!./src/assets/images'])
		.pipe(gulp.dest('./build/assets/'));
});

gulp.task('images', () => {
	return gulp.src('./src/assets/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./build/images'));
});

gulp.task('clean', () => {
	return del('./build');
});

gulp.task('rename', ['html'], () => {
	return gulp.src('./build/*.html')
		.pipe(rename({
			basename: 'index',
			extname: '.html'
		}))
		.pipe(gulp.dest('./build'));
});

gulp.task('default', ['clean'], () => {
	gulp.start('assets', 'templateHome', 'templateAction', 'rename');
});









