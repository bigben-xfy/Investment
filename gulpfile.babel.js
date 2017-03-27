
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
import pngquant from 'imagemin-pngquant';
import cache from 'gulp-cache';


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

gulp.task('assets', () => {
	return gulp.src(['./src/assets/**/*', '!./src/assets/images', '!./src/assets/images/*'])
		.pipe(gulp.dest('./build/assets/'));
});

gulp.task('images', () => {
	return gulp.src('./src/assets/images/*')
		.pipe(cache(imagemin({
			progressive: true,
			use: [pngquant({ quality: '65-80' })]
		})))
		.pipe(gulp.dest('./build/assets/images'));
});

gulp.task('clean', () => {
	return del('./build');
});

gulp.task('clear', done => {
	return cache.clearAll(done);
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
	gulp.start('assets', 'images', 'templateHome', 'templateAction', 'rename');
});









